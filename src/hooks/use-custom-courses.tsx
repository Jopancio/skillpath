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

const STORAGE_KEY = "skillpath-custom-courses-v1";
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
  const [customCourses, setCustomCourses] = useState<Course[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load once on mount (intentional hydration from localStorage)
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
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
  }, []);

  // Persist on change
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(customCourses));
    } catch {
      // storage full -> ignore
    }
  }, [customCourses, hydrated]);

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
