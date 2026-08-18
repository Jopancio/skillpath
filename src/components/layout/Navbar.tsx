"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  GraduationCap,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Map,
  MessageSquareQuote,
  Sparkles,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const { t } = useI18n();
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isLanding = pathname === "/";

  const links = isLanding
    ? [
        { href: "/#features", label: t.nav.features, icon: Sparkles, anchor: true },
        { href: "/#testimonials", label: t.nav.testimonials, icon: MessageSquareQuote, anchor: true },
        { href: "/#faq", label: t.nav.faq, icon: HelpCircle, anchor: true },
        { href: "/#popular", label: t.nav.courses, icon: Map, anchor: true },
      ]
    : [
        { href: "/courses", label: t.nav.courses, icon: Map, anchor: false },
        { href: "/dashboard", label: t.nav.dashboard, icon: LayoutDashboard, anchor: false },
      ];

  const handleLogout = async () => {
    setMenuOpen(false);
    await signOut();
    router.replace("/login");
  };

  const initials = (user?.name ?? "?")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-700 ease-in-out",
        scrolled
          ? "px-4 py-3 md:px-6"
          : "px-6 md:px-12"
      )}
    >
      <div
        className={cn(
          "mx-auto w-full transition-all duration-700 ease-in-out",
          scrolled
            ? "max-w-7xl rounded-2xl border border-border bg-card/90 px-2 shadow-card backdrop-blur-xl md:px-4"
            : "max-w-[1920px] rounded-2xl border border-transparent bg-transparent"
        )}
      >
        <div className="flex h-24 items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-deep-orange text-white shadow-soft">
            <GraduationCap className="h-8 w-8" />
          </span>
          <span className="hidden font-display text-2xl font-extrabold tracking-tight gradient-text sm:block">
            {t.common.appName}
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map(({ href, label, icon: Icon, anchor }) => {
            const active = !anchor && pathname?.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-2.5 rounded-full px-8 py-3.5 text-lg font-bold transition-all duration-300 hover:text-xl",
                  active
                    ? "bg-gradient-to-r from-primary to-deep-orange text-white shadow-soft"
                    : "text-foreground hover:bg-background hover:text-primary"
                )}
              >
                <Icon className="h-6 w-6" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <LocaleSwitcher />

          {/* User menu / login button */}
          {!user ? (
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-deep-orange px-8 py-3.5 text-lg font-extrabold text-white shadow-soft transition-transform hover:scale-105"
            >
              Masuk
            </Link>
          ) : (
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu akun"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-deep-orange text-base font-extrabold text-white shadow-soft ring-2 ring-white/40 transition-transform hover:scale-105"
            >
              {user?.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="h-full w-full rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                initials
              )}
            </button>

            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setMenuOpen(false)}
                  aria-hidden
                />
                <div className="absolute right-0 z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-card">
                  <div className="flex items-center gap-3 rounded-xl bg-background px-3 py-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-deep-orange text-sm font-extrabold text-white">
                      {user?.avatarUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={user.avatarUrl}
                          alt={user.name}
                          className="h-full w-full rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        initials
                      )}
                    </span>
                    <div className="min-w-0">
                      <div className="truncate font-display text-base font-bold">
                        {user?.name}
                      </div>
                      <div className="truncate text-xs font-semibold text-muted">
                        {user?.email}
                      </div>
                    </div>
                  </div>

                  <div className="mt-1 border-t border-border" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-base font-bold text-error transition-colors hover:bg-error/10"
                  >
                    <LogOut className="h-5 w-5" />
                    Keluar
                  </button>
                </div>
              </>
            )}
          </div>
          )}
        </div>
        </div>

        {/* Mobile nav */}
        <nav className="flex items-center gap-1.5 border-t border-border/50 px-4 py-3 md:hidden">
          {links.map(({ href, label, icon: Icon, anchor }) => {
            const active = !anchor && pathname?.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2.5 text-sm font-semibold transition-all duration-300 hover:text-base",
                  active
                    ? "bg-gradient-to-r from-primary/15 to-gold/10 text-primary"
                    : "text-muted hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
