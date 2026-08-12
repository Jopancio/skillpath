export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export const LEVELS = [0, 100, 250, 500, 1000, 1750, 2750, 4000, 6000, 9000];

export function levelFromXP(xp: number): number {
  let level = 1;
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i]) level = i + 1;
    else break;
  }
  return level;
}

export function xpProgress(xp: number): {
  level: number;
  current: number;
  needed: number;
  percent: number;
} {
  const level = levelFromXP(xp);
  const base = LEVELS[level - 1] ?? 0;
  const next = LEVELS[level] ?? base + 5000;
  const current = xp - base;
  const needed = next - base;
  return {
    level,
    current,
    needed,
    percent: Math.min(100, Math.round((current / needed) * 100)),
  };
}

export function formatDate(date: Date, locale: string): string {
  return date.toLocaleDateString(locale === "en" ? "en-US" : "id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export function daysBetween(dateA: string, dateB: string): number {
  const a = new Date(dateA + "T00:00:00");
  const b = new Date(dateB + "T00:00:00");
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

export function generateCertId(courseId: string): string {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `SP-${courseId.slice(0, 3).toUpperCase()}-${rand}`;
}
