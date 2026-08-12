"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme === "dark" ? "Aktifkan tema terang" : "Aktifkan tema gelap"
      }
      title={theme === "dark" ? "Light Mode" : "Dark Mode"}
      className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-border bg-card text-foreground shadow-sm transition-all hover:scale-105 hover:bg-background"
    >
      {mounted && theme === "dark" ? (
        <Sun className="h-7 w-7" aria-hidden />
      ) : (
        <Moon className="h-7 w-7" aria-hidden />
      )}
    </button>
  );
}
