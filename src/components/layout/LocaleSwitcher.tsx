"use client";

import { useState, useRef, useEffect } from "react";
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
        className="flex h-14 items-center gap-2 rounded-full border-2 border-border bg-card px-5 text-lg font-bold text-foreground shadow-sm transition-colors hover:bg-background"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Languages className="h-6 w-6 text-muted" aria-hidden />
        {locale.toUpperCase()}
        <ChevronDown
          className={cn(
            "h-5 w-5 text-muted transition-transform",
            open && "rotate-180"
          )}
          aria-hidden
        />
      </button>

      {open && (
        <div
          className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border-2 border-border bg-card p-1.5 shadow-card"
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
        </div>
      )}
    </div>
  );
}
