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
      className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all hover:scale-105 hover:bg-background md:h-14 md:w-14 md:border-2"
    >
      {/* Icon picks the right variant via CSS so it never flashes on load */}
      <Sun className="hidden h-5 w-5 md:h-7 md:w-7 dark:block" aria-hidden />
      <Moon className="h-5 w-5 md:h-7 md:w-7 dark:hidden" aria-hidden />
    </button>
  );
}
