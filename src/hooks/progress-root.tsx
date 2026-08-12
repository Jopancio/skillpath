"use client";

import { useMemo } from "react";
import { courses, isCourseComplete } from "@/data/courses";

/**
 * Returns true if ANY course is fully completed.
 * Used by dashboard/badges UI to grant the "course-completer" badge.
 */
export function useAnyCourseCompleted(completedLessons: ReadonlySet<string>) {
  return useMemo(
    () => courses.some((c) => isCourseComplete(c, completedLessons)),
    [completedLessons]
  );
}
