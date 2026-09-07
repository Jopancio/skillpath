"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* ============================================================ */
/*  PageTransition — branded page-to-page transition             */
/*                                                               */
/*  Sequence on pathname changes outside the main app pages:     */
/*    1. "out"    — the whole page fades away behind a veil of   */
/*                  the app background (chrome included).        */
/*    2. "text"   — "SkillPath" fades in, holds, fades out; the  */
/*                  incoming page is swapped in unseen behind    */
/*                  the opaque veil.                             */
/*    3. "reveal" — the veil lifts while the new page fades and  */
/*                  rises into place.                            */
/*  Navigating mid-sequence retargets it to the newest route.    */
/*  Honors prefers-reduced-motion by swapping instantly.         */
/* ============================================================ */

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_IN: [number, number, number, number] = [0.4, 0, 1, 1];

type Phase = "idle" | "out" | "text" | "reveal";

const OUT_MS = 380;
const TEXT_MS = 1300;
const REVEAL_MS = 640;
const INSTANT_ROUTES = new Set(["/dashboard", "/courses", "/profile", "/settings"]);

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const [phase, setPhase] = useState<Phase>("idle");
  const [instantNavigation, setInstantNavigation] = useState(false);
  const skipMotion = reduceMotion || instantNavigation;
  const [rendered, setRendered] = useState({ pathname, children });
  const [pending, setPending] = useState<{
    pathname: string;
    children: React.ReactNode;
  } | null>(null);

  // Detect navigation render-time (no effect) and kick off — or retarget —
  // the sequence.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    const instant = INSTANT_ROUTES.has(prevPathname) && INSTANT_ROUTES.has(pathname);
    setPrevPathname(pathname);
    setInstantNavigation(instant);
    if (reduceMotion || instant) {
      setPhase("idle");
      setPending(null);
      setRendered({ pathname, children });
    } else {
      setPending({ pathname, children });
      if (phase === "idle") setPhase("out");
    }
  } else if (skipMotion) {
    if (phase !== "idle" || pending) {
      if (pending) setRendered(pending);
      setPending(null);
      setPhase("idle");
    }
  } else if (phase === "text" && pending) {
    // Swap the pending page while it is covered by the veil.
    setRendered(pending);
    setPending(null);
  } else if (phase === "idle" && pending) {
    setPhase("out");
  }

  // Phase driver: pure timers, each phase hands off to the next.
  useEffect(() => {
    if (skipMotion) return;
    if (phase === "out") {
      const id = window.setTimeout(() => setPhase("text"), OUT_MS);
      return () => window.clearTimeout(id);
    }
    if (phase === "text") {
      const id = window.setTimeout(() => setPhase("reveal"), TEXT_MS);
      return () => window.clearTimeout(id);
    }
    if (phase === "reveal") {
      const id = window.setTimeout(() => setPhase("idle"), REVEAL_MS);
      return () => window.clearTimeout(id);
    }
  }, [phase, skipMotion]);

  const veiled = phase !== "idle";
  const contentVisible = phase === "reveal" || phase === "idle";

  return (
    <>
      <motion.div
        key={rendered.pathname}
        initial={false}
        animate={{
          opacity: contentVisible ? 1 : 0,
          y: phase === "out" ? -6 : contentVisible ? 0 : 10,
        }}
        transition={
          skipMotion
            ? { duration: 0, delay: 0 }
            : phase === "out"
              ? { duration: OUT_MS / 1000, ease: EASE_IN }
              : { duration: 0.55, ease: EASE_OUT, delay: 0.08 }
        }
      >
        {rendered.children}
      </motion.div>

      {!skipMotion && (
        <AnimatePresence>
          {veiled && (
            <motion.div
              key="splash-veil"
              aria-hidden
              className="fixed inset-0 z-[70] flex items-center justify-center bg-background"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "reveal" ? 0 : 1 }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              transition={{
                duration: (phase === "reveal" ? REVEAL_MS : OUT_MS) / 1000,
                ease: phase === "reveal" ? EASE_IN : "easeOut",
              }}
            >
              {phase === "text" && (
                <motion.span
                  key="splash-text"
                  initial={{ opacity: 0, y: 16, scale: 0.96 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    y: [16, 0, 0, -8],
                    scale: [0.96, 1, 1, 0.99],
                  }}
                  transition={{
                    delay: 0.1,
                    duration: 1.1,
                    times: [0, 0.28, 0.74, 1],
                    ease: "easeInOut",
                  }}
                  className="gradient-text font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
                >
                  SkillPath
                </motion.span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
