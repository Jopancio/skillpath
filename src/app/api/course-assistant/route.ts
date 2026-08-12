import { NextResponse } from "next/server";
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

function cleanCourse(raw: unknown) {
  const o = (raw ?? {}) as Record<string, unknown>;
  const title = cleanString(o.title, 120);
  const description = cleanString(o.description, 600);
  const modules = Array.isArray(o.modules)
    ? (o.modules as Record<string, unknown>[]).slice(0, 12).map((m) => ({
        title: cleanString(m?.title, 120),
        lessons: Array.isArray(m?.lessons)
          ? (m.lessons as unknown[]).slice(0, 12).map((l) => cleanString(l, 160))
          : [],
      }))
    : [];
  return { title, description, modules };
}

function courseOutline(course: ReturnType<typeof cleanCourse>): string {
  return course.modules
    .map((m) => `- ${m.title}: ${m.lessons.join(", ")}`)
    .join("\n");
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

    const systemPrompt =
      locale === "en"
        ? `You are a friendly learning assistant for the online course "${course.title}". Course description: ${course.description}. Course outline:\n${outline}\nAnswer the student's questions clearly, concisely, and helpfully in English. Stay on-topic about the course material.`
        : `Kamu adalah asisten belajar yang ramah untuk kursus online "${course.title}". Deskripsi kursus: ${course.description}. Garis besar kursus:\n${outline}\nJawab pertanyaan siswa dengan jelas, ringkas, dan membantu dalam Bahasa Indonesia. Tetap fokus pada materi kursus.`;

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
