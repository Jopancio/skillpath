"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  Flame,
  GraduationCap,
  PlayCircle,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import { useI18n, pick } from "@/lib/i18n";
import { useProgress } from "@/hooks/use-progress";
import { useCustomCourses } from "@/hooks/use-custom-courses";
import { useBadges } from "@/hooks/use-badges";
import { courseLessonIds, isCourseComplete } from "@/data/courses";
import { courseStats } from "@/data/types";
import { leaderboard } from "@/data/badges";
import { ProgressBar } from "@/components/ui/progress-bar";
import { ButtonLink } from "@/components/ui/button";
import { DynamicIcon } from "@/components/ui/icon-map";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const { t, locale } = useI18n();
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
  } = useProgress();
  const { allCourses } = useCustomCourses();
  const badges = useBadges();

  const startedCourses = allCourses.filter((c) =>
    courseLessonIds(c).some((id) => completedLessons.has(id))
  );
  const earnedCount = badges.filter((b) => b.earned).length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl font-extrabold tracking-tight">
        {t.dashboard.title}
      </h1>
      <p className="mt-2 text-muted">
        {hydrated && userName
          ? `${t.dashboard.welcome}, ${userName}!`
          : t.dashboard.keepGoing}
      </p>

      {/* Stats cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Zap className="h-6 w-6" />}
          color="#F4B942"
          value={hydrated ? xp : 0}
          label={t.dashboard.totalXP}
          delay={0}
        />
        <StatCard
          icon={<GraduationCap className="h-6 w-6" />}
          color="#FF6B2C"
          value={hydrated ? level : 1}
          label={t.dashboard.level}
          delay={0.05}
        />
        <StatCard
          icon={<Flame className="h-6 w-6" />}
          color="#D94A16"
          value={hydrated ? streak : 0}
          label={t.dashboard.dayStreak}
          delay={0.1}
        />
        <StatCard
          icon={<BookOpen className="h-6 w-6" />}
          color="#22C55E"
          value={hydrated ? lessonsCompletedCount : 0}
          label={t.dashboard.lessonsDone}
          delay={0.15}
        />
      </div>

      {/* Level progress */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-card"
      >
        <div className="flex items-center justify-between text-sm font-bold">
          <span className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/10 font-display text-secondary">
              {level}
            </span>
            {t.dashboard.level} {level}
          </span>
          <span className="text-muted">
            {levelProgress.current}/{levelProgress.needed} XP ·{" "}
            {t.dashboard.xpToNext}
          </span>
        </div>
        <ProgressBar percent={levelProgress.percent} className="mt-3" barClassName="bg-secondary" />
      </motion.div>

      {/* Daily goal (from onboarding) */}
      {hydrated && onboarding && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mt-6 flex items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-card"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/25 text-amber-400">
            <Target className="h-6 w-6" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="font-display text-sm font-extrabold">
              {t.onboarding.summaryGoal}
            </div>
            <div className="mt-0.5 text-xs font-semibold text-muted">
              {onboarding.dailyGoalMinutes} {t.onboarding.summaryMinutes}
              {" · "}
              {
                t.onboarding.goalOptions.find(
                  (g) => g.minutes === onboarding.dailyGoalMinutes
                )?.desc
              }
            </div>
          </div>
          <ButtonLink href="/onboarding" variant="ghost" size="sm">
            {t.dashboard.editGoal}
          </ButtonLink>
        </motion.div>
      )}

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        {/* My courses */}
        <div className="lg:col-span-2">
          <h2 className="font-display text-xl font-extrabold">
            {t.dashboard.myCourses}
          </h2>
          {startedCourses.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
              <p className="text-muted">{t.dashboard.noCourses}</p>
              <div className="mt-4">
                <ButtonLink href="/courses">{t.dashboard.browseCourses}</ButtonLink>
              </div>
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              {startedCourses.map((c) => {
                const ids = courseLessonIds(c);
                const done = ids.filter((id) => completedLessons.has(id)).length;
                const pct = Math.round((done / ids.length) * 100);
                const complete = isCourseComplete(c, completedLessons);
                const quiz = quizResults[c.id];
                const nextId = ids.find((id) => !completedLessons.has(id));
                const stats = courseStats(c);
                return (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35 }}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-card"
                  >
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white"
                      style={{ backgroundColor: c.color }}
                    >
                      <DynamicIcon name={c.icon} className="h-6 w-6" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="truncate font-display text-sm font-bold">
                          {pick(locale, c.title)}
                        </h3>
                        <span className="shrink-0 text-xs font-bold text-muted">
                          {done}/{stats.lessons}
                        </span>
                      </div>
                      <ProgressBar
                        percent={pct}
                        className="mt-2"
                        barClassName={complete ? "bg-success" : undefined}
                      />
                    </div>
                    {complete && !quiz?.passed ? (
                      <ButtonLink href={`/quiz/${c.id}`} variant="accent" size="sm">
                        {t.courses.quiz}
                      </ButtonLink>
                    ) : quiz?.passed ? (
                      <ButtonLink
                        href={`/certificate/${c.id}`}
                        variant="secondary"
                        size="sm"
                      >
                        <Award className="h-4 w-4" />
                      </ButtonLink>
                    ) : nextId ? (
                      <ButtonLink href={`/learn/${c.id}/${nextId}`} size="sm">
                        <PlayCircle className="h-4 w-4" />
                        {t.common.continue}
                      </ButtonLink>
                    ) : null}
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Leaderboard */}
          <h2 className="mt-10 font-display text-xl font-extrabold">
            {t.dashboard.leaderboard}
          </h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            {leaderboard.map((entry, i) => (
              <div
                key={entry.name}
                className={cn(
                  "flex items-center gap-3 border-b border-border px-5 py-3.5 last:border-0",
                  i < 3 && "bg-background/60"
                )}
              >
                <span
                  className={cn(
                    "w-6 text-center font-display text-sm font-extrabold",
                    i === 0 && "text-amber-400",
                    i === 1 && "text-muted",
                    i === 2 && "text-accent-2"
                  )}
                >
                  {i === 0 ? <Trophy className="inline h-4 w-4" /> : i + 1}
                </span>
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full font-display text-xs font-extrabold text-white"
                  style={{ backgroundColor: entry.avatarColor }}
                >
                  {entry.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <span className="flex-1 truncate text-sm font-bold">
                  {entry.name}
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-accent-2">
                  <Flame className="h-3.5 w-3.5" />
                  {entry.streak}
                </span>
                <span className="flex items-center gap-1 text-xs font-extrabold text-amber-400">
                  <Zap className="h-3.5 w-3.5" />
                  {entry.xp}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div>
          <h2 className="font-display text-xl font-extrabold">
            {t.dashboard.badges}{" "}
            <span className="text-sm font-bold text-muted">
              {earnedCount}/{badges.length}
            </span>
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {badges.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className={cn(
                  "rounded-2xl border p-4 text-center",
                  b.earned
                    ? "border-border bg-card shadow-card"
                    : "border-dashed border-border bg-card/50 opacity-50"
                )}
                title={pick(locale, b.description)}
              >
                <span
                  className={cn(
                    "mx-auto flex h-11 w-11 items-center justify-center rounded-full",
                    !b.earned && "bg-border/60 text-muted"
                  )}
                  style={{
                    backgroundColor: b.earned
                      ? `${b.color}22`
                      : undefined,
                    color: b.earned ? b.color : undefined,
                  }}
                >
                  <DynamicIcon name={b.icon} className="h-5 w-5" />
                </span>
                <p className="mt-2 text-xs font-bold leading-tight">
                  {pick(locale, b.name)}
                </p>
                <p className="mt-0.5 text-[10px] leading-tight text-muted">
                  {pick(locale, b.description)}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-6">
            <ButtonLink href="/courses" variant="outline" className="w-full">
              {t.dashboard.browseCourses}
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  color,
  value,
  label,
  delay,
}: {
  icon: React.ReactNode;
  color: string;
  value: number;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-card"
    >
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${color}22`, color }}
      >
        {icon}
      </span>
      <div>
        <div className="font-display text-2xl font-extrabold">{value}</div>
        <div className="text-xs font-bold text-muted">{label}</div>
      </div>
    </motion.div>
  );
}
