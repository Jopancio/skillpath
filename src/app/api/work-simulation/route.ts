import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { extractJSON } from "@/lib/ai-course";
import { MAX_WORK_FILE_BYTES, MAX_WORK_PAGES, MAX_WORK_TEXT, parseWorkBrief, parseWorkReview, workFileKind, workString, type WorkFileKind } from "@/lib/work-simulation";

export const runtime = "nodejs";
const AI_URL = "https://api.cosmoshub.tech/v1/chat/completions";
const MAX_BODY = 4_500_000;
const hits: number[] = [];
function limited() { const now = Date.now(); while (hits[0] && now - hits[0] > 60_000) hits.shift(); if (hits.length >= 8) return true; hits.push(now); return false; }
function text(v: unknown, max: number) { return workString(v, max); }

type AIContent = string | Array<{ type: "text"; text: string } | { type: "image_url"; image_url: { url: string } }>;
async function askAI(system: string, prompt: AIContent): Promise<unknown> {
  const key = process.env.COSMOSHUB_API_KEY;
  if (!key) throw new Error("missing_api_key");
  const response = await fetch(AI_URL, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` }, body: JSON.stringify({
    model: process.env.COSMOSHUB_MODEL || "gemini-3.6-flash", temperature: 0.35, max_tokens: 5000, response_format: { type: "json_object" },
    messages: [{ role: "system", content: system }, { role: "user", content: prompt }],
  }) });
  if (!response.ok) throw new Error(`ai_${response.status}`);
  const data = await response.json();
  return extractJSON(data?.choices?.[0]?.message?.content ?? "");
}

function courseContext(raw: unknown) {
  const c = raw && typeof raw === "object" ? raw as Record<string, unknown> : {};
  const modules = Array.isArray(c.modules) ? c.modules.slice(0, 12).map((m) => {
    const mod = m && typeof m === "object" ? m as Record<string, unknown> : {};
    const lessons = Array.isArray(mod.lessons) ? mod.lessons.slice(0, 12).map((l) => {
      const lesson = l && typeof l === "object" ? l as Record<string, unknown> : {};
      const title = lesson.title && typeof lesson.title === "object" ? (lesson.title as Record<string, unknown>).id : lesson.title;
      return text(title, 120);
    }).filter(Boolean) : [];
    const title = mod.title && typeof mod.title === "object" ? (mod.title as Record<string, unknown>).id : mod.title;
    return `${text(title, 120)}: ${lessons.join(", ")}`;
  }).filter(Boolean) : [];
  const title = c.title && typeof c.title === "object" ? (c.title as Record<string, unknown>).id : c.title;
  const description = c.description && typeof c.description === "object" ? (c.description as Record<string, unknown>).id : c.description;
  return { title: text(title, 140), description: text(description, 700), outline: modules.join("\n") };
}

async function readUploadedFile(raw: unknown): Promise<{ kind: WorkFileKind; name: string; size: number; content: string }> {
  if (!raw || typeof raw !== "object") throw new Error("missing_file");
  const file = raw as Record<string, unknown>;
  const name = text(file.name, 180);
  const data = text(file.data, MAX_BODY);
  const declaredSize = Number(file.size);
  const kind = workFileKind(name, declaredSize);
  const match = data.match(/^data:([^;]+);base64,([\s\S]+)$/);
  if (!match) throw new Error("Berkas gagal dibaca. Pilih ulang berkas tersebut.");
  let bytes: Uint8Array;
  try { bytes = Uint8Array.from(atob(match[2]), (c) => c.charCodeAt(0)); } catch { throw new Error("Berkas gagal dibaca. Pilih ulang berkas tersebut."); }
  if (!bytes.length || bytes.length > MAX_WORK_FILE_BYTES) throw new Error("Ukuran berkas maksimal 3 MB.");
  if (kind === "text") {
    const decoded = new TextDecoder("utf-8", { fatal: true }).decode(bytes).replace(/\u0000/g, "").trim();
    if (!decoded) throw new Error("Berkas teks kosong.");
    return { kind, name, size: bytes.length, content: decoded.slice(0, MAX_WORK_TEXT) };
  }
  if (kind === "image") {
    if (match[1] === "image/svg+xml" || !match[1].startsWith("image/")) throw new Error("Format gambar tidak sesuai.");
    return { kind, name, size: bytes.length, content: data.slice(0, MAX_BODY) };
  }
  if (bytes[0] !== 0x25 || bytes[1] !== 0x50 || bytes[2] !== 0x44 || bytes[3] !== 0x46 || bytes[4] !== 0x2d) throw new Error("Berkas ini bukan PDF yang valid.");
  try {
    const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs");
    const document = await getDocument({ data: bytes }).promise;
    const pages: string[] = [];
    try {
      for (let i = 1; i <= Math.min(document.numPages, MAX_WORK_PAGES); i++) {
        const page = await document.getPage(i); const tc = await page.getTextContent();
        const pageText = tc.items.map((item) => "str" in item ? String(item.str ?? "") : "").join(" ").replace(/\s+/g, " ").trim();
        if (pageText) pages.push(`Halaman ${i}: ${pageText}`);
      }
    } finally { await document.destroy(); }
    const extracted = pages.join("\n\n").slice(0, MAX_WORK_TEXT).trim();
    if (!extracted) throw new Error("PDF tidak memiliki teks yang bisa dibaca. Ekspor hasil sebagai PDF teks atau unggah gambar.");
    return { kind, name, size: bytes.length, content: extracted };
  } catch (error) { if (error instanceof Error && error.message.includes("PDF tidak")) throw error; throw new Error("PDF tidak bisa diproses. Coba ekspor ulang sebagai PDF teks."); }
}

function briefPrompt(course: ReturnType<typeof courseContext>) {
  return `Buat satu simulasi pekerjaan yang dapat dikerjakan pemula berdasarkan kursus berikut.
Kursus: ${course.title}
Deskripsi: ${course.description}
Outline:
${course.outline}

Balas JSON SAJA dengan bentuk tepat:
{"title":"judul brief","role":"peran kerja","client":"nama klien realistis","situation":"konteks klien 2-4 kalimat","objective":"hasil bisnis yang ingin dicapai","minutes":25,"deliverables":["hasil 1","hasil 2"],"fileInstruction":"format hasil yang sebaiknya diunggah dan apa yang harus tampak","tips":["tip 1","tip 2","tip 3"],"criteria":[{"id":"c1","title":"kriteria 1","description":"cara menilai"},{"id":"c2","title":"kriteria 2","description":"cara menilai"},{"id":"c3","title":"kriteria 3","description":"cara menilai"},{"id":"c4","title":"kriteria 4","description":"cara menilai"}]}
Semua teks Bahasa Indonesia. Tugas harus menghasilkan artefak yang bisa diunggah, terukur, dan relevan dengan kursus. Jangan meminta data pribadi, login, atau pembayaran.`;
}

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (limited()) return NextResponse.json({ error: "Terlalu banyak permintaan. Tunggu sebentar lalu coba lagi." }, { status: 429 });
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY) return NextResponse.json({ error: "Berkas terlalu besar. Maksimal 3 MB." }, { status: 413 });
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Permintaan tidak valid." }, { status: 400 }); }
  const action = text(body.action, 20);
  try {
    const course = courseContext(body.course);
    if (!course.title) return NextResponse.json({ error: "Kursus tidak ditemukan." }, { status: 400 });
    if (action === "brief") {
      const brief = parseWorkBrief(await askAI("Kamu adalah perancang tugas kerja praktis yang teliti. Jangan mengarang data pengguna. Balas JSON valid saja.", briefPrompt(course)));
      return NextResponse.json({ brief });
    }
    if (action !== "review") return NextResponse.json({ error: "Aksi tidak dikenal." }, { status: 400 });
    const brief = parseWorkBrief(body.brief);
    const upload = await readUploadedFile(body.file);
    const notes = text(body.notes, 3000);
    // Images are attached as a native multimodal part below; never duplicate
    // the large data URI inside the text prompt.
    const source = upload.kind === "image" ? "GAMBAR HASIL KERJA TERLAMPIR DI PESAN INI." : `TEKS HASIL KERJA:\n${upload.content}`;
    const criteria = brief.criteria.map((c) => `- ${c.id}: ${c.title} â€” ${c.description}`).join("\n");
    const prompt = `Nilai hasil kerja pembelajar berdasarkan brief dan rubrik berikut. Jangan memberi nilai dari nama file. Jika bukti tidak terlihat/terbaca, katakan secara eksplisit di evidence dan limitations.
BRIEF: ${brief.title}\nTUJUAN: ${brief.objective}\nHASIL YANG DIMINTA:\n${brief.deliverables.join("\n- ")}\nRUBRIK:\n${criteria}\nCATATAN PEMBELAJAR: ${notes || "(tidak ada)"}\n${source}
Balas JSON SAJA dengan bentuk tepat: {"summary":"ringkasan 2-4 kalimat","criteria":[{"id":"c1","score":0,"feedback":"evaluasi spesifik","evidence":"bukti dari hasil atau jelaskan belum terlihat"},{"id":"c2","score":0,"feedback":"...","evidence":"..."},{"id":"c3","score":0,"feedback":"...","evidence":"..."},{"id":"c4","score":0,"feedback":"...","evidence":"..."}],"strengths":["kelebihan spesifik"],"weaknesses":["kekurangan spesifik"],"improvements":[{"priority":"high","action":"perbaikan konkret","example":"contoh revisi"}],"limitations":["bagian yang tidak bisa diverifikasi"]}
Skor tiap kriteria 0-100. Gunakan tepat ID c1-c4. Jangan membuat klaim tentang bagian yang tidak ada. Semua teks Bahasa Indonesia.`;
    const content: AIContent = upload.kind === "image" ? [{ type: "text", text: prompt }, { type: "image_url", image_url: { url: upload.content } }] : prompt;
    const raw = await askAI("Kamu adalah reviewer portofolio yang jujur, spesifik, dan suportif. Hasilmu akan membantu pembelajar memperbaiki pekerjaan. Balas JSON valid saja.", content);
    const review = parseWorkReview(raw, brief);
    return NextResponse.json({ review, file: { name: upload.name, size: upload.size, kind: upload.kind } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "AI belum bisa memproses berkas ini.";
    if (message === "missing_api_key") return NextResponse.json({ error: "Layanan AI belum dikonfigurasi di server." }, { status: 503 });
    if (message.startsWith("Berkas") || message.startsWith("PDF") || message.includes("kosong") || message.includes("Format")) return NextResponse.json({ error: message }, { status: 400 });
    console.error("[work-simulation]", message);
    return NextResponse.json({ error: "AI gagal menilai saat ini. Coba lagi dengan berkas yang lebih ringkas." }, { status: 502 });
  }
}
