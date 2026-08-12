"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  ChevronRight,
  Clock,
  Coins,
  FileText,
  Lock,
  PlayCircle,
  TrendingUp,
} from "lucide-react";
import type { Course } from "@/data/types";
import { courseStats } from "@/data/types";
import {
  isCourseComplete,
  isModuleUnlocked,
} from "@/data/courses";
import { useI18n, pick } from "@/lib/i18n";
import { useProgress } from "@/hooks/use-progress";
import { useCustomCourses } from "@/hooks/use-custom-courses";
import { DynamicIcon } from "@/components/ui/icon-map";
import { ProgressBar } from "@/components/ui/progress-bar";
import { ButtonLink } from "@/components/ui/button";
import { CourseToolsSidebar } from "@/components/course/CourseToolsSidebar";
import { cn } from "@/lib/utils";

export function CourseDetail({ course: initial }: { course: Course }) {
  const { t, locale } = useI18n();
  const { completedLessons, quizResults, hydrated } = useProgress();
  const { getCourseById, hydrated: coursesHydrated } = useCustomCourses();
  // AI-generated courses live in localStorage: swap in once hydrated.
  // After hydration a truly unknown id resolves back to the (already 404'd) builtin.
  const course =
    (coursesHydrated ? getCourseById(initial.id) : undefined) ?? initial;

  // Wait for localStorage hydration before deciding an AI course is unknown
  if (initial.modules.length === 0 && !coursesHydrated) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-24 text-center text-sm font-bold text-muted">
        {t.common.loading}
      </div>
    );
  }
  if (initial.modules.length === 0 && coursesHydrated && !getCourseById(initial.id)) {
    notFound();
  }

  const stats = courseStats(course);
  const allLessonIds = course.modules.flatMap((m) => m.lessons.map((l) => l.id));
  const done = allLessonIds.filter((id) => completedLessons.has(id)).length;
  const percent = allLessonIds.length
    ? Math.round((done / allLessonIds.length) * 100)
    : 0;
  const complete = isCourseComplete(course, completedLessons);
  const quiz = quizResults[course.id];
  const started = done > 0;

  // Next lesson to continue
  const nextId = allLessonIds.find((id) => !completedLessons.has(id));

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-10 lg:pb-10">
      <Link
        href="/courses"
        className="inline-flex items-center gap-1.5 text-sm font-bold text-muted hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        {t.common.back}
      </Link>

      <div className="mt-5 flex flex-col items-start gap-6 lg:flex-row">
        <CourseToolsSidebar
          course={course}
          completedLessons={completedLessons}
          homeContent={
            <>
      {/* Header card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mt-5 rounded-3xl border border-border bg-card p-6 shadow-card md:p-8"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <span
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl text-white"
            style={{ backgroundColor: course.color }}
          >
            <DynamicIcon name={course.icon} className="h-10 w-10" />
          </span>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-background px-3 py-1 text-xs font-bold text-muted">
                {t.common[course.difficulty]}
              </span>
              <span className="flex items-center gap-1 rounded-full bg-success/10 px-3 py-1 text-xs font-bold text-success">
                <TrendingUp className="h-3.5 w-3.5" />
                {course.demand}
              </span>
              <span className="flex items-center gap-1 rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-amber-400">
                <Coins className="h-3.5 w-3.5" />
                {pick(locale, course.salary)}
              </span>
              {course.pdfReference && (
                <span
                  className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary"
                  title={course.pdfReference.name}
                >
                  <FileText className="h-3.5 w-3.5" />
                  {t.onboarding.aiCoursePdfNote}
                </span>
              )}
            </div>

            <h1 className="mt-3 font-display text-2xl font-extrabold tracking-tight md:text-3xl">
              {pick(locale, course.title)}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
              {pick(locale, course.longDescription)}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-muted">
              <span className="flex items-center gap-1">
                <PlayCircle className="h-4 w-4 text-primary" />
                {stats.lessons} {t.courses.lessonCount}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-primary" />
                {stats.minutes} {t.common.minutes}
              </span>
              <span className="flex items-center gap-1">
                <Award className="h-4 w-4 text-primary" />
                {stats.xp} XP
              </span>
            </div>

            {hydrated && started && (
              <div className="mt-5">
                <div className="mb-1 flex items-center justify-between text-xs font-bold">
                  <span className="text-muted">{t.courses.progress}</span>
                  <span className="text-primary">
                    {done}/{allLessonIds.length} · {percent}%
                  </span>
                </div>
                <ProgressBar percent={percent} />
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              {nextId && (
                <ButtonLink href={`/learn/${course.id}/${nextId}`} size="lg">
                  {started ? t.courses.continueCourse : t.courses.enroll}
                  <ChevronRight className="h-5 w-5" />
                </ButtonLink>
              )}
              {complete && !quiz?.passed && (
                <ButtonLink href={`/quiz/${course.id}`} variant="accent" size="lg">
                  {t.courses.quiz}
                </ButtonLink>
              )}
              {quiz?.passed && (
                <ButtonLink
                  href={`/certificate/${course.id}`}
                  variant="secondary"
                  size="lg"
                >
                  <Award className="h-5 w-5" />
                  {t.nav.certificate}
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Learning path */}
      <h2 className="mt-12 font-display text-xl font-extrabold">
        {t.courses.path}
      </h2>

      <div className="mt-6 space-y-6">
        {course.modules.map((mod, mi) => {
          const unlocked = isModuleUnlocked(course, mi, completedLessons);
          const modDone = mod.lessons.filter((l) =>
            completedLessons.has(l.id)
          ).length;
          const modPercent = Math.round((modDone / mod.lessons.length) * 100);

          return (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: mi * 0.05 }}
              className={cn(
                "rounded-3xl border bg-card p-6 shadow-card",
                unlocked ? "border-border" : "border-dashed border-border opacity-75"
              )}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-display text-lg font-extrabold",
                      modPercent === 100
                        ? "bg-success text-white"
                        : unlocked
                          ? "bg-primary/10 text-primary"
                          : "bg-border text-muted"
                    )}
                  >
                    {modPercent === 100 ? (
                      <CheckCircle2 className="h-6 w-6" />
                    ) : unlocked ? (
                      mi + 1
                    ) : (
                      <Lock className="h-5 w-5" />
                    )}
                  </span>
                  <div>
                    <h3 className="font-display font-bold">
                      {pick(locale, mod.title)}
                    </h3>
                    <p className="text-xs font-semibold text-muted">
                      {mod.lessons.length} {t.common.lessons} ·{" "}
                      {unlocked
                        ? `${modDone}/${mod.lessons.length}`
                        : t.courses.unlockHint}
                    </p>
                  </div>
                </div>
                {unlocked && <ProgressBar percent={modPercent} className="w-28" />}
              </div>

              {/* Lesson nodes */}
              <div className="mt-5 space-y-2.5">
                {mod.lessons.map((lesson) => {
                  const isDone = completedLessons.has(lesson.id);
                  const inner = (
                    <>
                      <span
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2",
                          isDone
                            ? "border-success bg-success text-white"
                            : unlocked
                              ? "border-primary/40 bg-background text-primary"
                              : "border-border bg-background text-muted"
                        )}
                      >
                        {isDone ? (
                          <CheckCircle2 className="h-4.5 w-4.5" />
                        ) : (
                          <PlayCircle className="h-4.5 w-4.5" />
                        )}
                      </span>
                      <span className="flex-1">
                        <span
                          className={cn(
                            "block text-sm font-bold",
                            !unlocked && "text-muted"
                          )}
                        >
                          {pick(locale, lesson.title)}
                        </span>
                        <span className="block text-xs font-semibold text-muted">
                          {lesson.duration} {t.common.minutes} · {lesson.xp} XP
                        </span>
                      </span>
                      {unlocked && (
                        <ChevronRight className="h-4 w-4 text-muted" />
                      )}
                    </>
                  );

                  return unlocked ? (
                    <Link
                      key={lesson.id}
                      href={`/learn/${course.id}/${lesson.id}`}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl border border-transparent p-2.5 transition-colors hover:border-primary/30 hover:bg-background",
                        isDone && "opacity-80"
                      )}
                    >
                      {inner}
                    </Link>
                  ) : (
                    <div
                      key={lesson.id}
                      className="flex items-center gap-3 p-2.5"
                    >
                      {inner}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}

        {/* Quiz node */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className={cn(
            "rounded-3xl border p-6 shadow-card",
            quiz?.passed
              ? "border-success bg-success/5"
              : complete
                ? "border-accent bg-accent/5"
                : "border-dashed border-border bg-card opacity-75"
          )}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-2xl",
                  quiz?.passed
                    ? "bg-success text-white"
                    : complete
                      ? "bg-accent text-black"
                      : "bg-border text-muted"
                )}
              >
                {quiz?.passed ? (
                  <CheckCircle2 className="h-6 w-6" />
                ) : complete ? (
                  <Award className="h-6 w-6" />
                ) : (
                  <Lock className="h-5 w-5" />
                )}
              </span>
              <div>
                <h3 className="font-display font-bold">{t.courses.quiz}</h3>
                <p className="text-xs font-semibold text-muted">
                  {quiz?.passed
                    ? `${t.quiz.yourScore}: ${quiz.score}%`
                    : t.courses.quizDesc}
                </p>
              </div>
            </div>
            {complete && !quiz?.passed && (
              <ButtonLink href={`/quiz/${course.id}`} variant="accent" size="sm">
                {t.courses.quiz}
              </ButtonLink>
            )}
            {quiz?.passed && (
              <ButtonLink
                href={`/certificate/${course.id}`}
                variant="secondary"
                size="sm"
              >
                {t.nav.certificate}
              </ButtonLink>
            )}
          </div>
        </motion.div>
      </div>
            </>
          }
        />
      </div>
    </div>
  );
}
