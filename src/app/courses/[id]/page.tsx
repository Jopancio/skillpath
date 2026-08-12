import { getCourse } from "@/data/courses";
import { CourseDetail } from "./CourseDetail";

// AI-generated courses have client-side ids (ai-*), so unknown params must
// still render instead of 404 — CourseDetail resolves them after hydration.
export const dynamicParams = true;

export function generateStaticParams() {
  return [
    { id: "barista" },
    { id: "content-creator" },
    { id: "digital-marketing" },
    { id: "social-media-manager" },
    { id: "video-editor" },
    { id: "ui-ux-design" },
    { id: "photography" },
  ];
}

export default async function CoursePage(props: PageProps<"/courses/[id]">) {
  const { id } = await props.params;
  const course = getCourse(id) ?? {
    // Placeholder shell — client swaps in the real AI course after hydration
    id,
    title: { id: "", en: "" },
    description: { id: "", en: "" },
    longDescription: { id: "", en: "" },
    category: "creative" as const,
    difficulty: "beginner" as const,
    icon: "Sparkles",
    color: "#4D9DE0",
    modules: [],
    quiz: [],
    passScore: 70,
    salary: { id: "", en: "" },
    demand: "",
  };
  return <CourseDetail course={course} />;
}
