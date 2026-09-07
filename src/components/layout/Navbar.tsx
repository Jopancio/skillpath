"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type TargetAndTransition,
  type Transition,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  CircleUserRound,
  Flame,
  GraduationCap,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Map,
  Menu,
  MessageSquareQuote,
  Moon,
  Settings,
  Sparkles,
  Sun,
  X,
  Zap,
} from "lucide-react";
import { useI18n, type Locale } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { useProgress } from "@/hooks/use-progress";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";

/* Shared animation presets */
const SPRING = { type: "spring", stiffness: 320, damping: 30 } as const;

/** Glide of the active pill between nav items — snappy but weighty, with a
 *  hint of overshoot so the pill feels like it "lands" on the new section. */
const PILL_TRANSITION: Transition = {
  layout: { type: "spring", stiffness: 420, damping: 32, mass: 0.9 },
  default: { duration: 0.18, ease: "easeOut" },
};

/** Icon micro-pop played once when its section becomes active. */
const ICON_POP: TargetAndTransition = {
  scale: [1, 1.22, 0.96, 1],
  rotate: [0, -6, 3, 0],
};

const asideVariants: Variants = {
  closed: { x: "100%" },
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 320,
      damping: 34,
      staggerChildren: 0.045,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  closed: { opacity: 0, x: 28 },
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Navbar() {
  const { t, locale, setLocale } = useI18n();
  const { user, signOut } = useAuth();
  const { xp, streak, hydrated } = useProgress();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

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

  const links = useMemo(
    () =>
      isLanding
        ? [
            { href: "/#features", label: t.nav.features, icon: Sparkles, anchor: true },
            { href: "/#popular", label: t.nav.courses, icon: Map, anchor: true },
            { href: "/#testimonials", label: t.nav.testimonials, icon: MessageSquareQuote, anchor: true },
            { href: "/#faq", label: t.nav.faq, icon: HelpCircle, anchor: true },
          ]
        : [
            { href: "/courses", label: t.nav.courses, icon: Map, anchor: false },
            { href: "/dashboard", label: t.nav.dashboard, icon: LayoutDashboard, anchor: false },
          ],
    [isLanding, t]
  );

  // Scroll-spy: while on the landing page, the section currently in the
  // middle of the viewport becomes "active" so the pill + text animation
  // follow the reader as they scroll.
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);

  // Clicking a section link claims the highlight immediately and pauses the
  // scroll-spy briefly, so the pill glides straight to the target instead of
  // being dragged through every intermediate section by the smooth scroll.
  const [spyLock, setSpyLock] = useState<string | null>(null);
  const selectAnchor = (href: string, anchor: boolean) => {
    if (!anchor) return;
    setActiveAnchor(href);
    setSpyLock(href);
  };

  useEffect(() => {
    if (!spyLock) return;
    const id = window.setTimeout(() => setSpyLock(null), 1200);
    return () => window.clearTimeout(id);
  }, [spyLock]);

  // Clear the highlight when leaving the landing page (render-time adjust,
  // no effect).
  const [prevIsLanding, setPrevIsLanding] = useState(isLanding);
  if (prevIsLanding !== isLanding) {
    setPrevIsLanding(isLanding);
    if (!isLanding && activeAnchor !== null) setActiveAnchor(null);
  }

  useEffect(() => {
    if (!isLanding) return;

    // Scroll-spy via a "reading line" ~40% down the viewport: the last
    // section whose top has crossed it is active. Above every section
    // (hero) nothing qualifies -> no highlight. Paused while a clicked
    // link owns the highlight (spyLock).
    const onScroll = () => {
      if (spyLock) return;
      const line = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const l of links) {
        const el = document.getElementById(l.href.slice(2));
        if (el && el.getBoundingClientRect().top <= line) current = l.href;
      }
      setActiveAnchor(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isLanding, links, spyLock]);

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
  const isDashboard = !!pathname?.startsWith("/dashboard");
  const showXpChip = !!user && hydrated && xp > 0;
  const showStreakChip = !!user && hydrated && streak > 0 && isDashboard;

  const loginButton = (
    <Link
      href="/login"
      className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-deep-orange px-5 py-2.5 text-sm font-extrabold text-white shadow-soft transition-all duration-200 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 active:scale-95"
    >
      Masuk
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300 ease-out",
        scrolled ? "px-2 pt-2 sm:px-4 md:px-6" : "px-4 sm:px-6 md:px-10"
      )}
    >
      <div
        className={cn(
          "mx-auto w-full rounded-2xl transition-all duration-300 ease-out",
          scrolled
            ? "max-w-7xl border border-border/70 bg-card/80 shadow-card backdrop-blur-xl"
            : "max-w-[1440px] border border-transparent bg-transparent"
        )}
      >
        <div className="flex h-16 items-center justify-between gap-3 px-3 lg:h-20 lg:px-5">
          <Link
            href="/"
            aria-label={t.common.appName}
            className="group flex shrink-0 items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            <motion.span
              whileHover={{ scale: 1.07, rotate: -4 }}
              whileTap={{ scale: 0.93 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-deep-orange text-white shadow-soft transition-shadow duration-300 group-hover:shadow-glow lg:h-11 lg:w-11 lg:rounded-2xl"
            >
              <GraduationCap className="h-5.5 w-5.5 lg:h-6 lg:w-6" />
            </motion.span>
            <span className="hidden font-display text-xl font-extrabold tracking-tight gradient-text sm:block">
              {t.common.appName}
            </span>
          </Link>

          {/* Desktop nav — floating segmented dock (landing page only;
              app pages navigate via the hamburger drawer + sidebar) */}
          <nav
            className={cn(
              "items-center gap-1 rounded-full border border-border/50 bg-card/50 p-1 backdrop-blur-md",
              isLanding ? "hidden lg:flex" : "hidden"
            )}
            aria-label="Navigasi utama"
          >
            {links.map(({ href, label, icon: Icon, anchor }) => {
              const active = anchor
                ? activeAnchor === href
                : !!pathname?.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => selectAnchor(href, anchor)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative flex items-center rounded-full px-4 py-2.5 text-sm font-bold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 xl:px-5",
                    active ? "text-white" : "text-muted hover:text-primary"
                  )}
                >
                  <AnimatePresence initial={false}>
                    {active && (
                      <motion.span
                        key="pill"
                        layoutId="navbar-active-pill"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-deep-orange shadow-[0_6px_20px_-6px_rgb(255_107_44/0.55)]"
                        initial={reduceMotion ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{
                          opacity: 0,
                          transition: { duration: reduceMotion ? 0 : 0.16 },
                        }}
                        transition={PILL_TRANSITION}
                      />
                    )}
                  </AnimatePresence>
                  <motion.span
                    className="relative z-10 flex items-center gap-2"
                    initial={false}
                    animate={{ scale: active && !reduceMotion ? 1.05 : 1 }}
                    whileHover={active || reduceMotion ? undefined : { scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 420, damping: 16 }}
                  >
                    <motion.span
                      className="flex"
                      initial={false}
                      animate={
                        active && !reduceMotion
                          ? ICON_POP
                          : { scale: 1, rotate: 0 }
                      }
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Icon className="h-4 w-4" />
                    </motion.span>
                    {label}
                  </motion.span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop actions (landing page only) */}
          {isLanding && (
            <div className="hidden items-center gap-2 lg:flex">
              <ThemeToggle />
              <LocaleSwitcher />
              {showXpChip && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={SPRING}
                  title={t.dashboard.totalXP}
                  className="flex items-center gap-1.5 rounded-full border border-secondary/40 bg-secondary/10 px-3 py-2 text-xs font-extrabold text-secondary"
                >
                  <Zap className="h-3.5 w-3.5 fill-current" />
                  {xp} XP
                </motion.span>
              )}
              {!user ? (
                loginButton
              ) : (
                <UserMenu initials={initials} onLogout={handleLogout} />
              )}
            </div>
          )}

          {/* Hamburger actions — mobile on the landing page, every
              viewport on app pages (dashboard, courses, …) */}
          <div
            className={cn(
              "items-center gap-2",
              isLanding ? "flex lg:hidden" : "flex"
            )}
          >
            {showStreakChip && (
              <motion.span
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={SPRING}
                title={t.dashboard.dayStreak}
                className="flex items-center gap-1.5 rounded-full border border-deep-orange/40 bg-deep-orange/10 px-3 py-2 text-xs font-extrabold text-deep-orange"
              >
                <Flame className="h-3.5 w-3.5" />
                <span className="tabular-nums">{streak}</span>
              </motion.span>
            )}
            {!isLanding && <ThemeToggle />}
            {!user ? (
              <Link
                href="/login"
                className="flex items-center rounded-full bg-gradient-to-r from-primary to-deep-orange px-4 py-2 text-sm font-extrabold text-white shadow-soft transition-transform active:scale-95"
              >
                Masuk
              </Link>
            ) : null}
            <motion.button
              type="button"
              onClick={() => setDrawerOpen(true)}
              whileTap={{ scale: 0.88 }}
              aria-label="Buka menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              <Menu className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* ===== Mobile drawer ===== */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className={cn(
                "fixed inset-0 z-50 bg-black/45 backdrop-blur-sm",
                isLanding && "lg:hidden"
              )}
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
              className={cn(
                "fixed inset-y-0 right-0 z-50 flex w-[86%] max-w-xs flex-col overflow-y-auto overscroll-contain border-l border-border bg-card shadow-card sm:max-w-sm",
                isLanding && "lg:hidden"
              )}
              initial="closed"
              animate="open"
              exit="closed"
              variants={asideVariants}
            >
              <div
                className="flex min-h-0 flex-1 flex-col p-5"
                style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1.25rem)" }}
              >
                {/* Drawer header */}
                <motion.div variants={itemVariants} className="flex items-center justify-between">
                  <Link
                    href="/"
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center gap-2.5"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-deep-orange text-white shadow-soft">
                      <GraduationCap className="h-5 w-5" />
                    </span>
                    <span className="font-display text-lg font-extrabold gradient-text">
                      {t.common.appName}
                    </span>
                  </Link>
                  <motion.button
                    type="button"
                    onClick={() => setDrawerOpen(false)}
                    whileTap={{ scale: 0.88 }}
                    aria-label="Tutup menu"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted transition-colors hover:bg-border/40 hover:text-foreground"
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </motion.div>

                {/* User card / login CTA */}
                {user ? (
                  <motion.div
                    variants={itemVariants}
                    className="mt-5 flex items-center gap-3 rounded-2xl border border-border bg-background px-3 py-3"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary to-deep-orange text-sm font-extrabold text-white">
                      {user.avatarUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={user.avatarUrl}
                          alt={user.name}
                          className="h-full w-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        initials
                      )}
                    </span>
                    <div className="min-w-0">
                      <div className="truncate font-display text-sm font-bold">{user.name}</div>
                      <div className="truncate text-xs font-semibold text-muted">{user.email}</div>
                      {hydrated && (
                        <div className="mt-1 flex items-center gap-3 text-[11px] font-bold">
                          <span className="flex items-center gap-1 text-secondary">
                            <Zap className="h-3 w-3 fill-current" />
                            {xp} XP
                          </span>
                          <span className="flex items-center gap-1 text-accent-2">
                            <Flame className="h-3 w-3" />
                            {streak}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div variants={itemVariants}>
                    <Link
                      href="/login"
                      onClick={() => setDrawerOpen(false)}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-deep-orange px-6 py-3 text-base font-extrabold text-white shadow-soft transition-transform active:scale-[0.98]"
                    >
                      Masuk
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </motion.div>
                )}

                {/* Nav links */}
                <motion.nav
                  variants={itemVariants}
                  className="mt-5 space-y-1.5"
                  aria-label="Navigasi utama"
                >
                  {links.map(({ href, label, icon: Icon, anchor }) => {
                    const active = anchor
                      ? activeAnchor === href
                      : !!pathname?.startsWith(href);
                    return (
                      <motion.div key={href} whileTap={{ scale: 0.98 }}>
                        <Link
                          href={href}
                          onClick={() => {
                            setDrawerOpen(false);
                            selectAnchor(href, anchor);
                          }}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "group relative flex items-center gap-3 rounded-xl px-3 py-3.5 text-base font-bold transition-colors duration-200",
                            active
                              ? "text-primary"
                              : "text-foreground hover:bg-background"
                          )}
                        >
                          <AnimatePresence initial={false}>
                            {active && (
                              <motion.span
                                key="drawer-pill"
                                layoutId="drawer-active-pill"
                                className="absolute inset-0 rounded-xl bg-primary/10"
                                initial={reduceMotion ? false : { opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{
                                  opacity: 0,
                                  transition: { duration: reduceMotion ? 0 : 0.16 },
                                }}
                                transition={PILL_TRANSITION}
                              />
                            )}
                          </AnimatePresence>
                          <span
                            className={cn(
                              "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                              active
                                ? "bg-primary/15 text-primary"
                                : "bg-background text-muted group-hover:text-primary"
                            )}
                          >
                            <Icon className="h-4.5 w-4.5" />
                          </span>
                          <motion.span
                            className="relative z-10 origin-left"
                            initial={false}
                            animate={{ scale: active && !reduceMotion ? 1.05 : 1 }}
                            transition={{ type: "spring", stiffness: 420, damping: 17 }}
                          >
                            {label}
                          </motion.span>
                          <ChevronRight
                            className={cn(
                              "relative z-10 ml-auto h-4 w-4 shrink-0 transition-all duration-200 group-hover:translate-x-0.5",
                              active ? "text-primary" : "text-muted/40"
                            )}
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.nav>

                {/* Preferences */}
                <motion.div variants={itemVariants} className="mt-5 border-t border-border pt-4">
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
                            "flex-1 rounded-full px-3 py-1.5 text-sm font-bold transition-all duration-200",
                            locale === l
                              ? "bg-gradient-to-r from-primary to-deep-orange text-white shadow-soft"
                              : "text-muted hover:text-foreground"
                          )}
                        >
                          {l === "id" ? "Indonesia" : "English"}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Logout */}
                {user ? (
                  <motion.button
                    variants={itemVariants}
                    type="button"
                    onClick={handleLogout}
                    className="mt-auto flex items-center gap-3 rounded-xl px-3 py-3.5 pt-3.5 text-sm font-bold text-error transition-colors hover:bg-error/10"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-error/10 text-error">
                      <LogOut className="h-4 w-4" />
                    </span>
                    Keluar
                  </motion.button>
                ) : null}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop avatar dropdown                                             */
/* ------------------------------------------------------------------ */

function UserMenu({
  initials,
  onLogout,
}: {
  initials: string;
  onLogout: () => void;
}) {
  const { user } = useAuth();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  // Close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const avatar = (sizeClass: string) => (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary to-deep-orange font-extrabold text-white",
        sizeClass
      )}
    >
      {user?.avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
      ) : (
        initials
      )}
    </span>
  );

  return (
    <div className="relative">
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.94 }}
        aria-label="Menu akun"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full p-0.5 -m-0.5 transition-shadow duration-200 hover:ring-2 hover:ring-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      >
        {avatar("h-10 w-10 text-sm")}
        <ChevronRight
          className={cn(
            "h-4 w-4 rotate-90 text-muted transition-transform duration-200",
            open && "-rotate-90"
          )}
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 420, damping: 30 }}
              className="absolute right-0 z-50 mt-3 w-64 origin-top-right overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-card"
              role="menu"
            >
              <div className="flex items-center gap-3 rounded-xl bg-background px-3 py-3">
                {avatar("h-11 w-11 text-sm")}
                <div className="min-w-0">
                  <div className="truncate font-display text-sm font-bold">{user?.name}</div>
                  <div className="truncate text-xs font-semibold text-muted">{user?.email}</div>
                </div>
              </div>

              <div className="my-1.5 border-t border-border" />

              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                role="menuitem"
                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-background hover:text-primary"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <LayoutDashboard className="h-4 w-4" />
                </span>
                {t.nav.dashboard}
              </Link>
              <Link
                href="/courses"
                onClick={() => setOpen(false)}
                role="menuitem"
                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-background hover:text-primary"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary/15 text-secondary">
                  <Map className="h-4 w-4" />
                </span>
                {t.nav.courses}
              </Link>
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                role="menuitem"
                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-background hover:text-primary"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/15 text-accent">
                  <CircleUserRound className="h-4 w-4" />
                </span>
                {t.nav.profile}
              </Link>
              <Link
                href="/settings"
                onClick={() => setOpen(false)}
                role="menuitem"
                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-background hover:text-primary"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted/15 text-muted">
                  <Settings className="h-4 w-4" />
                </span>
                {t.nav.settings}
              </Link>

              <div className="my-1.5 border-t border-border" />

              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  onLogout();
                }}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-bold text-error transition-colors hover:bg-error/10"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-error/10">
                  <LogOut className="h-4 w-4" />
                </span>
                Keluar
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
