// Temporary smoke test for the multi-phase course generation engine.
import {
  buildOutlinePrompt,
  buildModuleContentPrompt,
  buildFinalQuizPrompt,
  sanitizeOutline,
  sanitizeModuleBatch,
  sanitizeFinalQuiz,
  fallbackFinalQuiz,
  finalizeGeneratedCourse,
  topicFromPdfName,
} from "./src/lib/ai-course.ts";

let failed = 0;
function check(name, cond) {
  if (!cond) {
    failed++;
    console.error(`FAIL ${name}`);
  } else {
    console.log(`ok   ${name}`);
  }
}

const pdf = { name: "modul-belajar-react.pdf", size: 12345, text: "BAB 1 Komponen. BAB 2 State dan Hooks." };
const profile = { name: "Sinta", knowledgeLevel: "beginner", dailyGoalMinutes: 10 };

// ---- outline prompt ----
const op = buildOutlinePrompt("", profile, pdf);
check("outline: 12-15 requirement", op.includes("12 to 15 modules"));
check("outline: pdf-grounded order", op.includes("reference material's own section order"));
check("outline: pdf quoted at end", op.includes("--- PDF CONTENT START ---") && op.includes("BAB 2 State"));
check("outline: no-skill intro", op.includes("based entirely on the attached reference PDF"));

const opNoPdf = buildOutlinePrompt("Kopi Latte", profile);
check("outline: topic intro used", opNoPdf.includes('"Kopi Latte"'));
check("outline: no pdf block when absent", !opNoPdf.includes("PDF CONTENT START"));
check("outline: profile included", opNoPdf.includes("Sinta"));

const opScanned = buildOutlinePrompt("Dasar Excel", undefined, { name: "scan.pdf", size: 1, text: "" });
check("outline: scanned-pdf note present", opScanned.includes("no readable text could be extracted"));
check("outline: scanned-pdf uses skill", opScanned.includes('"Dasar Excel"'));

// ---- content prompt ----
const chapters = [
  { index: 13, title: "Bab 13", summary: "Ringkas bab 13.", lessonTitles: ["L13a"] },
  { index: 14, title: "Bab 14", summary: "Ringkas bab 14.", lessonTitles: ["L14a", "L14b"] },
];
const cp = buildModuleContentPrompt({
  courseTitle: "Kursus React",
  skill: "",
  chapters,
  allChapterTitles: Array.from({ length: 14 }, (_, i) => `Bab ${i + 1}`),
  pdf,
});
check("content: exact-chapter scoping", cp.includes("EXACTLY the 2 chapters") && cp.includes('Chapter 13: "Bab 13"'));
check("content: other chapters context", cp.includes("14. Bab 14"));
check("content: 3-question chapter quiz", cp.includes("EXACTLY 3 questions"));
check("content: latihan praktis required", cp.includes("## Latihan Praktis"));
check("content: pdf grounded", cp.includes("REFERENCE MATERIAL:") && cp.includes("State dan Hooks"));
check("content: exact-N rule", cp.includes("exactly 2 items"));

// ---- final quiz prompt ----
const fp = buildFinalQuizPrompt({ courseTitle: "Kursus React", chapters, pdf });
check("final: 8 questions", fp.includes("exactly 8 questions"));
check("final: covers all chapters", fp.includes("13. Bab 13"));
check("final: pdf answerable", fp.includes("answerable purely from the attached reference material"));

// ---- sanitizeOutline ----
function makeOutline(n) {
  return {
    title: "Kursus Uji",
    description: "desc",
    longDescription: "long desc",
    difficulty: "intermediate",
    salary: "Rp 3-8 jt",
    demand: "Tinggi",
    modules: Array.from({ length: n }, (_, i) => ({
      title: `Bab ${i + 1}`,
      summary: `Ringkasan ${i + 1}`,
      lessons: [{ title: `Pelajaran ${i + 1}A` }],
    })),
  };
}
let threw = false;
try { sanitizeOutline(makeOutline(5)); } catch { threw = true; }
check("outline sanitizer rejects <6 modules", threw);
const outline = sanitizeOutline(makeOutline(14));
check("outline sanitizer keeps 14 modules", outline.modules.length === 14);
check("outline difficulty normalized", outline.difficulty === "intermediate");
threw = false;
try { sanitizeOutline({ ...makeOutline(12), difficulty: "expert" }); } catch (e) { threw = !/too_small/.test(String(e)); }
check("outline bad difficulty -> beginner not throw", !threw && sanitizeOutline({ ...makeOutline(12), difficulty: "expert" }).difficulty === "beginner");

// ---- sanitizeModuleBatch ----
function makeBatch(n, opts = {}) {
  return {
    modules: Array.from({ length: n }, (_, i) => ({
      lessons: [
        {
          title: `L${i}`,
          duration: 5,
          body: opts.emptyBody ? "" : `Intro ${i}\n\n## Poin\n- a\n\n## Latihan Praktis\nkerjakan.`,
        },
      ],
      quiz:
        opts.noQuiz || i === 0 && opts.firstQuizBad
          ? []
          : [
              { question: `Q1-${i}`, options: ["a", "b", "c", "d"], correctIndex: 0, explanation: "e" },
              { question: `Q2-${i}`, options: ["a", "b"], correctIndex: 1 },
            ],
    })),
  };
}
check("batch wrong count -> null", sanitizeModuleBatch(makeBatch(3), 4, outline.modules) === null);
check("batch empty body -> null", sanitizeModuleBatch(makeBatch(2, { emptyBody: true }), 2, outline.modules) === null);
check("batch missing quiz -> null", sanitizeModuleBatch(makeBatch(2, { noQuiz: true }), 2, outline.modules) === null);
const batch = sanitizeModuleBatch(makeBatch(2), 2, outline.modules);
check("batch ok shape", batch !== null && batch.length === 2);
check("batch clamps duration & slices options", batch[0].lessons[0].duration === 5 && batch[0].quiz[0].options.length === 4);
check("batch caps at MAX_CHAPTER_QUIZ+1 raw", sanitizeModuleBatch(
  { modules: [{ lessons: [{ title: "x", duration: 5, body: "b" }], quiz: Array.from({ length: 9 }, (_, i) => ({ question: `q${i}`, options: ["a", "b", "c", "d"], correctIndex: i % 4 })) }] },
  1,
  outline.modules
)[0].quiz.length <= 4);

// ---- sanitizeFinalQuiz ----
threw = false;
try { sanitizeFinalQuiz({ quiz: makeBatch(1).modules[0].quiz }); } catch { threw = true; }
check("final quiz rejects <5", threw);
const fq = sanitizeFinalQuiz({
  quiz: Array.from({ length: 12 }, (_, i) => ({ question: `Q${i}`, options: ["a", "b", "c", "d"], correctIndex: i % 4, explanation: "x" })),
});
check("final quiz slices to 10", fq.length === 10);

// ---- fallbackFinalQuiz ----
const drafts = Array.from({ length: 14 }, (_, i) => ({
  lessons: [{ title: `L${i}`, duration: 5, body: "b" }],
  quiz: [{ question: `Chapter ${i + 1} key idea?`, options: ["a", "b", "c", "d"], correctIndex: i % 4 }],
}));
const fb = fallbackFinalQuiz(drafts);
check("fallback length 8", fb.length === 8);
check("fallback spread across chapters", fb.some((q) => q.question.startsWith("Chapter 14")) && fb.some((q) => q.question.startsWith("Chapter 1")));
check("fallback small pool passthrough", fallbackFinalQuiz(drafts.slice(0, 5)).length === 5);

// ---- finalizeGeneratedCourse ----
const draftsFull = outline.modules.map((_, mi) => ({
  lessons: [
    { title: `Pelajaran ${mi + 1}A`, duration: 6, body: `Isi ${mi + 1}` },
    { title: `Pelajaran ${mi + 1}B`, duration: 7, body: `Isi ${mi + 1}B` },
  ],
  quiz: [
    { question: `Q1-${mi}`, options: ["a", "b", "c", "d"], correctIndex: 1, explanation: "karena" },
    { question: `Q2-${mi}`, options: ["a", "b", "c", "d"], correctIndex: 3 },
  ],
}));
const course = finalizeGeneratedCourse({ outline, drafts: draftsFull, finalQuiz: fb, skill: "", pdf });
check("course id prefixed ai-", course.id.startsWith("ai-modul-belajar-react-") || course.id.startsWith("ai-kursus-uji-"));
check("course title from outline", course.title.id === "Kursus Uji");
check("course has 14 modules", course.modules.length === 14);
check("module ids sequential", course.modules[0].id.endsWith("-m1") && course.modules[13].id.endsWith("-m14"));
check("lesson ids per module", course.modules[2].lessons[1].id === `${course.id}-m3l2`);
check("chapter quiz ids", course.modules[2].quiz[1].id === `${course.id}-m3q2`);
check("chapter quiz localized", course.modules[0].quiz[0].question.en === "Q1-0");
check("final quiz ids", course.quiz[0].id === `${course.id}-q1`);
check("final quiz is fallback set", course.quiz.length === 8);
check("passScore/icon/pdf meta", course.passScore === 70 && course.icon === "Sparkles" && course.pdfReference?.name === "modul-belajar-react.pdf");
check("lesson xp 50", course.modules[0].lessons[0].xp === 50);
check("every module non-empty", course.modules.every((m) => m.lessons.length > 0));

// ---- topicFromPdfName ----
check("pdf name topic", topicFromPdfName("Belajar_React-Dasar.pdf") === "Belajar React Dasar");

console.log(failed === 0 ? "\nALL PASSED" : `\n${failed} FAILED`);
process.exit(failed === 0 ? 0 : 1);
