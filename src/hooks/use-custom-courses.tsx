"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Course } from "@/data/types";
import { courses as builtinCourses } from "@/data/courses";
import { useAuth } from "@/lib/auth";
import {
  fetchUserData,
  persistUserData,
  supabase,
} from "@/lib/supabase";

const BASE_STORAGE_KEY = "skillpath-custom-courses-v1";
const MAX_CUSTOM = 20;

interface CustomCoursesContextValue {
  customCourses: Course[];
  /** Builtin + custom, with custom last. */
  allCourses: Course[];
  hydrated: boolean;
  addCourse: (course: Course) => void;
  removeCourse: (id: string) => void;
  getCourseById: (id: string) => Course | undefined;
}

const CustomCoursesContext = createContext<CustomCoursesContextValue | null>(
  null
);

export function CustomCoursesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  // Remount per user so each account gets its own storage slice.
  return (
    <CustomCoursesInner
      key={user?.id ?? "anonymous"}
      userId={user?.id ?? null}
      storageKey={user ? `${BASE_STORAGE_KEY}:${user.id}` : null}
    >
      {children}
    </CustomCoursesInner>
  );
}

function CustomCoursesInner({
  children,
  userId,
  storageKey,
}: {
  children: ReactNode;
  userId: string | null;
  storageKey: string | null;
}) {
  const [customCourses, setCustomCourses] = useState<Course[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const { getToken } = useAuth();

  // Load once on mount (intentional hydration from localStorage)
  useEffect(() => {
    if (!storageKey) return;
    let cancelled = false;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as Course[];
        if (Array.isArray(parsed)) {
          // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration from storage
          setCustomCourses(parsed.filter((c) => c && c.id).slice(0, MAX_CUSTOM));
        }
      }
    } catch {
      // corrupted storage -> start fresh
    }
    setHydrated(true);
    // Prefer the DB copy when it exists (fresher than the local cache).
    if (userId && supabase) {
      void fetchUserData<Course[]>("custom_courses", userId, getToken).then(
        (remote) => {
          if (cancelled || !Array.isArray(remote)) return;
          const clean = remote.filter((c) => c && c.id).slice(0, MAX_CUSTOM);
          setCustomCourses(clean);
          window.localStorage.setItem(storageKey, JSON.stringify(clean));
        }
      );
    }
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- stable per remount
  }, []);

  // Persist on change
  useEffect(() => {
    if (!hydrated || !storageKey) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(customCourses));
    } catch {
      // storage full -> ignore
    }
    if (userId && supabase) {
      void persistUserData(
        "custom_courses",
        userId,
        customCourses,
        getToken
      );
    }
  }, [customCourses, hydrated, storageKey, userId, getToken]);

  const addCourse = useCallback((course: Course) => {
    setCustomCourses((prev) => {
      const withoutDup = prev.filter((c) => c.id !== course.id);
      return [...withoutDup, course].slice(-MAX_CUSTOM);
    });
  }, []);

  const removeCourse = useCallback((id: string) => {
    setCustomCourses((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const allCourses = useMemo(
    () => [...builtinCourses, ...customCourses],
    [customCourses]
  );

  const getCourseById = useCallback(
    (id: string) => allCourses.find((c) => c.id === id),
    [allCourses]
  );

  const value = useMemo<CustomCoursesContextValue>(
    () => ({
      customCourses,
      allCourses,
      hydrated,
      addCourse,
      removeCourse,
      getCourseById,
    }),
    [customCourses, allCourses, hydrated, addCourse, removeCourse, getCourseById]
  );

  return (
    <CustomCoursesContext.Provider value={value}>
      {children}
    </CustomCoursesContext.Provider>
  );
}

export function useCustomCourses(): CustomCoursesContextValue {
  const ctx = useContext(CustomCoursesContext);
  if (!ctx) {
    throw new Error(
      "useCustomCourses must be used within CustomCoursesProvider"
    );
  }
  return ctx;
}
