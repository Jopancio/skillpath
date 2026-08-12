import { getCourse, getLesson, courseLessonIds } from "@/data/courses";
import { notFound } from "next/navigation";
import { LessonView } from "./LessonView";
import { courses } from "@/data/courses";

// AI-generated courses (ai-*) resolve client-side after hydration
export const dynamicParams = true;

export function generateStaticParams() {
  const params: { courseId: string; lessonId: string }[] = [];
  for (const c of courses) {
    for (const id of courseLessonIds(c)) {
      params.push({ courseId: c.id, lessonId: id });
    }
  }
  return params;
}

export default async function LessonPage(
  props: PageProps<"/learn/[courseId]/[lessonId]">
) {
  const { courseId, lessonId } = await props.params;
  const course = getCourse(courseId);
  if (course) {
    const found = getLesson(courseId, lessonId);
    if (!found) notFound();
    return <LessonView course={course} lesson={found.lesson} />;
  }
  // AI course: LessonView resolves course + lesson from localStorage
  return <LessonView courseId={courseId} lessonId={lessonId} />;
}
