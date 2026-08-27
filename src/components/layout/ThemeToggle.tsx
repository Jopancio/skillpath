"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";

export function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Ganti tema terang/gelap"
      title="Ganti Tema"
      className="group flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 text-foreground shadow-sm backdrop-blur transition-all duration-200 hover:border-primary/40 hover:bg-background hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 active:scale-90"
    >
      {/* Icon picks the right variant via CSS so it never flashes on load */}
      <Sun
        className="hidden h-[18px] w-[18px] transition-transform duration-500 group-hover:rotate-90 dark:block"
        aria-hidden
      />
      <Moon
        className="h-[18px] w-[18px] transition-transform duration-500 group-hover:-rotate-12 dark:hidden"
        aria-hidden
      />
    </button>
  );
}
