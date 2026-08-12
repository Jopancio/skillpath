"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Flame,
  Gamepad2,
  GraduationCap,
  HelpCircle,
  Map,
  Quote,
  Sparkles,
  Star,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useProgress } from "@/hooks/use-progress";
import { useAuth } from "@/lib/auth";
import { useCustomCourses } from "@/hooks/use-custom-courses";
import { courses } from "@/data/courses";
import { CourseCard } from "@/components/course/CourseCard";
import { ButtonLink } from "@/components/ui/button";
import AccordionGallery from "@/components/ui/AccordionGallery";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const featureIcons = [Gamepad2, Map, Wrench, Award];

export default function HomePage() {
  const { t } = useI18n();
  const { onboarded, hydrated } = useProgress();
  const { user } = useAuth();
  const { allCourses } = useCustomCourses();
  const popular = courses.slice(0, 3);
  const featureItems = t.features.items.map((f) => ({
    image: f.image,
    label: f.title,
    description: f.description,
  }));
  const hasFeatureImages = featureItems.every((f) => Boolean(f.image));
  // Logged-in users keep learning; guests go to login first.
  const startHref = user
    ? hydrated && onboarded
      ? "/courses"
      : "/onboarding"
    : "/login";

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        {/* Animated gradient orbs */}
        <div
          className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-primary/20 to-gold/10 blur-3xl animate-pulse"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-gradient-to-tr from-gold/15 to-primary/10 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
          aria-hidden
        />

        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary-hover backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              {t.hero.badge}
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              {t.hero.titleA}{" "}
              <span className="gradient-text">{t.hero.titleB}</span>
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted md:text-lg">
              {t.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={startHref} size="lg">
                {t.hero.cta}
                <ArrowRight className="h-5 w-5" />
              </ButtonLink>
              <ButtonLink href="#popular" variant="outline" size="lg">
                {t.hero.ctaSecondary}
              </ButtonLink>
            </div>

            <div className="mt-10 flex gap-8">
              {[
                { value: "12K+", label: t.hero.stats.learners },
                { value: `${allCourses.length}`, label: t.hero.stats.courses },
                { value: "3.4K", label: t.hero.stats.certificates },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl font-extrabold text-glow md:text-3xl" style={{ color: "#FF6B2C" }}>
                    {s.value}
                  </div>
                  <div className="text-xs font-semibold text-muted">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hero visual: floating cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative hidden justify-center md:flex"
          >
            <div className="relative">
              <div className="animate-float flex h-64 w-64 items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-primary via-deep-orange to-gold shadow-glow">
                <GraduationCap className="h-32 w-32 text-white" strokeWidth={1.2} />
              </div>

              <motion.div
                className="glass absolute -left-16 top-4 flex items-center gap-2 rounded-2xl px-4 py-3 shadow-card"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-deep-orange text-white">
                  <Flame className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-display text-sm font-extrabold">14</div>
                  <div className="text-[10px] font-semibold text-muted">
                    {t.dashboard.dayStreak}
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="glass absolute -right-14 bottom-10 flex items-center gap-2 rounded-2xl px-4 py-3 shadow-card"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.4, repeat: Infinity }}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-gold to-primary text-white">
                  <Zap className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-display text-sm font-extrabold">1,240</div>
                  <div className="text-[10px] font-semibold text-muted">XP</div>
                </div>
              </motion.div>

              <motion.div
                className="glass absolute -bottom-6 left-6 flex items-center gap-2 rounded-2xl px-4 py-3 shadow-card"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: 1 }}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-success to-success/70 text-white">
                  <Award className="h-5 w-5" />
                </span>
                <div className="font-display text-xs font-bold">
                  {t.certificate.title}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="border-y border-border bg-background py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-display text-3xl font-extrabold tracking-tight">
              {t.features.title}
            </h2>
            <p className="mt-3 text-muted">{t.features.subtitle}</p>
          </div>

          {hasFeatureImages ? (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-12"
            >
              <AccordionGallery
                items={featureItems as { image: string; label?: string; description?: string }[]}
                defaultIndex={1}
                accentColor="#FF6B2C"
                overlayColor="#060010"
                expandRatio={0.42}
                trigger="hover"
                height={440}
                grayscale={false}
                tilt={6}
              />
            </motion.div>
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {t.features.items.map((f, i) => {
                const Icon = featureIcons[i];
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                    className="rounded-2xl border border-border bg-card p-6"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 font-display font-bold">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {f.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ===== POPULAR COURSES ===== */}
      <section id="popular" className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-extrabold tracking-tight">
                {t.courses.title}
              </h2>
              <p className="mt-2 text-muted">{t.courses.subtitle}</p>
            </div>
            <Link
              href="/courses"
              className="hidden shrink-0 items-center gap-1 text-sm font-bold text-primary hover:text-primary-hover sm:inline-flex"
            >
              {t.common.viewAll}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
            <div className="animate-marquee flex w-max gap-6 hover:[animation-play-state:paused]">
              {[...popular, ...popular].map((c, i) => (
                <CourseCard
                  key={`${c.id}-${i}`}
                  course={c}
                  plain
                  className="w-80 shrink-0 sm:w-96"
                />
              ))}
            </div>
          </div>

          <div className="mt-8 text-center sm:hidden">
            <ButtonLink href="/courses" variant="outline">
              {t.common.viewAll}
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section id="testimonials" className="border-y border-border bg-card py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary-hover">
              <Users className="h-3.5 w-3.5" />
              {t.testimonials.learners}
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight md:text-4xl">
              {t.testimonials.title}
            </h2>
            <p className="mt-3 text-lg font-semibold text-primary-hover">
              {t.testimonials.subtitle}
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm font-bold text-muted">
              <span className="flex items-center gap-1">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </span>
              {t.testimonials.rating}
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {t.testimonials.items.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="relative flex flex-col rounded-2xl border border-border bg-background p-6 shadow-card"
              >
                <Quote className="absolute right-5 top-5 h-8 w-8 text-primary/15" aria-hidden />
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-deep-orange text-sm font-extrabold text-white">
                    {item.avatar}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate font-display font-bold">{item.name}</div>
                    <div className="truncate text-xs font-semibold text-muted">{item.role}</div>
                  </div>
                  <span className="ml-auto hidden shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary sm:block">
                    {item.course}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-1">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="mx-auto max-w-xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary-hover">
              <HelpCircle className="h-3.5 w-3.5" />
              FAQ
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight md:text-4xl">
              {t.faq.title}
            </h2>
            <p className="mt-3 text-muted">{t.faq.subtitle}</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12"
          >
            <FaqAccordion items={t.faq.items} />
          </motion.div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-deep-orange to-gold p-10 text-center text-white shadow-glow md:p-16"
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px, 60px 60px"
          }}></div>

          <div className="relative z-10">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold leading-tight md:text-4xl">
              {t.hero.titleA} {t.hero.titleB}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/90">{t.hero.subtitle}</p>
            <div className="mt-8">
              <ButtonLink
                href={startHref}
                variant="white"
                size="lg"
                className="shadow-xl"
              >
                {t.hero.cta}
                <ArrowRight className="h-5 w-5" />
              </ButtonLink>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
