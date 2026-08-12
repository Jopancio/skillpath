"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Check,
  CheckCircle2,
  GraduationCap,
  Lightbulb,
  Map,
  Sparkles,
} from "lucide-react";
import { useI18n, pick } from "@/lib/i18n";
import { useProgress } from "@/hooks/use-progress";
import { useCustomCourses } from "@/hooks/use-custom-courses";
import type { Course, QuizQuestion } from "@/data/types";
import type { ClarifyingQuestion, LearningPlan, LearningStyleResult } from "@/lib/ai-onboarding";
import {
  OnboardingStep,
  OptionCard,
} from "@/components/onboarding/OnboardingStep";
import { Slider } from "@/components/onboarding/Slider";
import { AmbitionSlider } from "@/components/onboarding/AmbitionSlider";
import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/components/ui/icon-map";
import { AIThinkingLoader } from "@/components/ui/AIThinkingLoader";
import { AICourseDialog } from "@/components/ui/AICourseDialog";
import { cn } from "@/lib/utils";

const TOTAL_STEPS = 12;

/** Wizard phases: regular steps, learning-style eval, then the AI coach takes over. */
type Phase = "steps" | "style" | "styleResult" | "evaluating" | "clarify" | "diagnostic" | "analyzing" | "result";

interface DiagnosticQuizState {
  courseId: string;
  courseTitle: string;
  questions: QuizQuestion[];
}

interface PlacementState {
  level: string;
  message: string;
  tips: string[];
  strengths: string[];
  scorePercent: number;
}

export default function OnboardingPage() {
  const router = useRouter();
  const { t, locale } = useI18n();
  const { hydrated, onboarded, userName, completeOnboarding, setPlacement } =
    useProgress();
  const { allCourses, addCourse, getCourseById } = useCustomCourses();

  const [step, setStep] = useState(0);
  // Lazily prefill the name from a previous session (localStorage)
  const [name, setName] = useState(userName);
  const [interests, setInterests] = useState<string[]>([]);
  const [reason, setReason] = useState("");
  const [knowledgeLevel, setKnowledgeLevel] = useState("");
  const [learningExp, setLearningExp] = useState("");
  const [dailyGoal, setDailyGoal] = useState<number>(10);
  // Personalization (steps 7-12). Sliders default to the middle (50),
  // ambition defaults to 5. Options default to "" (must pick).
  const [focusEnemy, setFocusEnemy] = useState("");
  const [workType, setWorkType] = useState<number>(50);
  const [memory, setMemory] = useState<number>(50);
  const [learningStyle, setLearningStyle] = useState<number>(50);
  const [graspMethod, setGraspMethod] = useState("");
  const [ambition, setAmbition] = useState<number>(5);

  // AI course generation dialog
  const [aiOpen, setAiOpen] = useState(false);

  // AI coach (post-wizard evaluation)
  const [phase, setPhase] = useState<Phase>("steps");
  const [clarifying, setClarifying] = useState<ClarifyingQuestion | null>(null);
  const [clarifyAnswer, setClarifyAnswer] = useState("");
  const [clarifications, setClarifications] = useState<
    { question: string; answer: string }[]
  >([]);
  const [quiz, setQuiz] = useState<DiagnosticQuizState | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [placement, setPlacementState] = useState<PlacementState | null>(null);
  const [plan, setPlan] = useState<LearningPlan | null>(null);
  const [styleResult, setStyleResult] = useState<LearningStyleResult | null>(null);
  const [coachError, setCoachError] = useState("");
  const [coachFinished, setCoachFinished] = useState(false);

  // Already onboarded users shouldn't repeat the wizard — but don't yank
  // them away while the AI coach phase is running (it persists onboarding).
  useEffect(() => {
    if (hydrated && onboarded && phase === "steps") {
      router.replace("/courses");
    }
  }, [hydrated, onboarded, router, phase]);

  if (!hydrated || (onboarded && phase === "steps")) {
    return (
      <div className="flex flex-1 items-center justify-center py-24 text-sm font-bold text-muted">
        {t.common.loading}
      </div>
    );
  }

  const ob = t.onboarding;
  const displayName = name.trim();
  const withName = (title: string) =>
    displayName ? `${displayName}, ${title}` : title;

  const canContinue =
    step === 0
      ? displayName.length > 0
      : step === 1
        ? interests.length > 0
        : step === 2
          ? reason !== ""
          : step === 3
            ? knowledgeLevel !== ""
            : step === 4
              ? learningExp !== ""
              : step === 5
                ? dailyGoal > 0
                : step === 6
                  ? focusEnemy !== ""
                  : step === 7
                    ? true // workType slider — always valid
                    : step === 8
                      ? true // memory slider — always valid
                      : step === 9
                        ? true // learningStyle slider — always valid
                        : step === 10
                          ? graspMethod !== ""
                          : ambition >= 1; // step 11 — always valid

  const toggleInterest = (id: string) =>
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  const profilePayload = () => ({
    name: name.trim() || undefined,
    reason: reason || undefined,
    knowledgeLevel: knowledgeLevel || undefined,
    learningExp: learningExp || undefined,
    dailyGoalMinutes: dailyGoal,
    focusEnemy: focusEnemy || undefined,
    workType,
    memory,
    learningStyle,
    graspMethod: graspMethod || undefined,
    ambition,
  });

  /** Save onboarding answers (idempotent) */
  const persistOnboarding = () => {
    completeOnboarding({
      name: displayName,
      interests,
      reason,
      knowledgeLevel,
      learningExp,
      dailyGoalMinutes: dailyGoal,
      focusEnemy,
      workType,
      memory,
      learningStyle,
      graspMethod,
      ambition,
    });
  };

  /** Final redirect target: course picked by AI, else first interest */
  const targetCourseId = (aiPicked?: string) => {
    if (aiPicked && getCourseById(aiPicked)) return aiPicked;
    return interests[0] ?? allCourses[0].id;
  };

  /** Skip everything and go straight to learning */
  const goStraightToCourse = () => {
    persistOnboarding();
    router.push(`/courses/${targetCourseId()}`);
  };

  /* ------------------------- AI coach flow ------------------------- */

  async function startEvaluation(extraClarifications: typeof clarifications) {
    setPhase("evaluating");
    setCoachError("");
    try {
      const res = await fetch("/api/onboarding-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stage: "evaluate",
          profile: profilePayload(),
          courses: interests
            .map((id) => getCourseById(id))
            .filter((c): c is Course => !!c)
            .map((c) => ({ id: c.id, title: pick(locale, c.title) })),
          clarifications: extraClarifications,
        }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      const data = await res.json();

      if (data?.type === "clarify" && data.question) {
        setClarifying(data.question as ClarifyingQuestion);
        setClarifyAnswer("");
        setPhase("clarify");
        return;
      }
      if (data?.type === "ok" && data.quiz) {
        setQuiz(data.quiz as DiagnosticQuizState);
        setPlan((data.plan as LearningPlan) ?? null);
        setQuizAnswers({});
        setPhase("diagnostic");
        return;
      }
      throw new Error("unexpected response");
    } catch {
      setCoachError(t.onboarding.coach.error);
      setPhase("evaluating"); // stay, show error + retry
    }
  }

  function submitClarification() {
    if (!clarifying || !clarifyAnswer) return;
    const updated = [
      ...clarifications,
      { question: clarifying.question, answer: clarifyAnswer },
    ];
    setClarifications(updated);
    setClarifying(null);
    startEvaluation(updated);
  }

  async function submitDiagnostic() {
    if (!quiz) return;
    const total = quiz.questions.length;
    const correct = quiz.questions.filter(
      (q, i) => quizAnswers[i] === q.correctIndex
    ).length;
    setPhase("analyzing");
    setCoachError("");
    try {
      const res = await fetch("/api/onboarding-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stage: "result",
          profile: profilePayload(),
          courseTitle: quiz.courseTitle,
          correct,
          total,
          answers: quiz.questions.map((q, i) => ({
            question: pick(locale, q.question),
            correct: quizAnswers[i] === q.correctIndex,
          })),
        }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      const data = await res.json();
      const result: PlacementState = {
        level: String(data?.level ?? "beginner"),
        message: String(data?.message ?? ""),
        tips: Array.isArray(data?.tips) ? data.tips.map(String) : [],
        strengths: Array.isArray(data?.strengths)
          ? data.strengths.map(String)
          : [],
        scorePercent: Math.round((correct / total) * 100),
      };
      setPlacementState(result);
      setPhase("result");

      // Persist everything now
      persistOnboarding();
      setPlacement({
        level: result.level,
        message: result.message,
        tips: result.tips,
        strengths: result.strengths,
        scorePercent: result.scorePercent,
        date: new Date().toISOString().slice(0, 10),
      });
      setCoachFinished(true);
    } catch {
      setCoachError(t.onboarding.coach.error);
      setPhase("analyzing"); // stay, show error + retry
    }
  }

  /* ------------------- Learning style evaluation ------------------- */

  /** Dipanggil saat user selesai 12 pertanyaan. AI evaluasi gaya belajar
   *  dulu, lalu user lanjut ke quiz diagnostik. */
  async function startStyleEvaluation() {
    setPhase("style");
    setCoachError("");
    try {
      const res = await fetch("/api/onboarding-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stage: "style",
          profile: profilePayload(),
          courses: interests
            .map((id) => getCourseById(id))
            .filter((c): c is Course => !!c)
            .map((c) => ({ id: c.id, title: pick(locale, c.title) })),
        }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      const data = await res.json();
      setStyleResult(data as LearningStyleResult);
      setPhase("styleResult");
    } catch {
      setCoachError(t.onboarding.coach.error);
      setPhase("style"); // stay, show retry
    }
  }

  /** Lanjut dari hasil gaya belajar ke quiz diagnostik. */
  const continueFromStyle = () => startEvaluation([]);

  const finish = () => {
    // Mulai dengan evaluasi gaya belajar, bukan langsung quiz.
    startStyleEvaluation();
  };

  const finishToCourse = () => {
    if (!coachFinished) persistOnboarding();
    router.push(`/courses/${targetCourseId(quiz?.courseId)}`);
  };

  const next = () => {
    if (step === TOTAL_STEPS - 1) finish();
    else setStep((s) => s + 1);
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  const selectedGoal = ob.goalOptions.find((g) => g.minutes === dailyGoal);
  const firstInterest = allCourses.find((c) => c.id === interests[0]);
  const coach = t.onboarding.coach;

  /* ===================== AI coach phases render ===================== */
  if (phase !== "steps") {
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-10 md:py-14">
        <AnimatePresence mode="wait">
          {/* ---- Learning style: analyzing (loading) ---- */}
          {phase === "style" && (
            <motion.div
              key="style-loading"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="flex flex-1 flex-col items-center justify-center"
            >
              <AIThinkingLoader
                title={coach.styleAnalyzing}
                description={coach.styleAnalyzingDesc}
                height={280}
              />
              {coachError && (
                <div className="mt-8 w-full max-w-sm">
                  <p className="rounded-xl bg-error/10 px-4 py-3 text-xs font-bold text-error">
                    {coachError}
                  </p>
                  <div className="mt-4 flex justify-center gap-3">
                    <Button onClick={startStyleEvaluation}>
                      {t.common.retry}
                    </Button>
                    <Button variant="ghost" onClick={continueFromStyle}>
                      {coach.styleSkip}
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ---- Learning style: result card ---- */}
          {phase === "styleResult" && styleResult && (
            <motion.div
              key="style-result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="mx-auto w-full max-w-xl"
            >
              <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-card">
                <motion.span
                  initial={{ scale: 0, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.1 }}
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary via-deep-orange to-gold text-4xl shadow-glow"
                >
                  {styleResult.styleEmoji}
                </motion.span>

                <p className="mt-5 text-xs font-bold uppercase tracking-wide text-muted">
                  {coach.styleTypeLabel}
                </p>
                <h2 className="mt-1 font-display text-2xl font-extrabold gradient-text md:text-3xl">
                  {styleResult.styleType}
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-foreground/90">
                  {styleResult.summary}
                </p>

                {/* Traits */}
                {styleResult.traits.length > 0 && (
                  <div className="mt-6 text-left">
                    <h3 className="flex items-center gap-2 font-display text-sm font-extrabold">
                      <Sparkles className="h-4 w-4 text-primary" />
                      {coach.styleTraitsLabel}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {styleResult.traits.map((tr, i) => (
                        <motion.span
                          key={`${tr}-${i}`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 + i * 0.06 }}
                          className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary"
                        >
                          {tr}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Adaptations */}
                {styleResult.adaptations.length > 0 && (
                  <div className="mt-5 text-left">
                    <h3 className="flex items-center gap-2 font-display text-sm font-extrabold">
                      <Check className="h-4 w-4 text-success" />
                      {coach.styleAdaptLabel}
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {styleResult.adaptations.map((a, i) => (
                        <motion.li
                          key={`${a}-${i}`}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + i * 0.06 }}
                          className="flex items-start gap-2 text-sm leading-relaxed text-muted"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                          {a}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Challenges */}
                {styleResult.challenges.length > 0 && (
                  <div className="mt-5 text-left">
                    <h3 className="flex items-center gap-2 font-display text-sm font-extrabold">
                      <Lightbulb className="h-4 w-4 text-amber-400" />
                      {coach.styleChallengesLabel}
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {styleResult.challenges.map((c, i) => (
                        <motion.li
                          key={`${c}-${i}`}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.25 + i * 0.06 }}
                          className="flex items-start gap-2 text-sm leading-relaxed text-muted"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                          {c}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <Button
                size="lg"
                className="mt-6 w-full"
                onClick={continueFromStyle}
              >
                {coach.styleContinue}
                <ArrowRight className="h-5 w-5" />
              </Button>
              <button
                type="button"
                onClick={goStraightToCourse}
                className="mt-3 block w-full text-center text-xs font-semibold text-muted transition-colors hover:text-foreground"
              >
                {coach.skipToCourse}
              </button>
            </motion.div>
          )}

          {/* ---- Evaluating / Analyzing (loading states) ---- */}
          {(phase === "evaluating" || phase === "analyzing") && (
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="flex flex-1 flex-col items-center justify-center"
            >
              <AIThinkingLoader
                title={
                  phase === "evaluating" ? coach.evaluating : coach.analyzing
                }
                description={coach.evaluatingDesc}
                height={280}
              />

              {coachError && (
                <div className="mt-8 w-full max-w-sm">
                  <p className="rounded-xl bg-error/10 px-4 py-3 text-xs font-bold text-error">
                    {coachError}
                  </p>
                  <div className="mt-4 flex justify-center gap-3">
                    <Button
                      onClick={() =>
                        phase === "evaluating"
                          ? startEvaluation(clarifications)
                          : submitDiagnostic()
                      }
                    >
                      {t.common.retry}
                    </Button>
                    <Button variant="ghost" onClick={goStraightToCourse}>
                      {coach.skipToCourse}
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ---- Clarifying question from the AI ---- */}
          {phase === "clarify" && clarifying && (
            <OnboardingStep key="clarify" title={coach.clarifyTitle}>
              <div className="mx-auto max-w-md">
                <p className="rounded-2xl border border-secondary/30 bg-secondary/10 px-5 py-4 text-center font-display text-base font-bold text-secondary">
                  {clarifying.question}
                </p>
                <div className="mt-5 space-y-3">
                  {clarifying.options.map((opt) => (
                    <OptionCard
                      key={opt}
                      label={opt}
                      selected={clarifyAnswer === opt}
                      onClick={() => setClarifyAnswer(opt)}
                    />
                  ))}
                </div>
                <Button
                  size="lg"
                  className="mt-6 w-full"
                  disabled={!clarifyAnswer}
                  onClick={submitClarification}
                >
                  {coach.clarifySubmit}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </OnboardingStep>
          )}

          {/* ---- Diagnostic quiz ---- */}
          {phase === "diagnostic" && quiz && (
            <OnboardingStep
              key="diagnostic"
              title={coach.quizTitle}
              description={coach.quizDesc}
            >
              <div className="mx-auto max-w-xl space-y-6">
                {quiz.questions.map((q, qi) => (
                  <div
                    key={q.id}
                    className="rounded-2xl border border-border bg-card p-5 shadow-card"
                  >
                    <p className="font-display text-sm font-bold">
                      <span className="mr-2 text-primary">
                        {coach.question} {qi + 1}
                      </span>
                      {pick(locale, q.question)}
                    </p>
                    <div className="mt-4 grid gap-2">
                      {q.options.map((opt, oi) => {
                        const selected = quizAnswers[qi] === oi;
                        return (
                          <button
                            key={oi}
                            type="button"
                            onClick={() =>
                              setQuizAnswers((a) => ({ ...a, [qi]: oi }))
                            }
                            aria-pressed={selected}
                            className={cn(
                              "flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold transition-all",
                              selected
                                ? "border-primary bg-primary/10 text-foreground"
                                : "border-border bg-background text-muted hover:border-primary/50 hover:text-foreground"
                            )}
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
                  </div>
                ))}

                <Button
                  size="lg"
                  className="w-full"
                  disabled={
                    Object.keys(quizAnswers).length !== quiz.questions.length
                  }
                  onClick={submitDiagnostic}
                >
                  {coach.submitQuiz}
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <p className="text-center text-xs font-semibold text-muted">
                  {Object.keys(quizAnswers).length}/{quiz.questions.length}
                </p>
              </div>
            </OnboardingStep>
          )}

          {/* ---- Result ---- */}
          {phase === "result" && placement && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="mx-auto w-full max-w-xl"
            >
              <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-card">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.15 }}
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-soft"
                >
                  <Award className="h-10 w-10" />
                </motion.span>

                <div className="mx-auto mt-6 grid max-w-xs grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-border bg-background p-4">
                    <div className="font-display text-2xl font-extrabold text-primary">
                      {t.common[
                        placement.level as "beginner" | "intermediate" | "advanced"
                      ] ?? placement.level}
                    </div>
                    <div className="text-xs font-bold text-muted">
                      {coach.levelLabel}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border bg-background p-4">
                    <div className="font-display text-2xl font-extrabold text-secondary">
                      {placement.scorePercent}%
                    </div>
                    <div className="text-xs font-bold text-muted">
                      {coach.yourScore}
                    </div>
                  </div>
                </div>

                <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-foreground/90">
                  {placement.message}
                </p>
              </div>

              {/* ===== Learning plan from AI ===== */}
              {plan && (plan.steps.length > 0 || plan.overview) && (
                <div className="mt-5 rounded-2xl border border-border bg-card p-5 text-left shadow-card">
                  <h3 className="flex items-center gap-2 font-display text-sm font-extrabold">
                    <Map className="h-4 w-4 text-primary" />
                    {coach.planTitle}
                  </h3>
                  {plan.overview && (
                    <p className="mt-2 text-xs leading-relaxed text-muted">
                      {plan.overview}
                    </p>
                  )}

                  {/* Flow diagram: vertical step connector */}
                  {plan.steps.length > 0 && (
                    <div className="mt-5">
                      {plan.steps.map((s, i) => (
                        <div key={`${s.title}-${i}`} className="flex gap-4">
                          {/* Node + connector */}
                          <div className="flex flex-col items-center">
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.1 + i * 0.08, type: "spring" }}
                              className={cn(
                                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-xs font-extrabold text-white",
                                i === plan.steps.length - 1
                                  ? "bg-gradient-to-br from-accent-2 to-accent"
                                  : "bg-gradient-to-br from-primary to-secondary"
                              )}
                            >
                              {i === plan.steps.length - 1 ? (
                                <Award className="h-4 w-4" />
                              ) : (
                                i + 1
                              )}
                            </motion.span>
                            {i < plan.steps.length - 1 && (
                              <span
                                className="my-1 w-0.5 flex-1 rounded-full bg-border"
                                aria-hidden
                              />
                            )}
                          </div>
                          {/* Content */}
                          <motion.div
                            initial={{ opacity: 0, x: 12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.12 + i * 0.08 }}
                            className={cn(
                              "pb-5",
                              i === plan.steps.length - 1 && "pb-0"
                            )}
                          >
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-display text-sm font-bold">
                                {s.title}
                              </span>
                              {s.duration && (
                                <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-[10px] font-extrabold text-secondary">
                                  {s.duration}
                                </span>
                              )}
                            </div>
                            {s.description && (
                              <p className="mt-1 text-xs leading-relaxed text-muted">
                                {s.description}
                              </p>
                            )}
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Materials */}
                  {plan.materials.length > 0 && (
                    <div className="mt-5 border-t border-border pt-4">
                      <h4 className="flex items-center gap-2 text-xs font-extrabold text-foreground">
                        <BookOpen className="h-3.5 w-3.5 text-accent-2" />
                        {coach.materialsTitle}
                      </h4>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {plan.materials.map((m) => (
                          <span
                            key={m}
                            className="rounded-full bg-accent/20 px-3 py-1 text-[11px] font-bold text-amber-400"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {placement.strengths.length > 0 && (
                <div className="mt-5 rounded-2xl border border-border bg-card p-5 shadow-card">
                  <h3 className="flex items-center gap-2 font-display text-sm font-extrabold">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    {coach.strengths}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {placement.strengths.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-success/10 px-3 py-1.5 text-xs font-bold text-success"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {placement.tips.length > 0 && (
                <div className="mt-5 rounded-2xl border border-border bg-card p-5 shadow-card">
                  <h3 className="flex items-center gap-2 font-display text-sm font-extrabold">
                    <Lightbulb className="h-4 w-4 text-amber-400" />
                    {coach.tips}
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {placement.tips.map((tip) => (
                      <li
                        key={tip}
                        className="flex items-start gap-2 text-sm leading-relaxed text-muted"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button size="lg" className="mt-8 w-full" onClick={finishToCourse}>
                {coach.continueToCourse}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-8 md:py-12">
      {/* ===== Top bar: progress + skip ===== */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between text-xs font-bold text-muted">
            <span>
              {ob.step} {step + 1} {ob.of} {TOTAL_STEPS}
            </span>
            <span>{Math.round(((step + 1) / TOTAL_STEPS) * 100)}%</span>
          </div>
          <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-border">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={false}
              animate={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => router.push("/courses")}
          className="shrink-0 rounded-full px-3 py-1.5 text-xs font-bold text-muted transition-colors hover:bg-card hover:text-foreground"
        >
          {ob.skip}
        </button>
      </div>

      {/* ===== Steps ===== */}
      <div className="flex flex-1 items-center py-10">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <OnboardingStep key="step-0" title={ob.welcome} description={ob.welcomeDesc}>
              <div className="mx-auto max-w-sm">
                <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-primary to-secondary shadow-soft">
                  <GraduationCap className="h-10 w-10 text-white" strokeWidth={1.5} />
                </span>
                <label
                  htmlFor="onboarding-name"
                  className="mt-8 block text-center text-sm font-bold"
                >
                  {ob.nameLabel}
                </label>
                <input
                  id="onboarding-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={ob.namePlaceholder}
                  autoComplete="name"
                  maxLength={40}
                  className="mt-3 w-full rounded-2xl border-2 border-border bg-card px-5 py-4 text-center font-display text-lg font-bold outline-none transition-colors placeholder:font-sans placeholder:text-sm placeholder:font-normal placeholder:text-muted focus:border-primary"
                />
              </div>
            </OnboardingStep>
          )}

          {step === 1 && (
            <OnboardingStep
              key="step-1"
              title={withName(ob.interestTitle)}
              description={ob.interestDesc}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {allCourses.map((c) => {
                  const selected = interests.includes(c.id);
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => toggleInterest(c.id)}
                      aria-pressed={selected}
                      className={cn(
                        "btn-3d flex items-center gap-3 rounded-2xl border-2 bg-card px-4 py-3.5 text-left transition-colors",
                        selected
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/60"
                      )}
                    >
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white"
                        style={{ backgroundColor: c.color }}
                      >
                        <DynamicIcon name={c.icon} className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1 truncate font-display text-sm font-bold">
                        {pick(locale, c.title)}
                      </span>
                      <span
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                          selected ? "border-primary bg-primary" : "border-border"
                        )}
                        aria-hidden
                      >
                        {selected && <Check className="h-3 w-3 text-white" />}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Add with AI */}
              <div className="mt-6 flex flex-col items-center gap-2">
                <p className="text-sm font-semibold text-muted">{ob.aiCta}</p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setAiOpen(true)}
                >
                  <Sparkles className="h-4 w-4 text-accent-2" />
                  {ob.aiCtaButton}
                </Button>
              </div>
            </OnboardingStep>
          )}

          {step === 2 && (
            <OnboardingStep
              key="step-2"
              title={withName(ob.reasonTitle)}
              description={ob.reasonDesc}
            >
              <div className="mx-auto max-w-md space-y-3">
                {ob.reasons.map((r) => (
                  <OptionCard
                    key={r.id}
                    emoji={r.emoji}
                    label={r.label}
                    selected={reason === r.id}
                    onClick={() => setReason(r.id)}
                  />
                ))}
              </div>
            </OnboardingStep>
          )}

          {step === 3 && (
            <OnboardingStep
              key="step-3"
              title={
                firstInterest
                  ? ob.knowledgeTitleFor.replace(
                      "{topic}",
                      pick(locale, firstInterest.title)
                    )
                  : ob.knowledgeTitle
              }
              description={
                firstInterest
                  ? ob.knowledgeDescFor[firstInterest.difficulty]
                  : ob.knowledgeDesc
              }
            >
              <div className="mx-auto max-w-md space-y-3">
                {firstInterest && (
                  <div className="mb-4 flex items-center justify-center gap-2">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-sm"
                      style={{ backgroundColor: firstInterest.color }}
                    >
                      <DynamicIcon name={firstInterest.icon} className="h-4.5 w-4.5" />
                    </span>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-extrabold text-primary">
                      {t.common[firstInterest.difficulty]}
                    </span>
                  </div>
                )}
                {ob.knowledgeOptions.map((k) => (
                  <OptionCard
                    key={k.id}
                    emoji={k.emoji}
                    label={k.label}
                    selected={knowledgeLevel === k.id}
                    onClick={() => setKnowledgeLevel(k.id)}
                  />
                ))}
              </div>
            </OnboardingStep>
          )}

          {step === 4 && (
            <OnboardingStep
              key="step-4"
              title={ob.expTitle}
              description={ob.expDesc}
            >
              <div className="mx-auto max-w-md space-y-3">
                {ob.expOptions.map((e) => (
                  <OptionCard
                    key={e.id}
                    emoji={e.emoji}
                    label={e.label}
                    selected={learningExp === e.id}
                    onClick={() => setLearningExp(e.id)}
                  />
                ))}
              </div>
            </OnboardingStep>
          )}

          {step === 5 && (
            <OnboardingStep key="step-5" title={ob.goalTitle} description={ob.goalDesc}>
              <div className="mx-auto max-w-md space-y-3">
                {ob.goalOptions.map((g) => (
                  <OptionCard
                    key={g.minutes}
                    emoji="⏱️"
                    label={g.label}
                    description={g.desc}
                    selected={dailyGoal === g.minutes}
                    onClick={() => setDailyGoal(g.minutes)}
                  />
                ))}
              </div>
            </OnboardingStep>
          )}

          {/* Step 7: Biggest focus enemy */}
          {step === 6 && (
            <OnboardingStep
              key="step-6"
              title={ob.focusEnemyTitle}
              description={ob.focusEnemyDesc}
            >
              <div className="mx-auto max-w-md space-y-3">
                {ob.focusEnemyOptions.map((o) => (
                  <OptionCard
                    key={o.id}
                    emoji={o.emoji}
                    label={o.label}
                    selected={focusEnemy === o.id}
                    onClick={() => setFocusEnemy(o.id)}
                  />
                ))}
              </div>
            </OnboardingStep>
          )}

          {/* Step 8: Work type slider */}
          {step === 7 && (
            <OnboardingStep
              key="step-7"
              title={ob.workTypeTitle}
              description={ob.workTypeDesc}
            >
              <Slider
                value={workType}
                onChange={setWorkType}
                leftLabel={ob.workTypeLeft}
                rightLabel={ob.workTypeRight}
                leftEmoji="⚡"
                rightEmoji="🎯"
                centerEmojis={[
                  { max: 25, emoji: "🏃" },
                  { max: 50, emoji: "🤹" },
                  { max: 75, emoji: "🤝" },
                  { max: 100, emoji: "🎯" },
                ]}
              />
            </OnboardingStep>
          )}

          {/* Step 9: Memory weakness slider */}
          {step === 8 && (
            <OnboardingStep
              key="step-8"
              title={ob.memoryTitle}
              description={ob.memoryDesc}
            >
              <Slider
                value={memory}
                onChange={setMemory}
                leftLabel={ob.memoryLeft}
                rightLabel={ob.memoryRight}
                leftEmoji="🔍"
                rightEmoji="🧩"
                centerEmojis={[
                  { max: 25, emoji: "📋" },
                  { max: 50, emoji: "📝" },
                  { max: 75, emoji: "🧠" },
                  { max: 100, emoji: "🧩" },
                ]}
              />
            </OnboardingStep>
          )}

          {/* Step 10: Learning style slider */}
          {step === 9 && (
            <OnboardingStep
              key="step-9"
              title={ob.styleTitle}
              description={ob.styleDesc}
            >
              <Slider
                value={learningStyle}
                onChange={setLearningStyle}
                leftLabel={ob.styleLeft}
                rightLabel={ob.styleRight}
                leftEmoji="📖"
                rightEmoji="🛠️"
                centerEmojis={[
                  { max: 25, emoji: "📖" },
                  { max: 50, emoji: "👀" },
                  { max: 75, emoji: "👂" },
                  { max: 100, emoji: "🛠️" },
                ]}
              />
            </OnboardingStep>
          )}

          {/* Step 11: Fastest way to grasp complex material */}
          {step === 10 && (
            <OnboardingStep
              key="step-10"
              title={ob.graspTitle}
              description={ob.graspDesc}
            >
              <div className="mx-auto max-w-md space-y-3">
                {ob.graspOptions.map((o) => (
                  <OptionCard
                    key={o.id}
                    emoji={o.emoji}
                    label={o.label}
                    selected={graspMethod === o.id}
                    onClick={() => setGraspMethod(o.id)}
                  />
                ))}
              </div>
            </OnboardingStep>
          )}

          {/* Step 12: Ambition + summary */}
          {step === 11 && (
            <OnboardingStep
              key="step-11"
              title={ob.ambitionTitle}
              description={ob.ambitionDesc}
            >
              <AmbitionSlider
                value={ambition}
                onChange={setAmbition}
                labels={ob.ambitionLabels}
              />

              {/* Summary */}
              <div className="mx-auto mt-8 max-w-md rounded-2xl border border-dashed border-border bg-card/70 p-5">
                <p className="text-xs font-bold text-muted">{ob.summary}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm font-bold">
                  {firstInterest && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-primary-hover">
                      <DynamicIcon name={firstInterest.icon} className="h-4 w-4" />
                      {pick(locale, firstInterest.title)}
                      {interests.length > 1 && ` +${interests.length - 1}`}
                    </span>
                  )}
                  {selectedGoal && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/25 px-3 py-1.5 text-amber-400">
                      ⏱️ {selectedGoal.minutes} {ob.summaryMinutes}
                    </span>
                  )}
                  {reason && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1.5 text-secondary">
                      {ob.reasons.find((r) => r.id === reason)?.emoji}{" "}
                      {ob.reasons.find((r) => r.id === reason)?.label}
                    </span>
                  )}
                  {learningExp && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-2/10 px-3 py-1.5 text-accent-2">
                      {ob.expOptions.find((e) => e.id === learningExp)?.emoji}{" "}
                      {ob.expOptions.find((e) => e.id === learningExp)?.label}
                    </span>
                  )}
                  {focusEnemy && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-error/10 px-3 py-1.5 text-error">
                      {ob.focusEnemyOptions.find((o) => o.id === focusEnemy)?.emoji}{" "}
                      {ob.focusEnemyOptions.find((o) => o.id === focusEnemy)?.label}
                    </span>
                  )}
                  {graspMethod && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-primary">
                      {ob.graspOptions.find((o) => o.id === graspMethod)?.emoji}{" "}
                      {ob.graspOptions.find((o) => o.id === graspMethod)?.label}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1.5 text-gold">
                    🚀 {ambition}/10
                  </span>
                </div>
              </div>
            </OnboardingStep>
          )}
        </AnimatePresence>
      </div>

      {/* ===== Bottom navigation ===== */}
      <div className="flex items-center justify-between gap-3 border-t border-border pt-5">
        <Button
          variant="ghost"
          onClick={back}
          disabled={step === 0}
          className={cn(step === 0 && "invisible")}
        >
          <ArrowLeft className="h-4 w-4" />
          {t.common.back}
        </Button>
        <Button size="lg" onClick={next} disabled={!canContinue}>
          {step === TOTAL_STEPS - 1 ? ob.start : t.common.next}
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>

      {/* ===== AI course dialog ===== */}
      <AICourseDialog
        open={aiOpen}
        onClose={() => setAiOpen(false)}
        onCreated={(course) => {
          addCourse(course);
          setInterests((prev) => [...prev, course.id]);
          setAiOpen(false);
        }}
        profile={{
          name: name.trim() || undefined,
          reason: reason || undefined,
          knowledgeLevel: knowledgeLevel || undefined,
          learningExp: learningExp || undefined,
          dailyGoalMinutes: dailyGoal,
          focusEnemy: focusEnemy || undefined,
          workType,
          memory,
          learningStyle,
          graspMethod: graspMethod || undefined,
          ambition,
        }}
      />
    </div>
  );
}
