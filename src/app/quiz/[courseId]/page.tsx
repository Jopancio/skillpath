import { getCourse, courses } from "@/data/courses";
import { QuizView } from "./QuizView";

// AI-generated courses resolve client-side after hydration
export const dynamicParams = true;

export function generateStaticParams() {
  return courses.map((c) => ({ courseId: c.id }));
}

export default async function QuizPage(props: PageProps<"/quiz/[courseId]">) {
  const { courseId } = await props.params;
  const course = getCourse(courseId);
  return <QuizView courseId={courseId} initialCourse={course} />;
}
