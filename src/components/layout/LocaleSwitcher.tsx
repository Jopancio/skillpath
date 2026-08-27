"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Languages } from "lucide-react";
import { useI18n, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const LOCALE_LABELS: Record<Locale, string> = {
  id: "Bahasa Indonesia",
  en: "English",
};

export function LocaleSwitcher() {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 items-center gap-1.5 rounded-full border border-border bg-card/80 px-3.5 text-sm font-bold text-foreground shadow-sm backdrop-blur transition-all duration-200 hover:border-primary/40 hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 active:scale-95"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Languages
          className="h-[18px] w-[18px] text-muted transition-colors group-hover:text-primary"
          aria-hidden
        />
        {locale.toUpperCase()}
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted transition-transform duration-200",
            open && "rotate-180"
          )}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
            className="absolute right-0 z-50 mt-2 w-56 origin-top-right overflow-hidden rounded-2xl border border-border bg-card p-1.5 shadow-card"
            role="listbox"
            aria-label="Pilih bahasa"
          >
            {(["id", "en"] as Locale[]).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => {
                  setLocale(l);
                  setOpen(false);
                }}
                role="option"
                aria-selected={locale === l}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-bold transition-colors",
                  locale === l
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-background"
                )}
              >
                {LOCALE_LABELS[l]}
                {locale === l && <Check className="h-5 w-5" aria-hidden />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
