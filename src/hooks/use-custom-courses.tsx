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
  const [hydrated, setHydrated] = useState(!storageKey);
  const [hydrationFailed, setHydrationFailed] = useState(false);
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
    void (async () => {
      try {
        if (userId && supabase) {
          const token = await getToken();
          if (!token) throw new Error("Missing session token");
          const { data } = await supabase.from("custom_courses").select("data")
            .eq("user_id", userId).setHeader("Authorization", `Bearer ${token}`)
            .abortSignal(AbortSignal.timeout(15000)).maybeSingle().throwOnError();
          if (cancelled) return;
          if (Array.isArray(data?.data)) {
            setCustomCourses(data.data.filter((c: Course) => c && c.id).slice(0, MAX_CUSTOM));
          }
        }
        if (!cancelled) setHydrated(true);
      } catch {
        if (!cancelled) setHydrationFailed(true);
      }
    })();
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

  if (hydrationFailed) {
    return <div role="alert" className="p-8 text-center">
      <p>Data kursus gagal dimuat. / Could not load course data.</p>
      <button type="button" onClick={() => window.location.reload()}>Coba lagi / Retry</button>
    </div>;
  }

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
