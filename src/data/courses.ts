import type { Course } from "./types";
import { barista } from "./courses/barista";
import { contentCreator } from "./courses/content-creator";
import { digitalMarketing } from "./courses/digital-marketing";
import { videoEditor } from "./courses/video-editor";
import { socialMedia } from "./courses/social-media";
import { uiux } from "./courses/uiux";
import { photography } from "./courses/photography";

export const courses: Course[] = [
  barista,
  contentCreator,
  digitalMarketing,
  socialMedia,
  videoEditor,
  uiux,
  photography,
];

export function getCourse(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function getLesson(courseId: string, lessonId: string) {
  const course = getCourse(courseId);
  if (!course) return undefined;
  for (const mod of course.modules) {
    const lesson = mod.lessons.find((l) => l.id === lessonId);
    if (lesson) return { course, module: mod, lesson };
  }
  return undefined;
}

/** Flat ordered list of all lesson ids in a course */
export function courseLessonIds(course: Course): string[] {
  return course.modules.flatMap((m) => m.lessons.map((l) => l.id));
}

export function findLesson(course: Course, lessonId: string) {
  for (let mi = 0; mi < course.modules.length; mi++) {
    const li = course.modules[mi].lessons.findIndex((l) => l.id === lessonId);
    if (li >= 0) {
      return {
        moduleIndex: mi,
        lessonIndex: li,
        module: course.modules[mi],
        lesson: course.modules[mi].lessons[li],
      };
    }
  }
  return undefined;
}

/** Next lesson in flattened order */
export function nextLesson(course: Course, lessonId: string) {
  const ids = courseLessonIds(course);
  const idx = ids.indexOf(lessonId);
  if (idx >= 0 && idx < ids.length - 1) {
    return findLesson(course, ids[idx + 1]);
  }
  return undefined;
}

/** Index of lesson in flattened order */
export function lessonIndex(course: Course, lessonId: string): number {
  return courseLessonIds(course).indexOf(lessonId);
}

/** First lesson id of a module */
export function firstLessonOfModule(course: Course, moduleIndex: number) {
  return course.modules[moduleIndex]?.lessons[0]?.id;
}

/** Is module unlocked? Module 0 always unlocked; others need all lessons of previous modules done */
export function isModuleUnlocked(
  course: Course,
  moduleIndex: number,
  completed: ReadonlySet<string>
): boolean {
  if (moduleIndex === 0) return true;
  for (let i = 0; i < moduleIndex; i++) {
    const allDone = course.modules[i].lessons.every((l) => completed.has(l.id));
    if (!allDone) return false;
  }
  return true;
}

export function isCourseComplete(course: Course, completed: ReadonlySet<string>): boolean {
  return courseLessonIds(course).every((id) => completed.has(id));
}
