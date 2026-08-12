"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Award, GraduationCap, Printer, ShieldCheck } from "lucide-react";
import type { Course } from "@/data/types";
import { useI18n, pick } from "@/lib/i18n";
import { useProgress } from "@/hooks/use-progress";
import { useCustomCourses } from "@/hooks/use-custom-courses";
import { Button, ButtonLink } from "@/components/ui/button";
import { formatDate, generateCertId } from "@/lib/utils";

export function CertificateView({
  courseId,
  initialCourse,
}: {
  courseId: string;
  initialCourse?: Course;
}) {
  const { t } = useI18n();
  const { getCourseById, hydrated: coursesHydrated } = useCustomCourses();

  // AI courses resolve from localStorage once hydrated
  if (!initialCourse && !coursesHydrated) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center text-muted">
        {t.common.loading}
      </div>
    );
  }

  const resolved = initialCourse ?? getCourseById(courseId);
  if (!resolved) notFound();
  return <CertificateContent course={resolved} />;
}

function CertificateContent({ course }: { course: Course }) {
  const { t, locale } = useI18n();
  const { quizResults, userName, setUserName, hydrated } = useProgress();
  const [nameInput, setNameInput] = useState("");

  const result = quizResults[course.id];
  const passed = result?.passed ?? false;

  const certId = useMemo(
    () => (passed ? generateCertId(course.id) : ""),
    [passed, course.id]
  );
  const displayName = userName || nameInput;
  const today = formatDate(new Date(), locale);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center text-muted">
        {t.common.loading}
      </div>
    );
  }

  if (!passed) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-error/10 text-error">
          <Award className="h-8 w-8" />
        </span>
        <h1 className="mt-5 font-display text-xl font-extrabold">
          {t.certificate.notPassed}
        </h1>
        <div className="mt-6">
          <ButtonLink href={`/quiz/${course.id}`}>
            {t.certificate.goToQuiz}
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {/* Name input */}
      {!userName && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="no-print mb-8 rounded-2xl border border-border bg-card p-6 shadow-card"
        >
          <label
            htmlFor="cert-name"
            className="block text-sm font-bold text-foreground"
          >
            {t.certificate.enterName}
          </label>
          <div className="mt-3 flex flex-wrap gap-3">
            <input
              id="cert-name"
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder={t.certificate.namePlaceholder}
              className="min-w-0 flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm outline-none focus:border-primary"
            />
            <Button
              onClick={() => nameInput.trim() && setUserName(nameInput.trim())}
              disabled={!nameInput.trim()}
            >
              {t.certificate.generate}
            </Button>
          </div>
        </motion.div>
      )}

      <div className="no-print mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-extrabold">
          {t.certificate.title}
        </h1>
        <Button onClick={() => window.print()} variant="secondary">
          <Printer className="h-4 w-4" />
          {t.certificate.download}
        </Button>
      </div>

      {/* Certificate */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        id="certificate-print"
        className="relative overflow-hidden rounded-3xl border-4 border-primary/60 bg-card p-1 shadow-soft"
      >
        <div className="relative rounded-[1.35rem] border border-border bg-gradient-to-br from-background to-card px-8 py-12 md:px-16">
          {/* Decorative corners */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10" aria-hidden />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-accent/15" aria-hidden />

          <div className="relative text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-soft">
              <GraduationCap className="h-8 w-8" />
            </div>
            <p className="mt-3 font-display text-sm font-extrabold uppercase tracking-[0.3em] text-primary">
              {t.common.appName}
            </p>
            <h2 className="mt-1 font-display text-2xl font-extrabold md:text-3xl">
              {t.certificate.title}
            </h2>

            <p className="mt-8 text-sm font-semibold text-muted">
              {t.certificate.presentedTo}
            </p>
            <p className="mt-2 border-b-2 border-dashed border-border pb-3 font-display text-3xl font-extrabold text-foreground md:text-4xl">
              {displayName || "___________"}
            </p>

            <p className="mt-6 text-sm font-semibold text-muted">
              {t.certificate.forCompleting}
            </p>
            <p className="mt-1 font-display text-xl font-extrabold text-primary md:text-2xl">
              {pick(locale, course.title)}
            </p>

            <div className="mx-auto mt-8 flex max-w-md items-center justify-between gap-4 text-left">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
                  {t.certificate.issuedOn}
                </p>
                <p className="text-sm font-bold">{today}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
                  {t.certificate.scoreLabel}
                </p>
                <p className="text-sm font-bold">{result.score}%</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
                  {t.certificate.verify}
                </p>
                <p className="flex items-center gap-1 text-sm font-bold text-primary">
                  <ShieldCheck className="h-4 w-4" />
                  {certId}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="no-print mt-6 flex justify-center gap-3">
        <ButtonLink href="/dashboard" variant="outline">
          {t.nav.dashboard}
        </ButtonLink>
        <ButtonLink href="/courses" variant="ghost">
          {t.nav.courses}
        </ButtonLink>
      </div>
    </div>
  );
}
