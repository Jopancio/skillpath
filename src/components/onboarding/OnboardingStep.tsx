"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Wrapper for a single onboarding wizard step.
 * Animates in from the right and out to the left.
 */
export function OnboardingStep({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 48 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -48 }}
      transition={{ duration: 0.32, ease: "easeOut" }}
      className="w-full"
    >
      <h1 className="text-center font-display text-2xl font-extrabold tracking-tight md:text-3xl">
        {title}
      </h1>
      {description && (
        <p className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-muted md:text-base">
          {description}
        </p>
      )}
      <div className="mt-8">{children}</div>
    </motion.div>
  );
}

/**
 * A selectable card option used across wizard steps.
 */
export function OptionCard({
  selected,
  onClick,
  emoji,
  label,
  description,
  className,
}: {
  selected: boolean;
  onClick: () => void;
  emoji?: string;
  label: string;
  description?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "btn-3d flex w-full items-center gap-3 rounded-2xl border-2 bg-card px-5 py-4 text-left transition-colors",
        selected
          ? "border-primary bg-primary/10 text-foreground"
          : "border-border text-foreground hover:border-primary/60",
        className
      )}
    >
      {emoji && (
        <span className="shrink-0 text-2xl" aria-hidden>
          {emoji}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block font-display text-sm font-bold md:text-base">
          {label}
        </span>
        {description && (
          <span className="mt-0.5 block text-xs font-semibold text-muted">
            {description}
          </span>
        )}
      </span>
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
          selected ? "border-primary bg-primary" : "border-border"
        )}
        aria-hidden
      >
        {selected && (
          <svg viewBox="0 0 12 12" className="h-3 w-3 text-white" fill="none">
            <path
              d="M2 6.5 4.5 9 10 3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </button>
  );
}
