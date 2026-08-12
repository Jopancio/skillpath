"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Check,
  FileText,
  GraduationCap,
  Loader2,
  Plus,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import type { Course } from "@/data/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MAX_PDF_SIZE = 5 * 1024 * 1024; // 5 MB
const MIN_SKILL_LEN = 3;
const MAX_SKILL_LEN = 80;

interface PdfSelection {
  name: string;
  size: number;
  dataUrl: string;
}

interface AICourseDialogProps {
  open: boolean;
  onClose: () => void;
  /** Called with the freshly created course. */
  onCreated: (course: Course) => void;
  /** Optional onboarding profile sent to personalize the course. */
  profile?: Record<string, string | number | undefined>;
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("read failed"));
    reader.readAsDataURL(file);
  });
}

/** Format bytes to a human-readable string. */
function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Modal to create a new course with AI. Two-column layout on desktop:
 * left = input (skill + PDF), right = "what you get" preview.
 * Optionally accepts a reference PDF the AI uses as source material.
 */
export function AICourseDialog({
  open,
  onClose,
  onCreated,
  profile,
}: AICourseDialogProps) {
  const { t } = useI18n();
  const ob = t.onboarding;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={ob.aiDialogTitle}
            className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-soft"
            onClick={(e) => e.stopPropagation()}
          >
            <DialogInner
              key={`open-${open}`}
              profile={profile}
              onCreated={onCreated}
              onClose={onClose}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Form content; remounted on every open so state starts fresh. */
function DialogInner({
  onClose,
  onCreated,
  profile,
}: {
  onClose: () => void;
  onCreated: (course: Course) => void;
  profile?: Record<string, string | number | undefined>;
}) {
  const { t } = useI18n();
  const { user } = useAuth();
  const ob = t.onboarding;

  const [skill, setSkill] = useState("");
  const [pdf, setPdf] = useState<PdfSelection | null>(null);
  const [pdfError, setPdfError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePdf = async (file: File | undefined) => {
    setPdfError("");
    if (!file) return;
    if (file.type !== "application/pdf") {
      setPdfError(ob.aiPdfBadType);
      return;
    }
    if (file.size > MAX_PDF_SIZE) {
      setPdfError(ob.aiPdfTooBig);
      return;
    }
    try {
      const dataUrl = await readAsDataUrl(file);
      setPdf({ name: file.name, size: file.size, dataUrl });
    } catch {
      setPdfError(ob.aiPdfBadType);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (loading) return;
    handlePdf(e.dataTransfer.files?.[0]);
  };

  // Cycle through the "generating" steps while loading so the user
  // sees progress instead of a static spinner.
  // (interval cleared on unmount via the generate() finally path)
  const generate = async () => {
    const s = skill.trim();
    if (s.length < MIN_SKILL_LEN || loading) return;
    setLoading(true);
    setError("");
    setActiveStep(0);
    const stepTimer = window.setInterval(
      () => setActiveStep((p) => Math.min(p + 1, ob.aiGeneratingSteps.length - 1)),
      4000
    );
    try {
      const res = await fetch("/api/generate-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skill: s,
          profile,
          ...(pdf
            ? { pdf: { name: pdf.name, size: pdf.size, data: pdf.dataUrl } }
            : {}),
        }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      const data = (await res.json()) as { course?: Course };
      if (!data.course) throw new Error("no course");
      onCreated(data.course);
    } catch {
      setError(ob.aiError);
    } finally {
      window.clearInterval(stepTimer);
      setLoading(false);
    }
  };

  const canGenerate = skill.trim().length >= MIN_SKILL_LEN && !loading;

  return (
    <div className="flex max-h-[90vh] flex-col">
      {/* ===== Hero header ===== */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-deep-orange to-gold px-6 py-5 text-white">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px, 60px 60px",
          }}
          aria-hidden
        />
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <motion.span
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.05 }}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm"
            >
              <Sparkles className="h-6 w-6" />
            </motion.span>
            <div>
              <span className="inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide backdrop-blur-sm">
                {ob.aiDialogBadge}
              </span>
              <h2 className="mt-1 font-display text-xl font-extrabold leading-tight md:text-2xl">
                {ob.aiDialogTitle}
              </h2>
              <p className="mt-0.5 text-sm font-semibold text-white/85">
                {ob.aiDialogSubtitle}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => !loading && onClose()}
            disabled={loading}
            aria-label="Close"
            className="shrink-0 rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/20 hover:text-white disabled:opacity-40"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* ===== Body: two-column on desktop ===== */}
      <div className="grid flex-1 grid-cols-1 overflow-y-auto md:grid-cols-[1.2fr_1fr]">
        {/* ----- Left: input column ----- */}
        <div className="p-6">
          {/* Skill input */}
          <label className="block">
            <span className="flex items-center gap-1.5 text-sm font-extrabold text-foreground">
              <BookOpen className="h-4 w-4 text-primary" />
              {ob.aiInputLabel}
            </span>
            <div className="relative mt-2">
              <input
                type="text"
                value={skill}
                onChange={(e) => setSkill(e.target.value.slice(0, MAX_SKILL_LEN))}
                onKeyDown={(e) => e.key === "Enter" && canGenerate && generate()}
                placeholder={ob.aiPlaceholder}
                disabled={loading}
                maxLength={MAX_SKILL_LEN}
                autoFocus
                className="w-full rounded-2xl border-2 border-border bg-background px-4 py-3.5 pr-16 text-sm font-semibold outline-none transition-colors placeholder:font-normal placeholder:text-muted focus:border-primary disabled:opacity-60"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted">
                {skill.length}/{MAX_SKILL_LEN}
              </span>
            </div>
            <p className="mt-1.5 text-xs font-semibold text-muted">{ob.aiInputHint}</p>
          </label>

          {/* Suggestion chips */}
          <div className="mt-4">
            <p className="text-xs font-bold text-muted">{ob.aiSuggestions}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {ob.aiSuggestionList.map((s, i) => (
                <button
                  key={s}
                  type="button"
                  disabled={loading}
                  onClick={() => setSkill(s)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-bold transition-all disabled:opacity-50",
                    skill === s
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-muted hover:border-primary/50 hover:text-primary"
                  )}
                >
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    {s}
                  </motion.span>
                </button>
              ))}
            </div>
          </div>

          {/* PDF dropzone */}
          <div className="mt-5">
            <p className="text-xs font-extrabold text-foreground">{ob.aiPdfLabel}</p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-muted">
              {ob.aiPdfHint}
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={(e) => handlePdf(e.target.files?.[0])}
              className="hidden"
            />

            {pdf ? (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 flex items-center gap-3 rounded-2xl border-2 border-primary/40 bg-primary/5 px-4 py-3"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-error/15 text-error">
                  <FileText className="h-4.5 w-4.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold">{pdf.name}</p>
                  <p className="text-[10px] font-semibold text-muted">
                    {formatSize(pdf.size)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={loading}
                  className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-extrabold text-primary transition-colors hover:bg-primary/10 disabled:opacity-50"
                >
                  {ob.aiPdfReplace}
                </button>
                <button
                  type="button"
                  onClick={() => setPdf(null)}
                  disabled={loading}
                  className="shrink-0 rounded-full p-1 text-muted transition-colors hover:text-error disabled:opacity-50"
                  aria-label={ob.aiPdfRemove}
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                disabled={loading}
                className={cn(
                  "mt-3 flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-4 py-7 text-center transition-all disabled:opacity-50",
                  isDragging
                    ? "border-primary bg-primary/10"
                    : "border-border bg-background hover:border-primary/50 hover:bg-primary/5"
                )}
              >
                <Upload className="h-6 w-6 text-primary" />
                <span className="text-xs font-bold text-muted">
                  {ob.aiPdfDropHere}{" "}
                  <span className="text-primary">{ob.aiPdfAdd}</span>
                </span>
              </button>
            )}

            {pdfError && (
              <p className="mt-2 text-[11px] font-bold text-error">{pdfError}</p>
            )}
          </div>

          {error && (
            <p className="mt-3 rounded-xl bg-error/10 px-4 py-2.5 text-xs font-bold text-error">
              {error}
            </p>
          )}

          {/* CTA */}
          <Button
            type="button"
            onClick={generate}
            disabled={!canGenerate}
            className="mt-5 w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                {ob.aiGenerating}
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                {ob.aiGenerate}
              </>
            )}
          </Button>
          <p className="mt-2.5 text-center text-[11px] font-semibold text-muted">
            {ob.aiHint}
          </p>
          {!user && (
            <p className="mt-1.5 text-center text-[11px] font-semibold text-primary">
              {ob.aiLoginHint ?? ""}
            </p>
          )}
        </div>

        {/* ----- Right: preview / generating column ----- */}
        <div className="border-t border-border bg-background/50 p-6 md:border-l md:border-t-0">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="generating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-full flex-col"
              >
                <h3 className="font-display text-sm font-extrabold">
                  {ob.aiGenerating}
                </h3>
                <div className="mt-4 space-y-3">
                  {ob.aiGeneratingSteps.map((step, i) => {
                    const done = i < activeStep;
                    const current = i === activeStep;
                    return (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <span
                          className={cn(
                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white transition-colors",
                            done
                              ? "bg-success"
                              : current
                                ? "bg-gradient-to-br from-primary to-deep-orange"
                                : "bg-border"
                          )}
                        >
                          {done ? (
                            <Check className="h-4 w-4" />
                          ) : current ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <span className="text-[10px] font-extrabold text-muted">
                              {i + 1}
                            </span>
                          )}
                        </span>
                        <span
                          className={cn(
                            "text-xs font-bold transition-colors",
                            done || current ? "text-foreground" : "text-muted"
                          )}
                        >
                          {step}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
                <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary via-deep-orange to-gold"
                    initial={{ width: "5%" }}
                    animate={{ width: "90%" }}
                    transition={{ duration: 25, ease: "easeOut" }}
                  />
                </div>
                <p className="mt-3 text-center text-[11px] font-semibold text-muted">
                  {ob.aiHint}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-full flex-col"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-gold/10 text-primary">
                  <GraduationCap className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <h3 className="mt-3 font-display text-base font-extrabold">
                  {ob.aiPreviewTitle}
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {ob.aiPreviewItems.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-center gap-2.5"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-xs font-semibold text-foreground/90">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-auto rounded-2xl border border-dashed border-border bg-card/60 p-3.5">
                  <p className="flex items-center gap-1.5 text-[11px] font-bold text-muted">
                    <Sparkles className="h-3.5 w-3.5 text-accent-2" />
                    {ob.aiDialogDesc}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
