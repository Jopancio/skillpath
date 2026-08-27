"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import {
  MotionConfig,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Flame,
  GraduationCap,
  Lock,
  Medal,
  PlayCircle,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import { useI18n, pick } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { useProgress } from "@/hooks/use-progress";
import { useCustomCourses } from "@/hooks/use-custom-courses";
import { useBadges, type BadgeWithStatus } from "@/hooks/use-badges";
import { useLeaderboard, type LeaderboardEntry } from "@/hooks/use-leaderboard";
import { courseLessonIds, isCourseComplete } from "@/data/courses";
import { courseStats } from "@/data/types";
import type { Course } from "@/data/types";
import { ProgressBar } from "@/components/ui/progress-bar";
import { ButtonLink } from "@/components/ui/button";
import { DynamicIcon } from "@/components/ui/icon-map";
import { cn, todayKey } from "@/lib/utils";

/* One shared entrance vocabulary instead of scattered per-element delays. */
const groupVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

type CourseStatus = "quiz-ready" | "in-progress" | "not-started" | "certified";

interface MyCourseInfo {
  course: Course;
  lessonIds: string[];
  done: number;
  pct: number;
  status: CourseStatus;
}

/** What needs attention first: ready quizzes, then active work, then fresh picks, finished last. */
const STATUS_WEIGHT: Record<CourseStatus, number> = {
  "quiz-ready": 0,
  "in-progress": 1,
  "not-started": 2,
  certified: 3,
};

export default function DashboardPage() {
  const { t, locale } = useI18n();
  const { user } = useAuth();
  const {
    xp,
    streak,
    level,
    levelProgress,
    completedLessons,
    lessonsCompletedCount,
    quizResults,
    hydrated,
    userName,
    onboarding,
    lastActive,
  } = useProgress();
  const { allCourses } = useCustomCourses();
  const badges = useBadges();
  const { entries: boardEntries, hydrated: boardHydrated } = useLeaderboard();

  // All courses the user picked during onboarding (even not started yet),
  // plus any other course they have already begun.
  const myCourses = useMemo(() => {
    const pickedIds = onboarding?.interests ?? [];
    const picked = pickedIds
      .map((id) => allCourses.find((c) => c.id === id))
      .filter((c): c is Course => c !== undefined);
    const extraStarted = allCourses.filter(
      (c) =>
        !pickedIds.includes(c.id) &&
        courseLessonIds(c).some((id) => completedLessons.has(id))
    );
    return [...picked, ...extraStarted];
  }, [allCourses, onboarding, completedLessons]);

  const myCoursesInfo = useMemo<MyCourseInfo[]>(
    () =>
      myCourses.map((course) => {
        const lessonIds = courseLessonIds(course);
        const done = lessonIds.filter((id) => completedLessons.has(id)).length;
        const total = Math.max(lessonIds.length, 1);
        const pct = Math.round((done / total) * 100);
        const complete = isCourseComplete(course, completedLessons);
        const quizPassed = quizResults[course.id]?.passed ?? false;
        const status: CourseStatus = complete
          ? quizPassed
            ? "certified"
            : "quiz-ready"
          : done > 0
            ? "in-progress"
            : "not-started";
        return { course, lessonIds, done, pct, status };
      }),
    [myCourses, completedLessons, quizResults]
  );

  const sortedCourses = useMemo(
    () =>
      [...myCoursesInfo].sort((a, b) => {
        const byWeight = STATUS_WEIGHT[a.status] - STATUS_WEIGHT[b.status];
        if (byWeight !== 0) return byWeight;
        if (a.status === "in-progress") return b.pct - a.pct;
        return 0;
      }),
    [myCoursesInfo]
  );

  // THE single next action: resume the most recently touched course, else the
  // first course waiting for its final quiz, else the first untouched pick.
  const spotlight = useMemo(() => {
    if (!hydrated) return null;
    const inProgress = myCoursesInfo.filter((c) => c.status === "in-progress");
    let target: MyCourseInfo | undefined;
    if (inProgress.length > 0) {
      // Sets preserve insertion order -> reverse walk finds the latest touch.
      const recent = [...completedLessons];
      for (let i = recent.length - 1; i >= 0; i--) {
        target = inProgress.find((c) => c.lessonIds.includes(recent[i]));
        if (target) break;
      }
      target = target ?? inProgress.find((c) => c.done > 0) ?? inProgress[0];
    } else {
      target =
        myCoursesInfo.find((c) => c.status === "quiz-ready") ??
        sortedCourses.find((c) => c.status === "not-started");
    }
    if (!target) return null;
    const nextId = target.lessonIds.find((id) => !completedLessons.has(id));
    const nextLesson = nextId
      ? target.course.modules
          .flatMap((m) => m.lessons)
          .find((l) => l.id === nextId)
      : undefined;
    return {
      info: target,
      kind: nextId ? ("learn" as const) : ("quiz" as const),
      nextId,
      nextMinutes: nextLesson?.duration,
    };
  }, [hydrated, myCoursesInfo, sortedCourses, completedLessons]);

  // Only nudged when the persisted last-active day is not today; evaluated
  // strictly after hydration so SSR never touches the clock.
  const streakAtRisk =
    hydrated && streak > 0 && lastActive !== "" && lastActive !== todayKey();

  // Nearest achievable badge, mirroring the thresholds in use-badges.ts.
  const nextBadge = useMemo(() => {
    if (!hydrated) return null;
    const earnedIds = new Set(badges.filter((b) => b.earned).map((b) => b.id));
    const candidates = [
      { badgeId: "first-steps", cur: lessonsCompletedCount, goal: 1, unit: "lessons" as const },
      { badgeId: "streak-3", cur: streak, goal: 3, unit: "days" as const },
      { badgeId: "streak-7", cur: streak, goal: 7, unit: "days" as const },
      { badgeId: "bookworm", cur: lessonsCompletedCount, goal: 10, unit: "lessons" as const },
      { badgeId: "scholar", cur: lessonsCompletedCount, goal: 25, unit: "lessons" as const },
      { badgeId: "xp-500", cur: xp, goal: 500, unit: "xp" as const },
      { badgeId: "xp-1000", cur: xp, goal: 1000, unit: "xp" as const },
    ].filter((c) => !earnedIds.has(c.badgeId));
    if (candidates.length === 0) return null;
    const nearest = candidates.reduce((a, b) =>
      b.goal - b.cur < a.goal - a.cur ? b : a
    );
    const badge = badges.find((b) => b.id === nearest.badgeId);
    if (!badge) return null;
    return { badge, cur: nearest.cur, goal: nearest.goal, unit: nearest.unit };
  }, [badges, hydrated, xp, streak, lessonsCompletedCount]);

  const earnedBadges = badges.filter((b) => b.earned);
  const lockedBadges = badges.filter((b) => !b.earned);
  const selfEntry = boardEntries.find((e) => e.isCurrentUser);

  const goalDesc = onboarding
    ? t.onboarding.goalOptions.find((g) => g.minutes === onboarding.dailyGoalMinutes)
        ?.desc
    : undefined;

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        variants={groupVariants}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 md:py-10 lg:py-12"
      >
        {/* ── Hero ─────────────────────────────────────────────── */}
        <motion.section
          variants={itemVariants}
          className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-card"
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/[0.06] to-transparent"
          />
          <span
            aria-hidden
            className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/15 blur-3xl"
          />
          <span
            aria-hidden
            className="absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-secondary/15 blur-3xl"
          />
          <Zap
            aria-hidden
            className="absolute right-6 top-6 hidden h-5 w-5 animate-float text-secondary sm:block"
          />

          <div className="relative grid gap-6 p-5 sm:p-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-8 lg:p-8">
            <div className="min-w-0">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-muted">
                {t.dashboard.title}
              </p>
              <h1 className="mt-1.5 font-display text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                {t.dashboard.welcome}
                {hydrated && userName ? (
                  <>
                    {" "}
                    <span className="gradient-text">{userName}</span>!
                  </>
                ) : (
                  "!"
                )}
              </h1>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted sm:text-base">
                {t.dashboard.keepGoing}
              </p>

              {/* Context chips */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {!hydrated ? (
                  <>
                    <span className="h-[30px] w-24 animate-pulse rounded-full bg-border/50" />
                    <span className="h-[30px] w-20 animate-pulse rounded-full bg-border/50" />
                    <span className="h-[30px] w-28 animate-pulse rounded-full bg-border/50" />
                  </>
                ) : (
                  <>
                    {streakAtRisk && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-error/30 bg-error/10 px-3 py-1.5 text-xs font-bold text-error">
                        <Flame
                          aria-hidden
                          className="h-3.5 w-3.5 animate-pulse-ring rounded-full"
                        />
                        {t.dashboard.streakRisk}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-deep-orange/10 px-3 py-1.5 text-xs font-bold text-deep-orange">
                      <Flame aria-hidden className="h-3.5 w-3.5" />
                      <span className="tabular-nums">{streak}</span>
                      {t.dashboard.dayStreak}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">
                      <GraduationCap aria-hidden className="h-3.5 w-3.5" />
                      {t.dashboard.level}{" "}
                      <span className="tabular-nums">{level}</span>
                    </span>
                    {onboarding && (
                      <Link
                        href="/onboarding"
                        title={t.dashboard.editGoal}
                        className="inline-flex items-center gap-1.5 rounded-full bg-secondary/15 px-3 py-1.5 text-xs font-bold text-secondary transition-colors hover:bg-secondary/25"
                      >
                        <Target aria-hidden className="h-3.5 w-3.5" />
                        <span className="tabular-nums">
                          {onboarding.dailyGoalMinutes}
                        </span>
                        {t.onboarding.summaryMinutes}
                        {goalDesc && (
                          <span className="hidden sm:inline">· {goalDesc}</span>
                        )}
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Level ring */}
            <div
              aria-hidden
              className="flex items-center justify-center gap-4 sm:gap-5"
            >
              <LevelRing
                percent={hydrated ? levelProgress.percent : 0}
                loading={!hydrated}
              />
              <div>
                {hydrated ? (
                  <>
                    <div className="font-display text-xl font-extrabold leading-none">
                      {t.dashboard.level} {level}
                    </div>
                    <p className="mt-1.5 text-xs font-semibold tabular-nums text-muted">
                      {levelProgress.current}/{levelProgress.needed} XP
                    </p>
                  </>
                ) : (
                  <>
                    <span className="block h-5 w-24 animate-pulse rounded bg-border/60" />
                    <span className="mt-1.5 block h-3 w-16 animate-pulse rounded bg-border/60" />
                  </>
                )}
                <p className="mt-0.5 text-[11px] font-medium text-muted">
                  {t.dashboard.xpToNext}
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── Spotlight: THE single next action ───────────────── */}
        {(!hydrated || spotlight) && (
          <motion.section
            variants={itemVariants}
            className="mt-4 rounded-3xl border border-border bg-card p-4 shadow-card sm:p-5"
          >
            {!hydrated ? (
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <span className="h-12 w-12 shrink-0 animate-pulse rounded-2xl bg-border/60 sm:h-14 sm:w-14" />
                <div className="min-w-0 flex-1 space-y-2">
                  <span className="block h-3 w-24 animate-pulse rounded bg-border/60" />
                  <span className="block h-5 w-52 max-w-full animate-pulse rounded bg-border/60" />
                  <span className="block h-2.5 w-full max-w-xs animate-pulse rounded-full bg-border/60" />
                </div>
                <span className="h-11 w-full shrink-0 animate-pulse rounded-full bg-border/60 sm:w-36" />
              </div>
            ) : spotlight ? (
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm ring-1 ring-inset ring-white/20 sm:h-14 sm:w-14"
                  style={{ backgroundColor: spotlight.info.course.color }}
                >
                  <DynamicIcon
                    name={spotlight.info.course.icon}
                    className="h-6 w-6 sm:h-7 sm:w-7"
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-primary">
                    <Sparkles aria-hidden className="h-3.5 w-3.5" />
                    {t.dashboard.nextUp}
                  </p>
                  <h2 className="mt-0.5 truncate font-display text-base font-bold sm:text-lg">
                    {pick(locale, spotlight.info.course.title)}
                  </h2>
                  <ProgressBar
                    percent={spotlight.info.pct}
                    className="mt-2 max-w-md"
                    barClassName={
                      spotlight.kind === "quiz" ? "bg-secondary" : undefined
                    }
                  />
                  <p className="mt-1.5 text-xs font-semibold tabular-nums text-muted">
                    {spotlight.info.done}/{spotlight.info.lessonIds.length}{" "}
                    {t.common.lessons}
                    {spotlight.nextMinutes !== undefined && (
                      <> · {spotlight.nextMinutes} {t.common.minutes}</>
                    )}
                  </p>
                </div>
                {spotlight.kind === "learn" && spotlight.nextId ? (
                  <ButtonLink
                    href={`/learn/${spotlight.info.course.id}/${spotlight.nextId}`}
                    className="w-full min-h-11 shrink-0 justify-center sm:w-auto"
                  >
                    <PlayCircle aria-hidden className="h-5 w-5" />
                    {spotlight.info.done === 0
                      ? t.courses.startCourse
                      : t.dashboard.continueLearning}
                  </ButtonLink>
                ) : (
                  <ButtonLink
                    href={`/quiz/${spotlight.info.course.id}`}
                    variant="accent"
                    className="w-full min-h-11 shrink-0 justify-center sm:w-auto"
                  >
                    <Target aria-hidden className="h-5 w-5" />
                    {t.courses.quiz}
                  </ButtonLink>
                )}
              </div>
            ) : null}
          </motion.section>
        )}

        {/* ── Stats ────────────────────────────────────────────── */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4 md:grid-cols-4">
          <StatCard
            iconName="Zap"
            chipClass="from-secondary/25 to-secondary/5 text-secondary"
            label={t.dashboard.totalXP}
            value={hydrated ? xp : null}
            locale={locale}
          />
          <StatCard
            iconName="GraduationCap"
            chipClass="from-primary/25 to-primary/5 text-primary"
            label={t.dashboard.level}
            value={hydrated ? level : null}
            locale={locale}
          />
          <StatCard
            iconName="Flame"
            chipClass="from-deep-orange/25 to-deep-orange/5 text-deep-orange"
            label={t.dashboard.dayStreak}
            value={hydrated ? streak : null}
            locale={locale}
          />
          <StatCard
            iconName="BookOpen"
            chipClass="from-success/20 to-success/5 text-success"
            label={t.dashboard.lessonsDone}
            value={hydrated ? lessonsCompletedCount : null}
            locale={locale}
          />
        </div>

        {/* ── Main grid: courses → badges rail → leaderboard ──── */}
        <div className="mt-8 grid gap-8 sm:mt-10 lg:grid-cols-3 lg:gap-10">
          {/* My courses */}
          <motion.section
            variants={itemVariants}
            className="min-w-0 lg:col-span-2 lg:col-start-1 lg:row-start-1"
          >
            <SectionHeader
              title={t.dashboard.myCourses}
              meta={hydrated ? String(sortedCourses.length) : undefined}
            />
            {!hydrated ? (
              <div className="mt-4 space-y-3">
                {[0, 1].map((i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-border bg-card p-4 shadow-card sm:p-5"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <span className="h-11 w-11 shrink-0 animate-pulse rounded-2xl bg-border/60" />
                        <span className="h-4 w-40 max-w-full animate-pulse rounded bg-border/60" />
                      </div>
                      <span className="h-3 w-full animate-pulse rounded-full bg-border/60 sm:max-w-40" />
                      <span className="h-9 w-full animate-pulse rounded-full bg-border/60 sm:w-32" />
                    </div>
                  </div>
                ))}
              </div>
            ) : sortedCourses.length === 0 ? (
              <div className="mt-4 rounded-3xl border-2 border-dashed border-border bg-gradient-to-b from-primary/5 to-transparent p-8 text-center sm:p-12">
                <div aria-hidden className="mx-auto flex w-fit items-end gap-3">
                  <span className="grid h-12 w-12 animate-float place-items-center rounded-2xl border border-border bg-card text-primary shadow-card">
                    <BookOpen className="h-6 w-6" />
                  </span>
                  <span
                    className="grid h-14 w-14 animate-float place-items-center rounded-2xl border border-border bg-card text-deep-orange shadow-card"
                    style={{ animationDelay: "0.7s" }}
                  >
                    <Flame className="h-7 w-7" />
                  </span>
                  <span
                    className="grid h-12 w-12 animate-float place-items-center rounded-2xl border border-border bg-card text-secondary shadow-card"
                    style={{ animationDelay: "1.4s" }}
                  >
                    <Zap className="h-6 w-6" />
                  </span>
                </div>
                <p className="mt-5 font-display text-base font-bold">
                  {t.dashboard.noCourses}
                </p>
                <p className="mx-auto mt-1 max-w-sm text-sm text-muted">
                  {t.dashboard.keepGoing}
                </p>
                <ButtonLink
                  href="/courses"
                  size="lg"
                  className="mt-5 w-full justify-center sm:w-auto"
                >
                  {t.dashboard.browseCourses}
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </ButtonLink>
              </div>
            ) : (
              <motion.div variants={groupVariants} className="mt-4 space-y-3">
                {sortedCourses.map((info) => (
                  <CourseRow
                    key={info.course.id}
                    info={info}
                    nextId={
                      info.status === "in-progress" ||
                      info.status === "not-started"
                        ? info.lessonIds.find((id) => !completedLessons.has(id))
                        : undefined
                    }
                  />
                ))}
              </motion.div>
            )}
          </motion.section>

          {/* Badges rail (sticky on desktop, sits before leaderboard on phones) */}
          <motion.aside
            variants={itemVariants}
            className="min-w-0 lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:sticky lg:top-24 lg:self-start"
          >
            <SectionHeader
              title={t.dashboard.badges}
              meta={
                hydrated ? `${earnedBadges.length}/${badges.length}` : undefined
              }
            />
            {!hydrated ? (
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-28 animate-pulse rounded-2xl border border-border bg-card/60"
                  />
                ))}
              </div>
            ) : (
              <>
                {nextBadge && (
                  <div className="mt-4 rounded-2xl border border-border bg-card p-4 shadow-card">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
                        style={{
                          backgroundColor: `${nextBadge.badge.color}22`,
                          color: nextBadge.badge.color,
                        }}
                      >
                        <DynamicIcon
                          name={nextBadge.badge.icon}
                          className="h-4 w-4"
                        />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-extrabold">
                          {pick(locale, nextBadge.badge.name)}
                        </p>
                        <p className="truncate text-[11px] font-semibold tabular-nums text-muted">
                          {Math.min(nextBadge.cur, nextBadge.goal)}/
                          {nextBadge.goal}{" "}
                          {nextBadge.unit === "lessons"
                            ? t.common.lessons
                            : nextBadge.unit === "days"
                              ? t.dashboard.dayStreak
                              : "XP"}
                        </p>
                      </div>
                    </div>
                    <ProgressBar
                      percent={(nextBadge.cur / nextBadge.goal) * 100}
                      className="mt-2.5"
                      barClassName="bg-secondary"
                    />
                  </div>
                )}

                {earnedBadges.length > 0 && (
                  <motion.div
                    variants={groupVariants}
                    className="mt-4 grid grid-cols-2 gap-3"
                  >
                    {earnedBadges.map((b) => (
                      <BadgeTile key={b.id} badge={b} earned />
                    ))}
                  </motion.div>
                )}
                {lockedBadges.length > 0 && (
                  <>
                    <p className="mt-5 text-[11px] font-extrabold uppercase tracking-wide text-muted">
                      {t.dashboard.badgesLocked}
                    </p>
                    <motion.div
                      variants={groupVariants}
                      className="mt-2.5 grid grid-cols-2 gap-3"
                    >
                      {lockedBadges.map((b) => (
                        <BadgeTile key={b.id} badge={b} earned={false} />
                      ))}
                    </motion.div>
                  </>
                )}

                <div className="mt-6">
                  <ButtonLink
                    href="/courses"
                    variant="outline"
                    className="w-full min-h-11"
                  >
                    {t.dashboard.browseCourses}
                    <ArrowRight aria-hidden className="h-4 w-4" />
                  </ButtonLink>
                </div>
              </>
            )}
          </motion.aside>

          {/* Leaderboard (hidden entirely for anonymous users / empty boards) */}
          {user && (!boardHydrated || boardEntries.length > 0) && (
            <motion.section
              variants={itemVariants}
              className="min-w-0 lg:col-span-2 lg:col-start-1 lg:row-start-2"
            >
              <SectionHeader
                title={t.dashboard.leaderboard}
                meta={
                  boardHydrated && selfEntry ? `#${selfEntry.rank}` : undefined
                }
              />
              {!boardHydrated ? (
                <div className="mt-4 rounded-2xl border border-border bg-card p-3 shadow-card sm:p-4">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 px-3 py-2.5 sm:px-4"
                    >
                      <span className="h-4 w-5 animate-pulse rounded bg-border/60" />
                      <span className="h-9 w-9 animate-pulse rounded-full bg-border/60" />
                      <span className="h-4 min-w-0 flex-1 animate-pulse rounded bg-border/60" />
                      <span className="hidden h-4 w-8 animate-pulse rounded bg-border/60 md:block" />
                    </div>
                  ))}
                </div>
              ) : (
                <BoardCard entries={boardEntries} />
              )}
            </motion.section>
          )}
        </div>
      </motion.div>
    </MotionConfig>
  );
}

/* ── Pieces ────────────────────────────────────────────────── */

function LevelRing({
  percent,
  loading,
}: {
  percent: number;
  loading: boolean;
}) {
  const reduce = useReducedMotion();
  const stroke = 10;
  const radius = (120 - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28 lg:h-32 lg:w-32">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className="stroke-border"
        />
        {!loading && (
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="url(#dashboard-level-gradient)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{
              strokeDashoffset: circumference * (1 - clamped / 100),
            }}
            transition={{ duration: reduce ? 0 : 1, ease: "easeOut", delay: 0.2 }}
          />
        )}
        <defs>
          <linearGradient
            id="dashboard-level-gradient"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#FF6B2C" />
            <stop offset="100%" stopColor="#F4B942" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        {loading ? (
          <span className="h-5 w-9 animate-pulse rounded bg-border/60" />
        ) : (
          <span className="font-display text-2xl font-extrabold tabular-nums lg:text-3xl">
            {clamped}
            <span className="text-sm text-muted">%</span>
          </span>
        )}
      </div>
    </div>
  );
}

function AnimatedNumber({
  value,
  locale,
  className,
}: {
  value: number;
  locale: "id" | "en";
  className?: string;
}) {
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) =>
    Math.round(v).toLocaleString(locale === "en" ? "en-US" : "id-ID")
  );
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      mv.set(value);
      return;
    }
    const controls = animate(mv, value, { duration: 0.9, ease: "easeOut" });
    return () => controls.stop();
  }, [mv, value, reduce]);

  return <motion.span className={className}>{text}</motion.span>;
}

function StatCard({
  iconName,
  chipClass,
  label,
  value,
  locale,
}: {
  iconName: string;
  chipClass: string;
  label: string;
  /** null renders the pre-hydration skeleton */
  value: number | null;
  locale: "id" | "en";
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="card-futuristic group relative overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-card sm:p-5"
    >
      <DynamicIcon
        name={iconName}
        className="pointer-events-none absolute -bottom-3 -right-2 h-20 w-20 opacity-[0.05]"
      />
      <div className="relative flex items-center gap-3 sm:gap-4">
        <span
          className={cn(
            "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 sm:h-12 sm:w-12",
            chipClass
          )}
        >
          <DynamicIcon name={iconName} className="h-5 w-5 sm:h-6 sm:w-6" />
        </span>
        <div className="min-w-0">
          {value === null ? (
            <span aria-hidden className="block h-7 w-12 animate-pulse rounded-md bg-border/60" />
          ) : (
            <AnimatedNumber
              value={value}
              locale={locale}
              className="block truncate font-display text-xl font-extrabold tabular-nums sm:text-2xl lg:text-3xl"
            />
          )}
          <div className="mt-0.5 truncate text-[11px] font-bold uppercase tracking-wide text-muted sm:text-xs">
            {label}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SectionHeader({ title, meta }: { title: string; meta?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span
        aria-hidden
        className="h-6 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-primary to-secondary"
      />
      <h2 className="font-display text-lg font-extrabold tracking-tight sm:text-xl">
        {title}
      </h2>
      {meta && (
        <span className="ml-auto rounded-full border border-border bg-background px-3 py-1 text-xs font-bold tabular-nums text-muted">
          {meta}
        </span>
      )}
    </div>
  );
}

function CourseRow({
  info,
  nextId,
}: {
  info: MyCourseInfo;
  nextId?: string;
}) {
  const { t, locale } = useI18n();
  const stats = courseStats(info.course);
  const certified = info.status === "certified";
  const quizReady = info.status === "quiz-ready";

  return (
    <motion.article
      variants={itemVariants}
      className={cn(
        "card-futuristic rounded-2xl border bg-card p-4 shadow-card sm:p-5",
        quizReady && "border-secondary/50 bg-secondary/[0.05]"
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex min-w-0 items-center gap-3 sm:flex-[2]">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm ring-1 ring-inset ring-white/20 sm:h-12 sm:w-12"
            style={{ backgroundColor: info.course.color }}
          >
            <DynamicIcon name={info.course.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="flex items-center gap-1.5 font-display text-sm font-bold sm:text-[15px]">
              <span className="truncate">
                {pick(locale, info.course.title)}
              </span>
              {certified && (
                <CheckCircle2
                  aria-hidden
                  className="h-4 w-4 shrink-0 text-success"
                />
              )}
            </h3>
            <p className="mt-0.5 text-xs font-semibold tabular-nums text-muted">
              {info.done}/{stats.lessons} {t.common.lessons} · {info.pct}%
            </p>
          </div>
        </div>

        <ProgressBar
          percent={info.pct}
          className="sm:flex-[3]"
          barClassName={
            certified ? "bg-success" : quizReady ? "bg-secondary" : undefined
          }
        />

        {certified ? (
          <ButtonLink
            href={`/certificate/${info.course.id}`}
            variant="outline"
            size="sm"
            className="w-full min-h-11 shrink-0 justify-center sm:w-auto"
          >
            <Award aria-hidden className="h-4 w-4 text-secondary" />
            {t.dashboard.viewCertificate}
          </ButtonLink>
        ) : quizReady ? (
          <ButtonLink
            href={`/quiz/${info.course.id}`}
            variant="accent"
            size="sm"
            className="w-full min-h-11 shrink-0 justify-center sm:w-auto"
          >
            <Target aria-hidden className="h-4 w-4" />
            {t.courses.quiz}
          </ButtonLink>
        ) : nextId ? (
          <ButtonLink
            href={`/learn/${info.course.id}/${nextId}`}
            size="sm"
            className="w-full min-h-11 shrink-0 justify-center sm:w-auto"
          >
            <PlayCircle aria-hidden className="h-4 w-4" />
            {info.done === 0 ? t.courses.startCourse : t.common.continue}
          </ButtonLink>
        ) : null}
      </div>
    </motion.article>
  );
}

function BadgeTile({
  badge,
  earned,
}: {
  badge: BadgeWithStatus;
  earned: boolean;
}) {
  const { locale } = useI18n();
  return (
    <motion.div
      variants={itemVariants}
      title={pick(locale, badge.description)}
      className={cn(
        "relative flex flex-col items-center rounded-2xl border p-3 text-center sm:p-4",
        earned
          ? "border-secondary/40 bg-card shadow-gold-glow"
          : "border-dashed border-border bg-card/40"
      )}
    >
      <span
        className={cn(
          "relative mx-auto grid h-11 w-11 place-items-center rounded-full sm:h-12 sm:w-12",
          !earned && "bg-border/50 text-muted grayscale"
        )}
        style={
          earned
            ? { backgroundColor: `${badge.color}22`, color: badge.color }
            : undefined
        }
      >
        <DynamicIcon name={badge.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
        {!earned && (
          <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full border border-border bg-card text-muted">
            <Lock aria-hidden className="h-2.5 w-2.5" />
          </span>
        )}
      </span>
      <p className="mt-2 line-clamp-2 text-xs font-bold leading-tight">
        {pick(locale, badge.name)}
      </p>
      <p
        className={cn(
          "mt-0.5 line-clamp-2 text-[10px] leading-tight text-muted",
          !earned && "opacity-70"
        )}
      >
        {pick(locale, badge.description)}
      </p>
    </motion.div>
  );
}

function BoardCard({ entries }: { entries: LeaderboardEntry[] }) {
  const podium = entries.length >= 3 ? entries.slice(0, 3) : null;
  const rest = podium ? entries.slice(3) : entries;

  return (
    <div className="mt-4 rounded-2xl border border-border bg-card p-3 shadow-card sm:p-4">
      {podium && (
        <div className="grid grid-cols-3 items-end gap-2 pb-3 sm:gap-3">
          {/* Visual order 2-1-3 around the taller first-place pedestal */}
          {[podium[1], podium[0], podium[2]].map((entry, i) => (
            <div
              key={entry.userId}
              className="flex min-w-0 flex-col items-center text-center"
            >
              <div className="relative">
                {i === 1 && (
                  <Trophy
                    aria-hidden
                    className="absolute -top-5 left-1/2 h-5 w-5 -translate-x-1/2 animate-float text-secondary"
                  />
                )}
                <span
                  className={cn(
                    "grid place-items-center rounded-full font-display text-xs font-extrabold text-white ring-[3px]",
                    i === 1
                      ? "h-14 w-14 shadow-gold-glow ring-secondary sm:h-16 sm:w-16"
                      : "h-12 w-12 sm:h-14 sm:w-14",
                    i === 0 && "ring-muted/60",
                    i === 2 && "ring-deep-orange/70",
                    entry.isCurrentUser &&
                      "outline outline-2 outline-offset-2 outline-primary"
                  )}
                  style={{ backgroundColor: entry.avatarColor }}
                >
                  {initials(entry.name)}
                </span>
              </div>
              <p className="mt-1.5 line-clamp-1 max-w-full text-xs font-bold">
                {entry.name}
              </p>
              <p className="flex items-center gap-0.5 text-[11px] font-extrabold tabular-nums text-secondary">
                <Zap aria-hidden className="h-3 w-3" />
                {entry.xp}
              </p>
              <div
                aria-hidden
                className={cn(
                  "mt-2 w-full rounded-t-xl bg-gradient-to-b from-primary/10 to-transparent",
                  i === 1 ? "h-12 sm:h-14" : i === 0 ? "h-9 sm:h-10" : "h-7 sm:h-8"
                )}
              >
                <span className="block pt-0.5 text-center font-display text-lg font-extrabold text-primary/25">
                  {entry.rank}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {rest.length > 0 && (
        <div
          className={cn(
            "space-y-1.5",
            podium && "border-t border-border pt-3"
          )}
        >
          {rest.map((entry) => (
            <BoardRow key={entry.userId} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}

function BoardRow({ entry }: { entry: LeaderboardEntry }) {
  const { t } = useI18n();
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-xl px-3 py-2.5 sm:gap-3 sm:px-4",
        entry.isCurrentUser && "bg-primary/10 ring-1 ring-inset ring-primary/30"
      )}
    >
      <span
        className={cn(
          "w-6 shrink-0 text-center font-display text-sm font-extrabold",
          entry.rank === 1 && "text-secondary",
          entry.rank === 2 && "text-muted",
          entry.rank === 3 && "text-deep-orange"
        )}
      >
        {entry.rank <= 3 ? (
          <Medal
            aria-hidden
            className={cn(
              "mx-auto h-4 w-4",
              entry.rank === 1 && "text-secondary",
              entry.rank === 2 && "text-muted",
              entry.rank === 3 && "text-deep-orange"
            )}
          />
        ) : (
          entry.rank
        )}
      </span>
      <span
        className={cn(
          "grid h-9 w-9 shrink-0 place-items-center rounded-full font-display text-[11px] font-extrabold text-white",
          entry.isCurrentUser &&
            "ring-2 ring-secondary ring-offset-2 ring-offset-card"
        )}
        style={{ backgroundColor: entry.avatarColor }}
      >
        {initials(entry.name)}
      </span>
      <span className="min-w-0 flex-1 truncate text-sm font-bold">
        {entry.name}
      </span>
      {entry.isCurrentUser && (
        <span className="hidden shrink-0 rounded-full bg-secondary/10 px-2 py-0.5 text-[10px] font-extrabold text-secondary sm:inline-block">
          {t.dashboard.you}
        </span>
      )}
      <span className="hidden shrink-0 items-center gap-1 text-xs font-bold text-accent-2 md:flex">
        <Flame aria-hidden className="h-3.5 w-3.5" />
        <span className="tabular-nums">{entry.streak}</span>
      </span>
      <span className="flex shrink-0 items-center gap-1 text-xs font-extrabold text-secondary sm:text-sm">
        <Zap aria-hidden className="h-3.5 w-3.5" />
        <span className="tabular-nums">{entry.xp}</span>
      </span>
    </div>
  );
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
