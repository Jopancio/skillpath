"use client";

import { Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";

/* ============================================================ */
/*  AuroraBackdrop — static login background                     */
/*                                                               */
/*  Three aurora blobs + a fading dot grid + sparkles.           */
/*  Purely decorative (aria-hidden), no animation.               */
/* ============================================================ */

const BLOBS = [
  {
    className: "-top-36 -right-24 h-[24rem] w-[24rem] sm:h-[32rem] sm:w-[32rem]",
    gradient: "from-primary/20 via-gold/10 to-transparent",
  },
  {
    className: "top-1/3 -left-36 h-[22rem] w-[22rem] sm:h-[30rem] sm:w-[30rem]",
    gradient: "from-gold/15 via-primary/10 to-transparent",
  },
  {
    className: "-bottom-48 right-1/4 h-[26rem] w-[26rem]",
    gradient: "from-deep-orange/15 via-gold/10 to-transparent",
  },
];

const SPARKS = [
  { pos: "left-[7%] top-[16%]", color: "text-gold/50", size: "h-5 w-5", rotate: -12 },
  { pos: "left-[88%] top-[10%]", color: "text-primary/40", size: "h-4 w-4", rotate: 18 },
  { pos: "left-[16%] top-[72%]", color: "text-primary/35", size: "h-4 w-4", rotate: 8 },
  { pos: "left-[78%] top-[62%]", color: "text-gold/45", size: "h-6 w-6", rotate: -20 },
  { pos: "left-[52%] top-[6%]", color: "text-gold/40", size: "h-4 w-4", rotate: 24 },
  { pos: "left-[38%] top-[86%]", color: "text-primary/30", size: "h-5 w-5", rotate: -6 },
] as const;

export function AuroraBackdrop() {
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

      {/* Aurora blobs (static) */}
      {BLOBS.map((blob, i) => (
        <div
          key={i}
          className={cn(
            "absolute rounded-full bg-gradient-to-br blur-3xl",
            blob.className,
            blob.gradient,
          )}
        />
      ))}

      {/* Sparkles (static) */}
      {SPARKS.map((spark, i) => (
        <span
          key={i}
          className={cn("absolute", spark.pos)}
          style={{ rotate: `${spark.rotate}deg` }}
        >
          {i % 2 === 0 ? (
            <Sparkles className={cn(spark.size, spark.color)} />
          ) : (
            <Star className={cn(spark.size, spark.color)} fill="currentColor" />
          )}
        </span>
      ))}
    </div>
  );
}
