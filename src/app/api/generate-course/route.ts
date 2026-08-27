import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import {
  buildFinalQuizPrompt,
  buildModuleContentPrompt,
  buildOutlinePrompt,
  extractJSON,
  fallbackFinalQuiz,
  finalizeGeneratedCourse,
  sanitizeFinalQuiz,
  sanitizeModuleBatch,
  sanitizeOutline,
  topicFromPdfName,
  type ChapterRequest,
  type CourseProfile,
  type DraftQuizQuestion,
  type ModuleDraft,
  type PdfReferenceInput,
} from "@/lib/ai-course";

const COSMOSHUB_URL = "https://api.cosmoshub.tech/v1/chat/completions";
const MAX_SKILL_LEN = 80;
const MAX_PDF_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_PDF_PAGES = 30; // pages read from the PDF
const MAX_PDF_TEXT = 45_000; // chars fed to the model
const MAX_PDF_META = 10 * 1024 * 1024; // metadata we store on the course

const REASONS = new Set(["career", "business", "hobby", "school"]);
const KNOWLEDGE = new Set(["beginner", "some", "comfortable"]);
const LEARNING_EXP = new Set(["self", "course", "first"]);

/** Whitelist & trim the onboarding profile coming from the client. */
function sanitizeProfile(raw: unknown): CourseProfile | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const p = raw as Record<string, unknown>;
  const profile: CourseProfile = {};
  if (typeof p.name === "string" && p.name.trim()) {
    profile.name = p.name.trim().slice(0, 40);
  }
  if (typeof p.reason === "string" && REASONS.has(p.reason)) {
    profile.reason = p.reason;
  }
  if (typeof p.knowledgeLevel === "string" && KNOWLEDGE.has(p.knowledgeLevel)) {
    profile.knowledgeLevel = p.knowledgeLevel;
  }
  if (typeof p.learningExp === "string" && LEARNING_EXP.has(p.learningExp)) {
    profile.learningExp = p.learningExp;
  }
  const goal = Number(p.dailyGoalMinutes);
  if (Number.isFinite(goal)) {
    profile.dailyGoalMinutes = Math.min(Math.max(Math.round(goal), 1), 120);
  }
  return Object.keys(profile).length > 0 ? profile : undefined;
}

/**
 * Validate the client-uploaded PDF: must be application/pdf, <= 5 MB.
 * Returns a PdfReferenceInput with the extracted plain text (used only to
 * build the prompt — never stored), plus metadata for the Course.
 */
async function sanitizePdf(raw: unknown): Promise<PdfReferenceInput | undefined> {
  if (!raw || typeof raw !== "object") return undefined;
  const p = raw as Record<string, unknown>;
  if (typeof p.name !== "string" || p.name.trim() === "") return undefined;
  if (typeof p.data !== "string" || p.data === "") return undefined;

  const name = p.name.trim().slice(0, 100);
  const metaSize = Number(p.size);
  const size = Number.isFinite(metaSize) ? Math.round(metaSize) : 0;
  if (size > MAX_PDF_SIZE) {
    throw new PdfTooLargeError();
  }

  const mimeMatch = p.data.match(/^data:([^;]+);/);
  const mime = mimeMatch ? mimeMatch[1] : "";
  if (mime && mime !== "application/pdf") {
    throw new PdfBadTypeError();
  }

  let bytes: Uint8Array;
  try {
    bytes = Uint8Array.from(atob(p.data.replace(/^data:[^;]+;base64,/, "")), (c) =>
      c.charCodeAt(0)
    );
  } catch {
    throw new PdfBadTypeError();
  }
  if (bytes.length === 0 || bytes.length > MAX_PDF_SIZE) {
    throw new PdfTooLargeError();
  }
  // Enforce the magic header "%PDF-" on the raw bytes
  if (
    bytes.length < 5 ||
    String.fromCharCode(bytes[0], bytes[1], bytes[2]) !== "%PD" ||
    bytes[3] !== 0x46
  ) {
    throw new PdfBadTypeError();
  }

  // Extract text from the PDF via pdfjs-dist (legacy build, pure JS).
  // Whitespace is collapsed within a page, but page breaks are kept as
  // blank lines so the model can still see the document's structure.
  let text = "";
  try {
    const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs");
    const doc = await getDocument({ data: bytes }).promise;
    try {
      const pages: string[] = [];
      for (let i = 1; i <= Math.min(doc.numPages, MAX_PDF_PAGES); i++) {
        const page = await doc.getPage(i);
        const tc = await page.getTextContent();
        const pageText = tc.items
          .map((it) => ("str" in it ? String(it.str ?? "") : ""))
          .join(" ")
          .replace(/\s+/g, " ")
          .trim();
        if (pageText) pages.push(pageText);
      }
      text = pages.join("\n\n").slice(0, MAX_PDF_TEXT).trim();
    } finally {
      await doc.destroy();
    }
  } catch {
    text = "";
  }

  return {
    name,
    size: Math.min(size, MAX_PDF_META),
    text,
  };
}

class PdfTooLargeError extends Error {}
class PdfBadTypeError extends Error {}

// Simple in-memory rate limit (per serverless instance)
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits: number[] = [];

function rateLimited(): boolean {
  const now = Date.now();
  while (hits.length > 0 && now - hits[0] > WINDOW_MS) hits.shift();
  if (hits.length >= MAX_PER_WINDOW) return true;
  hits.push(now);
  return false;
}

class AiCallError extends Error {}

/**
 * One chat-completion call that must answer with a single JSON object.
 * Returns the extracted raw JSON; throws AiCallError on transport/API failure
 * and lets extractJSON errors bubble for invalid content.
 */
async function callAIJson(params: {
  apiKey: string;
  model: string;
  maxTokens: number;
  prompt: string;
}): Promise<unknown> {
  let aiRes: Response;
  try {
    aiRes = await fetch(COSMOSHUB_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${params.apiKey}`,
      },
      body: JSON.stringify({
        model: params.model,
        temperature: 0.7,
        max_tokens: params.maxTokens,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You are a course generator. Always respond with a single valid JSON object only. When reference material is provided in the user message, treat it as the authoritative source for the course content.",
          },
          { role: "user", content: params.prompt },
        ],
      }),
    });
  } catch {
    throw new AiCallError("ai_unreachable");
  }
  if (!aiRes.ok) {
    const errBody = await aiRes.text().catch(() => "");
    console.error(
      `[generate-course] ai_error status=${aiRes.status} body=${errBody.slice(0, 500)}`
    );
    throw new AiCallError(`ai_error_${aiRes.status}`);
  }
  const data = await aiRes.json();
  const text: string = data?.choices?.[0]?.message?.content ?? "";
  const finishReason: string = data?.choices?.[0]?.finish_reason ?? "";
  if (!text) {
    // e.g. reasoning models returning empty content with finish_reason "length"
    console.error(
      `[generate-course] empty AI content. finish_reason=${finishReason} usage=${JSON.stringify(data?.usage ?? {})}`
    );
  }
  return extractJSON(text);
}

export async function POST(request: Request) {
  // Require a signed-in Clerk user before spending any AI quota.
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.COSMOSHUB_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "missing_api_key" },
      { status: 500 }
    );
  }

  let skill = "";
  let profile: CourseProfile | undefined;
  let pdf: PdfReferenceInput | undefined;
  try {
    const body = await request.json();
    skill = String(body?.skill ?? "").trim().slice(0, MAX_SKILL_LEN);
    profile = sanitizeProfile(body?.profile);
    pdf = await sanitizePdf(body?.pdf);
  } catch (e) {
    if (e instanceof PdfTooLargeError) {
      return NextResponse.json({ error: "pdf_too_large" }, { status: 413 });
    }
    if (e instanceof PdfBadTypeError) {
      return NextResponse.json({ error: "pdf_invalid" }, { status: 422 });
    }
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  // A topic prompt OR an uploaded PDF is enough to build a course from.
  const hasPdfText = Boolean(pdf && pdf.text.trim().length > 0);
  if (skill.length < 3 && !hasPdfText) {
    // The PDF's text could not be extracted (e.g. scanned/image-only pages).
    // Fall back to its file name as the course topic instead of failing.
    const fromName = pdf
      ? topicFromPdfName(pdf.name).slice(0, MAX_SKILL_LEN)
      : "";
    if (!fromName) {
      return NextResponse.json({ error: "invalid_skill" }, { status: 400 });
    }
    skill = fromName;
  }

  if (rateLimited()) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const model = process.env.COSMOSHUB_MODEL || "gemini-3.6-flash";
  // gemini-* models spend tokens on internal "reasoning" before producing
  // output, so the visible content needs a much larger budget than the
  // expected JSON size. Generous headroom avoids finish_reason "length"
  // with an empty message (which surfaced as a 502 bad_ai_output).
  const maxTokens = Number(process.env.COSMOSHUB_MAX_TOKENS) || 16000;

  // A full 12-15 chapter course cannot fit inside one completion, so
  // generation runs in three phases: outline -> chapter content (batches)
  // -> final quiz. Every phase is grounded in the same PDF text when given.
  try {
    // ---- Phase 1: structure (course meta + 12-15 chapter titles) ----
    const outline = sanitizeOutline(
      await callAIJson({
        apiKey,
        model,
        maxTokens,
        prompt: buildOutlinePrompt(skill, profile, pdf),
      })
    );
    const chapters: ChapterRequest[] = outline.modules.map((m, i) => ({
      index: i + 1,
      title: m.title,
      summary: m.summary,
      lessonTitles: m.lessonTitles,
    }));

    // ---- Phase 2: lesson bodies + chapter quizzes, a few chapters per call.
    // Sequential so we stay under the API rate limit; each batch gets one
    // retry before giving up honestly (no fabricated placeholder content).
    const drafts: ModuleDraft[] = [];
    const BATCH_SIZE = 4;
    for (let start = 0; start < chapters.length; start += BATCH_SIZE) {
      const batchChapters = chapters.slice(start, start + BATCH_SIZE);
      const prompt = buildModuleContentPrompt({
        courseTitle: outline.title || skill,
        skill,
        chapters: batchChapters,
        allChapterTitles: outline.modules.map((m) => m.title),
        profile,
        pdf,
      });
      let batch: ModuleDraft[] | null = null;
      let lastErr: unknown = null;
      for (let attempt = 0; attempt < 2 && !batch; attempt++) {
        try {
          batch = sanitizeModuleBatch(
            await callAIJson({ apiKey, model, maxTokens, prompt }),
            batchChapters.length,
            outline.modules
          );
        } catch (e) {
          lastErr = e;
          console.error(
            `[generate-course] content batch ch.${batchChapters[0].index}-${batchChapters[batchChapters.length - 1].index} attempt ${attempt + 1}:`,
            e instanceof Error ? e.message : e
          );
        }
      }
      if (!batch) throw lastErr ?? new Error("content_batch_failed");
      drafts.push(...batch);
    }

    // ---- Phase 3: end-of-course quiz (retry once). If it still fails,
    // re-use real chapter questions instead of discarding the whole run.
    let finalQuiz: DraftQuizQuestion[] | null = null;
    for (let attempt = 0; attempt < 2 && !finalQuiz; attempt++) {
      try {
        finalQuiz = sanitizeFinalQuiz(
          await callAIJson({
            apiKey,
            model,
            maxTokens,
            prompt: buildFinalQuizPrompt({
              courseTitle: outline.title || skill,
              chapters: outline.modules,
              pdf,
            }),
          })
        );
      } catch (e) {
        console.error(
          `[generate-course] final quiz attempt ${attempt + 1}:`,
          e instanceof Error ? e.message : e
        );
      }
    }
    if (!finalQuiz) finalQuiz = fallbackFinalQuiz(drafts);

    const course = finalizeGeneratedCourse({ outline, drafts, finalQuiz, skill, pdf });
    return NextResponse.json({ course });
  } catch (e) {
    console.error("[generate-course] generation failed:", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "bad_ai_output" }, { status: 502 });
  }
}
