"use client";

import dynamic from "next/dynamic";

// Lazy-load the WebGL component so it never blocks SSR / first paint
const Strands = dynamic(() => import("./Strands"), { ssr: false });

/** Orange-gold palette matching the site theme */
const THEME_COLORS = ["#FF6B2C", "#F4B942", "#D94A16"];

interface AIThinkingLoaderProps {
  /** Title shown under the animation, e.g. "AI sedang mengevaluasi..." */
  title: string;
  /** Optional smaller description line */
  description?: string;
  /** Height of the strands canvas area in px (default 260) */
  height?: number;
  /** Compact mode for dialogs: hides title/desc */
  compact?: boolean;
}

/**
 * Full-width "AI is thinking" loader built on the React Bits Strands shader.
 * Drop this in wherever an AI request is in-flight.
 */
export function AIThinkingLoader({
  title,
  description,
  height = 260,
  compact = false,
}: AIThinkingLoaderProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center text-center">
      {/* Strands animation — clean, no overlay */}
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-border/60 bg-card/40"
        style={{ height: compact ? 140 : height }}
      >
        <Strands
          colors={THEME_COLORS}
          count={compact ? 3 : 4}
          speed={1.6}
          amplitude={1}
          waviness={1.6}
          thickness={0.75}
          glow={2.8}
          taper={3}
          spread={1}
          intensity={0.65}
          saturation={1.4}
          opacity={1}
          scale={1.4}
        />
      </div>

      {!compact && (
        <>
          <h1 className="mt-6 font-display text-2xl font-extrabold">{title}</h1>
          {description && (
            <p className="mt-2 max-w-sm text-sm text-muted">{description}</p>
          )}
        </>
      )}
    </div>
  );
}
