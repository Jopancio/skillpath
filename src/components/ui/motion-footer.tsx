"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUp, Compass, Gamepad2, GraduationCap, Map, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

// Register ScrollTrigger safely for React (this module is client-only).
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES
// -------------------------------------------------------------------------
// Scoped entirely under .cinematic-footer-wrapper so the marquee/breathe
// keyframes and glass styles never leak into the rest of the app.
// Tokens map onto the project's Tailwind v4 --color-* variables.
const STYLES = `
.cinematic-footer-wrapper {
  /* Dynamic Variables built on the project's Tailwind v4 color tokens */
  --pill-bg-1: color-mix(in oklch, var(--color-foreground) 3%, transparent);
  --pill-bg-2: color-mix(in oklch, var(--color-foreground) 1%, transparent);
  --pill-shadow: color-mix(in oklch, var(--color-background) 50%, transparent);
  --pill-highlight: color-mix(in oklch, var(--color-foreground) 10%, transparent);
  --pill-inset-shadow: color-mix(in oklch, var(--color-background) 80%, transparent);
  --pill-border: color-mix(in oklch, var(--color-foreground) 8%, transparent);

  --pill-bg-1-hover: color-mix(in oklch, var(--color-foreground) 8%, transparent);
  --pill-bg-2-hover: color-mix(in oklch, var(--color-foreground) 2%, transparent);
  --pill-border-hover: color-mix(in oklch, var(--color-foreground) 20%, transparent);
  --pill-shadow-hover: color-mix(in oklch, var(--color-background) 70%, transparent);
  --pill-highlight-hover: color-mix(in oklch, var(--color-foreground) 20%, transparent);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.cinematic-footer-wrapper .animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.cinematic-footer-wrapper .animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 40s linear infinite;
}

/* Theme-adaptive Grid Background */
.cinematic-footer-wrapper .footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, color-mix(in oklch, var(--color-foreground) 3%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--color-foreground) 3%, transparent) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

/* Theme-adaptive Aurora Glow */
.cinematic-footer-wrapper .footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    color-mix(in oklch, var(--color-primary) 15%, transparent) 0%,
    color-mix(in oklch, var(--color-gold) 15%, transparent) 40%,
    transparent 70%
  );
}

/* Glass Pill Theming */
.cinematic-footer-wrapper .footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow:
      0 10px 30px -10px var(--pill-shadow),
      inset 0 1px 1px var(--pill-highlight),
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.cinematic-footer-wrapper .footer-glass-pill:hover,
.cinematic-footer-wrapper .footer-glass-pill:focus-visible {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow:
      0 20px 40px -10px var(--pill-shadow-hover),
      inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--color-foreground);
}

/* Giant Background Text Masking */
.cinematic-footer-wrapper .footer-giant-bg-text {
  font-size: 24vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in oklch, var(--color-foreground) 5%, transparent);
  background: linear-gradient(180deg, color-mix(in oklch, var(--color-foreground) 10%, transparent) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

/* Metallic Text Glow */
.cinematic-footer-wrapper .footer-text-glow {
  background: linear-gradient(180deg, var(--color-foreground) 0%, color-mix(in oklch, var(--color-foreground) 40%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px color-mix(in oklch, var(--color-foreground) 15%, transparent));
}

@media (prefers-reduced-motion: reduce) {
  .cinematic-footer-wrapper .animate-footer-breathe,
  .cinematic-footer-wrapper .animate-footer-scroll-marquee {
    animation: none;
  }
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE (Zero Dependency)
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      // Only attach the magnetic tilt for fine pointers that allow motion.
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference) and (pointer: fine)", () => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(element, {
            x: x * 0.4,
            y: y * 0.4,
            rotationX: -y * 0.15,
            rotationY: x * 0.15,
            scale: 1.05,
            ease: "power2.out",
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      });

      return () => mm.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement | null) => {
          localRef.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. MAIN COMPONENT
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>Belajar Skill Nyata</span> <span className="text-primary/60">✦</span>
    <span>XP &amp; Streak</span> <span className="text-gold/60">✦</span>
    <span>Kuis &amp; Sertifikat</span> <span className="text-primary/60">✦</span>
    <span>Jalur Belajar Terarah</span> <span className="text-gold/60">✦</span>
    <span>Langsung Siap Kerja</span> <span className="text-primary/60">✦</span>
  </div>
);

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/** Footer body shared by the desktop "curtain reveal" and the mobile
 *  static variant — content only, no reveal trickery. */
function FooterContent({ startHref, ctaLabel }: { startHref: string; ctaLabel: string }) {
  const year = new Date().getFullYear();

  return (
    <>
      {/* Ambient Light & Grid Background */}
      <div className="footer-aurora animate-footer-breathe pointer-events-none absolute left-1/2 top-1/2 z-0 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[80px]" />
      <div className="footer-bg-grid pointer-events-none absolute inset-0 z-0" />

      {/* Giant background text */}
      <div
        data-footer-giant
        className="footer-giant-bg-text pointer-events-none absolute -bottom-[4vh] left-1/2 z-0 hidden -translate-x-1/2 select-none whitespace-nowrap md:block"
        aria-hidden
      >
        SKILLPATH
      </div>

      {/* 1. Marquee (top of footer) */}
      <div className="absolute left-0 top-8 z-10 w-full -rotate-2 scale-110 overflow-hidden border-y border-border/50 bg-background/60 py-3 shadow-2xl backdrop-blur-md">
        <div className="animate-footer-scroll-marquee flex w-max text-xs font-bold uppercase tracking-[0.3em] text-muted md:text-sm">
          <MarqueeItem />
          <MarqueeItem />
        </div>
      </div>

      {/* 2. Main Center Content */}
      <div className="relative z-10 mx-auto mt-28 flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6">
        <h2
          data-footer-heading
          className="footer-text-glow mb-10 text-center font-display text-5xl font-black tracking-tighter md:text-7xl"
        >
          Siap mulai belajar?
        </h2>

        {/* Interactive Magnetic Pills Layout */}
        <div data-footer-links className="flex w-full flex-col items-center gap-6">
          {/* Primary actions */}
          <div className="flex w-full flex-wrap justify-center gap-4">
            <MagneticButton
              as={Link}
              href={startHref}
              className="footer-glass-pill flex items-center gap-3 rounded-full bg-primary/10 px-10 py-5 text-sm font-bold text-foreground md:text-base"
            >
              <Zap className="h-5 w-5 text-primary" />
              {ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>

            <MagneticButton
              as={Link}
              href="/courses"
              className="footer-glass-pill flex items-center gap-3 rounded-full px-10 py-5 text-sm font-bold text-foreground md:text-base"
            >
              <Map className="h-5 w-5 text-gold" />
              Jelajahi Kursus
            </MagneticButton>
          </div>

          {/* Secondary anchor links */}
          <div className="mt-2 flex w-full flex-wrap justify-center gap-3 md:gap-6">
            <MagneticButton as="a" href="#features" className="footer-glass-pill flex items-center gap-2 rounded-full px-6 py-3 text-xs font-medium text-muted hover:text-foreground md:text-sm">
              <Gamepad2 className="h-4 w-4" />
              Fitur
            </MagneticButton>
            <MagneticButton as="a" href="#popular" className="footer-glass-pill flex items-center gap-2 rounded-full px-6 py-3 text-xs font-medium text-muted hover:text-foreground md:text-sm">
              <Compass className="h-4 w-4" />
              Kursus Populer
            </MagneticButton>
            <MagneticButton as="a" href="#faq" className="footer-glass-pill rounded-full px-6 py-3 text-xs font-medium text-muted hover:text-foreground md:text-sm">
              FAQ
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* 3. Bottom Bar / Credits */}
      <div className="relative z-20 flex w-full flex-col items-center justify-between gap-6 px-6 pb-8 md:flex-row md:px-12">
        {/* Copyright */}
        <div className="order-2 text-[10px] font-semibold uppercase tracking-widest text-muted md:order-1 md:text-xs">
          © {year} SkillPath. Semua hak dilindungi.
        </div>

        {/* Brand Badge */}
        <div className="footer-glass-pill order-1 flex cursor-default items-center gap-2 rounded-full px-6 py-3 md:order-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-deep-orange text-white shadow-soft">
            <GraduationCap className="h-4 w-4" />
          </span>
          <span className="ml-1 font-display text-xs font-black tracking-normal text-foreground md:text-sm">
            SkillPath
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted md:text-xs">
            Belajar Skill, Buka Jalan Kerja
          </span>
        </div>

        {/* Back to top */}
        <MagneticButton
          as="button"
          onClick={scrollToTop}
          aria-label="Kembali ke atas"
          className="footer-glass-pill group order-3 flex h-12 w-12 items-center justify-center rounded-full text-muted hover:text-foreground"
        >
          <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1.5" />
        </MagneticButton>
      </div>
    </>
  );
}

export interface CinematicFooterProps {
  /** Where the primary CTA points (e.g. "/onboarding" for guests, "/courses" for members). */
  startHref: string;
  /** Label of the primary CTA. */
  ctaLabel: string;
}

export function CinematicFooter({ startHref, ctaLabel }: CinematicFooterProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Scroll parallax only on large screens where the fixed curtain reveal
    // is active, and only for users who allow motion.
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const giant = wrapper.querySelector("[data-footer-giant]");
        const heading = wrapper.querySelector("[data-footer-heading]");
        const links = wrapper.querySelector("[data-footer-links]");

        // Background Parallax
        gsap.fromTo(
          giant,
          { y: "10vh", scale: 0.8, opacity: 0 },
          {
            y: "0vh",
            scale: 1,
            opacity: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 80%",
              end: "bottom bottom",
              scrub: 1,
            },
          }
        );

        // Staggered Content Reveal
        gsap.fromTo(
          [heading, links],
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 40%",
              end: "bottom bottom",
              scrub: 1,
            },
          }
        );
      }, wrapper);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Mobile / touch: static footer — a fixed full-viewport reveal would
          trap small screens and hide the bottom bar. */}
      <footer className="cinematic-footer-wrapper relative flex min-h-[92vh] w-full flex-col justify-between overflow-hidden bg-background text-foreground md:hidden">
        <FooterContent startHref={startHref} ctaLabel={ctaLabel} />
      </footer>

      {/* Desktop: the "Curtain Reveal". The wrapper sits in standard flow;
          its clip-path keeps the fixed footer visible only within its box. */}
      <div
        ref={wrapperRef}
        className="relative hidden h-screen w-full md:block"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer className="cinematic-footer-wrapper fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-background text-foreground">
          <FooterContent startHref={startHref} ctaLabel={ctaLabel} />
        </footer>
      </div>
    </>
  );
}
