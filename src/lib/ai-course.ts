import type { Course } from "@/data/types";

/**
 * Prompt builder + output sanitizer for AI-generated courses.
 * Provider: CosmosHub (OpenAI-compatible API). Server-side only
 * (imported by the /api/generate-course route handler).
 */

export interface GeneratedCourseJSON {
  title: string;
  description: string;
  longDescription?: string;
  difficulty?: string;
  salary?: string;
  demand?: string;
  modules: {
    title: string;
    lessons: {
      title: string;
      duration?: number;
      body: string;
    }[];
  }[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation?: string;
  }[];
}

const COLORS = ["#4D9DE0", "#FF914D", "#9B5DE5", "#EF476F", "#06A77D", "#F15BB5"];
const MAX_BODY_CHARS = 4000;

/** Onboarding answers used to personalize the generated course. */
export interface CourseProfile {
  name?: string;
  reason?: string;
  knowledgeLevel?: string;
  learningExp?: string;
  dailyGoalMinutes?: number;
  // Personalization (steps 7-12)
  focusEnemy?: string; // "phone" | "people" | "boredom" | "tired"
  workType?: number; // 0-100 (0 = speed, 100 = accuracy)
  memory?: number; // 0-100 (0 = forget details, 100 = hard grasp concepts)
  learningStyle?: number; // 0-100 (0 = theory first, 100 = straight to practice)
  graspMethod?: string; // "example" | "visual" | "analogy" | "try"
  ambition?: number; // 1-10
}

/** Uploaded reference PDF (base64 text extracted by the server). */
export interface PdfReferenceInput {
  name: string;
  size: number;
  /** Plain text extracted from the PDF (up to ~30k chars). */
  text: string;
}

export const REASON_LABELS: Record<string, string> = {
  career: "untuk karir / mencari pekerjaan",
  business: "untuk membuka usaha sendiri",
  hobby: "sebagai hobi dan pengembangan diri",
  school: "untuk menunjang sekolah / kuliah",
};

export const KNOWLEDGE_LABELS: Record<string, string> = {
  beginner: "benar-benar mulai dari nol",
  some: "sudah tahu sedikit-sedikit",
  comfortable: "sudah paham dasar-dasarnya",
};

export const LEARNING_EXP_LABELS: Record<string, string> = {
  self: "terbiasa belajar mandiri (otodidak)",
  course: "pernah mengikuti kursus / pelatihan",
  first: "ini pengalaman belajar pertamanya",
};

export const FOCUS_ENEMY_LABELS: Record<string, string> = {
  phone: "HP & media sosial",
  people: "orang di sekitar",
  boredom: "cepat bosan",
  tired: "mudah lelah / ngantuk",
};

export const GRASP_METHOD_LABELS: Record<string, string> = {
  example: "melihat contoh nyata dulu",
  visual: "gambar / diagram / video",
  analogy: "dijelaskan pakai analogi",
  try: "langsung mencoba sendiri",
};

/** Describe a 0-100 slider value leaning left/right. */
function sliderLabel(
  value: number | undefined,
  leftLabel: string,
  rightLabel: string
): string | null {
  if (typeof value !== "number" || Number.isNaN(value)) return null;
  if (value <= 25) return leftLabel;
  if (value >= 75) return rightLabel;
  return `seimbang antara ${leftLabel} dan ${rightLabel}`;
}

/** Human-readable Indonesian lines describing the onboarding profile. */
export function describeProfile(profile?: CourseProfile): string[] {
  const lines: string[] = [];
  if (profile?.name) {
    lines.push(`- Nama: ${profile.name}`);
  }
  if (profile?.reason && REASON_LABELS[profile.reason]) {
    lines.push(`- Tujuan belajar: ${REASON_LABELS[profile.reason]}`);
  }
  if (profile?.knowledgeLevel && KNOWLEDGE_LABELS[profile.knowledgeLevel]) {
    lines.push(`- Pengetahuan saat ini: ${KNOWLEDGE_LABELS[profile.knowledgeLevel]}`);
  }
  if (profile?.learningExp && LEARNING_EXP_LABELS[profile.learningExp]) {
    lines.push(`- Pengalaman belajar: ${LEARNING_EXP_LABELS[profile.learningExp]}`);
  }
  if (profile?.dailyGoalMinutes) {
    lines.push(`- Waktu belajar per hari: sekitar ${profile.dailyGoalMinutes} menit`);
  }
  if (profile?.focusEnemy && FOCUS_ENEMY_LABELS[profile.focusEnemy]) {
    lines.push(`- Gangguan fokus utama: ${FOCUS_ENEMY_LABELS[profile.focusEnemy]}`);
  }
  const work = sliderLabel(
    profile?.workType,
    "mengutamakan kecepatan",
    "mengutamakan ketelitian"
  );
  if (work) lines.push(`- Gaya bekerja: ${work}`);
  const mem = sliderLabel(
    profile?.memory,
    "cepat lupa detail & fakta",
    "susah memahami konsep besar"
  );
  if (mem) lines.push(`- Kelemahan memori: ${mem}`);
  const style = sliderLabel(
    profile?.learningStyle,
    "suka teori dulu sebelum praktik",
    "suka langsung praktik"
  );
  if (style) lines.push(`- Gaya belajar: ${style}`);
  if (profile?.graspMethod && GRASP_METHOD_LABELS[profile.graspMethod]) {
    lines.push(
      `- Cara tercepat paham materi rumit: ${GRASP_METHOD_LABELS[profile.graspMethod]}`
    );
  }
  if (typeof profile?.ambition === "number" && profile.ambition >= 1) {
    const level =
      profile.ambition <= 3
        ? "santai"
        : profile.ambition <= 6
          ? "menengah"
          : profile.ambition <= 8
            ? "ambisius"
            : "sangat ambisius";
    lines.push(`- Tingkat ambisi: ${profile.ambition}/10 (${level})`);
  }
  return lines;
}

export function buildPrompt(
  skill: string,
  profile?: CourseProfile,
  pdf?: PdfReferenceInput
): string {
  const lines = describeProfile(profile);

  const profileBlock =
    lines.length > 0
      ? `
Learner profile (personalize the content to this person):
${lines.join("\n")}
`
      : "";

  const pdfBlock = pdf
    ? `
User-provided reference PDF ("${pdf.name}"):
The learner uploaded this file as their study material. USE IT as the primary source for the course content: base the lesson topics, examples, and quiz questions on what the PDF actually contains. Ignore anything in the PDF that is irrelevant or promotional. If the PDF is empty or unusable, fall back to your own knowledge.
--- PDF CONTENT START ---
${pdf.text}
--- PDF CONTENT END ---
`
    : "";

  const personalizationRules =
    lines.length > 0
      ? `
- Adapt the content to the learner profile: match their current knowledge level (skip basics they already know, or explain fundamentals gently if they start from zero), and make examples relevant to their goal (e.g. if for business, include pricing/selling tips; if for career, include portfolio/job tips).
- Keep each lesson digestible within their daily study time.` +
      (profile?.name
        ? `
- Optionally address the learner as "${profile.name}" once in the first lesson to feel personal.`
        : "")
      : "";

  return `You are an instructional designer for SkillPath, an informal skill-learning app for self-taught learners.

Create a complete, practical mini course about: "${skill}"
${profileBlock}${pdfBlock}

Return ONLY a valid JSON object (no markdown, no code fences, no commentary) with this exact structure:
{
  "title": "short course title, max 40 chars",
  "description": "one catchy sentence, max 90 chars",
  "longDescription": "2-3 sentences about what the learner will achieve",
  "difficulty": "beginner" | "intermediate" | "advanced",
  "salary": "estimated monthly earning range, e.g. Rp 3-8 jt/month",
  "demand": "one word: Tinggi or Sangat Tinggi",
  "modules": [
    {
      "title": "module title",
      "lessons": [
        {
          "title": "lesson title",
          "duration": 5,
          "body": "lesson content in Markdown: start with a short intro paragraph, then use ## headings with an empty line before each one, use '- ' bullet lists, **bold** for key terms, and end with a '## Latihan Praktis' section. 250-400 words."
        }
      ]
    }
  ],
  "quiz": [
    {
      "question": "question text",
      "options": ["option A", "option B", "option C", "option D"],
      "correctIndex": 0,
      "explanation": "one sentence explaining the correct answer"
    }
  ]
}

Rules:
- Write everything in Indonesian (Bahasa Indonesia).
- Exactly 3 modules, each with exactly 3 lessons (9 lessons total).
- Lesson duration between 4 and 8 (integer minutes).
- Progression: module 1 fundamentals, module 2 core skills, module 3 practice & monetization/career.
- Exactly 5 quiz questions covering all modules.
- Each quiz question has exactly 4 options and exactly one correct answer.
- correctIndex is 0-based (0-3) and must vary across questions.
- Content must be accurate, actionable, and specific to "${skill}" (tools, steps, tips).
- "title", "description", "salary", "demand", lesson "title", and quiz fields must be plain text — no markdown symbols (#, **, etc.). Markdown is allowed ONLY inside lesson "body".${personalizationRules}
- No videos, no external links, no placeholders.`;
}

export function extractJSON(text: string): GeneratedCourseJSON {
  const cleaned = text.replace(/```(?:json)?/gi, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("AI response did not contain a JSON object");
  }
  return JSON.parse(cleaned.slice(start, end + 1)) as GeneratedCourseJSON;
}

function loc(text: string): { id: string; en: string } {
  // Strip markdown artifacts — titles/descriptions must be plain text
  const t = String(text ?? "")
    .replace(/^#+\s*/, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .trim();
  return { id: t, en: t };
}

function clampInt(n: unknown, min: number, max: number, fallback: number): number {
  const v = Math.round(Number(n));
  if (!Number.isFinite(v)) return fallback;
  return Math.min(max, Math.max(min, v));
}

export function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "skill"
  );
}

/** Convert raw AI JSON into a fully-typed, safe Course. Throws on bad shape. */
export function sanitizeCourse(
  raw: GeneratedCourseJSON,
  skill: string,
  pdf?: PdfReferenceInput
): Course {
  if (!raw || !Array.isArray(raw.modules) || raw.modules.length === 0) {
    throw new Error("AI response has no modules");
  }
  if (!Array.isArray(raw.quiz) || raw.quiz.length === 0) {
    throw new Error("AI response has no quiz");
  }

  const id = `ai-${slugify(raw.title || skill)}-${Date.now().toString(36)}`;
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];

  const modules = raw.modules.slice(0, 4).map((m, mi) => ({
    id: `${id}-m${mi + 1}`,
    title: loc(m.title || `Modul ${mi + 1}`),
    lessons: (Array.isArray(m.lessons) ? m.lessons : []).slice(0, 5).map((l, li) => ({
      id: `${id}-m${mi + 1}l${li + 1}`,
      title: loc(l.title || `Pelajaran ${li + 1}`),
      type: "text" as const,
      duration: clampInt(l.duration, 3, 15, 5),
      xp: 50,
      body: loc(String(l.body ?? "").slice(0, MAX_BODY_CHARS)),
    })),
  }));

  if (modules.some((m) => m.lessons.length === 0)) {
    throw new Error("AI response contains a module without lessons");
  }

  const quiz = raw.quiz.slice(0, 10).map((q, qi) => {
    const options = (Array.isArray(q.options) ? q.options : [])
      .slice(0, 4)
      .map((o) => loc(o));
    if (options.length < 2) throw new Error("Quiz question has too few options");
    return {
      id: `${id}-q${qi + 1}`,
      question: loc(q.question || `Pertanyaan ${qi + 1}`),
      options,
      correctIndex: Math.min(
        Math.max(0, Math.round(Number(q.correctIndex) || 0)),
        options.length - 1
      ),
      explanation: q.explanation ? loc(q.explanation) : undefined,
    };
  });

  const difficulty =
    raw.difficulty === "intermediate" || raw.difficulty === "advanced"
      ? raw.difficulty
      : "beginner";

  return {
    id,
    title: loc(raw.title || skill),
    description: loc(raw.description || skill),
    longDescription: loc(raw.longDescription || raw.description || skill),
    category: "creative",
    difficulty,
    icon: "Sparkles",
    color,
    modules,
    quiz,
    passScore: 70,
    salary: loc(raw.salary || "-"),
    demand: String(raw.demand || "Tinggi"),
    ...(pdf
      ? {
          pdfReference: {
            name: String(pdf.name).slice(0, 100),
            size: Math.min(Math.max(0, Math.round(pdf.size)), 10 * 1024 * 1024),
          },
        }
      : {}),
  };
}
