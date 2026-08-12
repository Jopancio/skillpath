import { NextResponse } from "next/server";
import { extractJSON } from "@/lib/ai-course";
import {
  buildEvaluatePrompt,
  buildResultPrompt,
  buildLearningStylePrompt,
  sanitizeEvaluateResult,
  sanitizePlacementResult,
  sanitizeLearningStyleResult,
  type CoachCourse,
} from "@/lib/ai-onboarding";

const COSMOSHUB_URL = "https://api.cosmoshub.tech/v1/chat/completions";

// Simple in-memory rate limit (per serverless instance)
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 10;
const hits: number[] = [];

function rateLimited(): boolean {
  const now = Date.now();
  while (hits.length > 0 && now - hits[0] > WINDOW_MS) hits.shift();
  if (hits.length >= MAX_PER_WINDOW) return true;
  hits.push(now);
  return false;
}

/* ---------------------------- validation ---------------------------- */

const REASONS = new Set(["career", "business", "hobby", "school"]);
const KNOWLEDGE = new Set(["beginner", "some", "comfortable"]);
const LEARNING_EXP = new Set(["self", "course", "first"]);
const FOCUS_ENEMY = new Set(["phone", "people", "boredom", "tired"]);
const GRASP_METHOD = new Set(["example", "visual", "analogy", "try"]);

function cleanString(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

/** Clamp a numeric profile field to 0-100 (slider values). */
function cleanSlider(v: unknown): number | undefined {
  const n = Number(v);
  if (!Number.isFinite(n)) return undefined;
  return Math.min(Math.max(Math.round(n), 0), 100);
}

function cleanProfile(raw: unknown) {
  if (!raw || typeof raw !== "object") return undefined;
  const p = raw as Record<string, unknown>;
  const profile: Record<string, string | number> = {};
  const name = cleanString(p.name, 40);
  if (name) profile.name = name;
  if (typeof p.reason === "string" && REASONS.has(p.reason))
    profile.reason = p.reason;
  if (
    typeof p.knowledgeLevel === "string" &&
    KNOWLEDGE.has(p.knowledgeLevel)
  )
    profile.knowledgeLevel = p.knowledgeLevel;
  if (typeof p.learningExp === "string" && LEARNING_EXP.has(p.learningExp))
    profile.learningExp = p.learningExp;
  const goal = Number(p.dailyGoalMinutes);
  if (Number.isFinite(goal))
    profile.dailyGoalMinutes = Math.min(Math.max(Math.round(goal), 1), 120);
  // Personalization (steps 7-12)
  if (typeof p.focusEnemy === "string" && FOCUS_ENEMY.has(p.focusEnemy))
    profile.focusEnemy = p.focusEnemy;
  const workType = cleanSlider(p.workType);
  if (workType !== undefined) profile.workType = workType;
  const memory = cleanSlider(p.memory);
  if (memory !== undefined) profile.memory = memory;
  const learningStyle = cleanSlider(p.learningStyle);
  if (learningStyle !== undefined) profile.learningStyle = learningStyle;
  if (typeof p.graspMethod === "string" && GRASP_METHOD.has(p.graspMethod))
    profile.graspMethod = p.graspMethod;
  const ambition = Number(p.ambition);
  if (Number.isFinite(ambition))
    profile.ambition = Math.min(Math.max(Math.round(ambition), 1), 10);
  return Object.keys(profile).length > 0 ? profile : undefined;
}

function cleanCourses(raw: unknown): CoachCourse[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .slice(0, 12)
    .map((c) => {
      const o = c as Record<string, unknown>;
      return {
        id: cleanString(o?.id, 60),
        title: cleanString(o?.title, 80),
      };
    })
    .filter((c) => c.id && c.title);
}

function cleanClarifications(raw: unknown) {
  if (!Array.isArray(raw)) return [];
  return raw
    .slice(0, 3)
    .map((c) => {
      const o = c as Record<string, unknown>;
      return {
        question: cleanString(o?.question, 200),
        answer: cleanString(o?.answer, 120),
      };
    })
    .filter((c) => c.question && c.answer);
}

function cleanQA(raw: unknown) {
  if (!Array.isArray(raw)) return [];
  return raw
    .slice(0, 10)
    .map((q) => {
      const o = q as Record<string, unknown>;
      return {
        question: cleanString(o?.question, 300),
        correct: o?.correct === true,
      };
    })
    .filter((q) => q.question);
}

/* ------------------------------ call AI ------------------------------ */

async function callAI(prompt: string): Promise<unknown> {
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
      max_tokens: Number(process.env.COSMOSHUB_MAX_TOKENS) || 8000,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a learning coach. Always respond with a single valid JSON object only.",
        },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!res.ok) throw new Error(`ai_error_${res.status}`);
  const data = await res.json();
  const text: string = data?.choices?.[0]?.message?.content ?? "";
  return extractJSON(text);
}

/* ------------------------------- route ------------------------------- */

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

  const stage = body?.stage;
  const profile = cleanProfile(body?.profile);

  try {
    if (stage === "style") {
      const courses = cleanCourses(body?.courses);
      // courses boleh kosong di sini — evaluasi gaya belajar tidak
      // bergantung pada course spesifik. Tapi profile wajib ada.
      if (!profile) {
        return NextResponse.json({ error: "invalid_body" }, { status: 400 });
      }
      const raw = await callAI(buildLearningStylePrompt(profile, courses));
      return NextResponse.json(sanitizeLearningStyleResult(raw));
    }

    if (stage === "evaluate") {
      const courses = cleanCourses(body?.courses);
      if (courses.length === 0) {
        return NextResponse.json({ error: "no_courses" }, { status: 400 });
      }
      const clarifications = cleanClarifications(body?.clarifications);
      const raw = await callAI(
        buildEvaluatePrompt(profile, courses, clarifications)
      );
      const result = sanitizeEvaluateResult(raw, courses);
      return NextResponse.json(result);
    }

    if (stage === "result") {
      const courseTitle = cleanString(body?.courseTitle, 80);
      const qa = cleanQA(body?.answers);
      const total = Math.min(Math.max(Math.round(Number(body?.total) || qa.length || 5), 1), 10);
      const correct = Math.min(
        Math.max(Math.round(Number(body?.correct) || 0), 0),
        total
      );
      if (!courseTitle) {
        return NextResponse.json({ error: "invalid_body" }, { status: 400 });
      }
      const raw = await callAI(
        buildResultPrompt(
          profile,
          courseTitle,
          Math.round((correct / total) * 100),
          correct,
          total,
          qa
        )
      );
      return NextResponse.json(sanitizePlacementResult(raw));
    }

    return NextResponse.json({ error: "invalid_stage" }, { status: 400 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown";
    if (msg === "missing_api_key") {
      return NextResponse.json({ error: "missing_api_key" }, { status: 500 });
    }
    return NextResponse.json({ error: "ai_failed" }, { status: 502 });
  }
}
