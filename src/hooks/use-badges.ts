"use client";

import { useMemo } from "react";
import { useProgress } from "@/hooks/use-progress";
import { courses, isCourseComplete } from "@/data/courses";
import { badges, type Badge } from "@/data/badges";

export interface BadgeWithStatus extends Badge {
  earned: boolean;
}

/** Computes badge earned-status including course-completer which needs course data. */
export function useBadges(): BadgeWithStatus[] {
  const { xp, streak, lessonsCompletedCount, quizResults, completedLessons } =
    useProgress();

  return useMemo(() => {
    const anyCourseComplete = courses.some((c) =>
      isCourseComplete(c, completedLessons)
    );
    const earned = new Set<string>();
    if (lessonsCompletedCount >= 1) earned.add("first-steps");
    if (streak >= 3) earned.add("streak-3");
    if (streak >= 7) earned.add("streak-7");
    if (lessonsCompletedCount >= 10) earned.add("bookworm");
    if (lessonsCompletedCount >= 25) earned.add("scholar");
    if (Object.values(quizResults).some((r) => r.score === 100))
      earned.add("quiz-master");
    if (anyCourseComplete) earned.add("course-completer");
    if (Object.values(quizResults).some((r) => r.passed)) earned.add("certified");
    if (xp >= 500) earned.add("xp-500");
    if (xp >= 1000) earned.add("xp-1000");
    return badges.map((b) => ({ ...b, earned: earned.has(b.id) }));
  }, [xp, streak, lessonsCompletedCount, quizResults, completedLessons]);
}

/** Returns ids of badges earned (for new-badge detection). */
export function badgeIdsFrom(list: BadgeWithStatus[]): string[] {
  return list.filter((b) => b.earned).map((b) => b.id);
}
