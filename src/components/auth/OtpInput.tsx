"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const LENGTH = 6;

/* ============================================================ */
/*  OtpInput — 6-box verification code input                     */
/*                                                               */
/*  Auto-advances on type, supports paste, backspace walks       */
/*  backwards, and fires onComplete once the last box is         */
/*  filled. Cells ahead of the filled prefix are read-only so    */
/*  the code can never contain gaps.                             */
/* ============================================================ */

export function OtpInput({
  value,
  onChange,
  onComplete,
  error = false,
  disabled = false,
}: {
  value: string;
  onChange: (value: string) => void;
  /** Fired once each time the code reaches full length. */
  onComplete?: (code: string) => void;
  error?: boolean;
  disabled?: boolean;
}) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const reduceMotion = useReducedMotion();
  // Guards onComplete so it only fires once per completed code.
  const completedRef = useRef(false);

  // Focus the first box when the step mounts.
  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (value.length < LENGTH) completedRef.current = false;
  }, [value]);

  const focusCell = (index: number) => {
    const clamped = Math.max(0, Math.min(LENGTH - 1, index));
    const cell = refs.current[clamped];
    cell?.focus();
    cell?.select();
  };

  const commit = (next: string) => {
    onChange(next);
    if (next.length === LENGTH && next !== value) {
      completedRef.current = true;
      onComplete?.(next);
    }
  };

  const handleChange = (index: number, raw: string) => {
    if (disabled) return;
    const digit = raw.replace(/\D/g, "").slice(-1);
    if (!digit) return;

    if (index < value.length) {
      // Overwrite a filled cell, keep the rest of the code intact.
      commit(value.slice(0, index) + digit + value.slice(index + 1));
      focusCell(index + 1);
    } else {
      // Append at the end (this is always the next empty cell).
      commit((value + digit).slice(0, LENGTH));
      focusCell(value.length + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!digits) return;
    commit(digits.slice(0, LENGTH));
    focusCell(Math.min(digits.length, LENGTH - 1));
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusCell(index - 1);
      return;
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      focusCell(Math.min(index + 1, Math.max(value.length - 1, 0)));
      return;
    }
    if (e.key !== "Backspace" || disabled) return;
    e.preventDefault();

    if (index < value.length) {
      // Delete this digit; later digits shift left.
      onChange(value.slice(0, index) + value.slice(index + 1));
      focusCell(index);
    } else if (index > 0) {
      // Empty next-cell: remove the previous digit instead.
      onChange(value.slice(0, index - 1));
      focusCell(index - 1);
    }
  };

  return (
    <motion.div
      animate={
        error && !reduceMotion ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }
      }
      transition={{ duration: 0.4 }}
      className="flex justify-center gap-2 sm:gap-2.5"
    >
      {Array.from({ length: LENGTH }, (_, i) => {
        const filled = i < value.length;
        return (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            maxLength={1}
            value={value[i] ?? ""}
            readOnly={i > value.length}
            disabled={disabled}
            aria-label={`Digit ${i + 1}`}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            className={cn(
              "h-12 w-11 rounded-xl border-2 bg-background text-center font-display text-xl font-extrabold outline-none transition-all",
              "focus:-translate-y-0.5 focus:border-primary focus:shadow-[0_0_0_4px_rgb(255_107_44/0.15)] sm:h-14 sm:w-12",
              error
                ? "border-error text-error"
                : filled
                  ? "border-primary/60 text-foreground"
                  : "border-border text-foreground",
              disabled && "opacity-60",
            )}
          />
        );
      })}
    </motion.div>
  );
}
