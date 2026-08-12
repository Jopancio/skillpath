"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, PlayCircle } from "lucide-react";
import type { Course } from "@/data/types";
import { courseStats } from "@/data/types";
import { useI18n, pick } from "@/lib/i18n";
import { useProgress } from "@/hooks/use-progress";
import { DynamicIcon } from "@/components/ui/icon-map";
import { ProgressBar } from "@/components/ui/progress-bar";

const difficultyKey = {
  beginner: "beginner",
  intermediate: "intermediate",
  advanced: "advanced",
} as const;

export function CourseCard({
  course,
  index = 0,
  plain = false,
  className = "",
}: {
  course: Course;
  index?: number;
  plain?: boolean;
  className?: string;
}) {
  const { t, locale } = useI18n();
  const { completedLessons } = useProgress();
  const stats = courseStats(course);
  const done = course.modules
    .flatMap((m) => m.lessons)
    .filter((l) => completedLessons.has(l.id)).length;
  const percent = stats.lessons > 0 ? Math.round((done / stats.lessons) * 100) : 0;
  const started = done > 0;

  const card = (
    <Link
      href={`/courses/${course.id}`}
      className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all card-futuristic hover:border-primary/50"
    >
      <div className="flex items-start justify-between">
        <span
          className="flex h-14 w-14 items-center justify-center rounded-2xl text-white"
          style={{ backgroundColor: course.color }}
        >
          <DynamicIcon name={course.icon} className="h-7 w-7" />
        </span>
        <span className="rounded-full bg-background px-3 py-1 text-xs font-bold text-muted">
          {t.common[difficultyKey[course.difficulty]]}
        </span>
      </div>

      <h3 className="mt-4 font-display text-lg font-bold leading-snug group-hover:text-primary">
        {pick(locale, course.title)}
      </h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">
        {pick(locale, course.description)}
      </p>

      <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-muted">
        <span className="flex items-center gap-1">
          <PlayCircle className="h-3.5 w-3.5 text-primary" />
          {stats.lessons} {t.common.lessons}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5 text-primary" />
          {stats.minutes} {t.common.minutes}
        </span>
        {percent === 100 && (
          <span className="flex items-center gap-1 text-success">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {t.common.completed}
          </span>
        )}
      </div>

      <div className="mt-4">
        {started ? (
          <ProgressBar percent={percent} showLabel />
        ) : (
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary">
            {t.courses.startCourse} →
          </span>
        )}
      </div>
    </Link>
  );

  if (plain) {
    return <div className={className}>{card}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
    >
      {card}
    </motion.div>
  );
}
