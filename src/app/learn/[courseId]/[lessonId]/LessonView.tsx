"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  ArrowLeft,
  Award,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  RotateCw,
  Zap,
} from "lucide-react";
import type { Course, Lesson } from "@/data/types";
import { courseLessonIds, findLesson, nextLesson } from "@/data/courses";
import { useI18n, pick } from "@/lib/i18n";
import { useProgress } from "@/hooks/use-progress";
import { useCustomCourses } from "@/hooks/use-custom-courses";
import { MarkdownText } from "@/components/ui/markdown";
import { Button, ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props =
  | { course: Course; lesson: Lesson }
  | { courseId: string; lessonId: string };

function AILessonView({
  courseId,
  lessonId,
}: {
  courseId: string;
  lessonId: string;
}) {
  const { t } = useI18n();
  const { getCourseById, hydrated } = useCustomCourses();

  // AI courses need localStorage hydration before we can resolve them
  if (!hydrated) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center text-sm font-bold text-muted">
        {t.common.loading}
      </div>
    );
  }

  const course = getCourseById(courseId);
  // findLesson works on a Course object directly — getLesson() would only
  // search builtin courses, which is why AI lessons 404'd.
  const found = course ? findLesson(course, lessonId) : undefined;
  if (!course || !found) notFound();
  return <LessonContent course={course} lesson={found.lesson} />;
}

export function LessonView(props: Props) {
  if ("courseId" in props) {
    return <AILessonView courseId={props.courseId} lessonId={props.lessonId} />;
  }
  return <LessonContent course={props.course} lesson={props.lesson} />;
}

function LessonContent({
  course,
  lesson,
}: {
  course: Course;
  lesson: Lesson;
}) {
  const { t, locale } = useI18n();
  const { completeLesson, completedLessons } = useProgress();
  const router = useRouter();
  const [justCompleted, setJustCompleted] = useState(false);
  const [xpPop, setXpPop] = useState(false);

  const isDone = completedLessons.has(lesson.id) || justCompleted;
  const next = nextLesson(course, lesson.id);
  const ids = courseLessonIds(course);
  const currentIdx = ids.indexOf(lesson.id);
  const allDone = ids.every((id) => completedLessons.has(id) || id === lesson.id);

  function handleComplete() {
    if (isDone && !justCompleted) {
      // already done previously -> just go next
      goNext();
      return;
    }
    completeLesson(lesson.id, lesson.xp);
    setJustCompleted(true);
    setXpPop(true);
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#FF6B2C", "#F4B942", "#D94A16", "#FFA726"],
    });
    setTimeout(() => setXpPop(false), 1200);
  }

  function goNext() {
    if (next) {
      router.push(`/learn/${course.id}/${next.lesson.id}`);
    } else {
      router.push(`/quiz/${course.id}`);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center justify-between">
        <Link
          href={`/courses/${course.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-muted hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.lesson.backToPath}
        </Link>
        <span className="text-xs font-bold text-muted">
          {pick(locale, course.title)} · {currentIdx + 1}/{ids.length}
        </span>
      </div>

      {/* Progress mini */}
      <div className="mt-4 flex gap-1">
        {ids.map((id, i) => (
          <span
            key={id}
            className={cn(
              "h-1.5 flex-1 rounded-full",
              i < currentIdx || completedLessons.has(id)
                ? "bg-success"
                : i === currentIdx
                  ? "bg-primary"
                  : "bg-border"
            )}
          />
        ))}
      </div>

      <motion.article
        key={lesson.id}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-card md:p-8"
      >
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-muted">
          <span className="flex items-center gap-1 rounded-full bg-background px-3 py-1">
            <Clock className="h-3.5 w-3.5 text-primary" />
            {lesson.duration} {t.common.minutes}
          </span>
          <span className="flex items-center gap-1 rounded-full bg-accent/20 px-3 py-1 text-amber-400">
            <Zap className="h-3.5 w-3.5" />
            {lesson.xp} XP
          </span>
        </div>

        <h1 className="mt-4 font-display text-2xl font-extrabold tracking-tight md:text-3xl">
          {pick(locale, lesson.title)}
        </h1>

        <div className="mt-6">
          {lesson.type === "video" && lesson.videoUrl && (
            <div className="overflow-hidden rounded-2xl border border-border">
              <div className="relative aspect-video w-full">
                <iframe
                  src={lesson.videoUrl}
                  title={pick(locale, lesson.title)}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {lesson.type === "text" && lesson.body && (
            <MarkdownText
              text={pick(locale, lesson.body)}
              className="text-[15px] text-foreground/90"
            />
          )}

          {lesson.type === "flipcard" && lesson.cards && (
            <FlipCards cards={lesson.cards} />
          )}
        </div>
      </motion.article>

      {/* Action bar */}
      <div className="sticky bottom-4 mt-8">
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card/95 p-4 shadow-soft backdrop-blur">
          <div className="relative">
            {xpPop && (
              <motion.span
                initial={{ opacity: 0, y: 8, scale: 0.8 }}
                animate={{ opacity: 1, y: -18, scale: 1.1 }}
                exit={{ opacity: 0 }}
                className="absolute -top-4 left-0 flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-extrabold text-foreground shadow-card"
              >
                <Zap className="h-3.5 w-3.5" />+{lesson.xp} XP
              </motion.span>
            )}
            <span
              className={cn(
                "flex items-center gap-1.5 text-sm font-bold",
                isDone ? "text-success" : "text-muted"
              )}
            >
              {isDone ? (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  {t.lesson.completed}
                </>
              ) : (
                <>
                  <Award className="h-5 w-5" />
                  {lesson.xp} XP
                </>
              )}
            </span>
          </div>

          <div className="flex gap-2">
            {!isDone ? (
              <Button onClick={handleComplete}>
                <Check className="h-4 w-4" />
                {t.lesson.complete}
              </Button>
            ) : next ? (
              <Button onClick={goNext}>
                {t.lesson.nextLesson}
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <ButtonLink href={`/quiz/${course.id}`} variant="accent">
                {t.courses.quiz}
                <ChevronRight className="h-4 w-4" />
              </ButtonLink>
            )}
          </div>
        </div>
      </div>

      {allDone && isDone && !next && (
        <p className="mt-4 text-center text-sm font-semibold text-muted">
          {t.certificate.title} → {t.courses.quiz}
        </p>
      )}
    </div>
  );
}

function FlipCards({ cards }: { cards: NonNullable<Lesson["cards"]> }) {
  const { t, locale } = useI18n();
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  return (
    <div>
      <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-muted">
        <RotateCw className="h-4 w-4 text-primary" />
        {t.lesson.tapToFlip}
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card, i) => {
          const isFlipped = flipped[i] ?? false;
          return (
            <button
              key={i}
              onClick={() => setFlipped((f) => ({ ...f, [i]: !f[i] }))}
              className="group relative h-48 w-full [perspective:1000px]"
              aria-pressed={isFlipped}
            >
              <div
                className={cn(
                  "relative h-full w-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d]",
                  isFlipped && "[transform:rotateY(180deg)]"
                )}
              >
                {/* Front */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-secondary/10 p-4 [backface-visibility:hidden]">
                  <span className="font-display text-lg font-extrabold text-foreground">
                    {pick(locale, card.front)}
                  </span>
                  <span className="text-xs font-bold text-primary">?</span>
                </div>
                {/* Back */}
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl border-2 border-success/40 bg-gradient-to-br from-success/10 to-primary/10 p-4 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <p className="text-sm leading-relaxed text-foreground/90">
                    {pick(locale, card.back)}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
