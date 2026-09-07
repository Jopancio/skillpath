import type { Course, QuizQuestion } from "./types";

/** Minimal progress shape needed for module gating (matches use-progress). */
export interface ModuleQuizResultLike {
  passed: boolean;
}
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

/**
 * Is a module unlocked? Module 0 always is. Every previous module must be
 * fully cleared: all of its lessons done AND — when it has an end-of-chapter
 * quiz — that quiz passed. Material -> chapter quiz -> next material.
 */
export function isModuleUnlocked(
  course: Course,
  moduleIndex: number,
  completed: ReadonlySet<string>,
  moduleQuizResults?: Readonly<Record<string, ModuleQuizResultLike>>
): boolean {
  if (moduleIndex === 0) return true;
  for (let i = 0; i < moduleIndex; i++) {
    const mod = course.modules[i];
    const lessonsDone = mod.lessons.every((l) => completed.has(l.id));
    if (!lessonsDone) return false;
    if (mod.quiz && mod.quiz.length > 0) {
      const passed = moduleQuizResults?.[`${course.id}::${mod.id}`]?.passed;
      if (!passed) return false;
    }
  }
  return true;
}

/**
 * Effective per-lesson unlock within a phase: the phase's 3 material slides
 * open one by one in order — slide 2 needs slide 1 done, slide 3 needs
 * slides 1+2 done. The phase quiz then opens once all 3 slides are done.
 */
export function isLessonUnlocked(
  course: Course,
  moduleIndex: number,
  lessonIndex: number,
  completed: ReadonlySet<string>,
  moduleQuizResults?: Readonly<Record<string, ModuleQuizResultLike>>
): boolean {
  if (!isModuleUnlocked(course, moduleIndex, completed, moduleQuizResults)) {
    return false;
  }
  const lessons = course.modules[moduleIndex]?.lessons ?? [];
  for (let i = 0; i < lessonIndex; i++) {
    if (!completed.has(lessons[i]?.id)) return false;
  }
  return true;
}

/**
 * The single chapter-quiz the learner should take right now: the earliest
 * chapter whose lessons are all done but whose quiz is not passed yet.
 */
export function nextModuleQuiz(
  course: Course,
  completed: ReadonlySet<string>,
  moduleQuizResults: Readonly<Record<string, ModuleQuizResultLike>>
): { moduleIndex: number; quiz: QuizQuestion[] } | undefined {
  for (let i = 0; i < course.modules.length; i++) {
    const mod = course.modules[i];
    if (!mod.quiz || mod.quiz.length === 0) continue;
    if (!mod.lessons.every((l) => completed.has(l.id))) continue;
    if (moduleQuizResults[`${course.id}::${mod.id}`]?.passed) continue;
    if (!isModuleUnlocked(course, i, completed, moduleQuizResults)) continue;
    return { moduleIndex: i, quiz: mod.quiz };
  }
  return undefined;
}

export function isCourseComplete(course: Course, completed: ReadonlySet<string>): boolean {
  return courseLessonIds(course).every((id) => completed.has(id));
}
