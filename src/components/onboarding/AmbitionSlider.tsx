"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Ambition meter (1-10). The emoji and label change as the value moves,
 * giving playful feedback. Uses the localized `labels` array (6 buckets).
 */
const BUCKETS: { max: number; emoji: string }[] = [
  { max: 2, emoji: "🛋️" }, // 1-2 chill
  { max: 4, emoji: "🙂" }, // 3-4 calm
  { max: 6, emoji: "😊" }, // 5-6 steady
  { max: 8, emoji: "🔥" }, // 7-8 eager/ambitious
  { max: 10, emoji: "🚀" }, // 9-10 very ambitious
];

function bucketFor(value: number) {
  return BUCKETS.find((b) => value <= b.max) ?? BUCKETS[BUCKETS.length - 1];
}

export function AmbitionSlider({
  value,
  onChange,
  labels,
  className,
}: {
  value: number;
  onChange: (v: number) => void;
  labels: string[]; // 6 localized labels for buckets 1-2, 3-4, ... 9-10
  className?: string;
}) {
  const v = Math.max(1, Math.min(10, value));
  const pct = ((v - 1) / 9) * 100; // map 1-10 to 0-100%
  const bucket = bucketFor(v);
  const labelIndex = Math.min(
    labels.length - 1,
    Math.floor((v - 1) / 2) // 1-2->0, 3-4->1, 5-6->2, 7-8->3, 9-10->4
  );

  return (
    <div className={cn("mx-auto w-full max-w-md", className)}>
      {/* Big emoji + value */}
      <div className="mb-5 flex flex-col items-center">
        <div className="relative flex h-24 w-24 items-center justify-center">
          {/* Pulse ring that intensifies with ambition */}
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
              aria-label={labels[labelIndex]}
            >
              {bucket.emoji}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <motion.span
            key={v}
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="font-display text-4xl font-extrabold gradient-text"
          >
            {v}
          </motion.span>
          <span className="text-sm font-bold text-muted">/ 10</span>
        </div>
        <motion.span
          key={labelIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-extrabold text-primary"
        >
          {labels[labelIndex]}
        </motion.span>
      </div>

      {/* Track + input */}
      <div className="relative flex h-10 items-center">
        <div className="absolute left-0 right-0 h-2.5 w-full rounded-full bg-border" />
        <motion.div
          className="absolute left-0 h-2.5 rounded-full bg-gradient-to-r from-primary via-deep-orange to-gold"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
        />
        {/* Tick marks 1..10 */}
        {Array.from({ length: 10 }, (_, i) => i + 1).map((tick) => {
          const tickPct = ((tick - 1) / 9) * 100;
          const active = tick <= v;
          return (
            <span
              key={tick}
              aria-hidden
              className={cn(
                "absolute top-1/2 h-3 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors",
                active ? "bg-white/70" : "bg-border"
              )}
              style={{ left: `${tickPct}%` }}
            />
          );
        })}
        {/* Thumb */}
        <motion.div
          className="pointer-events-none absolute top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-background bg-gradient-to-br from-primary to-gold shadow-glow"
          style={{ left: `${pct}%` }}
          initial={false}
          whileHover={{ scale: 1.12 }}
        />
        <input
          type="range"
          min={1}
          max={10}
          step={1}
          value={v}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-valuemin={1}
          aria-valuemax={10}
          aria-valuenow={v}
          className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
        />
      </div>

      {/* Numbered scale labels */}
      <div className="mt-2 flex justify-between text-[10px] font-bold text-muted">
        <span>1</span>
        <span>5</span>
        <span>10</span>
      </div>
    </div>
  );
}
