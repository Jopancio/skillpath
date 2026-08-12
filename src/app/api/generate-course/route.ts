import { NextResponse } from "next/server";
import {
  buildPrompt,
  extractJSON,
  sanitizeCourse,
  type CourseProfile,
  type PdfReferenceInput,
} from "@/lib/ai-course";

const COSMOSHUB_URL = "https://api.cosmoshub.tech/v1/chat/completions";
const MAX_SKILL_LEN = 80;
const MAX_PDF_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_PDF_TEXT = 30_000; // chars fed to the model
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

  // Extract text from the PDF via pdfjs-dist (legacy build, pure JS)
  let text = "";
  try {
    const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs");
    const doc = await getDocument({ data: bytes }).promise;
    try {
      const pages: string[] = [];
      for (let i = 1; i <= Math.min(doc.numPages, 20); i++) {
        const page = await doc.getPage(i);
        const tc = await page.getTextContent();
        pages.push(
          tc.items
            .map((it) => ("str" in it ? String(it.str ?? "") : ""))
            .join(" ")
        );
      }
      text = pages
        .join("\n")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, MAX_PDF_TEXT);
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

export async function POST(request: Request) {
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

  if (skill.length < 3) {
    return NextResponse.json({ error: "invalid_skill" }, { status: 400 });
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

  let aiRes: Response;
  try {
    aiRes = await fetch(COSMOSHUB_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.7,
        max_tokens: maxTokens,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You are a course generator. Always respond with a single valid JSON object only.",
          },
          { role: "user", content: buildPrompt(skill, profile, pdf) },
        ],
      }),
    });
  } catch {
    return NextResponse.json({ error: "ai_unreachable" }, { status: 502 });
  }

  if (!aiRes.ok) {
    const errBody = await aiRes.text().catch(() => "");
    console.error(`[generate-course] ai_error status=${aiRes.status} body=${errBody.slice(0, 500)}`);
    return NextResponse.json(
      { error: "ai_error", status: aiRes.status },
      { status: 502 }
    );
  }

  try {
    const data = await aiRes.json();
    const text: string = data?.choices?.[0]?.message?.content ?? "";
    const finishReason: string = data?.choices?.[0]?.finish_reason ?? "";
    if (!text) {
      // e.g. reasoning models returning empty content with finish_reason "length"
      console.error(
        `[generate-course] empty AI content. finish_reason=${finishReason} usage=${JSON.stringify(data?.usage ?? {})}`
      );
    }
    const raw = extractJSON(text);
    const course = sanitizeCourse(raw, skill, pdf);
    return NextResponse.json({ course });
  } catch (e) {
    console.error("[generate-course] bad_ai_output:", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "bad_ai_output" }, { status: 502 });
  }
}
