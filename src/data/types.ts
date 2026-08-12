export type LessonType = "video" | "text" | "flipcard";
export type Difficulty = "beginner" | "intermediate" | "advanced";
export type Category =
  | "culinary"
  | "creative"
  | "marketing"
  | "tech"
  | "service";

export interface Localized {
  id: string;
  en: string;
}

export interface FlipCardContent {
  front: Localized;
  back: Localized;
}

export interface Lesson {
  id: string;
  title: Localized;
  type: LessonType;
  duration: number; // minutes
  xp: number;
  body?: Localized;
  videoUrl?: string; // youtube embed url
  cards?: FlipCardContent[];
}

export interface QuizQuestion {
  id: string;
  question: Localized;
  options: Localized[];
  correctIndex: number;
  explanation?: Localized;
}

export interface CourseModule {
  id: string;
  title: Localized;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: Localized;
  description: Localized;
  longDescription: Localized;
  category: Category;
  difficulty: Difficulty;
  icon: string; // lucide icon name key
  color: string; // tailwind-friendly hex
  modules: CourseModule[];
  quiz: QuizQuestion[];
  passScore: number; // percentage
  salary: Localized;
  demand: string; // e.g. "Tinggi" / "High"
  /** Optional PDF uploaded by the user as course material reference. */
  pdfReference?: {
    name: string;
    size: number; // bytes
  };
}

export function courseStats(course: Course) {
  const lessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const minutes = course.modules.reduce(
    (acc, m) => acc + m.lessons.reduce((a, l) => a + l.duration, 0),
    0
  );
  const xp = course.modules.reduce(
    (acc, m) => acc + m.lessons.reduce((a, l) => a + l.xp, 0),
    0
  );
  return { lessons, minutes, xp, modules: course.modules.length };
}
