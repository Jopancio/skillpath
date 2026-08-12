import { getCourse, courses } from "@/data/courses";
import { CertificateView } from "./CertificateView";

// AI-generated courses resolve client-side after hydration
export const dynamicParams = true;

export function generateStaticParams() {
  return courses.map((c) => ({ courseId: c.id }));
}

export default async function CertificatePage(
  props: PageProps<"/certificate/[courseId]">
) {
  const { courseId } = await props.params;
  const course = getCourse(courseId);
  return <CertificateView courseId={courseId} initialCourse={course} />;
}
