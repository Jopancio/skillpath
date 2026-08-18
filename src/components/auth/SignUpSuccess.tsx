"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, GraduationCap, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

type Phase = "celebrate" | "exiting";

const CONFETTI_COLORS = [
  "#FF6B2C", // primary
  "#F4B942", // gold
  "#7C5CFC", // accent-2 / purple-ish
  "#34D399", // success-ish
  "#60A5FA", // blue
  "#F472B6", // pink
];

interface Particle {
  id: number;
  angle: number;
  distance: number;
  color: string;
  size: number;
  rotate: number;
  delay: number;
}

function useConfetti(count = 18) {
  return useMemo<Particle[]>(() => {
    const seeds: Particle[] = [];
    for (let i = 0; i < count; i++) {
      // Spread around the circle with a little randomness
      const baseAngle = (i / count) * 360;
      const jitter = (Math.random() - 0.5) * 18;
      seeds.push({
        id: i,
        angle: baseAngle + jitter,
        distance: 90 + Math.random() * 90,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        size: 8 + Math.random() * 8,
        rotate: Math.random() * 360,
        delay: Math.random() * 0.08,
      });
    }
    return seeds;
  }, [count]);
}

/**
 * Full-screen success overlay shown after a successful signup.
 * Animates a checkmark + confetti burst, then offers a CTA that
 * transitions into the onboarding wizard.
 *
 * `onContinue` is invoked after the exit animation finishes; if not
 * provided, the component navigates to `href` (defaults to /onboarding).
 */
export function SignUpSuccess({
  name,
  onContinue,
  href = "/onboarding",
  autoAdvanceMs = 3800,
}: {
  name?: string;
  onContinue?: () => void;
  href?: string;
  autoAdvanceMs?: number | null;
}) {
  const { t } = useI18n();
  const router = useRouter();
  const confetti = useConfetti(20);
  const [phase, setPhase] = useState<Phase>("celebrate");
  // Prevents the exit callback from running twice (auto-advance + click).
  const hasExitedRef = useRef(false);

  // Optional auto-advance so the wizard kicks in even if the user
  // doesn't click the button. Gives the celebration time to breathe.
  useEffect(() => {
    if (phase !== "celebrate" || !autoAdvanceMs) return;
    const id = window.setTimeout(() => setPhase("exiting"), autoAdvanceMs);
    return () => window.clearTimeout(id);
  }, [phase, autoAdvanceMs]);

  // Once the exit animation is done, either call the callback or route.
  // Guarded so it only fires once even if AnimatePresence re-runs.
  const onExitComplete = () => {
    if (hasExitedRef.current) return;
    hasExitedRef.current = true;
    const go = () => {
      if (onContinue) onContinue();
      else router.replace(href);
    };
    // Crossfade into the onboarding wizard instead of a hard page swap.
    const doc = document as Document & {
      startViewTransition?: (fn: () => void) => unknown;
    };
    let transitioned = false;
    try {
      if (typeof doc.startViewTransition === "function") {
        doc.startViewTransition(go);
        transitioned = true;
      }
    } catch {
      // Fall through — never let the transition swallow the navigation.
    }
    if (!transitioned) go();
  };

  const triggerExit = () => setPhase("exiting");

  const cleanName = (name ?? "").trim();
  const subtitle = cleanName
    ? t.auth.successSubtitle.replace("{name}", cleanName)
    : t.auth.successSubtitle.replace("{name} ", "").replace("{name}", "");

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {phase === "celebrate" && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.12,
            y: -24,
            filter: "blur(8px)",
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-background/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-live="polite"
        >
          {/* Soft radial glow */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="pointer-events-none absolute h-[36rem] w-[36rem] rounded-full bg-gradient-to-br from-primary/25 via-gold/15 to-transparent blur-3xl"
          />

          <div className="relative z-10 flex w-full max-w-md flex-col items-center px-6 text-center">
            {/* ===== Badge + checkmark ===== */}
            <div className="relative">
              {/* Pulse rings */}
              <motion.span
                aria-hidden
                initial={{ opacity: 0.6, scale: 0.4 }}
                animate={{ opacity: 0, scale: 2.2 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/40"
              />
              <motion.span
                aria-hidden
                initial={{ opacity: 0.6, scale: 0.4 }}
                animate={{ opacity: 0, scale: 2.2 }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.45,
                }}
                className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold/40"
              />

              {/* Confetti particles */}
              {confetti.map((p) => {
                const rad = (p.angle * Math.PI) / 180;
                const x = Math.cos(rad) * p.distance;
                const y = Math.sin(rad) * p.distance;
                return (
                  <motion.span
                    key={p.id}
                    aria-hidden
                    initial={{ opacity: 1, x: 0, y: 0, scale: 0, rotate: 0 }}
                    animate={{
                      opacity: [1, 1, 0],
                      x,
                      y,
                      scale: [0, 1, 0.8],
                      rotate: p.rotate,
                    }}
                    transition={{
                      duration: 1.1,
                      delay: 0.15 + p.delay,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ backgroundColor: p.color }}
                    className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-[2px]"
                  />
                );
              })}

              {/* Main badge */}
              <motion.div
                initial={{ scale: 0, rotate: -25 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.05 }}
                className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-primary via-deep-orange to-gold shadow-glow"
              >
                <GraduationCap
                  className="h-12 w-12 text-white"
                  strokeWidth={1.6}
                />
                {/* Animated check seal */}
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 240, damping: 12, delay: 0.35 }}
                  className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-success text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                    <motion.path
                      d="M5 13.5l4.5 4.5L19 8"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, delay: 0.45, ease: "easeInOut" }}
                    />
                  </svg>
                </motion.span>
              </motion.div>
            </div>

            {/* ===== Text block ===== */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.55 }}
              className="mt-10"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold text-primary-hover">
                <Sparkles className="h-3.5 w-3.5" />
                {t.common.appName}
              </span>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight md:text-4xl">
                {t.auth.successTitle}
              </h2>
              <p className="mt-2 text-base font-semibold text-primary-hover">
                {subtitle}
              </p>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">
                {t.auth.successDesc}
              </p>
            </motion.div>

            {/* ===== CTA into the wizard ===== */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.85 }}
              className="mt-8 w-full"
            >
              <Button
                size="lg"
                className="w-full"
                onClick={triggerExit}
              >
                {t.auth.goWizard}
                <ArrowRight className="h-5 w-5" />
              </Button>
              <p className="mt-3 text-center text-xs font-semibold text-muted">
                {t.auth.wizard}
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
