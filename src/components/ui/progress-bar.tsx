"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ProgressBar({
  percent,
  className,
  barClassName,
  showLabel = false,
}: {
  percent: number;
  className?: string;
  barClassName?: string;
  showLabel?: boolean;
}) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div className={cn("relative", className)}>
      <div className="h-3 w-full overflow-hidden rounded-full bg-border">
        <motion.div
          className={cn("h-full rounded-full bg-primary", barClassName)}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </div>
      {showLabel && (
        <span className="mt-1 block text-right text-xs font-semibold text-muted">
          {clamped}%
        </span>
      )}
    </div>
  );
}
