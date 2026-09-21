/** Shared validation for AI output, uploaded work and local simulation history. */
export const MAX_WORK_FILE_BYTES = 3 * 1024 * 1024;
export const MAX_WORK_TEXT = 45_000;
export const MAX_WORK_PAGES = 15;
export const WORK_FILE_ACCEPT = ".pdf,.txt,.md,.png,.jpg,.jpeg,.webp";
export type WorkFileKind = "pdf" | "text" | "image";

export interface WorkBrief {
  title: string;
  role: string;
  client: string;
  situation: string;
  objective: string;
  minutes: number;
  deliverables: string[];
  fileInstruction: string;
  tips: string[];
  criteria: { id: string; title: string; description: string }[];
}

export interface WorkReview {
  score: number;
  summary: string;
  criteria: { id: string; score: number; feedback: string; evidence: string }[];
  strengths: string[];
  weaknesses: string[];
  improvements: { priority: "high" | "medium" | "low"; action: string; example: string }[];
  limitations: string[];
}

export interface WorkAttempt {
  id: string;
  createdAt: string;
  fileName: string;
  fileSize: number;
  reading: string;
  notes: string;
  review: WorkReview;
}

export interface WorkRecord {
  version: 2;
  courseId: string;
  brief: WorkBrief;
  notes: string;
  attempts: WorkAttempt[];
}

function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("invalid_object");
  return value as Record<string, unknown>;
}

export function workString(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function required(value: unknown, max: number): string {
  const text = workString(value, max);
  if (!text) throw new Error("missing_text");
  return text;
}

function strings(value: unknown, min = 1, max = 6): string[] {
  if (!Array.isArray(value)) throw new Error("invalid_list");
  const list = value.slice(0, max).map((v) => required(v, 1400));
  if (list.length < min) throw new Error("incomplete_list");
  return list;
}

export function parseWorkBrief(value: unknown): WorkBrief {
  const v = object(value);
  if (!Array.isArray(v.criteria) || v.criteria.length !== 4) throw new Error("invalid_criteria");
  const criteria = v.criteria.map((item, i) => {
    const c = object(item);
    return { id: `c${i + 1}`, title: required(c.title, 100), description: required(c.description, 700) };
  });
  if (typeof v.minutes !== "number" || !Number.isFinite(v.minutes)) throw new Error("invalid_duration");
  return {
    title: required(v.title, 180), role: required(v.role, 120), client: required(v.client, 120),
    situation: required(v.situation, 2000), objective: required(v.objective, 1000),
    minutes: Math.max(15, Math.min(180, Math.round(v.minutes))),
    deliverables: strings(v.deliverables, 2), fileInstruction: required(v.fileInstruction, 1400),
    tips: strings(v.tips, 1, 4), criteria,
  };
}

/** Derive the total from all four criteria; never trust a model-supplied total. */
export function parseWorkReview(value: unknown, brief: WorkBrief): WorkReview {
  const v = object(value);
  if (!Array.isArray(v.criteria) || v.criteria.length !== brief.criteria.length) throw new Error("incomplete_review");
  const rows = v.criteria.map(object);
  const criteria = brief.criteria.map((criterion) => {
    const matches = rows.filter((row) => row.id === criterion.id);
    if (matches.length !== 1) throw new Error("invalid_criterion_id");
    const c = matches[0];
    if (typeof c.score !== "number" || !Number.isFinite(c.score) || c.score < 0 || c.score > 100) throw new Error("invalid_score");
    return { id: criterion.id, score: Math.round(c.score), feedback: required(c.feedback, 1600), evidence: required(c.evidence, 1200) };
  });
  if (!Array.isArray(v.improvements) || !v.improvements.length) throw new Error("missing_improvements");
  const improvements = v.improvements.slice(0, 6).map((item) => {
    const row = object(item);
    if (row.priority !== "high" && row.priority !== "medium" && row.priority !== "low") throw new Error("invalid_priority");
    const priority = row.priority as "high" | "medium" | "low";
    return { priority, action: required(row.action, 1400), example: required(row.example, 1600) };
  });
  return {
    score: Math.round(criteria.reduce((sum, c) => sum + c.score, 0) / criteria.length),
    summary: required(v.summary, 2000), criteria,
    strengths: strings(v.strengths, 0), weaknesses: strings(v.weaknesses, 0), improvements,
    limitations: strings(v.limitations, 0),
  };
}

export function workFileKind(name: string, size: number): WorkFileKind {
  if (!Number.isFinite(size) || size <= 0) throw new Error("Berkas kosong. Pilih hasil kerja yang berisi konten.");
  if (size > MAX_WORK_FILE_BYTES) throw new Error("Ukuran berkas maksimal 3 MB.");
  const extension = name.split(".").pop()?.toLowerCase();
  if (extension === "pdf") return "pdf";
  if (extension === "txt" || extension === "md") return "text";
  if (["png", "jpg", "jpeg", "webp"].includes(extension ?? "")) return "image";
  throw new Error("Gunakan PDF, TXT, Markdown, PNG, JPG, atau WebP. Ekspor dokumen atau desainmu ke salah satu format ini.");
}

export function parseWorkRecord(raw: string | null, courseId: string): WorkRecord | null {
  if (!raw || raw.length > 400_000) return null;
  try {
    const v = object(JSON.parse(raw));
    if (v.version !== 2 || v.courseId !== courseId || !Array.isArray(v.attempts)) return null;
    const brief = parseWorkBrief(v.brief);
    const attempts = v.attempts.slice(-5).map((item): WorkAttempt => {
      const a = object(item);
      const date = required(a.createdAt, 40);
      if (!Number.isFinite(Date.parse(date)) || typeof a.fileSize !== "number" || a.fileSize <= 0 || a.fileSize > MAX_WORK_FILE_BYTES) throw new Error("invalid_attempt");
      return {
        id: required(a.id, 100), createdAt: date, fileName: required(a.fileName, 200), fileSize: a.fileSize,
        reading: required(a.reading, 400), notes: workString(a.notes, 3000), review: parseWorkReview(a.review, brief),
      };
    });
    return { version: 2, courseId, brief, notes: workString(v.notes, 3000), attempts };
  } catch { return null; }
}
