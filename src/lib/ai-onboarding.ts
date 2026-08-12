import type { QuizQuestion } from "@/data/types";
import { describeProfile, type CourseProfile } from "./ai-course";

/**
 * AI onboarding coach: evaluates wizard answers, optionally asks a
 * clarifying question, generates a diagnostic quiz, and evaluates the
 * quiz result. Server-side only (used by /api/onboarding-coach).
 */

export interface ClarifyingQuestion {
  question: string;
  options: string[];
}

export interface LearningStep {
  title: string;
  description: string;
  duration: string; // e.g. "1 minggu"
}

export interface LearningPlan {
  overview: string;
  steps: LearningStep[];
  materials: string[];
}

export interface DiagnosticQuiz {
  courseId: string;
  courseTitle: string;
  questions: QuizQuestion[];
}

export interface EvaluateOk {
  type: "ok";
  quiz: DiagnosticQuiz;
  plan: LearningPlan;
}

export interface EvaluateClarify {
  type: "clarify";
  question: ClarifyingQuestion;
}

export type EvaluateResult = EvaluateOk | EvaluateClarify;

export interface PlacementResult {
  level: "beginner" | "intermediate" | "advanced";
  message: string;
  tips: string[];
  strengths: string[];
}

/**
 * Hasil evaluasi gaya belajar — dihasilkan dari jawaban personalisasi
 * (langkah 7-12) SEBELUM quiz diagnostik. Menjelaskan gaya belajar
 * dominan user, karakteristik, cara materi disesuaikan, dan yang perlu
 * dijaga. Semua teks dalam Bahasa Indonesia.
 */
export interface LearningStyleResult {
  styleType: string; // nama gaya belajar dominan, mis. "Praktisi Visual"
  styleEmoji: string; // 1 emoji yang mewakili gaya
  summary: string; // 1-2 kalimat ringkas
  traits: string[]; // 3-4 karakteristik belajar user
  adaptations: string[]; // 3-4 cara materi akan disesuaikan
  challenges: string[]; // 2-3 hal yang perlu dijaga/diwaspadai
}

export interface CoachCourse {
  id: string;
  title: string;
}

const QUIZ_ID = "ai-placement";

function loc(text: string): { id: string; en: string } {
  // Strip markdown artifacts — questions/options must be plain text
  const t = String(text ?? "")
    .replace(/^#+\s*/, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .trim();
  return { id: t, en: t };
}

function profileBlock(
  profile: CourseProfile | undefined,
  clarifications: { question: string; answer: string }[]
): string {
  const lines = describeProfile(profile);
  for (const c of clarifications) {
    lines.push(`- ${c.question} → ${c.answer}`);
  }
  return lines.length > 0
    ? `\nLearner profile:\n${lines.join("\n")}\n`
    : "";
}

function courseBlock(courses: CoachCourse[]): string {
  const list = courses.map((c) => `- id: "${c.id}" — ${c.title}`).join("\n");
  return `\nThe learner is interested in these skills:\n${list}\n`;
}

/* ------------------------------------------------------------------ */
/* Stage: evaluate                                                    */
/* ------------------------------------------------------------------ */

export function buildEvaluatePrompt(
  profile: CourseProfile | undefined,
  courses: CoachCourse[],
  clarifications: { question: string; answer: string }[]
): string {
  const clarificationBlock =
    clarifications.length > 0
      ? `
The learner already answered your previous clarifying question(s). You MUST NOT ask again unless something critical is still missing — respond with type "ok".`
      : `
If (and only if) a critical piece of information is missing or ambiguous and would significantly change the diagnostic quiz, respond with type "clarify" and ask ONE short question with 2-4 short answer options. Otherwise respond with type "ok".`;

  return `You are a friendly learning coach at SkillPath, an informal skill-learning app.
${profileBlock(profile, clarifications)}${courseBlock(courses)}
Your task: evaluate the learner's answers and prepare a short diagnostic quiz so you can understand their starting level.

Respond with ONLY a valid JSON object in one of these two shapes:

A) If you need one more clarification:
{
  "type": "clarify",
  "question": {
    "question": "one short friendly question in Indonesian",
    "options": ["option A", "option B", "option C"]
  }
}

B) If ready (this is the usual case):
{
  "type": "ok",
  "quiz": {
    "courseId": "the skill id from the list that best matches the learner's main interest",
    "courseTitle": "its title",
    "questions": [
      {
        "question": "diagnostic question in Indonesian",
        "options": ["A", "B", "C", "D"],
        "correctIndex": 0,
        "explanation": "one sentence explanation"
      }
    ]
  },
  "plan": {
    "overview": "1-2 Indonesian sentences summarizing the personalized learning journey",
    "steps": [
      {
        "title": "step title in Indonesian",
        "description": "1-2 sentences of what to learn/do in this step",
        "duration": "estimated time, e.g. '1 minggu'"
      }
    ],
    "materials": ["key topic/material to master, short phrase"]
  }
}

Rules:
- Write everything in Indonesian (Bahasa Indonesia).
- Exactly 5 diagnostic questions.
- Question difficulty must match the learner's self-reported knowledge: easy basics if they start from zero, deeper scenarios if they already know the basics.
- Each question has exactly 4 options and exactly one correct answer; correctIndex is 0-based (0-3) and varies across questions.
- courseId MUST be copied exactly from the provided skill list.
- "plan" is a personalized roadmap for the chosen skill: exactly 5 steps ordered from first to last (like a journey from zero to ready), each step building on the previous one. Adapt the pace to the learner's daily study time and starting knowledge.
- "materials": 5-7 short phrases of the key topics they will learn.${clarificationBlock}
- No markdown, no code fences, no commentary — JSON only.`;
}

export function sanitizeEvaluateResult(
  raw: unknown,
  validCourses: CoachCourse[]
): EvaluateResult {
  const data = raw as Record<string, unknown>;

  if (data?.type === "clarify" && data.question) {
    const q = data.question as Record<string, unknown>;
    const options = Array.isArray(q.options)
      ? q.options.map(String).filter(Boolean).slice(0, 4)
      : [];
    const question = String(q.question ?? "").trim();
    if (question && options.length >= 2) {
      return { type: "clarify", question: { question, options } };
    }
  }

  // Default / fallback: quiz
  const quizRaw = (data?.quiz ?? {}) as Record<string, unknown>;
  const validIds = validCourses.map((c) => c.id);
  const requestedId = String(quizRaw.courseId ?? "");
  const courseId = validIds.includes(requestedId)
    ? requestedId
    : (validIds[0] ?? "");
  const courseTitle =
    validCourses.find((c) => c.id === courseId)?.title ??
    String(quizRaw.courseTitle ?? "");

  const rawQuestions = Array.isArray(quizRaw.questions)
    ? (quizRaw.questions as Record<string, unknown>[])
    : [];
  if (rawQuestions.length === 0) throw new Error("no questions");

  const questions: QuizQuestion[] = rawQuestions.slice(0, 8).map((q, i) => {
    const options = (Array.isArray(q.options) ? q.options : [])
      .slice(0, 4)
      .map((o) => loc(o));
    if (options.length < 2) throw new Error("too few options");
    return {
      id: `${QUIZ_ID}-q${i + 1}`,
      question: loc(String(q.question ?? `Pertanyaan ${i + 1}`)),
      options,
      correctIndex: Math.min(
        Math.max(0, Math.round(Number(q.correctIndex) || 0)),
        options.length - 1
      ),
      explanation: q.explanation ? loc(String(q.explanation)) : undefined,
    };
  });

  // Learning plan (optional but expected) — sanitize defensively
  const planRaw = (data?.plan ?? {}) as Record<string, unknown>;
  const rawSteps = Array.isArray(planRaw.steps)
    ? (planRaw.steps as Record<string, unknown>[])
    : [];
  const steps: LearningStep[] = rawSteps.slice(0, 8).map((s, i) => ({
    title: String(s?.title ?? `Langkah ${i + 1}`).trim(),
    description: String(s?.description ?? "").trim(),
    duration: String(s?.duration ?? "").trim(),
  }));
  const materials = Array.isArray(planRaw.materials)
    ? planRaw.materials.map(String).map((m) => m.trim()).filter(Boolean).slice(0, 10)
    : [];
  const plan: LearningPlan = {
    overview: String(planRaw.overview ?? "").trim(),
    steps,
    materials,
  };

  return {
    type: "ok",
    quiz: { courseId, courseTitle, questions },
    plan,
  };
}

/* ------------------------------------------------------------------ */
/* Stage: result                                                      */
/* ------------------------------------------------------------------ */

export function buildResultPrompt(
  profile: CourseProfile | undefined,
  courseTitle: string,
  scorePercent: number,
  correct: number,
  total: number,
  qa: { question: string; correct: boolean }[]
): string {
  const qaLines = qa
    .map(
      (item, i) =>
        `${i + 1}. ${item.question} — ${item.correct ? "BENAR" : "SALAH"}`
    )
    .join("\n");

  return `You are a friendly learning coach at SkillPath.
${profileBlock(profile, [])}
The learner just completed a diagnostic quiz about "${courseTitle}":
- Score: ${correct}/${total} (${scorePercent}%)
- Details:
${qaLines}

Write a short, warm evaluation in Indonesian. Respond with ONLY a valid JSON object:
{
  "level": "beginner" | "intermediate" | "advanced",
  "message": "2-3 friendly sentences addressed to the learner, mentioning what their answers show and encouraging them",
  "tips": ["short actionable tip 1", "tip 2", "tip 3"],
  "strengths": ["topic they answered correctly, phrased positively"]
}

Rules:
- level: beginner = mostly wrong, intermediate = mixed, advanced = mostly correct.
- strengths: list topics from questions they answered correctly (empty array if none).
- tips: exactly 3, concrete and specific to "${courseTitle}".
- No markdown, no code fences — JSON only.`;
}

export function sanitizePlacementResult(raw: unknown): PlacementResult {
  const data = raw as Record<string, unknown>;
  const level =
    data?.level === "intermediate" || data?.level === "advanced"
      ? data.level
      : "beginner";
  const tips = Array.isArray(data?.tips)
    ? data.tips.map(String).filter(Boolean).slice(0, 5)
    : [];
  const strengths = Array.isArray(data?.strengths)
    ? data.strengths.map(String).filter(Boolean).slice(0, 5)
    : [];
  return {
    level,
    message: String(data?.message ?? "").trim() || "Semangat belajar!",
    tips,
    strengths,
  };
}

/* ------------------------------------------------------------------ */
/* Stage: learning style evaluation                                   */
/* ------------------------------------------------------------------ */

/**
 * Membangun prompt untuk mengevaluasi gaya belajar user berdasarkan
 * jawaban personalisasi (langkah 7-12). Tidak bergantung pada course
 * spesifik — fokusnya pada CARA user belajar, bukan APA yang dipelajari.
 */
export function buildLearningStylePrompt(
  profile: CourseProfile | undefined,
  courses: CoachCourse[]
): string {
  const profileLines = describeProfile(profile);
  const profileBlock =
    profileLines.length > 0
      ? `\nProfil pembelajar (jawaban personalisasi):\n${profileLines.join("\n")}\n`
      : "";

  const courseBlock =
    courses.length > 0
      ? `\nMinat skill: ${courses.map((c) => c.title).join(", ")}\n`
      : "";

  return `Kamu adalah pelatih belajar di SkillPath, aplikasi belajar skill nonformal.
${profileBlock}${courseBlock}
Tugasmu: evaluasi gaya belajar pembelajar ini berdasarkan jawaban personalisasinya, lalu jelaskan bagaimana AI akan menyesuaikan materi buat dia.

Perhatikan khususnya:
- workType (0=kecepatan, 100=ketelitian) — gaya bekerja
- memory (0=lupa detail, 100=susah konsep besar) — kelemahan memori
- learningStyle (0=teori dulu, 100=langsung praktik) — preferensi belajar
- graspMethod — cara tercepat paham materi rumit
- focusEnemy — gangguan fokus utama
- ambition (1-10) — tingkat ambisi

Tentukan "styleType" yang singkat dan mencolok (2-3 kata, mis. "Praktisi Visual", "Pemikir Sistematis", "Eksplorator Cepat") beserta 1 emoji yang mewakili.

Balas HANYA dengan JSON valid dalam bentuk ini:
{
  "styleType": "nama gaya belajar dominan (2-3 kata)",
  "styleEmoji": "1 emoji",
  "summary": "1-2 kalimat ramah menjelaskan gaya belajarnya",
  "traits": ["karakteristik 1", "karakteristik 2", "karakteristik 3"],
  "adaptations": ["cara materi disesuaikan 1", "2", "3"],
  "challenges": ["hal yang perlu dijaga 1", "2"]
}

Aturan:
- Semua teks dalam Bahasa Indonesia.
- traits: 3-4 butir pendek tentang bagaimana cara mereka belajar/kerja.
- adaptations: 3-4 butir konkret tentang bagaimana materi akan disesuaikan (mis. "banyak diagram", "breakdown langkah pendek", "kuis ringan setelah konsep").
- challenges: 2-3 butir hal yang mungkin menghambat (berdasarkan focusEnemy & kelemahan memori).
- Tanpa markdown, tanpa code fence — JSON saja.`;
}

/** Membersihkan output AI untuk LearningStyleResult. */
export function sanitizeLearningStyleResult(raw: unknown): LearningStyleResult {
  const data = raw as Record<string, unknown>;

  const toArray = (v: unknown, max: number): string[] =>
    Array.isArray(v)
      ? v.map(String).map((s) => s.trim()).filter(Boolean).slice(0, max)
      : [];

  const styleType = String(data?.styleType ?? "Pembelajar Seimbang").trim().slice(0, 60);
  let styleEmoji = String(data?.styleEmoji ?? "🎯").trim();
  // Ambil satu grapheme pertama (jaga-jaga AI ngasih banyak emoji).
  // Heuristik aman untuk ES2017: emoji umumnya bukan ASCII printable.
  if (styleEmoji) {
    const first = Array.from(styleEmoji)[0] ?? "";
    const cp = first.codePointAt(0) ?? 0;
    styleEmoji = cp > 0x255 ? first : "🎯";
  } else {
    styleEmoji = "🎯";
  }

  return {
    styleType,
    styleEmoji,
    summary: String(data?.summary ?? "").trim().slice(0, 280) ||
      "Gaya belajarmu unik — AI akan menyesuaikan materi sesuai kebutuhanmu.",
    traits: toArray(data?.traits, 5),
    adaptations: toArray(data?.adaptations, 5),
    challenges: toArray(data?.challenges, 4),
  };
}
