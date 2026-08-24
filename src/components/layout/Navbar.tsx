"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronRight,
  GraduationCap,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Map,
  Menu,
  MessageSquareQuote,
  Moon,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { useI18n, type Locale } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const { t, locale, setLocale } = useI18n();
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the drawer when the route changes (render-time adjust, no effect).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (drawerOpen) setDrawerOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + close on Escape while the drawer is open.
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const isLanding = pathname === "/";

  const links = isLanding
    ? [
        { href: "/#features", label: t.nav.features, icon: Sparkles, anchor: true },
        { href: "/#popular", label: t.nav.courses, icon: Map, anchor: true },
        { href: "/#testimonials", label: t.nav.testimonials, icon: MessageSquareQuote, anchor: true },
        { href: "/#faq", label: t.nav.faq, icon: HelpCircle, anchor: true },
      ]
    : [
        { href: "/courses", label: t.nav.courses, icon: Map, anchor: false },
        { href: "/dashboard", label: t.nav.dashboard, icon: LayoutDashboard, anchor: false },
      ];

  const handleLogout = async () => {
    setDrawerOpen(false);
    await signOut();
    router.replace("/login");
  };

  const initials = (user?.name ?? "?")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const isDark = theme === "dark";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-700 ease-in-out",
        scrolled
          ? "px-3 py-2 md:px-6 md:py-3"
          : "px-4 md:px-12"
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
        <div className="flex h-16 items-center justify-between gap-3 px-2 md:h-24 md:px-6">
          <Link href="/" className="flex shrink-0 items-center gap-2.5 md:gap-3" aria-label={t.common.appName}>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-deep-orange text-white shadow-soft md:h-14 md:w-14 md:rounded-2xl">
              <GraduationCap className="h-6 w-6 md:h-8 md:w-8" />
            </span>
            <span className="hidden font-display text-xl font-extrabold tracking-tight gradient-text sm:block md:text-2xl">
              {t.common.appName}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-2 md:flex">
            {links.map(({ href, label, icon: Icon, anchor }) => {
              const active = !anchor && pathname?.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-full px-6 py-3 text-base font-bold transition-all duration-300 xl:px-8 xl:py-3.5 xl:text-lg",
                    active
                      ? "bg-gradient-to-r from-primary to-deep-orange text-white shadow-soft"
                      : "text-foreground hover:bg-background hover:text-primary"
                  )}
                >
                  <Icon className="h-5 w-5 xl:h-6 xl:w-6" />
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2.5 md:flex">
            <ThemeToggle />
            <LocaleSwitcher />
            {!user ? (
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-deep-orange px-6 py-3 text-base font-extrabold text-white shadow-soft transition-transform hover:scale-105 xl:px-8 xl:py-3.5 xl:text-lg"
              >
                Masuk
              </Link>
            ) : (
              <UserMenu initials={initials} onLogout={handleLogout} />
            )}
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 md:hidden">
            {!user ? (
              <Link
                href="/login"
                className="flex items-center rounded-full bg-gradient-to-r from-primary to-deep-orange px-4 py-2 text-sm font-extrabold text-white shadow-soft"
              >
                Masuk
              </Link>
            ) : null}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Buka menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm active:scale-95"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ===== Mobile drawer ===== */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setDrawerOpen(false)}
              aria-hidden
            />
            <motion.aside
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Menu navigasi"
              className="fixed inset-y-0 right-0 z-50 flex w-[86%] max-w-sm flex-col overflow-y-auto overscroll-contain border-l border-border bg-card p-5 shadow-card md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between">
                <Link href="/" onClick={() => setDrawerOpen(false)} className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-deep-orange text-white shadow-soft">
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <span className="font-display text-lg font-extrabold gradient-text">
                    {t.common.appName}
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Tutup menu"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted active:scale-95"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* User card / login CTA */}
              {user ? (
                <div className="mt-5 flex items-center gap-3 rounded-2xl border border-border bg-background px-3 py-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-deep-orange text-sm font-extrabold text-white">
                    {user.avatarUrl ? (
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
                    <div className="truncate font-display text-sm font-bold">{user.name}</div>
                    <div className="truncate text-xs font-semibold text-muted">{user.email}</div>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setDrawerOpen(false)}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-deep-orange px-6 py-3 text-base font-extrabold text-white shadow-soft active:scale-[0.98]"
                >
                  Masuk
                </Link>
              )}

              {/* Nav links */}
              <nav className="mt-5 space-y-1.5" aria-label="Navigasi utama">
                {links.map(({ href, label, icon: Icon, anchor }) => {
                  const active = !anchor && pathname?.startsWith(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setDrawerOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-3.5 text-base font-bold transition-colors",
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-background"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                          active ? "bg-primary/15 text-primary" : "bg-background text-muted"
                        )}
                      >
                        <Icon className="h-4.5 w-4.5" />
                      </span>
                      {label}
                      <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-muted/40" />
                    </Link>
                  );
                })}
              </nav>

              {/* Preferences */}
              <div className="mt-5 border-t border-border pt-4">
                <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-muted">
                  Preferensi
                </p>

                <button
                  type="button"
                  onClick={toggleTheme}
                  className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-foreground transition-colors hover:bg-background"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background text-muted">
                    <Sun className="hidden h-4.5 w-4.5 dark:block" />
                    <Moon className="h-4.5 w-4.5 dark:hidden" />
                  </span>
                  {isDark ? "Mode Terang" : "Mode Gelap"}
                </button>

                <div className="mt-1.5 flex items-center gap-3 px-3 py-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background text-sm font-bold text-muted">
                    {locale === "id" ? "ID" : "EN"}
                  </span>
                  <div className="flex flex-1 rounded-full border border-border bg-background p-1">
                    {(["id", "en"] as Locale[]).map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => setLocale(l)}
                        aria-pressed={locale === l}
                        className={cn(
                          "flex-1 rounded-full px-3 py-1.5 text-sm font-bold transition-colors",
                          locale === l
                            ? "bg-gradient-to-r from-primary to-deep-orange text-white shadow-soft"
                            : "text-muted"
                        )}
                      >
                        {l === "id" ? "Indonesia" : "English"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Logout */}
              {user ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-auto flex items-center gap-3 rounded-xl px-3 py-3.5 pt-3.5 text-sm font-bold text-error transition-colors hover:bg-error/10"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-error/10 text-error">
                    <LogOut className="h-4 w-4" />
                  </span>
                  Keluar
                </button>
              ) : null}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop avatar dropdown (unchanged behavior)                        */
/* ------------------------------------------------------------------ */

function UserMenu({
  initials,
  onLogout,
}: {
  initials: string;
  onLogout: () => void;
}) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Menu akun"
        aria-expanded={open}
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

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
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
                <div className="truncate font-display text-base font-bold">{user?.name}</div>
                <div className="truncate text-xs font-semibold text-muted">{user?.email}</div>
              </div>
            </div>

            <div className="mt-1 border-t border-border" />

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onLogout();
              }}
              className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-base font-bold text-error transition-colors hover:bg-error/10"
            >
              <LogOut className="h-5 w-5" />
              Keluar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
