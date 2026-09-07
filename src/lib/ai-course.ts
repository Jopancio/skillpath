import type { Course, CourseModule } from "@/data/types";

/**
 * Prompt builder + output sanitizer for AI-generated courses.
 * Provider: CosmosHub (OpenAI-compatible API). Server-side only
 * (imported by the /api/generate-course route handler).
 */

/** Locale the generated content should be written in. */
export type AiLocale = "id" | "en";

/** Prompt instruction for the output language. */
function langRule(locale: AiLocale): string {
  return locale === "en"
    ? "Write everything in English."
    : "Write everything in Indonesian (Bahasa Indonesia).";
}

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

export const REASON_LABELS_EN: Record<string, string> = {
  career: "for their career / finding a job",
  business: "to start their own business",
  hobby: "as a hobby and for self-improvement",
  school: "to support their school / college studies",
};

export const KNOWLEDGE_LABELS: Record<string, string> = {
  beginner: "benar-benar mulai dari nol",
  some: "sudah tahu sedikit-sedikit",
  comfortable: "sudah paham dasar-dasarnya",
};

export const KNOWLEDGE_LABELS_EN: Record<string, string> = {
  beginner: "starting completely from zero",
  some: "already knows a little",
  comfortable: "already understands the basics",
};

export const LEARNING_EXP_LABELS: Record<string, string> = {
  self: "terbiasa belajar mandiri (otodidak)",
  course: "pernah mengikuti kursus / pelatihan",
  first: "ini pengalaman belajar pertamanya",
};

export const LEARNING_EXP_LABELS_EN: Record<string, string> = {
  self: "used to self-directed learning",
  course: "has taken courses / training before",
  first: "this is their first learning experience",
};

export const FOCUS_ENEMY_LABELS: Record<string, string> = {
  phone: "HP & media sosial",
  people: "orang di sekitar",
  boredom: "cepat bosan",
  tired: "mudah lelah / ngantuk",
};

export const FOCUS_ENEMY_LABELS_EN: Record<string, string> = {
  phone: "phone & social media",
  people: "people around them",
  boredom: "gets bored quickly",
  tired: "gets tired / sleepy easily",
};

export const GRASP_METHOD_LABELS: Record<string, string> = {
  example: "melihat contoh nyata dulu",
  visual: "gambar / diagram / video",
  analogy: "dijelaskan pakai analogi",
  try: "langsung mencoba sendiri",
};

export const GRASP_METHOD_LABELS_EN: Record<string, string> = {
  example: "seeing real examples first",
  visual: "images / diagrams / videos",
  analogy: "explanations using analogies",
  try: "trying it hands-on right away",
};

/** Describe a 0-100 slider value leaning left/right. */
function sliderLabel(
  value: number | undefined,
  leftLabel: string,
  rightLabel: string,
  locale: AiLocale = "id"
): string | null {
  if (typeof value !== "number" || Number.isNaN(value)) return null;
  if (value <= 25) return leftLabel;
  if (value >= 75) return rightLabel;
  return locale === "en"
    ? `balanced between ${leftLabel} and ${rightLabel}`
    : `seimbang antara ${leftLabel} dan ${rightLabel}`;
}

/** Human-readable lines describing the onboarding profile. */
export function describeProfile(
  profile?: CourseProfile,
  locale: AiLocale = "id"
): string[] {
  const en = locale === "en";
  const reasonLabels = en ? REASON_LABELS_EN : REASON_LABELS;
  const knowledgeLabels = en ? KNOWLEDGE_LABELS_EN : KNOWLEDGE_LABELS;
  const expLabels = en ? LEARNING_EXP_LABELS_EN : LEARNING_EXP_LABELS;
  const focusLabels = en ? FOCUS_ENEMY_LABELS_EN : FOCUS_ENEMY_LABELS;
  const graspLabels = en ? GRASP_METHOD_LABELS_EN : GRASP_METHOD_LABELS;

  const lines: string[] = [];
  if (profile?.name) {
    lines.push(en ? `- Name: ${profile.name}` : `- Nama: ${profile.name}`);
  }
  if (profile?.reason && reasonLabels[profile.reason]) {
    lines.push(
      en
        ? `- Learning goal: ${reasonLabels[profile.reason]}`
        : `- Tujuan belajar: ${reasonLabels[profile.reason]}`
    );
  }
  if (profile?.knowledgeLevel && knowledgeLabels[profile.knowledgeLevel]) {
    lines.push(
      en
        ? `- Current knowledge: ${knowledgeLabels[profile.knowledgeLevel]}`
        : `- Pengetahuan saat ini: ${knowledgeLabels[profile.knowledgeLevel]}`
    );
  }
  if (profile?.learningExp && expLabels[profile.learningExp]) {
    lines.push(
      en
        ? `- Learning experience: ${expLabels[profile.learningExp]}`
        : `- Pengalaman belajar: ${expLabels[profile.learningExp]}`
    );
  }
  if (profile?.dailyGoalMinutes) {
    lines.push(
      en
        ? `- Study time per day: about ${profile.dailyGoalMinutes} minutes`
        : `- Waktu belajar per hari: sekitar ${profile.dailyGoalMinutes} menit`
    );
  }
  if (profile?.focusEnemy && focusLabels[profile.focusEnemy]) {
    lines.push(
      en
        ? `- Main focus distraction: ${focusLabels[profile.focusEnemy]}`
        : `- Gangguan fokus utama: ${focusLabels[profile.focusEnemy]}`
    );
  }
  const work = sliderLabel(
    profile?.workType,
    en ? "prioritizes speed" : "mengutamakan kecepatan",
    en ? "prioritizes accuracy" : "mengutamakan ketelitian",
    locale
  );
  if (work) lines.push(en ? `- Working style: ${work}` : `- Gaya bekerja: ${work}`);
  const mem = sliderLabel(
    profile?.memory,
    en ? "quickly forgets details & facts" : "cepat lupa detail & fakta",
    en ? "struggles with big concepts" : "susah memahami konsep besar",
    locale
  );
  if (mem) lines.push(en ? `- Memory weakness: ${mem}` : `- Kelemahan memori: ${mem}`);
  const style = sliderLabel(
    profile?.learningStyle,
    en ? "likes theory before practice" : "suka teori dulu sebelum praktik",
    en ? "likes jumping straight into practice" : "suka langsung praktik",
    locale
  );
  if (style) lines.push(en ? `- Learning style: ${style}` : `- Gaya belajar: ${style}`);
  if (profile?.graspMethod && graspLabels[profile.graspMethod]) {
    lines.push(
      en
        ? `- Fastest way to grasp complex material: ${graspLabels[profile.graspMethod]}`
        : `- Cara tercepat paham materi rumit: ${graspLabels[profile.graspMethod]}`
    );
  }
  if (typeof profile?.ambition === "number" && profile.ambition >= 1) {
    const level = en
      ? profile.ambition <= 3
        ? "relaxed"
        : profile.ambition <= 6
          ? "moderate"
          : profile.ambition <= 8
            ? "ambitious"
            : "very ambitious"
      : profile.ambition <= 3
        ? "santai"
        : profile.ambition <= 6
          ? "menengah"
          : profile.ambition <= 8
            ? "ambisius"
            : "sangat ambisius";
    lines.push(
      en
        ? `- Ambition level: ${profile.ambition}/10 (${level})`
        : `- Tingkat ambisi: ${profile.ambition}/10 (${level})`
    );
  }
  return lines;
}

export function buildPrompt(
  skill: string,
  profile?: CourseProfile,
  pdf?: PdfReferenceInput,
  locale: AiLocale = "id"
): string {
  const lines = describeProfile(profile, locale);
  const pdfText = pdf?.text ?? "";
  const hasPdfText = pdfText.trim().length > 0;

  const profileBlock =
    lines.length > 0
      ? `
Learner profile (personalize the content to this person):
${lines.join("\n")}
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

  // With a readable PDF the whole course must be grounded in it. Without one
  // (upload missing OR text extraction failed) fall back to model knowledge.
  const pdfRules = hasPdfText
    ? `
- PRIMARY SOURCE: the learner attached a reference PDF ("${pdf?.name}", quoted in full at the end of this prompt). Every module topic, lesson body, example, and quiz question MUST be based on what the PDF actually teaches — treat it as the source of truth, overriding your own knowledge whenever they differ.
- Map the 3 modules onto the PDF's own structure and keep its order: basic/opening chapters become early modules, advanced/closing chapters become later modules. Reuse the PDF's terminology, terms, and examples wherever possible.
- Do NOT introduce topics that are absent from the PDF. If the PDF covers fewer than 9 distinct topics, cover each remaining topic in more depth instead of inventing new material.
- Every quiz question must be answerable purely from the PDF content. Ignore promotional/irrelevant parts of the PDF.`
    : "";

  const structureRule = hasPdfText
    ? "\n- Progression: mirror the PDF's own flow — fundamentals from its opening sections, core skills from the middle, practice/application from the closing sections."
    : "\n- Progression: module 1 fundamentals, module 2 core skills, module 3 practice & monetization/career.";

  const specificityRule = hasPdfText
    ? `- Content must faithfully reflect the PDF's material${skill ? ` about "${skill}"` : ""} (its definitions, steps, tools, and examples).`
    : `- Content must be accurate, actionable, and specific to "${skill}" (tools, steps, tips).`;

  const pdfFallbackNote =
    pdf && !hasPdfText
      ? `
NOTE: a reference PDF ("${pdf?.name}") was uploaded but no readable text could be extracted from it. Ignore it and create the best possible course about "${skill}" from your own knowledge.`
      : "";

  const pdfSourceBlock = hasPdfText
    ? `

REFERENCE MATERIAL — "${pdf?.name}". This is the primary source for ALL content requested above:
--- PDF CONTENT START ---
${pdfText}
--- PDF CONTENT END ---`
    : "";

  // With a PDF and no typed topic, the PDF alone defines what the course is
  const topicIntro = skill
    ? `Create a complete, practical mini course about: "${skill}"`
    : `Create a complete, practical mini course based entirely on the attached reference PDF below. Choose the most teachable path through its content.`;

  return `You are an instructional designer for SkillPath, an informal skill-learning app for self-taught learners.

${topicIntro}
${profileBlock}
Return ONLY a valid JSON object (no markdown, no code fences, no commentary) with this exact structure:
{
  "title": "short course title, max 40 chars",
  "description": "one catchy sentence, max 90 chars",
  "longDescription": "2-3 sentences about what the learner will achieve",
  "difficulty": "beginner" | "intermediate" | "advanced",
  "salary": "estimated monthly earning range, e.g. Rp 3-8 jt/month",
  "demand": "${locale === "en" ? "one word: High or Very High" : "one word: Tinggi or Sangat Tinggi"}",
  "modules": [
    {
      "title": "module title",
      "lessons": [
        {
          "title": "lesson title",
          "duration": 5,
          "body": "lesson content in Markdown: start with a short intro paragraph, then use ## headings with an empty line before each one, use '- ' bullet lists, **bold** for key terms, and end with a '## ${locale === "en" ? "Practical Exercise" : "Latihan Praktis"}' section. 250-400 words."
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
- ${langRule(locale)}
- Exactly 3 modules, each with exactly 3 lessons (9 lessons total).
- Lesson duration between 4 and 8 (integer minutes).${structureRule}
- Exactly 5 quiz questions covering all modules.
- Each quiz question has exactly 4 options and exactly one correct answer.
- correctIndex is 0-based (0-3) and must vary across questions.
${specificityRule}
- "title", "description", "salary", "demand", lesson "title", and quiz fields must be plain text — no markdown symbols (#, **, etc.). Markdown is allowed ONLY inside lesson "body".${personalizationRules}${pdfRules}
- No videos, no external links, no placeholders.${pdfFallbackNote}${pdfSourceBlock}`;
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

/** Readable topic from a PDF file name: "Modul_Barista.pdf" -> "Modul Barista". */
export function topicFromPdfName(name: string): string {
  return name
    .replace(/\.pdf$/i, "")
    .replace(/[-_]+/g, " ")
    .trim();
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

  // Last-resort topic when the AI title and the typed skill are both empty
  // (PDF-only generation): derive a readable label from the file name.
  const fallbackTopic =
    skill || (pdf?.name ? topicFromPdfName(pdf.name) : "") || "Kursus";

  const id = `ai-${slugify(raw.title || fallbackTopic)}-${Date.now().toString(36)}`;
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];

  const modules = raw.modules
    .slice(0, 4)
    .map((m, mi) => ({
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
    }))
    // Tolerate AI modules that came back without lessons: drop them
    // instead of failing the whole generation.
    .filter((m) => m.lessons.length > 0);

  if (modules.length === 0) {
    throw new Error("AI response contains no modules with lessons");
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
    title: loc(raw.title || fallbackTopic),
    description: loc(raw.description || fallbackTopic),
    longDescription: loc(raw.longDescription || raw.description || fallbackTopic),
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

/* ================== multi-phase generation (12-15 chapters) ==================
 * One call cannot emit 12-15 chapters with full lesson bodies + quizzes inside
 * the output-token budget, so generation is split:
 *   1. outline  — course meta + 12-15 chapter titles/summaries (1 call)
 *   2. content  — lessons + chapter quiz, a few chapters per call (N calls)
 *   3. final    — the end-of-course quiz (1 call)
 * =========================================================================== */

const TARGET_CHAPTERS = 12; // every course: exactly 12 phases
const LESSONS_PER_PHASE = 3; // each phase: 3 material slides, then a quiz
const MIN_OUTLINE_MODULES = 6; // below this the AI clearly failed
const MAX_OUTLINE_MODULES = 15; // sanitized outlines are padded/sliced to 12
const MAX_CHAPTER_QUIZ = 3;

export interface CourseOutline {
  title: string;
  description: string;
  longDescription: string;
  difficulty: string;
  salary: string;
  demand: string;
  modules: { title: string; summary: string; lessonTitles: string[] }[];
}

export interface ChapterRequest {
  index: number; // 1-based chapter number within the course
  title: string;
  summary: string;
  lessonTitles: string[];
}

export interface DraftQuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface ModuleDraft {
  lessons: { title: string; duration: number; body: string }[];
  quiz: DraftQuizQuestion[];
}

/* ------------------------------- prompts -------------------------------- */

export function buildOutlinePrompt(
  skill: string,
  profile?: CourseProfile,
  pdf?: PdfReferenceInput,
  locale: AiLocale = "id"
): string {
  const lines = describeProfile(profile, locale);
  const profileBlock =
    lines.length > 0 ? `\nLearner profile:\n${lines.join("\n")}\n` : "";
  const pdfText = pdf?.text ?? "";
  const hasPdfText = pdfText.trim().length > 0;
  const topicIntro = skill
    ? `about: "${skill}"`
    : `based entirely on the attached reference PDF`;

  return `You are an instructional designer for SkillPath, an informal skill-learning app for self-taught learners.

Design the STRUCTURE ONLY of a complete mini course ${topicIntro}.
${profileBlock}
Structure requirements:
- EXACTLY ${TARGET_CHAPTERS} modules (phases), ordered from fundamentals to advanced practice${hasPdfText ? ", following the attached reference material's own section order" : ""}. The difficulty MUST rise steadily from phase 1 (easiest) to phase 12 (most advanced).
- Each module contains EXACTLY ${LESSONS_PER_PHASE} lessons (3 material slides that build on each other, then a phase quiz is taken by the learner).
${
  hasPdfText
    ? `- The phases MUST map onto what the attached material actually contains, in its original order. Do NOT invent topics absent from it; if it has fewer than 12 distinct topics, split large ones across several phases and go deeper instead.
`
    : ""
}
Return ONLY a valid JSON object (no markdown, no code fences):
{
  "title": "short course title, max 40 chars",
  "description": "one catchy sentence, max 90 chars",
  "longDescription": "2-3 sentences about what the learner will achieve",
  "difficulty": "beginner" | "intermediate" | "advanced",
  "salary": "estimated monthly earning range, e.g. Rp 3-8 jt/month",
  "demand": "${locale === "en" ? "one word: High or Very High" : "one word: Tinggi or Sangat Tinggi"}",
  "modules": [
    {
      "title": "chapter title",
      "summary": "one sentence on what this chapter teaches",
      "lessons": [ { "title": "lesson title" } ]
    }
  ]
}

Rules:
- ${langRule(locale)} Plain text only.
- Exactly ${TARGET_CHAPTERS} items in "modules", each with exactly ${LESSONS_PER_PHASE} lesson titles (concept -> deeper -> practice, in that order).${
    pdf && !hasPdfText
      ? `
NOTE: a reference PDF ("${pdf?.name}") was uploaded but no readable text could be extracted from it. Design the best possible structure about "${skill}" from your own knowledge.`
      : ""
  }`;
}

export function buildModuleContentPrompt(params: {
  courseTitle: string;
  skill: string;
  chapters: ChapterRequest[];
  allChapterTitles: string[];
  profile?: CourseProfile;
  pdf?: PdfReferenceInput;
  locale?: AiLocale;
}): string {
  const locale: AiLocale = params.locale === "en" ? "en" : "id";
  const lines = describeProfile(params.profile, locale);
  const profileBlock =
    lines.length > 0 ? `\nLearner profile:\n${lines.join("\n")}\n` : "";
  const pdfText = params.pdf?.text ?? "";
  const hasPdfText = pdfText.trim().length > 0;

  const chapterList = params.chapters
    .map(
      (c) =>
        `Chapter ${c.index}: "${c.title}"\nTeaches: ${c.summary}\nLessons (write in this order): ${c.lessonTitles.join("; ")}`
    )
    .join("\n\n");
  const contextList = params.allChapterTitles
    .map((t, i) => `${i + 1}. ${t}`)
    .join("\n");

  return `You are an expert instructional writer finishing the SkillPath course "${params.courseTitle}" (${params.skill || "built from the learner's reference material"}).

Other writers handle the rest of the course. You write FULL content for EXACTLY the ${params.chapters.length} chapters listed under "WRITE CONTENT FOR THESE CHAPTERS ONLY".

FULL course outline (context only — do NOT write these other chapters):
${contextList}

WRITE CONTENT FOR THESE CHAPTERS ONLY:
${chapterList}
${profileBlock}
For EVERY listed chapter produce:
1. Its EXACTLY ${LESSONS_PER_PHASE} lessons in the given order (3 material slides that build on each other: concept -> deeper -> practice). Each lesson body is Markdown, 150-300 words: a short intro paragraph, then ## headings, '- ' bullet lists, **bold** key terms, ending with a '## ${locale === "en" ? "Practical Exercise" : "Latihan Praktis"}' section. Duration 4-8 minutes.
2. A chapter quiz with EXACTLY ${MAX_CHAPTER_QUIZ} questions. Each question has exactly 4 options and one correct answer (correctIndex 0-3, must vary), plus a one-sentence explanation.
${
  hasPdfText
    ? `Ground everything STRICTLY in the attached reference material quoted at the end of this prompt — use its terminology, steps, and examples; never contradict it.\n`
    : ""
}
Return ONLY a valid JSON object:
{ "modules": [ { "lessons": [ { "title": "...", "duration": 5, "body": "..." } ], "quiz": [ { "question": "...", "options": ["A","B","C","D"], "correctIndex": 0, "explanation": "..." } ] } ] }

Rules:
- The "modules" array MUST contain exactly ${params.chapters.length} items in the same order as the chapters above.
- ${langRule(locale)} Titles plain text; Markdown allowed ONLY inside lesson "body".
- No videos, no external links, no placeholders.${
    hasPdfText
      ? `\n\nREFERENCE MATERIAL:\n--- PDF CONTENT START ---\n${pdfText}\n--- PDF CONTENT END ---`
      : ""
  }`;
}

export function buildFinalQuizPrompt(params: {
  courseTitle: string;
  chapters: { title: string; summary: string }[];
  pdf?: PdfReferenceInput;
  locale?: AiLocale;
}): string {
  const locale: AiLocale = params.locale === "en" ? "en" : "id";
  const pdfText = params.pdf?.text ?? "";
  const hasPdfText = pdfText.trim().length > 0;
  const contextList = params.chapters
    .map((c, i) => `${i + 1}. ${c.title} — ${c.summary}`)
    .join("\n");

  return `You are writing the FINAL end-of-course exam for the SkillPath course "${params.courseTitle}".

The course covers these chapters:
${contextList}

Write exactly 8 questions that together cover the WHOLE course (spread them across the chapters, basics through advanced). Each question has exactly 4 options, exactly one correct answer (correctIndex 0-3, must vary across questions), and a one-sentence explanation.
${
  hasPdfText
    ? `Every question must be answerable purely from the attached reference material quoted at the end of this prompt.\n`
    : ""
}
Return ONLY a valid JSON object:
{ "quiz": [ { "question": "...", "options": ["A","B","C","D"], "correctIndex": 0, "explanation": "..." } ] }

Rules:
- ${langRule(locale)} Plain text only.${
    hasPdfText
      ? `\n\nREFERENCE MATERIAL:\n--- PDF CONTENT START ---\n${pdfText}\n--- PDF CONTENT END ---`
      : ""
  }`;
}

/* ------------------------------ sanitizers ------------------------------ */

function asObject(v: unknown): Record<string, unknown> {
  return typeof v === "object" && v !== null ? (v as Record<string, unknown>) : {};
}

/** Validate & normalize phase-1 output. Throws when the AI clearly failed. */
export function sanitizeOutline(raw: unknown): CourseOutline {
  const o = asObject(raw);
  const rawModules = Array.isArray(o.modules) ? o.modules : [];
  const modules = rawModules
    .slice(0, MAX_OUTLINE_MODULES)
    .map((m) => {
      const mo = asObject(m);
      const lessonTitles = (Array.isArray(mo.lessons) ? mo.lessons : [])
        .map((l) =>
          typeof l === "string"
            ? l
            : String(asObject(l).title ?? "")
        )
        .map((t) => t.trim())
        .filter(Boolean)
        // Three material slides per phase (concept -> deeper -> practice).
        .slice(0, LESSONS_PER_PHASE);
      return {
        title: loc(String(mo.title ?? "")).id.trim(),
        summary: loc(String(mo.summary ?? "")).id.trim(),
        lessonTitles,
      };
    })
    .filter((m) => m.title && m.lessonTitles.length > 0);

  if (modules.length < MIN_OUTLINE_MODULES) {
    throw new Error(
      `ai_outline_too_small (${modules.length} modules, need ${MIN_OUTLINE_MODULES})`
    );
  }

  // Guarantee EXACTLY 12 phases, each with exactly 3 lesson titles:
  // pad with deeper-dive follow-ups when the AI returned fewer, slice when
  // it returned more.
  while (modules.length < TARGET_CHAPTERS) {
    const n = modules.length + 1;
    const last = modules[modules.length - 1];
    const base = last.lessonTitles[0] || last.title;
    modules.push({
      title: `Pendalaman ${last.title}`,
      summary: `Pendalaman lanjutan dari materi ${last.title}.`,
      lessonTitles: [
        `${base} — bagian ${n}`,
        `Pendalaman ${base} — bagian ${n}`,
        `Praktik ${base} — bagian ${n}`,
      ],
    });
  }
  if (modules.length > TARGET_CHAPTERS) {
    modules.length = TARGET_CHAPTERS;
  }
  // Ensure every phase has exactly 3 lesson titles.
  for (const m of modules) {
    const base = m.lessonTitles[0] || m.title;
    while (m.lessonTitles.length < LESSONS_PER_PHASE) {
      const k = m.lessonTitles.length;
      m.lessonTitles.push(
        k === 1 ? `Pendalaman ${base}` : `Praktik ${base}`
      );
    }
    m.lessonTitles = m.lessonTitles.slice(0, LESSONS_PER_PHASE);
  }

  const difficultyRaw = String(o.difficulty ?? "");
  return {
    title: loc(String(o.title ?? "")).id.trim(),
    description: loc(String(o.description ?? "")).id.trim(),
    longDescription: loc(String(o.longDescription ?? o.description ?? "")).id.trim(),
    difficulty:
      difficultyRaw === "intermediate" || difficultyRaw === "advanced"
        ? difficultyRaw
        : "beginner",
    salary: loc(String(o.salary ?? "-")).id.trim(),
    demand: String(o.demand || "Tinggi"),
    modules,
  };
}

function sanitizeDraftQuestions(rawQuiz: unknown): DraftQuizQuestion[] {
  if (!Array.isArray(rawQuiz)) return [];
  return rawQuiz
    .slice(0, MAX_CHAPTER_QUIZ + 1)
    .map((q): DraftQuizQuestion | null => {
      const qo = asObject(q);
      const options = (Array.isArray(qo.options) ? qo.options : [])
        .slice(0, 4)
        .map((x) => loc(String(x ?? "")).id.trim())
        .filter(Boolean);
      if (!String(qo.question ?? "").trim() || options.length < 2) return null;
      return {
        question: loc(String(qo.question)).id.trim(),
        options,
        correctIndex: Math.min(
          Math.max(0, Math.round(Number(qo.correctIndex) || 0)),
          options.length - 1
        ),
        explanation: loc(String(qo.explanation ?? "")).id.trim() || undefined,
      };
    })
    .filter((q): q is DraftQuizQuestion => q !== null);
}

/**
 * Validate one batch of phase-2 output. Returns null when the shape is wrong
 * (wrong count / missing content) so the caller can retry once.
 */
export function sanitizeModuleBatch(
  raw: unknown,
  expected: number,
  outlineChapters: { title: string; summary: string; lessonTitles: string[] }[]
): ModuleDraft[] | null {
  const arr = asObject(raw).modules;
  if (!Array.isArray(arr) || arr.length !== expected) return null;

  const drafts: ModuleDraft[] = [];
  for (let i = 0; i < arr.length; i++) {
    const mo = asObject(arr[i]);
    const fallbackTitles = outlineChapters[i]?.lessonTitles ?? [];

    const lessons = (Array.isArray(mo.lessons) ? mo.lessons : [])
      .slice(0, LESSONS_PER_PHASE) // three material slides per phase
      .map((l, li): { title: string; duration: number; body: string } | null => {
        const lo = asObject(l);
        const body = String(lo.body ?? "").trim();
        if (!body) return null;
        return {
          title:
            loc(String(lo.title ?? "")).id.trim() ||
            fallbackTitles[li] ||
            `Pelajaran ${li + 1}`,
          duration: clampInt(lo.duration, 3, 15, 5),
          body: body.slice(0, MAX_BODY_CHARS),
        };
      })
      .filter((l): l is NonNullable<typeof l> => l !== null);

    const quiz = sanitizeDraftQuestions(mo.quiz);
    // A chapter needs at least one real lesson and two working questions
    if (lessons.length === 0 || quiz.length < 2) return null;
    drafts.push({ lessons, quiz });
  }
  return drafts;
}

export function sanitizeFinalQuiz(raw: unknown): DraftQuizQuestion[] {
  const quiz = sanitizeDraftQuestions(asObject(raw).quiz);
  if (quiz.length < 5) throw new Error("ai_final_quiz_too_small");
  return quiz.slice(0, 10);
}

/**
 * Last-resort final exam assembled from the already-generated chapter quizzes
 * (one question per chapter, spread evenly). Only used when the dedicated
 * final-quiz call fails twice — the questions are real content of this course,
 * so a finished multi-minute generation is not thrown away.
 */
export function fallbackFinalQuiz(
  drafts: ModuleDraft[],
  want = 8
): DraftQuizQuestion[] {
  const pool = drafts
    .map((d) => d.quiz[0])
    .filter((q): q is DraftQuizQuestion => Boolean(q));
  if (pool.length <= want) return pool;
  const picked: DraftQuizQuestion[] = [];
  for (let i = 0; i < want; i++) {
    picked.push(pool[Math.floor((i * pool.length) / want)]);
  }
  return picked;
}

/* ------------------------------- assembler ------------------------------ */

/** Combine outline + chapter drafts + final quiz into the persisted Course. */
export function finalizeGeneratedCourse(params: {
  outline: CourseOutline;
  drafts: ModuleDraft[];
  finalQuiz: DraftQuizQuestion[];
  skill: string;
  pdf?: PdfReferenceInput;
}): Course {
  const { outline, drafts, finalQuiz, skill, pdf } = params;
  const fallbackTopic =
    skill || (pdf?.name ? topicFromPdfName(pdf.name) : "") || "Kursus";
  const id = `ai-${slugify(outline.title || fallbackTopic)}-${Date.now().toString(36)}`;
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];

  const modules: CourseModule[] = outline.modules.map((om, mi) => {
    const draft = drafts[mi];
    const mid = `${id}-m${mi + 1}`;
    return {
      id: mid,
      title: loc(om.title),
      lessons: draft.lessons.map((l, li) => ({
        id: `${mid}l${li + 1}`,
        title: loc(l.title),
        type: "text" as const,
        duration: l.duration,
        xp: 50,
        body: loc(l.body),
      })),
      ...(draft.quiz.length > 0
        ? {
            quiz: draft.quiz.map((q, qi) => ({
              id: `${mid}q${qi + 1}`,
              question: loc(q.question),
              options: q.options.map((o) => loc(o)),
              correctIndex: q.correctIndex,
              explanation: q.explanation ? loc(q.explanation) : undefined,
            })),
          }
        : {}),
    };
  });

  const quiz = finalQuiz.map((q, qi) => ({
    id: `${id}-q${qi + 1}`,
    question: loc(q.question),
    options: q.options.map((o) => loc(o)),
    correctIndex: q.correctIndex,
    explanation: q.explanation ? loc(q.explanation) : undefined,
  }));

  if (modules.length === 0 || modules.some((m) => m.lessons.length === 0)) {
    throw new Error("assembled course has empty modules");
  }
  if (quiz.length === 0) throw new Error("assembled course has no final quiz");

  return {
    id,
    title: loc(outline.title || fallbackTopic),
    description: loc(outline.description || fallbackTopic),
    longDescription: loc(outline.longDescription || outline.description || fallbackTopic),
    category: "creative",
    difficulty:
      outline.difficulty === "intermediate" || outline.difficulty === "advanced"
        ? outline.difficulty
        : "beginner",
    icon: "Sparkles",
    color,
    modules,
    quiz,
    passScore: 70,
    salary: loc(outline.salary || "-"),
    demand: String(outline.demand || "Tinggi"),
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
