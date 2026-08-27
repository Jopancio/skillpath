"use client";

import { useState } from "react";
import { MotionConfig, motion, type Variants } from "framer-motion";
import {
  BookOpen,
  Check,
  CircleUserRound,
  Flame,
  GraduationCap,
  Mail,
  Pencil,
  Target,
  Zap,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { useProgress } from "@/hooks/use-progress";

/* Same entrance vocabulary as the dashboard. */
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

export default function ProfilePage() {
  const { t } = useI18n();
  const { user } = useAuth();
  const {
    xp,
    streak,
    level,
    lessonsCompletedCount,
    userName,
    onboarding,
    hydrated,
    setUserName,
  } = useProgress();

  const displayName = (hydrated && userName) || user?.name || "?";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // Inline rename editor.
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [justSaved, setJustSaved] = useState(false);

  const startEdit = () => {
    setDraft(displayName === "?" ? "" : displayName);
    setJustSaved(false);
    setEditing(true);
  };

  const saveName = () => {
    const trimmed = draft.trim();
    if (trimmed) setUserName(trimmed);
    setEditing(false);
    setJustSaved(true);
    window.setTimeout(() => setJustSaved(false), 2000);
  };

  // Resolve onboarding answers into localized labels.
  const reason = onboarding
    ? t.onboarding.reasons.find((r) => r.id === onboarding.reason)
    : undefined;
  const knowledge = onboarding
    ? t.onboarding.knowledgeOptions.find((k) => k.id === onboarding.knowledgeLevel)
    : undefined;
  const experience = onboarding
    ? t.onboarding.expOptions.find((e) => e.id === onboarding.learningExp)
    : undefined;
  const goal = onboarding
    ? t.onboarding.goalOptions.find((g) => g.minutes === onboarding.dailyGoalMinutes)
    : undefined;

  const stats = [
    { icon: Zap, label: t.profile.statXp, value: xp },
    { icon: GraduationCap, label: t.profile.statLevel, value: level },
    { icon: Flame, label: t.profile.statStreak, value: streak },
    { icon: BookOpen, label: t.profile.statLessons, value: lessonsCompletedCount },
  ];

  const learningRows = [
    { icon: Target, label: t.profile.reason, option: reason },
    { icon: GraduationCap, label: t.profile.knowledge, option: knowledge },
    { icon: BookOpen, label: t.profile.experience, option: experience },
    {
      icon: Flame,
      label: t.profile.dailyGoal,
      option: goal
        ? { emoji: "🎯", label: `${goal.minutes} ${t.profile.minutesPerDay}` }
        : undefined,
    },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        variants={groupVariants}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 md:py-10 lg:py-12"
      >
        {/* ── Header / account card ────────────────────────────── */}
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
          <CircleUserRound
            aria-hidden
            className="absolute right-6 top-6 hidden h-5 w-5 animate-float text-secondary sm:block"
          />

          <div className="relative p-5 sm:p-7 lg:p-8">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-muted">
              {t.profile.title}
            </p>

            <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center">
              <span className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary to-deep-orange text-xl font-extrabold text-white shadow-card ring-4 ring-white/30 dark:ring-white/10">
                {user?.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.avatarUrl}
                    alt={displayName}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  initials
                )}
              </span>

              <div className="min-w-0 flex-1">
                {/* Name row: static + edit, or inline input */}
                {editing ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveName();
                        if (e.key === "Escape") setEditing(false);
                      }}
                      placeholder={t.profile.namePlaceholder}
                      autoFocus
                      maxLength={40}
                      aria-label={t.profile.name}
                      className="w-full max-w-xs rounded-full border border-border bg-background px-4 py-2.5 font-display text-lg font-bold outline-none transition-colors focus:border-primary sm:text-xl"
                    />
                    <button
                      type="button"
                      onClick={saveName}
                      disabled={!draft.trim()}
                      className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-deep-orange px-4 py-2.5 text-sm font-extrabold text-white shadow-soft transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                    >
                      <Check className="h-4 w-4" />
                      {t.profile.save}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      className="rounded-full px-3 py-2.5 text-sm font-bold text-muted transition-colors hover:bg-background hover:text-foreground"
                    >
                      {t.profile.cancel}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h1 className="truncate font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                      {displayName}
                    </h1>
                    <button
                      type="button"
                      onClick={startEdit}
                      aria-label={t.profile.editName}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted transition-all hover:border-primary/40 hover:text-primary active:scale-90"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <span
                      className={`text-xs font-bold text-secondary transition-opacity duration-300 ${
                        justSaved ? "opacity-100" : "opacity-0"
                      }`}
                      aria-live="polite"
                    >
                      ✓ {t.profile.saved}
                    </span>
                  </div>
                )}

                {user?.email && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-muted">
                    <Mail className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{user.email}</span>
                  </p>
                )}
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted sm:text-base">
                  {t.profile.subtitle}
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── Stats ─────────────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="mt-6 lg:mt-8">
          <h2 className="font-display text-lg font-extrabold tracking-tight">
            {t.profile.statsSection}
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {stats.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="rounded-2xl border border-border bg-card p-4 shadow-card sm:p-5"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                {hydrated ? (
                  <p className="mt-3 font-display text-2xl font-extrabold tabular-nums sm:text-3xl">
                    {value}
                  </p>
                ) : (
                  <span className="mt-3 block h-8 w-16 animate-pulse rounded-lg bg-border/50" />
                )}
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-muted">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── Learning profile ──────────────────────────────────── */}
        <motion.section variants={itemVariants} className="mt-6 lg:mt-8">
          <h2 className="font-display text-lg font-extrabold tracking-tight">
            {t.profile.learningSection}
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {learningRows.map(({ icon: Icon, label, option }) => (
              <div
                key={label}
                className="flex items-center gap-3.5 rounded-2xl border border-border bg-card px-4 py-4 shadow-card sm:px-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-muted">
                    {label}
                  </p>
                  {option ? (
                    <p className="mt-0.5 truncate font-display text-base font-bold">
                      <span aria-hidden className="mr-1.5">
                        {option.emoji}
                      </span>
                      {option.label}
                    </p>
                  ) : (
                    <p className="mt-0.5 text-sm font-semibold text-muted">
                      {t.profile.notSet}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </MotionConfig>
  );
}
