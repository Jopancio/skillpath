"use client";

import { useState } from "react";
import { MotionConfig, motion, type Variants } from "framer-motion";
import { Check, Globe, Moon, Sun, Target, TriangleAlert } from "lucide-react";
import { useI18n, type Locale } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { useProgress } from "@/hooks/use-progress";
import { cn } from "@/lib/utils";

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

function Card({ children }: { children: React.ReactNode }) {
  return (
    <motion.section
      variants={itemVariants}
      className="rounded-3xl border border-border bg-card p-5 shadow-card sm:p-7"
    >
      {children}
    </motion.section>
  );
}

export default function SettingsPage() {
  const { t, locale, setLocale } = useI18n();
  const { theme, setTheme } = useTheme();
  const { onboarding, setDailyGoal, resetAll } = useProgress();

  // Two-step inline confirmation for the destructive reset.
  const [confirmingReset, setConfirmingReset] = useState(false);

  const themeOptions = [
    { value: "light" as const, label: t.settings.themeLight, icon: Sun },
    { value: "dark" as const, label: t.settings.themeDark, icon: Moon },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        variants={groupVariants}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-8 md:py-10 lg:py-12"
      >
        {/* ── Header ────────────────────────────────────────────── */}
        <motion.header variants={itemVariants}>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-muted">
            {t.nav.settings}
          </p>
          <h1 className="mt-1.5 font-display text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
            <span className="gradient-text">{t.settings.title}</span>
          </h1>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted sm:text-base">
            {t.settings.subtitle}
          </p>
        </motion.header>

        {/* ── Appearance & language ─────────────────────────────── */}
        <div className="mt-6 space-y-4 lg:mt-8">
          <Card>
            <h2 className="font-display text-lg font-extrabold tracking-tight">
              {t.settings.appearanceSection}
            </h2>

            {/* Theme */}
            <div className="mt-5">
              <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-muted">
                <Sun className="h-3.5 w-3.5" aria-hidden />
                {t.settings.theme}
              </p>
              <div
                role="radiogroup"
                aria-label={t.settings.theme}
                className="mt-2.5 grid grid-cols-2 gap-2.5"
              >
                {themeOptions.map(({ value, label, icon: Icon }) => {
                  const active = theme === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setTheme(value)}
                      className={cn(
                        "flex items-center justify-center gap-2 rounded-2xl border px-4 py-3.5 text-sm font-bold transition-all duration-200 active:scale-[0.98]",
                        active
                          ? "border-transparent bg-gradient-to-r from-primary to-deep-orange text-white shadow-soft"
                          : "border-border bg-background text-muted hover:border-primary/40 hover:text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                      {label}
                      {active && <Check className="h-4 w-4" aria-hidden />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Language */}
            <div className="mt-6">
              <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-muted">
                <Globe className="h-3.5 w-3.5" aria-hidden />
                {t.settings.language}
              </p>
              <div
                role="radiogroup"
                aria-label={t.settings.language}
                className="mt-2.5 grid grid-cols-2 gap-2.5"
              >
                {(["id", "en"] as Locale[]).map((l) => {
                  const active = locale === l;
                  return (
                    <button
                      key={l}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setLocale(l)}
                      className={cn(
                        "flex items-center justify-center gap-2 rounded-2xl border px-4 py-3.5 text-sm font-bold transition-all duration-200 active:scale-[0.98]",
                        active
                          ? "border-transparent bg-gradient-to-r from-primary to-deep-orange text-white shadow-soft"
                          : "border-border bg-background text-muted hover:border-primary/40 hover:text-foreground"
                      )}
                    >
                      {l === "id" ? "Indonesia" : "English"}
                      {active && <Check className="h-4 w-4" aria-hidden />}
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* ── Daily goal ──────────────────────────────────────── */}
          <Card>
            <h2 className="font-display text-lg font-extrabold tracking-tight">
              {t.settings.dailyGoalTitle}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              {t.settings.dailyGoalDesc}
            </p>
            <div
              role="radiogroup"
              aria-label={t.settings.dailyGoalTitle}
              className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4"
            >
              {t.onboarding.goalOptions.map((g) => {
                const active = onboarding?.dailyGoalMinutes === g.minutes;
                return (
                  <button
                    key={g.minutes}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setDailyGoal(g.minutes)}
                    className={cn(
                      "relative rounded-2xl border px-3 py-3.5 text-center transition-all duration-200 active:scale-[0.98]",
                      active
                        ? "border-transparent bg-gradient-to-r from-primary to-deep-orange text-white shadow-soft"
                        : "border-border bg-background text-muted hover:border-primary/40 hover:text-foreground"
                    )}
                  >
                    {active && (
                      <Check
                        className="absolute right-2 top-2 h-3.5 w-3.5"
                        aria-hidden
                      />
                    )}
                    <Target
                      className="mx-auto h-4 w-4 opacity-80"
                      aria-hidden
                    />
                    <span className="mt-1 block text-sm font-extrabold">
                      {g.label}
                    </span>
                    <span
                      className={cn(
                        "mt-0.5 block text-[11px] font-bold",
                        active ? "text-white/80" : "text-muted/70"
                      )}
                    >
                      {g.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* ── Danger zone ─────────────────────────────────────── */}
          <motion.section
            variants={itemVariants}
            className="rounded-3xl border border-error/40 bg-error/[0.04] p-5 sm:p-7"
          >
            <h2 className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight text-error">
              <TriangleAlert className="h-5 w-5" aria-hidden />
              {t.settings.dangerZone}
            </h2>

            {!confirmingReset ? (
              <>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  <span className="font-bold text-foreground">
                    {t.settings.resetTitle}.
                  </span>{" "}
                  {t.settings.resetDesc}
                </p>
                <button
                  type="button"
                  onClick={() => setConfirmingReset(true)}
                  className="mt-4 rounded-full border-2 border-error/50 px-5 py-2.5 text-sm font-extrabold text-error transition-colors hover:bg-error hover:text-white"
                >
                  {t.settings.resetCta}
                </button>
              </>
            ) : (
              <>
                <p
                  className="mt-3 font-display text-base font-extrabold text-error"
                  role="alert"
                >
                  {t.settings.resetConfirmTitle}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {t.settings.resetConfirmDesc}
                </p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      resetAll();
                      setConfirmingReset(false);
                    }}
                    className="rounded-full bg-error px-5 py-2.5 text-sm font-extrabold text-white shadow-soft transition-transform hover:scale-105 active:scale-95"
                  >
                    {t.settings.resetYes}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmingReset(false)}
                    className="rounded-full px-4 py-2.5 text-sm font-bold text-muted transition-colors hover:bg-background hover:text-foreground"
                  >
                    {t.settings.resetNo}
                  </button>
                </div>
              </>
            )}
          </motion.section>
        </div>
      </motion.div>
    </MotionConfig>
  );
}
