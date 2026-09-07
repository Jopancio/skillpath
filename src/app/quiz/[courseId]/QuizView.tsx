"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import confetti from "canvas-confetti";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronRight,
  Clock,
  Flame,
  Gamepad2,
  Hand,
  MousePointerClick,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
  XCircle,
  Zap,
} from "lucide-react";
import type { Course, QuizQuestion } from "@/data/types";
import { isModuleUnlocked } from "@/data/courses";
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
  initialModuleId,
}: {
  courseId: string;
  initialCourse?: Course;
  /** When set, run this module's end-of-chapter quiz instead of the final exam. */
  initialModuleId?: string;
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
  return <QuizContent course={resolved} initialModuleId={initialModuleId} />;
}

function QuizContent({
  course,
  initialModuleId,
}: {
  course: Course;
  initialModuleId?: string;
}) {
  const { t, locale } = useI18n();
  const {
    recordQuiz,
    recordModuleQuiz,
    quizResults,
    moduleQuizResults,
    completedLessons,
    hydrated,
  } = useProgress();
  const router = useRouter();

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [phase, setPhase] = useState<Phase>("answering");
  const [timeLeft, setTimeLeft] = useState(QUIZ_SECONDS);
  const [finalScore, setFinalScore] = useState(0);
  const [jumpedIdx, setJumpedIdx] = useState<number | null>(null);
  const [quizMode, setQuizMode] = useState<"formal" | "game">("formal");
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Chapter mode: opened with ?module=<id> on a module that has its own
  // end-of-chapter quiz ("Kuis 1", "Kuis 2", ...). Falls back to the final
  // course exam when the id is unknown or the module has no quiz.
  const mod = initialModuleId
    ? course.modules.find((m) => m.id === initialModuleId)
    : undefined;
  const quizList = mod && mod.quiz && mod.quiz.length > 0 ? mod.quiz : course.quiz;
  const isModuleQuiz = quizList !== course.quiz;
  const moduleIdx = mod ? course.modules.findIndex((m) => m.id === mod.id) : -1;

  // Chapter-quiz gate: the chapter's own material must be finished and all
  // previous chapters must be cleared (material + chapter quiz). Otherwise
  // a hand-typed ?module= URL would skip the learning path.
  const chapterLocked =
    Boolean(mod) &&
    isModuleQuiz &&
    hydrated &&
    (!mod!.lessons.every((l) => completedLessons.has(l.id)) ||
      !isModuleUnlocked(course, moduleIdx, completedLessons, moduleQuizResults));
  useEffect(() => {
    if (chapterLocked) {
      router.replace(`/courses/${course.id}`);
    }
  }, [chapterLocked, router, course.id]);

  const total = quizList.length;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === total;

  function submit() {
    const correct = quizList.filter(
      (q, i) => answers[i] === q.correctIndex
    ).length;
    const score = Math.round((correct / total) * 100);
    setFinalScore(score);
    const passed = score >= course.passScore;
    // Chapter quizzes are stored separately so badges/certificates that read
    // `quizResults` keep reacting to the final exam only.
    if (mod && isModuleQuiz) {
      recordModuleQuiz(course.id, mod.id, score, passed);
    } else {
      recordQuiz(course.id, score, passed);
    }
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

  // Scroll to + highlight the first question without an answer
  function jumpToUnanswered() {
    const idx = quizList.findIndex((_, i) => answers[i] === undefined);
    if (idx === -1) return;
    questionRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "center" });
    setJumpedIdx(idx);
    setTimeout(() => setJumpedIdx((cur) => (cur === idx ? null : cur)), 1800);
  }

  // Timer (paused while a locked chapter quiz is being redirected away).
  // On reaching zero the auto-submit is scheduled via setTimeout so the
  // state updates happen in a callback, not synchronously inside the effect.
  useEffect(() => {
    if (chapterLocked) return;
    if (phase !== "answering") return;
    const id = setTimeout(() => {
      if (timeLeft <= 0) {
        submit();
      } else {
        setTimeLeft((s) => s - 1);
      }
    }, 1000);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, phase, chapterLocked]);

  const mm = Math.floor(timeLeft / 60);
  const ss = String(timeLeft % 60).padStart(2, "0");

  const passed = finalScore >= course.passScore;
  const prevResult = hydrated
    ? mod && isModuleQuiz
      ? moduleQuizResults[`${course.id}::${mod.id}`]
      : quizResults[course.id]
    : undefined;

  // After passing a chapter quiz: continue into the next chapter's first
  // lesson, or head to the final exam when this was the last chapter.
  let nextHref: string | undefined;
  if (mod && moduleIdx >= 0) {
    const nextMod = course.modules[moduleIdx + 1];
    nextHref =
      nextMod && nextMod.lessons.length > 0
        ? `/learn/${course.id}/${nextMod.lessons[0].id}`
        : `/quiz/${course.id}`;
  }

  // While redirecting a locked chapter quiz, render nothing.
  if (chapterLocked) return null;

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
                {isModuleQuiz
                  ? `${t.quiz.moduleQuizLabel} ${moduleIdx + 1}`
                  : t.quiz.title}
              </h1>
              <p className="text-xs font-semibold text-muted">
                {isModuleQuiz && mod
                  ? `${pick(locale, mod.title)} · ${t.quiz.moduleSubtitle}`
                  : t.quiz.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Mode toggle */}
              <div className="flex rounded-full border border-border bg-background p-0.5">
                <button
                  type="button"
                  onClick={() => setQuizMode("formal")}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-colors",
                    quizMode === "formal"
                      ? "bg-primary text-white"
                      : "text-muted hover:text-foreground"
                  )}
                >
                  <Clock className="h-3.5 w-3.5" />
                  {t.quiz.formalMode}
                </button>
                <button
                  type="button"
                  onClick={() => setQuizMode("game")}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-colors",
                    quizMode === "game"
                      ? "bg-gradient-to-r from-primary to-deep-orange text-white"
                      : "text-muted hover:text-foreground"
                  )}
                >
                  <Gamepad2 className="h-3.5 w-3.5" />
                  {t.quiz.gameMode}
                </button>
              </div>
              <span className="text-xs font-bold text-muted">
                {answeredCount}/{total} {t.quiz.answered}
              </span>
              {quizMode === "formal" && (
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
              )}
            </div>
          </div>

          {quizMode === "formal" ? (
            <>
              {/* Questions — formal mode */}
              <div className="mt-6 space-y-6">
                {quizList.map((q, qi) => (
                  <motion.div
                    key={q.id}
                    ref={(el) => {
                      questionRefs.current[qi] = el;
                    }}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35 }}
                    className={cn(
                      "rounded-2xl border border-border bg-card p-5 shadow-card transition-colors",
                      jumpedIdx === qi && "border-primary ring-2 ring-primary/40"
                    )}
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
                    onClick={() => {
                      if (allAnswered) {
                        submit();
                      } else {
                        jumpToUnanswered();
                      }
                    }}
                    className="w-full"
                    size="lg"
                  >
                    {allAnswered ? t.quiz.submit : t.common.next}
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
          ) : (
            /* Game mode */
            <GameQuizPlay
              questions={quizList}
              onComplete={(score) => {
                setFinalScore(score);
                const passed = score >= course.passScore;
                if (mod && isModuleQuiz) {
                  recordModuleQuiz(course.id, mod.id, score, passed);
                } else {
                  recordQuiz(course.id, score, passed);
                }
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
              }}
              onBack={() => setQuizMode("formal")}
            />
          )}
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
          isModuleQuiz={isModuleQuiz && Boolean(mod)}
          moduleTitle={mod ? pick(locale, mod.title) : undefined}
          nextHref={nextHref}
          questions={quizList}
        />
      )}
    </div>
  );
}

/* ================================================================ */
/*  Game Quiz — converts quiz questions into interactive mini-games */
/* ================================================================ */

type GameKind = "swipe" | "tap" | "match";

interface GameRound {
  kind: GameKind;
  question: QuizQuestion;
  /** For swipe: the statement + isTrue. For tap: options. For match: pairs. */
}

function GameQuizPlay({
  questions,
  onComplete,
  onBack,
}: {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
  onBack: () => void;
}) {
  const { t, locale } = useI18n();
  const [roundIdx, setRoundIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [phase, setPhase] = useState<"intro" | "playing" | "feedback">("intro");
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);

  // Build game rounds from quiz questions — cycle through game types
  const rounds = useMemo<GameRound[]>(() => {
    const kinds: GameKind[] = ["tap", "swipe", "match"];
    return questions.map((q, i) => ({
      kind: kinds[i % kinds.length],
      question: q,
    }));
  }, [questions]);

  const round = rounds[roundIdx];
  const totalRounds = rounds.length;
  const isLast = roundIdx === totalRounds - 1;

  const handleResult = useCallback(
    (correct: boolean) => {
      setLastCorrect(correct);
      if (correct) {
        setScore((s) => s + 1);
        setStreak((s) => s + 1);
      } else {
        setStreak(0);
      }
      setPhase("feedback");
    },
    []
  );

  const nextRound = useCallback(() => {
    if (isLast) {
      // score already includes the current round's result (set by handleResult)
      const finalScore = Math.round((score / totalRounds) * 100);
      onComplete(finalScore);
    } else {
      setRoundIdx((i) => i + 1);
      setPhase("intro");
      setLastCorrect(null);
    }
  }, [isLast, score, totalRounds, onComplete]);

  // Auto-advance from intro after a delay
  useEffect(() => {
    if (phase !== "intro") return;
    const id = setTimeout(() => setPhase("playing"), 2200);
    return () => clearTimeout(id);
  }, [phase]);

  const gameIcons: Record<GameKind, typeof Hand> = {
    swipe: Hand,
    tap: MousePointerClick,
    match: Target,
  };
  const gameTitles: Record<GameKind, string> = {
    swipe: t.quiz.gameSwipe,
    tap: t.quiz.gameTap,
    match: t.quiz.gameMatch,
  };
  const gameHints: Record<GameKind, string> = {
    swipe: t.quiz.gameSwipeHint,
    tap: t.quiz.gameTapHint,
    match: t.quiz.gameMatchHint,
  };
  const GameIcon = gameIcons[round.kind];

  return (
    <div className="mt-6">
      {/* Game header */}
      <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-card">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-deep-orange text-white">
            <Gamepad2 className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-base font-extrabold">{t.quiz.gameTitle}</h2>
            <p className="text-xs font-semibold text-muted">{t.quiz.gameSubtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-extrabold text-primary">
            <Trophy className="h-3.5 w-3.5" />
            {t.quiz.gameScore}: {score}
          </span>
          {streak > 1 && (
            <span className="flex items-center gap-1 rounded-full bg-deep-orange/10 px-3 py-1.5 text-xs font-extrabold text-deep-orange">
              <Flame className="h-3.5 w-3.5" />
              {streak}x {t.quiz.gameStreak}
            </span>
          )}
          <span className="text-xs font-bold text-muted">
            {roundIdx + 1}/{totalRounds}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-3 flex gap-1">
        {rounds.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              i < roundIdx ? "bg-success" : i === roundIdx ? "bg-primary" : "bg-border"
            )}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* INTRO phase */}
        {phase === "intro" && (
          <motion.div
            key={`intro-${roundIdx}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="mt-6 flex flex-col items-center gap-4 rounded-3xl border border-border bg-card p-10 text-center shadow-card"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.15 }}
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-deep-orange text-white"
            >
              <GameIcon className="h-8 w-8" />
            </motion.span>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                Game {roundIdx + 1} / {totalRounds}
              </p>
              <h3 className="mt-1 font-display text-xl font-extrabold">
                {gameTitles[round.kind]}
              </h3>
              <p className="mt-1 text-sm text-muted">{gameHints[round.kind]}</p>
            </div>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="rounded-full bg-primary/10 px-5 py-2 text-sm font-bold text-primary"
            >
              {pick(locale, round.question.question)}
            </motion.div>
          </motion.div>
        )}

        {/* PLAYING phase */}
        {phase === "playing" && (
          <motion.div
            key={`play-${roundIdx}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            {round.kind === "swipe" && (
              <SwipeGamePlay
                question={round.question}
                onResult={handleResult}
              />
            )}
            {round.kind === "tap" && (
              <TapGamePlay
                question={round.question}
                onResult={handleResult}
              />
            )}
            {round.kind === "match" && (
              <MatchGamePlay
                question={round.question}
                onResult={handleResult}
              />
            )}
          </motion.div>
        )}

        {/* FEEDBACK phase */}
        {phase === "feedback" && (
          <motion.div
            key={`fb-${roundIdx}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-6 flex flex-col items-center gap-4 rounded-3xl border p-10 text-center shadow-card"
            style={{
              borderColor: lastCorrect ? "var(--success)" : "var(--error)",
              backgroundColor: lastCorrect
                ? "color-mix(in srgb, var(--success) 5%, transparent)"
                : "color-mix(in srgb, var(--error) 5%, transparent)",
            }}
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className={cn(
                "flex h-16 w-16 items-center justify-center rounded-full text-white",
                lastCorrect ? "bg-success" : "bg-error"
              )}
            >
              {lastCorrect ? (
                <CheckCircle2 className="h-8 w-8" />
              ) : (
                <XCircle className="h-8 w-8" />
              )}
            </motion.span>
            <h3 className="font-display text-2xl font-extrabold">
              {lastCorrect ? t.quiz.gameCorrect : t.quiz.gameWrong}
            </h3>
            {round.question.explanation && (
              <p className="max-w-md text-sm leading-relaxed text-muted">
                {pick(locale, round.question.explanation)}
              </p>
            )}
            <Button onClick={nextRound} size="lg">
              {isLast ? t.quiz.gameFinish : t.quiz.gameNext}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to formal */}
      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-bold text-muted hover:text-primary"
        >
          {t.quiz.gameBackToQuiz}
        </button>
      </div>
    </div>
  );
}

/* ---- Swipe Game: drag right for true, left for false ---- */
function SwipeGamePlay({
  question,
  onResult,
}: {
  question: QuizQuestion;
  onResult: (correct: boolean) => void;
}) {
  const { locale } = useI18n();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-12, 12]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);
  const committed = useRef(false);

  // The "correct" option becomes the statement; user swipes right if it's true
  const correctOpt = question.options[question.correctIndex];
  const statement = pick(locale, correctOpt);
  // Randomly decide if we show the correct or a wrong statement
  const [showCorrect] = useState(() => Math.random() > 0.4);
  const displayStatement = showCorrect
    ? statement
    : pick(locale, question.options[(question.correctIndex + 1) % question.options.length]);
  const isTrueStatement = showCorrect;

  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      if (committed.current) return;
      const threshold = 100;
      if (info.offset.x > threshold) {
        committed.current = true;
        onResult(isTrueStatement);
      } else if (info.offset.x < -threshold) {
        committed.current = true;
        onResult(!isTrueStatement);
      }
    },
    [isTrueStatement, onResult]
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm font-bold text-muted">
        {pick(locale, question.question)}
      </p>
      <motion.div
        style={{ x, rotate, opacity }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.8}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.05 }}
        className="flex min-h-48 w-full max-w-sm cursor-grab flex-col items-center justify-center rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-gold/10 p-8 text-center shadow-card active:cursor-grabbing"
      >
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          Pernyataan
        </span>
        <span className="mt-3 text-lg font-bold leading-snug">
          {displayStatement}
        </span>
      </motion.div>
      <div className="flex items-center gap-6 text-xs font-bold text-muted">
        <span className="flex items-center gap-1 text-error">
          <ArrowLeft className="h-4 w-4" /> SALAH
        </span>
        <span className="flex items-center gap-1 text-success">
          BENAR <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}

/* ---- Tap Game: pick the correct option quickly ---- */
function TapGamePlay({
  question,
  onResult,
}: {
  question: QuizQuestion;
  onResult: (correct: boolean) => void;
}) {
  const { locale } = useI18n();
  const [picked, setPicked] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  const handlePick = useCallback(
    (idx: number) => {
      if (checked) return;
      setPicked(idx);
      setChecked(true);
      setTimeout(() => onResult(idx === question.correctIndex), 600);
    },
    [checked, question.correctIndex, onResult]
  );

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
      <p className="font-display text-base font-bold">
        {pick(locale, question.question)}
      </p>
      <div className="mt-5 grid gap-2.5">
        {question.options.map((opt, oi) => {
          const isPicked = picked === oi;
          const isCorrect = checked && oi === question.correctIndex;
          const isWrong = checked && isPicked && oi !== question.correctIndex;
          return (
            <motion.button
              key={oi}
              type="button"
              onClick={() => handlePick(oi)}
              whileHover={!checked ? { scale: 1.02 } : undefined}
              whileTap={!checked ? { scale: 0.97 } : undefined}
              className={cn(
                "flex items-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-left text-sm font-semibold transition-colors",
                isCorrect
                  ? "border-success bg-success/10 text-success"
                  : isWrong
                    ? "border-error bg-error/10 text-error"
                    : isPicked
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background hover:border-primary/40"
              )}
            >
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-extrabold",
                  isCorrect
                    ? "border-success bg-success text-white"
                    : isWrong
                      ? "border-error bg-error text-white"
                      : isPicked
                        ? "border-primary bg-primary text-white"
                        : "border-border text-muted"
                )}
              >
                {isCorrect ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : isWrong ? (
                  <XCircle className="h-4 w-4" />
                ) : (
                  String.fromCharCode(65 + oi)
                )}
              </span>
              {pick(locale, opt)}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* ---- Match Game: match question to correct answer ---- */
function MatchGamePlay({
  question,
  onResult,
}: {
  question: QuizQuestion;
  onResult: (correct: boolean) => void;
}) {
  const { locale } = useI18n();
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<string | null>(null);
  const doneRef = useRef(false);

  // Build pairs: question text -> correct answer, and decoy options
  const pairs = useMemo(() => {
    const correct = pick(locale, question.options[question.correctIndex]);
    const wrongs = question.options
      .filter((_, i) => i !== question.correctIndex)
      .slice(0, 2)
      .map((o) => pick(locale, o));
    const all = [correct, ...wrongs];
    // Shuffle
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    return {
      leftItems: [
        { id: "q", text: pick(locale, question.question) },
      ],
      rightItems: all.map((text, i) => ({
        id: `a${i}`,
        text,
        isCorrect: text === correct,
      })),
    };
  }, [question, locale]);

  const handleRight = useCallback(
    (id: string) => {
      if (doneRef.current || !selectedLeft) return;
      const item = pairs.rightItems.find((r) => r.id === id);
      if (!item) return;
      if (item.isCorrect) {
        setMatched(new Set([id]));
        doneRef.current = true;
        setTimeout(() => onResult(true), 800);
      } else {
        setWrongPair(id);
        setTimeout(() => {
          setWrongPair(null);
          setSelectedLeft(null);
        }, 600);
      }
    },
    [selectedLeft, pairs, onResult]
  );

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
      <p className="mb-4 text-center text-xs font-bold uppercase tracking-wider text-muted">
        {matched.size > 0 ? "1/1 cocok" : "Tap soal lalu tap jawaban"}
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left: question */}
        <div className="space-y-2.5">
          {pairs.leftItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedLeft(item.id)}
              className={cn(
                "w-full rounded-2xl border-2 px-4 py-3.5 text-left text-sm font-semibold transition-colors",
                selectedLeft === item.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background hover:border-primary/40"
              )}
            >
              {item.text}
            </button>
          ))}
        </div>
        {/* Right: options */}
        <div className="space-y-2.5">
          {pairs.rightItems.map((item) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => handleRight(item.id)}
              animate={
                wrongPair === item.id
                  ? { x: [0, -8, 8, -4, 4, 0] }
                  : matched.has(item.id)
                    ? { scale: [1, 1.05, 1] }
                    : {}
              }
              transition={{ duration: 0.4 }}
              className={cn(
                "w-full rounded-2xl border-2 px-4 py-3.5 text-left text-sm font-semibold transition-colors",
                matched.has(item.id)
                  ? "border-success bg-success/10 text-success"
                  : wrongPair === item.id
                    ? "border-error bg-error/10 text-error"
                    : "border-border bg-background hover:border-primary/40"
              )}
            >
              {item.text}
            </motion.button>
          ))}
        </div>
      </div>
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
  isModuleQuiz,
  moduleTitle,
  nextHref,
  questions,
}: {
  course: Course;
  score: number;
  passed: boolean;
  answers: Record<number, number>;
  onRetake: () => void;
  prevBest?: number;
  isModuleQuiz?: boolean;
  moduleTitle?: string;
  /** Where "continue" goes after passing a chapter quiz. */
  nextHref?: string;
  questions: typeof course.quiz;
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
        {isModuleQuiz && moduleTitle && (
          <p className="mt-1 text-xs font-bold text-muted">{moduleTitle}</p>
        )}

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
            {isModuleQuiz ? "+40 XP" : "+100 XP"}
          </p>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {passed ? (
            isModuleQuiz ? (
              // Chapter quiz: keep learning instead of a certificate
              <ButtonLink href={nextHref ?? `/courses/${course.id}`} size="lg">
                <ChevronRight className="h-5 w-5" />
                {t.quiz.modulePassedNext}
              </ButtonLink>
            ) : (
              <ButtonLink href={`/certificate/${course.id}`} size="lg">
                <Award className="h-5 w-5" />
                {t.quiz.getCertificate}
              </ButtonLink>
            )
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
          {questions.map((q, qi) => {
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
