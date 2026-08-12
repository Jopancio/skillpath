"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  ChevronRight,
  Clock,
  RotateCcw,
  XCircle,
} from "lucide-react";
import type { Course } from "@/data/types";
import { useI18n, pick } from "@/lib/i18n";
import { useProgress } from "@/hooks/use-progress";
import { useCustomCourses } from "@/hooks/use-custom-courses";
import { Button, ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const QUIZ_SECONDS = 300; // 5 minutes

type Phase = "answering" | "result";

export function QuizView({
  courseId,
  initialCourse,
}: {
  courseId: string;
  initialCourse?: Course;
}) {
  const { t } = useI18n();
  const { getCourseById, hydrated: coursesHydrated } = useCustomCourses();

  // AI courses resolve from localStorage once hydrated
  if (!initialCourse && !coursesHydrated) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center text-sm font-bold text-muted">
        {t.common.loading}
      </div>
    );
  }

  const resolved = initialCourse ?? getCourseById(courseId);
  if (!resolved) notFound();
  return <QuizContent course={resolved} />;
}

function QuizContent({ course }: { course: Course }) {
  const { t, locale } = useI18n();
  const { recordQuiz, quizResults, hydrated } = useProgress();

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [phase, setPhase] = useState<Phase>("answering");
  const [timeLeft, setTimeLeft] = useState(QUIZ_SECONDS);
  const [finalScore, setFinalScore] = useState(0);

  const total = course.quiz.length;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === total;

  // Timer
  useEffect(() => {
    if (phase !== "answering") return;
    if (timeLeft <= 0) {
      submit();
      return;
    }
    const id = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, phase]);

  const mm = Math.floor(timeLeft / 60);
  const ss = String(timeLeft % 60).padStart(2, "0");

  function submit() {
    const correct = course.quiz.filter(
      (q, i) => answers[i] === q.correctIndex
    ).length;
    const score = Math.round((correct / total) * 100);
    setFinalScore(score);
    const passed = score >= course.passScore;
    recordQuiz(course.id, score, passed);
    setPhase("result");
    if (passed) {
      confetti({
        particleCount: 160,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#FF6B2C", "#F4B942", "#D94A16", "#FFA726", "#FFD54F"],
      });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function retake() {
    setAnswers({});
    setTimeLeft(QUIZ_SECONDS);
    setPhase("answering");
    setFinalScore(0);
  }

  const passed = finalScore >= course.passScore;
  const prevResult = hydrated ? quizResults[course.id] : undefined;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link
        href={`/courses/${course.id}`}
        className="inline-flex items-center gap-1.5 text-sm font-bold text-muted hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        {pick(locale, course.title)}
      </Link>

      {phase === "answering" && (
        <>
          {/* Header */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 shadow-card">
            <div>
              <h1 className="font-display text-xl font-extrabold">
                {t.quiz.title}
              </h1>
              <p className="text-xs font-semibold text-muted">
                {t.quiz.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-muted">
                {answeredCount}/{total} {t.quiz.answered}
              </span>
              <span
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-extrabold",
                  timeLeft < 60
                    ? "bg-error/10 text-error"
                    : "bg-primary/10 text-primary"
                )}
              >
                <Clock className="h-4 w-4" />
                {mm}:{ss}
              </span>
            </div>
          </div>

          {/* Questions */}
          <div className="mt-6 space-y-6">
            {course.quiz.map((q, qi) => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                className="rounded-2xl border border-border bg-card p-5 shadow-card"
              >
                <p className="font-display text-sm font-bold">
                  <span className="mr-2 text-primary">
                    {t.quiz.question} {qi + 1}
                  </span>
                  {pick(locale, q.question)}
                </p>
                <div className="mt-4 grid gap-2">
                  {q.options.map((opt, oi) => {
                    const selected = answers[qi] === oi;
                    return (
                      <button
                        key={oi}
                        onClick={() =>
                          setAnswers((a) => ({ ...a, [qi]: oi }))
                        }
                        className={cn(
                          "flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold transition-all",
                          selected
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border bg-background text-muted hover:border-primary/50 hover:text-foreground"
                        )}
                        aria-pressed={selected}
                      >
                        <span
                          className={cn(
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-extrabold",
                            selected
                              ? "border-primary bg-primary text-white"
                              : "border-border"
                          )}
                        >
                          {String.fromCharCode(65 + oi)}
                        </span>
                        {pick(locale, opt)}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="sticky bottom-4 mt-8">
            <div className="rounded-2xl border border-border bg-card/95 p-4 shadow-soft backdrop-blur">
              <Button
                onClick={submit}
                disabled={!allAnswered}
                className="w-full"
                size="lg"
              >
                {t.quiz.submit}
                <ChevronRight className="h-5 w-5" />
              </Button>
              {!allAnswered && (
                <p className="mt-2 text-center text-xs font-semibold text-muted">
                  {answeredCount}/{total} {t.quiz.answered}
                </p>
              )}
            </div>
          </div>
        </>
      )}

      {phase === "result" && (
        <ResultView
          course={course}
          score={finalScore}
          passed={passed}
          answers={answers}
          onRetake={retake}
          prevBest={prevResult?.score}
        />
      )}
    </div>
  );
}

function ResultView({
  course,
  score,
  passed,
  answers,
  onRetake,
  prevBest,
}: {
  course: Course;
  score: number;
  passed: boolean;
  answers: Record<number, number>;
  onRetake: () => void;
  prevBest?: number;
}) {
  const { t, locale } = useI18n();
  const [showReview, setShowReview] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="mt-6"
    >
      <div
        className={cn(
          "rounded-3xl border p-8 text-center shadow-card",
          passed ? "border-success bg-success/5" : "border-error/40 bg-error/5"
        )}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.15 }}
          className={cn(
            "mx-auto flex h-20 w-20 items-center justify-center rounded-full text-white",
            passed ? "bg-success" : "bg-error"
          )}
        >
          {passed ? (
            <CheckCircle2 className="h-10 w-10" />
          ) : (
            <XCircle className="h-10 w-10" />
          )}
        </motion.div>

        <h2 className="mt-5 font-display text-2xl font-extrabold">
          {passed ? t.quiz.passed : t.quiz.failed}
        </h2>

        <div className="mx-auto mt-6 grid max-w-xs grid-cols-2 gap-3">
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="font-display text-3xl font-extrabold text-primary">
              {score}%
            </div>
            <div className="text-xs font-bold text-muted">{t.quiz.yourScore}</div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="font-display text-3xl font-extrabold text-muted">
              {course.passScore}%
            </div>
            <div className="text-xs font-bold text-muted">{t.quiz.passScore}</div>
          </div>
        </div>

        {passed && (
          <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-4 py-1.5 text-sm font-extrabold text-amber-400">
            <Award className="h-4 w-4" />
            +100 XP
          </p>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {passed ? (
            <ButtonLink href={`/certificate/${course.id}`} size="lg">
              <Award className="h-5 w-5" />
              {t.quiz.getCertificate}
            </ButtonLink>
          ) : (
            <Button onClick={onRetake} size="lg">
              <RotateCcw className="h-5 w-5" />
              {t.quiz.retake}
            </Button>
          )}
          <Button variant="outline" size="lg" onClick={() => setShowReview((s) => !s)}>
            {t.quiz.reviewTitle}
          </Button>
          <ButtonLink href={`/courses/${course.id}`} variant="ghost" size="lg">
            {t.common.back}
          </ButtonLink>
        </div>
      </div>

      {showReview && (
        <div className="mt-8 space-y-4">
          <h3 className="font-display text-lg font-extrabold">
            {t.quiz.reviewTitle}
          </h3>
          {course.quiz.map((q, qi) => {
            const user = answers[qi];
            const correct = q.correctIndex;
            const isRight = user === correct;
            return (
              <div
                key={q.id}
                className={cn(
                  "rounded-2xl border bg-card p-5",
                  isRight ? "border-success/50" : "border-error/40"
                )}
              >
                <p className="flex items-start gap-2 text-sm font-bold">
                  {isRight ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  ) : (
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-error" />
                  )}
                  {pick(locale, q.question)}
                </p>
                <div className="mt-3 space-y-1.5 pl-6 text-sm">
                  {q.options.map((opt, oi) => (
                    <p
                      key={oi}
                      className={cn(
                        "rounded-lg px-3 py-1.5",
                        oi === correct &&
                          "bg-success/10 font-bold text-success",
                        oi === user &&
                          oi !== correct &&
                          "bg-error/10 font-bold text-error"
                      )}
                    >
                      {pick(locale, opt)}
                      {oi === correct && ` · ${t.quiz.correctAnswer}`}
                    </p>
                  ))}
                </div>
                {q.explanation && (
                  <p className="mt-3 rounded-lg bg-background p-3 pl-6 text-xs leading-relaxed text-muted">
                    {pick(locale, q.explanation)}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
