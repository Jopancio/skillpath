"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  CircleUserRound,
  Flame,
  LayoutDashboard,
  Map,
  Settings,
  Zap,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { useProgress } from "@/hooks/use-progress";
import { cn } from "@/lib/utils";

/**
 * Routes that render inside the app shell (with the sidebar).
 * Landing, login, onboarding, learn/quiz/certificate flows stay
 * sidebar-free so they keep their immersive full-width layouts.
 */
const SHELL_ROUTES = ["/dashboard", "/courses", "/profile", "/settings"];

/**
 * Course detail pages (/courses/[id]) render their own CourseToolsSidebar
 * (Notes / Flashcards / Quiz / AI / Mindmap). Rendering AppSidebar there too
 * would clash into a double-sidebar layout, so they stay shell-free.
 */
function isCourseDetail(pathname: string): boolean {
  return /^\/courses\/[^/]+/.test(pathname);
}

export function useIsShellRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  if (isCourseDetail(pathname)) return false;
  return SHELL_ROUTES.some((r) => pathname.startsWith(r));
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isShell = useIsShellRoute(pathname);

  if (!isShell) {
    return <>{children}</>;
  }

  return (
    <div className="mx-auto flex w-full max-w-[1440px] items-start gap-6 px-0 lg:px-6">
      <AppSidebar />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function AppSidebar() {
  const { t } = useI18n();
  const { user } = useAuth();
  const { xp, streak, hydrated } = useProgress();
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: t.nav.dashboard, icon: LayoutDashboard },
    { href: "/courses", label: t.nav.courses, icon: Map },
    { href: "/profile", label: t.nav.profile, icon: CircleUserRound },
    { href: "/settings", label: t.nav.settings, icon: Settings },
  ];

  return (
    <aside className="sticky top-24 hidden w-60 shrink-0 flex-col gap-1.5 rounded-3xl border border-border bg-card p-3 shadow-card lg:flex xl:w-64">
      <p className="px-3 pb-1 pt-2 text-[11px] font-extrabold uppercase tracking-wider text-muted">
        Menu
      </p>

      <nav aria-label="Navigasi aplikasi" className="flex flex-col gap-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = !!pathname?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                active ? "text-white" : "text-muted hover:bg-background hover:text-primary"
              )}
            >
              {active && (
                <motion.span
                  layoutId="sidebar-active-pill"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-deep-orange shadow-soft"
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                />
              )}
              <Icon className="relative z-10 h-4.5 w-4.5 shrink-0" />
              <span className="relative z-10">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* XP + streak chips — the streak is highlighted only on the dashboard */}
      <AnimatePresence>
        {user && hydrated && (xp > 0 || streak > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="mt-2 flex items-center gap-2 border-t border-border px-3 pt-3"
          >
            {xp > 0 && (
              <span
                title={t.dashboard.totalXP}
                className="flex items-center gap-1.5 rounded-full border border-secondary/40 bg-secondary/10 px-2.5 py-1 text-[11px] font-extrabold text-secondary"
              >
                <Zap className="h-3 w-3 fill-current" />
                <span className="tabular-nums">{xp}</span> XP
              </span>
            )}
            {streak > 0 && (
              <span
                title={t.dashboard.dayStreak}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-extrabold",
                  pathname?.startsWith("/dashboard")
                    ? "border-deep-orange/40 bg-deep-orange/10 text-deep-orange"
                    : "border-border bg-background text-muted"
                  )}
              >
                <Flame className="h-3 w-3" />
                <span className="tabular-nums">{streak}</span>
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
