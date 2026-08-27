"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";

/* ============================================================ */
/*  AuroraBackdrop — animated login background                   */
/*                                                               */
/*  Three drifting aurora blobs + a fading dot grid + floating   */
/*  sparkles. Everything is transform/opacity-only so it stays   */
/*  cheap, purely decorative (aria-hidden), and honors           */
/*  prefers-reduced-motion.                                      */
/* ============================================================ */

const BLOBS = [
  {
    className: "-top-36 -right-24 h-[24rem] w-[24rem] sm:h-[32rem] sm:w-[32rem]",
    gradient: "from-primary/20 via-gold/10 to-transparent",
    drift: { x: 46, y: 34 },
    duration: 19,
  },
  {
    className: "top-1/3 -left-36 h-[22rem] w-[22rem] sm:h-[30rem] sm:w-[30rem]",
    gradient: "from-gold/15 via-primary/10 to-transparent",
    drift: { x: -38, y: 42 },
    duration: 24,
  },
  {
    className: "-bottom-48 right-1/4 h-[26rem] w-[26rem]",
    gradient: "from-deep-orange/15 via-gold/10 to-transparent",
    drift: { x: 52, y: -36 },
    duration: 28,
  },
];

const SPARKS = [
  { pos: "left-[7%] top-[16%]", color: "text-gold/50", size: "h-5 w-5", duration: 6.5, delay: 0, rotate: -12 },
  { pos: "left-[88%] top-[10%]", color: "text-primary/40", size: "h-4 w-4", duration: 8, delay: 1.2, rotate: 18 },
  { pos: "left-[16%] top-[72%]", color: "text-primary/35", size: "h-4 w-4", duration: 7.2, delay: 2.1, rotate: 8 },
  { pos: "left-[78%] top-[62%]", color: "text-gold/45", size: "h-6 w-6", duration: 9, delay: 0.6, rotate: -20 },
  { pos: "left-[52%] top-[6%]", color: "text-gold/40", size: "h-4 w-4", duration: 7.8, delay: 3, rotate: 24 },
  { pos: "left-[38%] top-[86%]", color: "text-primary/30", size: "h-5 w-5", duration: 8.6, delay: 1.8, rotate: -6 },
] as const;

export function AuroraBackdrop() {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Fading dot grid */}
      <div
        className="dot-grid absolute inset-0 opacity-70"
        style={{
          maskImage:
            "radial-gradient(ellipse 90% 80% at 50% 40%, black 25%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at 50% 40%, black 25%, transparent 75%)",
        }}
      />

      {/* Drifting aurora blobs — staggered durations so they never move in lockstep */}
      {BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          className={cn(
            "absolute rounded-full bg-gradient-to-br blur-3xl",
            blob.className,
            blob.gradient,
          )}
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, blob.drift.x, -blob.drift.x * 0.4, 0],
                  y: [0, blob.drift.y, -blob.drift.y * 0.5, 0],
                  scale: [1, 1.07, 0.97, 1],
                }
          }
          transition={{ duration: blob.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Floating sparkles */}
      {SPARKS.map((spark, i) => (
        <motion.span
          key={i}
          className={cn("absolute", spark.pos)}
          style={{ rotate: spark.rotate }}
          animate={
            reduceMotion
              ? undefined
              : { y: [0, -26, 0], opacity: [0.25, 0.9, 0.25] }
          }
          transition={{
            duration: spark.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: spark.delay,
          }}
        >
          {i % 2 === 0 ? (
            <Sparkles className={cn(spark.size, spark.color)} />
          ) : (
            <Star className={cn(spark.size, spark.color)} fill="currentColor" />
          )}
        </motion.span>
      ))}
    </div>
  );
}
