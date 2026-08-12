"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Emoji bucket definition. `max` is the upper bound (0-100) for which
 * this emoji is shown. The last bucket always wins.
 */
interface EmojiBucket {
  max: number;
  emoji: string;
}

/**
 * A polished two-sided labeled slider (0-100) with a big dynamic emoji
 * in the center that changes as the value moves — giving playful
 * feedback similar to the AmbitionSlider.
 */
export function Slider({
  value,
  onChange,
  leftLabel,
  rightLabel,
  leftEmoji,
  rightEmoji,
  /** Optional: emoji buckets for the center display. If omitted, only
   *  the left/right emojis are shown at the poles. */
  centerEmojis,
  className,
}: {
  value: number;
  onChange: (v: number) => void;
  leftLabel: string;
  rightLabel: string;
  leftEmoji?: string;
  rightEmoji?: string;
  centerEmojis?: EmojiBucket[];
  className?: string;
}) {
  const v = Math.max(0, Math.min(100, value));
  const bucket =
    centerEmojis?.find((b) => v <= b.max) ??
    centerEmojis?.[centerEmojis.length - 1];

  // Determine which side is dominant for the center emoji glow color
  const leftDominant = v < 50;

  return (
    <div className={cn("mx-auto w-full max-w-md", className)}>
      {/* ===== Big center emoji ===== */}
      {bucket && (
        <div className="mb-5 flex flex-col items-center">
          <div className="relative flex h-24 w-24 items-center justify-center">
            {/* Pulse ring */}
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full bg-primary/20"
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.15, 0.5] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <AnimatePresence mode="wait">
              <motion.span
                key={bucket.emoji}
                initial={{ scale: 0, rotate: -30, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0, rotate: 30, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 16 }}
                className="relative text-5xl"
                role="img"
              >
                {bucket.emoji}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* ===== Labels row ===== */}
      <div className="mb-3 flex items-center justify-between text-xs font-bold">
        <span
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors",
            v <= 50 ? "bg-primary/10 text-primary" : "text-muted",
          )}
        >
          {leftEmoji && <span aria-hidden>{leftEmoji}</span>}
          {leftLabel}
        </span>
        <span
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors",
            v >= 50 ? "bg-secondary/10 text-secondary" : "text-muted",
          )}
        >
          {rightLabel}
          {rightEmoji && <span aria-hidden>{rightEmoji}</span>}
        </span>
      </div>

      {/* ===== Track + input ===== */}
      <div className="relative flex h-10 items-center">
        {/* Track background */}
        <div className="absolute left-0 right-0 h-2.5 w-full rounded-full bg-border" />
        {/* Filled portion */}
        <motion.div
          className="absolute left-0 h-2.5 rounded-full bg-gradient-to-r from-primary to-secondary"
          initial={false}
          animate={{ width: `${v}%` }}
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
        />
        {/* Thumb */}
        <motion.div
          className="pointer-events-none absolute top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-background bg-gradient-to-br from-primary to-deep-orange shadow-soft"
          style={{ left: `${v}%` }}
          initial={false}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
        />
        {/* Native input on top for interaction */}
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={v}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={v}
          className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
        />
      </div>
    </div>
  );
}
