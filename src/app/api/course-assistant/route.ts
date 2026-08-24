import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { extractJSON } from "@/lib/ai-course";

const COSMOSHUB_URL = "https://api.cosmoshub.tech/v1/chat/completions";
// gemini-* models spend tokens on internal reasoning before producing output,
// so the visible content needs a larger budget than the expected JSON size.
const MAX_TOKENS = Number(process.env.COSMOSHUB_MAX_TOKENS) || 6000;
const MAX_TOKENS_CHAT = 2500;

// Simple in-memory rate limit (per serverless instance)
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 20;
const hits: number[] = [];

function rateLimited(): boolean {
  const now = Date.now();
  while (hits.length > 0 && now - hits[0] > WINDOW_MS) hits.shift();
  if (hits.length >= MAX_PER_WINDOW) return true;
  hits.push(now);
  return false;
}

function cleanString(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

/* ----------------------------- course shape ---------------------------- */

interface CleanLesson {
  title: string;
  body: string;
  cards: { front: string; back: string }[];
}

function cleanLesson(raw: unknown): CleanLesson {
  // Legacy payloads sent plain lesson-title strings
  if (typeof raw === "string" || typeof raw !== "object" || raw === null) {
    return {
      title: cleanString(raw, 160),
      body: "",
      cards: [],
    };
  }
  const l = raw as Record<string, unknown>;
  const cards = Array.isArray(l.cards)
    ? (l.cards as Record<string, unknown>[])
        .slice(0, 10)
        .map((c) => ({
          front: cleanString(c?.front, 200),
          back: cleanString(c?.back, 500),
        }))
        .filter((c) => c.front && c.back)
    : [];
  return {
    title: cleanString(l.title, 160),
    body: cleanString(l.body, 2400),
    cards,
  };
}

function cleanCourse(raw: unknown) {
  const o = (raw ?? {}) as Record<string, unknown>;
  const title = cleanString(o.title, 120);
  const description = cleanString(o.description, 600);
  const modules = Array.isArray(o.modules)
    ? (o.modules as Record<string, unknown>[]).slice(0, 12).map((m) => ({
        title: cleanString(m?.title, 120),
        lessons: Array.isArray(m?.lessons)
          ? (m.lessons as unknown[]).slice(0, 12).map(cleanLesson)
          : [],
      }))
    : [];
  return { title, description, modules };
}

type CleanCourse = ReturnType<typeof cleanCourse>;

function courseOutline(course: CleanCourse): string {
  return course.modules
    .map((m) => `- ${m.title}: ${m.lessons.map((l) => l.title).join(", ")}`)
    .join("\n");
}

/** Full lesson material (bodies + flipcards) so the assistant can answer about the content itself. */
function courseMaterial(course: CleanCourse): string {
  return course.modules
    .map(
      (m) =>
        `## ${m.title}\n` +
        m.lessons
          .map((l) => {
            const parts = [`### ${l.title}`];
            if (l.body) parts.push(l.body);
            if (l.cards.length > 0) {
              parts.push(
                l.cards.map((c) => `- ${c.front}: ${c.back}`).join("\n")
              );
            }
            return parts.join("\n");
          })
          .filter(Boolean)
          .join("\n\n")
    )
    .join("\n\n")
    .slice(0, 24_000); // hard cap so huge courses can't blow the context window
}

/* ----------------------------- user context ----------------------------- */

interface UserContext {
  name?: string;
  level?: number;
  xp?: number;
  streak?: number;
  dailyGoalMinutes?: number;
  knowledgeLevel?: string;
  learningExp?: string;
  reason?: string;
  graspMethod?: string;
  focusEnemy?: string;
  placementLevel?: string;
  courseProgress: {
    completedCount?: number;
    totalCount?: number;
    completedTitles: string[];
    nextTitle?: string;
    quizScore?: number;
    quizPassed?: boolean;
  };
}

function clampNum(v: unknown, min: number, max: number): number | undefined {
  const n = Math.round(Number(v));
  return Number.isFinite(n) && n >= min && n <= max ? n : undefined;
}

function cleanUserContext(raw: unknown): UserContext {
  if (typeof raw !== "object" || raw === null) {
    return { courseProgress: { completedTitles: [] } };
  }
  const o = raw as Record<string, unknown>;
  const cp =
    typeof o.courseProgress === "object" && o.courseProgress !== null
      ? (o.courseProgress as Record<string, unknown>)
      : {};
  return {
    name: cleanString(o.name, 40) || undefined,
    level: clampNum(o.level, 0, 1000),
    xp: clampNum(o.xp, 0, 10_000_000),
    streak: clampNum(o.streak, 0, 3650),
    dailyGoalMinutes: clampNum(o.dailyGoalMinutes, 1, 480),
    knowledgeLevel: cleanString(o.knowledgeLevel, 30) || undefined,
    learningExp: cleanString(o.learningExp, 30) || undefined,
    reason: cleanString(o.reason, 30) || undefined,
    graspMethod: cleanString(o.graspMethod, 30) || undefined,
    focusEnemy: cleanString(o.focusEnemy, 30) || undefined,
    placementLevel: cleanString(o.placementLevel, 30) || undefined,
    courseProgress: {
      completedCount: clampNum(cp.completedCount, 0, 500),
      totalCount: clampNum(cp.totalCount, 0, 500),
      completedTitles: Array.isArray(cp.completedTitles)
        ? (cp.completedTitles as unknown[])
            .map((x) => cleanString(x, 80))
            .filter(Boolean)
            .slice(0, 15)
        : [],
      nextTitle: cleanString(cp.nextTitle, 80) || undefined,
      quizScore: clampNum(cp.quizScore, 0, 100),
      quizPassed:
        typeof cp.quizPassed === "boolean" ? cp.quizPassed : undefined,
    },
  };
}

/** One-sentence summary of who the student is, for the system prompt. */
function userContextBlock(ctx: UserContext, locale: "id" | "en"): string {
  const parts: string[] = [];
  if (ctx.name) parts.push(locale === "en" ? `Their name is ${ctx.name}.` : `Namanya ${ctx.name}.`);
  const stats = [
    ctx.level !== undefined && `level ${ctx.level}`,
    ctx.xp !== undefined && `${ctx.xp} XP`,
    ctx.streak !== undefined &&
      ctx.streak > 0 &&
      (locale === "en" ? `${ctx.streak}-day streak` : `streak ${ctx.streak} hari`),
  ].filter(Boolean);
  if (stats.length > 0) {
    parts.push(locale === "en" ? `Platform stats: ${stats.join(", ")}.` : `Statistik platform: ${stats.join(", ")}.`);
  }
  if (ctx.dailyGoalMinutes !== undefined) {
    parts.push(
      locale === "en"
        ? `Daily learning goal: ${ctx.dailyGoalMinutes} minutes.`
        : `Target belajar harian: ${ctx.dailyGoalMinutes} menit.`
    );
  }
  const traits: [string | undefined, string, string][] = [
    [ctx.knowledgeLevel, "Self-reported knowledge:", "Pengetahuan yang mereka laporkan sendiri:"],
    [ctx.learningExp, "Prior learning experience:", "Pengalaman belajar sebelumnya:"],
    [ctx.reason, "Motivation for learning:", "Motivasi belajar:"],
    [ctx.graspMethod, "Prefers explanations via:", "Lebih suka penjelasan lewat:"],
    [ctx.focusEnemy, "Main distraction:", "Pengganggu utama:"],
    [ctx.placementLevel, "Diagnostic placement result:", "Hasil tes penempatan diagnostik:"],
  ];
  for (const [value, en, id] of traits) {
    if (value) parts.push(`${locale === "en" ? en : id} ${value}`);
  }

  const p = ctx.courseProgress;
  if (p.completedCount !== undefined || p.totalCount !== undefined) {
    parts.push(
      locale === "en"
        ? `Course progress so far: ${p.completedCount ?? 0}/${p.totalCount ?? "?"} lessons completed.`
        : `Progres kursus sejauh ini: ${p.completedCount ?? 0}/${p.totalCount ?? "?"} pelajaran selesai.`
    );
  }
  if (p.completedTitles.length > 0) {
    parts.push(
      locale === "en"
        ? `Lessons already completed: ${p.completedTitles.join(", ")}.`
        : `Pelajaran yang sudah selesai: ${p.completedTitles.join(", ")}.`
    );
  }
  if (p.nextTitle) {
    parts.push(locale === "en" ? `Next lesson: "${p.nextTitle}".` : `Pelajaran berikutnya: "${p.nextTitle}".`);
  }
  if (p.quizScore !== undefined) {
    const suffix =
      p.quizPassed === true
        ? locale === "en"
          ? " (passed)"
          : " (lulus)"
        : p.quizPassed === false
          ? locale === "en"
            ? " (not passed yet)"
            : " (belum lulus)"
          : "";
    parts.push(
      locale === "en"
        ? `Final-quiz score: ${p.quizScore}%${suffix}.`
        : `Nilai kuis akhir: ${p.quizScore}%${suffix}.`
    );
  }
  return parts.join(" ");
}

/* -------------------------------- call AI ------------------------------ */

async function callAIJson(system: string, user: string): Promise<unknown> {
  const apiKey = process.env.COSMOSHUB_API_KEY;
  if (!apiKey) throw new Error("missing_api_key");
  const res = await fetch(COSMOSHUB_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.COSMOSHUB_MODEL || "gemini-3.6-flash",
      temperature: 0.7,
      max_tokens: MAX_TOKENS,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });
  if (!res.ok) throw new Error(`ai_error_${res.status}`);
  const data = await res.json();
  const text: string = data?.choices?.[0]?.message?.content ?? "";
  return extractJSON(text);
}

async function callAIChat(
  system: string,
  history: { role: string; content: string }[],
  question: string
): Promise<string> {
  const apiKey = process.env.COSMOSHUB_API_KEY;
  if (!apiKey) throw new Error("missing_api_key");
  const res = await fetch(COSMOSHUB_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.COSMOSHUB_MODEL || "gemini-3.6-flash",
      temperature: 0.7,
      max_tokens: MAX_TOKENS_CHAT,
      messages: [
        { role: "system", content: system },
        ...history,
        { role: "user", content: question },
      ],
    }),
  });
  if (!res.ok) throw new Error(`ai_error_${res.status}`);
  const data = await res.json();
  const answer: string = data?.choices?.[0]?.message?.content ?? "";
  if (!answer) throw new Error("empty");
  return answer;
}

/* ------------------------------ sanitizers ----------------------------- */

interface GeneratedQuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

function cleanQuiz(raw: unknown): GeneratedQuizQuestion[] {
  const arr =
    (raw as Record<string, unknown>)?.questions ??
    (Array.isArray(raw) ? raw : undefined);
  if (!Array.isArray(arr)) return [];
  return (arr as Record<string, unknown>[])
    .slice(0, 10)
    .map((q) => {
      const options = Array.isArray(q?.options)
        ? (q.options as unknown[]).slice(0, 4).map((o) => cleanString(o, 200))
        : [];
      return {
        question: cleanString(q?.question, 300),
        options,
        correctIndex: Math.min(
          Math.max(0, Math.round(Number(q?.correctIndex) || 0)),
          Math.max(options.length - 1, 0)
        ),
        explanation: cleanString(q?.explanation, 400) || undefined,
      };
    })
    .filter((q) => q.question && q.options.length >= 2);
}

function cleanFlashcards(raw: unknown): { front: string; back: string }[] {
  const arr =
    (raw as Record<string, unknown>)?.cards ??
    (Array.isArray(raw) ? raw : undefined);
  if (!Array.isArray(arr)) return [];
  return (arr as Record<string, unknown>[])
    .slice(0, 20)
    .map((c) => ({
      front: cleanString(c?.front, 200),
      back: cleanString(c?.back, 400),
    }))
    .filter((c) => c.front && c.back);
}

/* -------------------------------- route -------------------------------- */

export async function POST(request: Request) {
  // Require a signed-in Clerk user before spending any AI quota.
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  if (rateLimited()) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const action = cleanString(body?.action, 20) || "chat";
  const locale = cleanString(body?.locale, 5) === "en" ? "en" : "id";
  const course = cleanCourse(body?.course);
  const outline = courseOutline(course);
  const material = courseMaterial(course);
  const langInstr =
    locale === "en" ? "Write in English." : "Write in Bahasa Indonesia.";

  try {
    /* ----- Generate study notes ----- */
    if (action === "notes") {
      const raw = await callAIJson(
        "You are an expert study-notes writer. Respond with a single valid JSON object only.",
        `Create concise, well-structured study notes summarizing the online course "${course.title}".
Course description: ${course.description}
Course outline:
${outline}

Return ONLY a JSON object: { "notes": "..." } where "notes" is Markdown-formatted study notes (use ## headings, bullet points, **bold** key terms). Cover every module. 400-700 words. ${langInstr}`
      );
      const notes = cleanString((raw as Record<string, unknown>)?.notes, 8000);
      if (!notes) throw new Error("empty_notes");
      return NextResponse.json({ notes });
    }

    /* ----- Generate flashcards ----- */
    if (action === "flashcards") {
      const raw = await callAIJson(
        "You are an expert flashcard creator. Respond with a single valid JSON object only.",
        `Create flashcards to help memorize the key concepts of the online course "${course.title}".
Course description: ${course.description}
Course outline:
${outline}

Return ONLY a JSON object: { "cards": [ { "front": "term or question", "back": "short definition or answer" } ] }.
Create 8-12 cards. Keep the front short (a term or question) and the back concise (1-2 sentences). ${langInstr}`
      );
      const cards = cleanFlashcards(raw);
      if (cards.length === 0) throw new Error("empty_cards");
      return NextResponse.json({ cards });
    }

    /* ----- Generate quiz ----- */
    if (action === "quiz") {
      const rawDiff = cleanString(body?.difficulty, 12);
      const difficulty = ["easy", "medium", "hard"].includes(rawDiff)
        ? rawDiff
        : "medium";
      const diffLabel =
        locale === "en"
          ? { easy: "easy (basic recall)", medium: "medium (understanding & application)", hard: "hard (analysis & scenario)" }[difficulty]
          : { easy: "mudah (hafalan dasar)", medium: "sedang (pemahaman & penerapan)", hard: "sulit (analisis & studi kasus)" }[difficulty];

      const raw = await callAIJson(
        "You are an expert quiz writer. Respond with a single valid JSON object only.",
        `Create a ${diffLabel} practice quiz about the online course "${course.title}".
Course description: ${course.description}
Course outline:
${outline}

Return ONLY a JSON object: { "questions": [ { "question": "...", "options": ["A","B","C","D"], "correctIndex": 0, "explanation": "one sentence" } ] }.
Create exactly 5 questions. Each has exactly 4 options and one correct answer. correctIndex is 0-based and must vary. ${langInstr}`
      );
      const questions = cleanQuiz(raw);
      if (questions.length === 0) throw new Error("empty_quiz");
      return NextResponse.json({ questions, difficulty });
    }

    /* ----- Chat (default) ----- */
    const question = cleanString(body?.question, 1000);
    if (!question) {
      return NextResponse.json({ error: "no_question" }, { status: 400 });
    }
    const history = Array.isArray(body?.history)
      ? (body.history as Record<string, unknown>[])
          .slice(-6)
          .map((m) => ({
            role: m?.role === "assistant" ? "assistant" : "user",
            content: cleanString(m?.content, 1000),
          }))
          .filter((m) => m.content)
      : [];

    const userCtx = cleanUserContext(body?.userContext);
    const aboutStudent = userContextBlock(userCtx, locale);
    const personalInstr =
      locale === "en"
        ? "Use this context to personalize your answers (address the student by name when it feels natural, match explanations to their level and preferred learning style, and reference their progress when relevant)."
        : "Gunakan konteks ini untuk mempersonalisasi jawabanmu (panggil nama siswa kalau terasa natural, sesuaikan penjelasan dengan level dan gaya belajar mereka, dan rujuk progresnya bila relevan).";

    const materialBlock = material
      ? locale === "en"
        ? `\nThe full course material you must ground your answers in (quote/paraphrase it rather than inventing content):\n${material}\n`
        : `\nMateri lengkap kursus yang harus menjadi dasar jawabanmu (kutip/parafrase materi ini, jangan mengarang isi sendiri):\n${material}\n`
      : "";

    const systemPrompt =
      locale === "en"
        ? `You are a friendly learning assistant for the online course "${course.title}". Course description: ${course.description}. Course outline:\n${outline}${materialBlock}\nAbout the student: ${aboutStudent || "unknown"}\n${personalInstr}\nAnswer the student's questions clearly, concisely, and helpfully in English. Stay on-topic about the course material.`
        : `Kamu adalah asisten belajar yang ramah untuk kursus online "${course.title}". Deskripsi kursus: ${course.description}. Garis besar kursus:\n${outline}${materialBlock}\nTentang siswa: ${aboutStudent || "belum diketahui"}\n${personalInstr}\nJawab pertanyaan siswa dengan jelas, ringkas, dan membantu dalam Bahasa Indonesia. Tetap fokus pada materi kursus.`;

    const answer = await callAIChat(systemPrompt, history, question);
    return NextResponse.json({ answer });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown";
    if (msg === "missing_api_key") {
      return NextResponse.json({ error: "missing_api_key" }, { status: 500 });
    }
    return NextResponse.json({ error: "ai_failed" }, { status: 502 });
  }
}
