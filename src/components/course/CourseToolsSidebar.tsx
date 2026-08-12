"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Home,
  Layers,
  Loader2,
  NotebookPen,
  RefreshCw,
  Send,
  Sparkles,
  Trophy,
  X,
  XCircle,
} from "lucide-react";
import type { Course } from "@/data/types";
import { useI18n, pick } from "@/lib/i18n";
import { MarkdownText } from "@/components/ui/markdown";
import { cn } from "@/lib/utils";

/* ------------------------------ storage ------------------------------ */

interface Flashcard {
  id: string;
  front: string;
  back: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function coursePayload(course: Course, locale: "id" | "en") {
  return {
    title: pick(locale, course.title),
    description: pick(locale, course.longDescription),
    modules: course.modules.map((m) => ({
      title: pick(locale, m.title),
      lessons: m.lessons.map((l) => pick(locale, l.title)),
    })),
  };
}

async function callAssistant(body: Record<string, unknown>) {
  const res = await fetch("/api/course-assistant", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("ai_failed");
  return res.json();
}

type ToolId = "home" | "notes" | "flashcards" | "quiz" | "ai" | "mindmap";

/* ------------------------------ component ----------------------------- */

export function CourseToolsSidebar({
  course,
  homeContent,
  completedLessons,
}: {
  course: Course;
  homeContent: ReactNode;
  completedLessons?: ReadonlySet<string>;
}) {
  const { t } = useI18n();
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState<ToolId>("home");

  const tools: { id: ToolId; label: string; icon: typeof Home }[] = [
    { id: "home", label: t.nav.home, icon: Home },
    { id: "notes", label: t.studyTools.notes, icon: NotebookPen },
    { id: "flashcards", label: t.studyTools.flashcards, icon: Layers },
    { id: "quiz", label: t.studyTools.quiz, icon: Trophy },
    { id: "ai", label: t.studyTools.ai, icon: Sparkles },
    { id: "mindmap", label: t.studyTools.mindmap, icon: Brain },
  ];

  const ActiveIcon = tools.find((x) => x.id === active)?.icon ?? Home;

  return (
    <>
      {/* Sidebar */}
      <aside
        className={cn(
          "sticky top-28 h-fit shrink-0 self-start overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-all duration-300 max-lg:hidden",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3.5">
          {!collapsed && (
            <span className="flex items-center gap-2 font-display text-sm font-extrabold">
              <Sparkles className="h-4 w-4 text-primary" />
              {t.studyTools.title}
            </span>
          )}
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Expand" : "Collapse"}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-background hover:text-foreground",
              collapsed && "mx-auto"
            )}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4 rotate-90" />
            )}
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-2.5">
          {tools.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setActive(id);
                setCollapsed(false);
              }}
              title={label}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-bold transition-colors",
                active === id
                  ? "bg-gradient-to-r from-primary to-deep-orange text-white"
                  : "text-muted hover:bg-background hover:text-foreground",
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span className="truncate">{label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Content area: home shows the course content, others show the tool */}
      <div className="min-w-0 flex-1">
        {active === "home" ? (
          <div>{homeContent}</div>
        ) : (
          <div className="rounded-3xl border border-border bg-card shadow-card">
            <div className="flex items-center gap-2.5 border-b border-border px-5 py-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <ActiveIcon className="h-5 w-5" />
              </span>
              <h2 className="font-display text-base font-extrabold">
                {tools.find((x) => x.id === active)?.label}
              </h2>
            </div>
            <div className="p-5">
              {active === "notes" && (
                <NotesTool course={course} completedLessons={completedLessons} />
              )}
              {active === "flashcards" && <FlashcardsTool course={course} />}
              {active === "quiz" && <QuizTool course={course} />}
              {active === "ai" && <AiTool course={course} />}
              {active === "mindmap" && <MindmapTool course={course} />}
            </div>
          </div>
        )}
      </div>

      {/* Mobile: bottom tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-border bg-card/95 px-2 py-2 backdrop-blur-xl lg:hidden">
        {tools.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActive(id)}
            className={cn(
              "flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-[10px] font-bold transition-colors",
              active === id ? "text-primary" : "text-muted"
            )}
          >
            <Icon className="h-5 w-5" />
            {label}
          </button>
        ))}
      </nav>
    </>
  );
}

/* ------------------------------ Generating ---------------------------- */

function Generating({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-background p-10 text-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm font-semibold text-muted">{label}</p>
    </div>
  );
}

function EmptyGenerate({
  message,
  buttonLabel,
  onGenerate,
  error,
}: {
  message: string;
  buttonLabel: string;
  onGenerate: () => void;
  error?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-background p-10 text-center">
      <Sparkles className="h-8 w-8 text-primary" />
      <p className="max-w-sm text-sm text-muted">{message}</p>
      <button
        type="button"
        onClick={onGenerate}
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-deep-orange px-6 py-3 text-sm font-bold text-white shadow-soft transition-transform hover:scale-105"
      >
        <Sparkles className="h-4 w-4" />
        {buttonLabel}
      </button>
      {error && <ErrorNote />}
    </div>
  );
}

function ErrorNote() {
  const { t } = useI18n();
  return <p className="text-sm font-semibold text-error">{t.studyTools.aiGenError}</p>;
}

/* -------------------------------- Notes -------------------------------- */

interface ManualNote {
  id: string;
  text: string;
}

function NotesTool({
  course,
  completedLessons,
}: {
  course: Course;
  completedLessons?: ReadonlySet<string>;
}) {
  const { t, locale } = useI18n();
  const notesKey = `skillpath-ai-notes-${course.id}`;
  const manualKey = `skillpath-manual-notes-${course.id}`;
  const [notes, setNotes] = useState<Record<number, string>>(() =>
    load<Record<number, string>>(notesKey, {})
  );
  const [manualNotes, setManualNotes] = useState<Record<number, ManualNote[]>>(() =>
    load<Record<number, ManualNote[]>>(manualKey, {})
  );
  const [openPhase, setOpenPhase] = useState(0);
  const [loadingPhase, setLoadingPhase] = useState<number | null>(null);
  const [errorPhase, setErrorPhase] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const [openLesson, setOpenLesson] = useState<string | null>(null);

  const modules = useMemo(
    () =>
      course.modules.map((m) => ({
        title: pick(locale, m.title),
        lessons: m.lessons.map((l) => ({
          id: l.id,
          title: pick(locale, l.title),
          duration: l.duration,
          xp: l.xp,
          body: l.body ? pick(locale, l.body) : "",
        })),
      })),
    [course, locale]
  );

  const generatePhase = async (phaseIndex: number) => {
    setLoadingPhase(phaseIndex);
    setErrorPhase(null);
    const mod = modules[phaseIndex];
    try {
      const data = await callAssistant({
        action: "notes",
        course: {
          title: `${pick(locale, course.title)} — ${mod.title}`,
          description: pick(locale, course.longDescription),
          modules: [
            { title: mod.title, lessons: mod.lessons.map((l) => l.title) },
          ],
        },
        locale,
      });
      const text = typeof data?.notes === "string" ? data.notes : "";
      if (!text) throw new Error("empty");
      setNotes((prev) => {
        const next = { ...prev, [phaseIndex]: text };
        save(notesKey, next);
        return next;
      });
    } catch {
      setErrorPhase(phaseIndex);
    } finally {
      setLoadingPhase(null);
    }
  };

  const addManualNote = (phaseIndex: number) => {
    const text = draft.trim();
    if (!text) return;
    setManualNotes((prev) => {
      const list = prev[phaseIndex] ?? [];
      const next = { ...prev, [phaseIndex]: [...list, { id: uid(), text }] };
      save(manualKey, next);
      return next;
    });
    setDraft("");
  };

  const deleteManualNote = (phaseIndex: number, noteId: string) => {
    setManualNotes((prev) => {
      const list = (prev[phaseIndex] ?? []).filter((n) => n.id !== noteId);
      const next = { ...prev, [phaseIndex]: list };
      save(manualKey, next);
      return next;
    });
  };

  return (
    <div>
      <p className="text-sm text-muted">{t.studyTools.phaseNotesDesc}</p>

      <div className="mt-5 space-y-3">
        {modules.map((mod, mi) => {
          const open = openPhase === mi;
          const phaseNotes = notes[mi];
          const phaseManual = manualNotes[mi] ?? [];
          const isLoading = loadingPhase === mi;
          const hasError = errorPhase === mi;

          return (
            <div
              key={mi}
              className="overflow-hidden rounded-2xl border border-border bg-background"
            >
              {/* Phase header */}
              <button
                type="button"
                onClick={() => setOpenPhase(open ? -1 : mi)}
                className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-card"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-deep-orange font-display text-sm font-extrabold text-white">
                  {mi + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    {t.studyTools.phase} {mi + 1}
                  </div>
                  <div className="truncate font-display text-sm font-bold">
                    {mod.title}
                  </div>
                  <div className="text-xs font-semibold text-muted">
                    {mod.lessons.length} {t.common.lessons}
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-muted transition-transform duration-300",
                    open && "rotate-180"
                  )}
                />
              </button>

              {/* Phase body */}
              {open && (
                <div className="border-t border-border p-4">
                  {/* Lesson list (click to open lesson note) */}
                  <div className="space-y-1.5">
                    {mod.lessons.map((lesson, li) => {
                      const isDone = completedLessons?.has(lesson.id) ?? false;
                      return (
                        <button
                          key={li}
                          type="button"
                          onClick={() => setOpenLesson(lesson.id)}
                          className="flex w-full items-center gap-2 rounded-lg bg-card px-3 py-2 text-left text-xs font-semibold text-muted transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-foreground"
                        >
                          <span
                            className={cn(
                              "flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                              isDone ? "bg-success text-white" : "bg-primary/20 text-primary"
                            )}
                          >
                            {isDone ? (
                              <CheckCircle2 className="h-3 w-3" />
                            ) : (
                              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            )}
                          </span>
                          <span className="flex-1">{lesson.title}</span>
                          <span className="shrink-0 text-[10px] text-muted/70">
                            {lesson.duration} {t.common.minutes} · {lesson.xp} XP
                          </span>
                          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted/50" />
                        </button>
                      );
                    })}
                  </div>

                  {/* AI notes */}
                  <div className="mt-4">
                    {isLoading ? (
                      <Generating label={t.studyTools.generating} />
                    ) : phaseNotes ? (
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                            <Sparkles className="h-3.5 w-3.5" />
                            {t.studyTools.generatedByAi}
                          </span>
                          <button
                            type="button"
                            onClick={() => generatePhase(mi)}
                            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-bold text-muted transition-colors hover:bg-card hover:text-foreground"
                          >
                            <RefreshCw className="h-3.5 w-3.5" />
                            {t.studyTools.regenerate}
                          </button>
                        </div>
                        <div className="mt-3 rounded-xl border border-border bg-card p-4">
                          <MarkdownText text={phaseNotes} className="text-sm" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-card p-5 text-center">
                        <p className="text-xs text-muted">{t.studyTools.phaseNotesEmpty}</p>
                        <button
                          type="button"
                          onClick={() => generatePhase(mi)}
                          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-deep-orange px-4 py-2 text-xs font-bold text-white"
                        >
                          <Sparkles className="h-3.5 w-3.5" />
                          {t.studyTools.notesGenerate}
                        </button>
                        {hasError && <ErrorNote />}
                      </div>
                    )}
                  </div>

                  {/* Manual notes */}
                  {phaseManual.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {phaseManual.map((n) => (
                        <div
                          key={n.id}
                          className="flex items-start justify-between gap-2 rounded-xl border border-border bg-card p-3"
                        >
                          <p className="whitespace-pre-wrap text-sm leading-relaxed">{n.text}</p>
                          <button
                            type="button"
                            onClick={() => deleteManualNote(mi, n.id)}
                            aria-label={t.studyTools.deleteNoteConfirm}
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-error/10 hover:text-error"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add manual note */}
                  <div className="mt-4 flex gap-2">
                    <input
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addManualNote(mi)}
                      placeholder={t.studyTools.addNotePlaceholder}
                      className="flex-1 rounded-full border border-border bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => addManualNote(mi)}
                      disabled={!draft.trim()}
                      className="shrink-0 rounded-full bg-gradient-to-r from-primary to-deep-orange px-4 py-2.5 text-sm font-bold text-white transition-opacity disabled:opacity-40"
                    >
                      {t.studyTools.addNote}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Lesson note modal */}
      {openLesson && (
        <LessonNoteDialog
          course={course}
          lessonId={openLesson}
          onClose={() => setOpenLesson(null)}
        />
      )}
    </div>
  );
}

/* --------------------------- Lesson note dialog ------------------------ */

function LessonNoteDialog({
  course,
  lessonId,
  onClose,
}: {
  course: Course;
  lessonId: string;
  onClose: () => void;
}) {
  const { t, locale } = useI18n();
  const notesKey = `skillpath-ai-lesson-note-${course.id}-${lessonId}`;
  const manualKey = `skillpath-manual-lesson-notes-${course.id}-${lessonId}`;

  const lesson = useMemo(() => {
    for (const m of course.modules) {
      const found = m.lessons.find((l) => l.id === lessonId);
      if (found) {
        return {
          title: pick(locale, found.title),
          duration: found.duration,
          xp: found.xp,
          body: found.body ? pick(locale, found.body) : "",
          moduleTitle: pick(locale, m.title),
        };
      }
    }
    return null;
  }, [course, lessonId, locale]);

  const [aiNote, setAiNote] = useState<string>(() => load<string>(notesKey, ""));
  const [manual, setManual] = useState<ManualNote[]>(() =>
    load<ManualNote[]>(manualKey, [])
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [draft, setDraft] = useState("");

  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  if (!lesson) return null;

  const generate = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await callAssistant({
        action: "notes",
        course: {
          title: `${pick(locale, course.title)} — ${lesson.title}`,
          description: pick(locale, course.longDescription),
          modules: [{ title: lesson.moduleTitle, lessons: [lesson.title] }],
        },
        locale,
      });
      const text = typeof data?.notes === "string" ? data.notes : "";
      if (!text) throw new Error("empty");
      setAiNote(text);
      save(notesKey, text);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const addManual = () => {
    const text = draft.trim();
    if (!text) return;
    const next = [...manual, { id: uid(), text }];
    setManual(next);
    save(manualKey, next);
    setDraft("");
  };

  const deleteManual = (noteId: string) => {
    const next = manual.filter((n) => n.id !== noteId);
    setManual(next);
    save(manualKey, next);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      {/* Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        role="dialog"
        aria-label={lesson.title}
        className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div className="min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-widest text-primary">
              {lesson.moduleTitle}
            </div>
            <h3 className="mt-0.5 truncate font-display text-lg font-extrabold">
              {lesson.title}
            </h3>
            <div className="mt-1 flex items-center gap-3 text-xs font-semibold text-muted">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {lesson.duration} {t.common.minutes}
              </span>
              <span className="flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" />
                {lesson.xp} XP
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors hover:bg-background hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 space-y-5 overflow-y-auto p-5">
          {/* Lesson material */}
          {lesson.body && (
            <div>
              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-muted">
                {t.studyTools.notes}
              </div>
              <div className="rounded-2xl border border-border bg-background p-4">
                <MarkdownText text={lesson.body} className="text-sm" />
              </div>
            </div>
          )}

          {/* AI note */}
          <div>
            {loading ? (
              <Generating label={t.studyTools.generating} />
            ) : aiNote ? (
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                    <Sparkles className="h-3.5 w-3.5" />
                    {t.studyTools.generatedByAi}
                  </span>
                  <button
                    type="button"
                    onClick={generate}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-bold text-muted transition-colors hover:bg-background hover:text-foreground"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    {t.studyTools.regenerate}
                  </button>
                </div>
                <div className="mt-3 rounded-2xl border border-border bg-background p-4">
                  <MarkdownText text={aiNote} className="text-sm" />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-background p-6 text-center">
                <p className="text-sm text-muted">{t.studyTools.phaseNotesEmpty}</p>
                <button
                  type="button"
                  onClick={generate}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-deep-orange px-5 py-2.5 text-sm font-bold text-white"
                >
                  <Sparkles className="h-4 w-4" />
                  {t.studyTools.notesGenerate}
                </button>
                {error && <ErrorNote />}
              </div>
            )}
          </div>

          {/* Manual notes */}
          {manual.length > 0 && (
            <div className="space-y-2">
              {manual.map((n) => (
                <div
                  key={n.id}
                  className="flex items-start justify-between gap-2 rounded-2xl border border-border bg-background p-3"
                >
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{n.text}</p>
                  <button
                    type="button"
                    onClick={() => deleteManual(n.id)}
                    aria-label={t.studyTools.deleteNoteConfirm}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-error/10 hover:text-error"
                  >
                    <XCircle className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer: add manual note */}
        <div className="flex gap-2 border-t border-border p-4">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addManual()}
            placeholder={t.studyTools.addNotePlaceholder}
            className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
          />
          <button
            type="button"
            onClick={addManual}
            disabled={!draft.trim()}
            className="shrink-0 rounded-full bg-gradient-to-r from-primary to-deep-orange px-5 py-2.5 text-sm font-bold text-white transition-opacity disabled:opacity-40"
          >
            {t.studyTools.addNote}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------ Flashcards ----------------------------- */

function FlashcardsTool({ course }: { course: Course }) {
  const { t, locale } = useI18n();
  const key = `skillpath-ai-flashcards-${course.id}`;
  const [cards, setCards] = useState<Flashcard[]>(() => load<Flashcard[]>(key, []));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const generate = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await callAssistant({
        action: "flashcards",
        course: coursePayload(course, locale),
        locale,
      });
      const raw = Array.isArray(data?.cards) ? data.cards : [];
      const next: Flashcard[] = raw.map((c: { front: string; back: string }) => ({
        id: uid(),
        front: c.front,
        back: c.back,
      }));
      if (next.length === 0) throw new Error("empty");
      setCards(next);
      save(key, next);
      setIndex(0);
      setFlipped(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Generating label={t.studyTools.generating} />;

  if (cards.length === 0) {
    return (
      <EmptyGenerate
        message={t.studyTools.flashcardsAiEmpty}
        buttonLabel={t.studyTools.flashcardsGenerate}
        onGenerate={generate}
        error={error}
      />
    );
  }

  const current = cards[index];

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          {t.studyTools.generatedByAi} · {cards.length}
        </span>
        <button
          type="button"
          onClick={generate}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-bold text-muted transition-colors hover:bg-background hover:text-foreground"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          {t.studyTools.regenerate}
        </button>
      </div>

      <button
        type="button"
        onClick={() => setFlipped((v) => !v)}
        aria-label={t.studyTools.flashcardFlip}
        className="mt-4 flex min-h-48 w-full flex-col items-center justify-center rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-gold/10 p-6 text-center transition-transform hover:scale-[1.01]"
      >
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          {flipped ? t.studyTools.flashcardBack : t.studyTools.flashcardFront}
        </span>
        <span className="mt-3 text-lg font-bold">
          {flipped ? current.back : current.front}
        </span>
        <span className="mt-3 text-xs font-semibold text-muted">
          {t.studyTools.flashcardFlip} · {index + 1}/{cards.length}
        </span>
      </button>

      <div className="mt-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            setIndex((i) => (i - 1 + cards.length) % cards.length);
            setFlipped(false);
          }}
          className="inline-flex items-center gap-1 rounded-full border border-border px-4 py-2 text-sm font-bold text-muted hover:bg-background hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.studyTools.flashcardPrev}
        </button>
        <button
          type="button"
          onClick={() => {
            setIndex((i) => (i + 1) % cards.length);
            setFlipped(false);
          }}
          className="inline-flex items-center gap-1 rounded-full border border-border px-4 py-2 text-sm font-bold text-muted hover:bg-background hover:text-foreground"
        >
          {t.studyTools.flashcardNext}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* -------------------------------- Quiz --------------------------------- */

type Difficulty = "easy" | "medium" | "hard";

function QuizTool({ course }: { course: Course }) {
  const { t, locale } = useI18n();
  const key = `skillpath-ai-quiz-${course.id}`;
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [questions, setQuestions] = useState<QuizQuestion[]>(() =>
    load<QuizQuestion[]>(key, [])
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);

  const generate = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await callAssistant({
        action: "quiz",
        difficulty,
        course: coursePayload(course, locale),
        locale,
      });
      const qs: QuizQuestion[] = Array.isArray(data?.questions) ? data.questions : [];
      if (qs.length === 0) throw new Error("empty");
      setQuestions(qs);
      save(key, qs);
      setCurrent(0);
      setSelected(null);
      setChecked(false);
      setAnswers([]);
      setFinished(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const difficulties: { id: Difficulty; label: string }[] = [
    { id: "easy", label: t.studyTools.easy },
    { id: "medium", label: t.studyTools.medium },
    { id: "hard", label: t.studyTools.hard },
  ];

  if (loading) return <Generating label={t.studyTools.generating} />;

  /* ----- setup screen ----- */
  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-2xl border border-dashed border-border bg-background p-10 text-center">
        <Trophy className="h-8 w-8 text-primary" />
        <p className="max-w-sm text-sm text-muted">{t.studyTools.quizAiDesc}</p>
        <div className="w-full max-w-xs">
          <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">
            {t.studyTools.difficulty}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {difficulties.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDifficulty(d.id)}
                className={cn(
                  "rounded-full border-2 px-4 py-2.5 text-sm font-bold transition-colors",
                  difficulty === d.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-muted hover:border-primary/40"
                )}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={generate}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-deep-orange px-6 py-3 text-sm font-bold text-white shadow-soft transition-transform hover:scale-105"
        >
          <Sparkles className="h-4 w-4" />
          {t.studyTools.quizGenerate}
        </button>
        {error && <ErrorNote />}
      </div>
    );
  }

  /* ----- results screen ----- */
  if (finished) {
    const correct = answers.filter(Boolean).length;
    const percent = Math.round((correct / questions.length) * 100);
    return (
      <div className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-background p-10 text-center">
        <span
          className={cn(
            "flex h-16 w-16 items-center justify-center rounded-full",
            percent >= 70 ? "bg-success/15 text-success" : "bg-error/15 text-error"
          )}
        >
          <Trophy className="h-8 w-8" />
        </span>
        <div>
          <div className="font-display text-3xl font-extrabold">{percent}%</div>
          <div className="mt-1 text-sm font-semibold text-muted">
            {t.studyTools.quizScore} · {correct}/{questions.length} {t.studyTools.quizCorrect}
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              setCurrent(0);
              setSelected(null);
              setChecked(false);
              setAnswers([]);
              setFinished(false);
            }}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-bold text-muted hover:bg-card hover:text-foreground"
          >
            <RefreshCw className="h-4 w-4" />
            {t.studyTools.quizRetry}
          </button>
          <button
            type="button"
            onClick={() => setQuestions([])}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-deep-orange px-5 py-2.5 text-sm font-bold text-white"
          >
            <Sparkles className="h-4 w-4" />
            {t.studyTools.quizNewQuiz}
          </button>
        </div>
      </div>
    );
  }

  /* ----- question screen ----- */
  const q = questions[current];
  const isLast = current === questions.length - 1;

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-muted">
          {t.studyTools.quizQuestion} {current + 1} {t.studyTools.quizOf} {questions.length}
        </span>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
          {difficulties.find((d) => d.id === difficulty)?.label}
        </span>
      </div>

      {/* progress dots */}
      <div className="mt-3 flex gap-1.5">
        {questions.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full",
              i < current
                ? answers[i]
                  ? "bg-success"
                  : "bg-error"
                : i === current
                  ? "bg-primary"
                  : "bg-border"
            )}
          />
        ))}
      </div>

      <h3 className="mt-5 font-display text-lg font-bold leading-snug">{q.question}</h3>

      <div className="mt-4 space-y-2.5">
        {q.options.map((opt, oi) => {
          const isSelected = selected === oi;
          const isCorrect = checked && oi === q.correctIndex;
          const isWrong = checked && isSelected && oi !== q.correctIndex;
          return (
            <button
              key={oi}
              type="button"
              disabled={checked}
              onClick={() => setSelected(oi)}
              className={cn(
                "flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left text-sm font-semibold transition-colors",
                isCorrect
                  ? "border-success bg-success/10 text-success"
                  : isWrong
                    ? "border-error bg-error/10 text-error"
                    : isSelected
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background hover:border-primary/40"
              )}
            >
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-extrabold",
                  isCorrect
                    ? "border-success bg-success text-white"
                    : isWrong
                      ? "border-error bg-error text-white"
                      : isSelected
                        ? "border-primary bg-primary text-white"
                        : "border-border text-muted"
                )}
              >
                {isCorrect ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : isWrong ? (
                  <XCircle className="h-4 w-4" />
                ) : (
                  String.fromCharCode(65 + oi)
                )}
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {checked && q.explanation && (
        <p className="mt-4 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm leading-relaxed text-muted">
          <span className="font-bold text-primary">{t.studyTools.quizExplanation}: </span>
          {q.explanation}
        </p>
      )}

      <div className="mt-5 flex justify-end">
        {!checked ? (
          <button
            type="button"
            disabled={selected === null}
            onClick={() => {
              setChecked(true);
              setAnswers((a) => {
                const next = [...a];
                next[current] = selected === q.correctIndex;
                return next;
              });
            }}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-deep-orange px-6 py-2.5 text-sm font-bold text-white transition-opacity disabled:opacity-40"
          >
            {t.studyTools.quizCheck}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              if (isLast) {
                setFinished(true);
              } else {
                setCurrent((c) => c + 1);
                setSelected(null);
                setChecked(false);
              }
            }}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-deep-orange px-6 py-2.5 text-sm font-bold text-white"
          >
            {isLast ? t.studyTools.quizFinish : t.studyTools.quizNext}
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

/* --------------------------------- AI ---------------------------------- */

function AiTool({ course }: { course: Course }) {
  const { t, locale } = useI18n();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, loading]);

  const send = async () => {
    const question = input.trim();
    if (!question || loading) return;
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: question }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    try {
      const data = await callAssistant({
        action: "chat",
        question,
        course: coursePayload(course, locale),
        history: messages.slice(-6),
        locale,
      });
      const answer =
        typeof data?.answer === "string" && data.answer ? data.answer : t.studyTools.aiError;
      setMessages([...nextMessages, { role: "assistant", content: answer }]);
    } catch {
      setMessages([...nextMessages, { role: "assistant", content: t.studyTools.aiError }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[420px] flex-col">
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto pr-1">
        {messages.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border bg-background p-6 text-center text-sm text-muted">
            {t.studyTools.aiEmpty}
          </p>
        ) : (
          messages.map((m, i) => (
            <div
              key={i}
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                m.role === "user"
                  ? "ml-auto bg-gradient-to-r from-primary to-deep-orange text-white"
                  : "border border-border bg-background"
              )}
            >
              {m.content}
            </div>
          ))
        )}
        {loading && (
          <div className="flex max-w-[85%] items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 text-sm text-muted">
            <Loader2 className="h-4 w-4 animate-spin" />
            {t.studyTools.aiThinking}
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder={t.studyTools.aiPlaceholder}
          className="flex-1 rounded-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
        />
        <button
          type="button"
          onClick={send}
          disabled={!input.trim() || loading}
          aria-label={t.studyTools.aiSend}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-primary to-deep-orange text-white transition-opacity disabled:opacity-40"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------- Mind map ------------------------------ */

function MindmapTool({ course }: { course: Course }) {
  const { t, locale } = useI18n();
  const modules = useMemo(
    () =>
      course.modules.map((m) => ({
        id: m.id,
        title: pick(locale, m.title),
        lessons: m.lessons.map((l) => pick(locale, l.title)),
      })),
    [course, locale]
  );

  return (
    <div>
      <p className="text-sm text-muted">{t.studyTools.mindmapDesc}</p>

      {/* Root node */}
      <div className="mt-6 flex justify-center">
        <div className="rounded-2xl bg-gradient-to-r from-primary to-deep-orange px-8 py-4 text-center shadow-soft">
          <div className="text-[10px] font-bold uppercase tracking-widest text-white/80">
            {t.studyTools.mindmapCenter}
          </div>
          <div className="font-display text-lg font-extrabold text-white">
            {pick(locale, course.title)}
          </div>
        </div>
      </div>

      {/* Connector down */}
      <div className="flex justify-center">
        <div className="h-8 w-0.5 bg-gradient-to-b from-primary to-border" />
      </div>

      {/* Flowchart: vertical trunk with module branches */}
      <div className="relative mx-auto max-w-2xl">
        <div className="absolute bottom-6 left-1/2 top-0 w-0.5 -translate-x-1/2 bg-border" aria-hidden />
        <div className="space-y-8">
          {modules.map((m, mi) => (
            <div key={m.id} className="relative">
              {/* branch connector */}
              <div className="absolute left-1/2 top-6 h-0.5 w-8 -translate-x-full bg-border md:w-12" aria-hidden />
              <div className="absolute left-1/2 top-5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-primary bg-card" aria-hidden />

              <div className="ml-[calc(50%+1.5rem)] md:ml-[calc(50%+2.5rem)]">
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: mi * 0.08 }}
                  className="rounded-2xl border border-border bg-background p-4 shadow-card"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-deep-orange font-display text-sm font-extrabold text-white">
                      {mi + 1}
                    </span>
                    <h3 className="font-display text-sm font-bold md:text-base">{m.title}</h3>
                  </div>
                  <div className="mt-3 space-y-1.5">
                    {m.lessons.map((lesson, li) => (
                      <div
                        key={li}
                        className="flex items-center gap-2 rounded-lg bg-card px-3 py-2 text-xs font-semibold text-muted"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {lesson}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
