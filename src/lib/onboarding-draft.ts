const STORAGE_KEY = "skillpath-onboarding-draft-v1";

export interface OnboardingDraft {
  version: 1;
  ownerId: string | null;
  step: number;
  ready: boolean;
  name: string;
  interests: string[];
  reason: string;
  knowledgeLevel: string;
  learningExp: string;
  dailyGoalMinutes: number;
  focusEnemy: string;
  workType: number;
  memory: number;
  learningStyle: number;
  graspMethod: string;
  ambition: number;
}

export function parseOnboardingDraft(
  raw: string | null,
  courseIds: readonly string[],
  userId: string | null = null,
): OnboardingDraft | null {
  if (!raw || raw.length > 8192) return null;
  try {
    const d = JSON.parse(raw);
    if (!d || typeof d !== "object" || Array.isArray(d) || d.version !== 1) return null;
    if (d.ownerId !== null && (typeof d.ownerId !== "string" || d.ownerId !== userId)) return null;
    if (!Number.isInteger(d.step) || d.step < 0 || d.step > 11 || typeof d.ready !== "boolean") return null;
    if (typeof d.name !== "string" || d.name.length > 40) return null;
    if (!Array.isArray(d.interests) || d.interests.length > 27 ||
      !d.interests.every((id: unknown) => typeof id === "string" && courseIds.includes(id))) return null;
    const choices: Record<string, string[]> = {
      reason: ["", "career", "business", "hobby", "school"],
      knowledgeLevel: ["", "beginner", "some", "comfortable"],
      learningExp: ["", "self", "course", "first"],
      focusEnemy: ["", "phone", "people", "boredom", "tired"],
      graspMethod: ["", "example", "visual", "analogy", "try"],
    };
    if (Object.entries(choices).some(([key, values]) => !values.includes(d[key]))) return null;
    if (![5, 10, 15, 20].includes(d.dailyGoalMinutes)) return null;
    if ([d.workType, d.memory, d.learningStyle].some((n) => !Number.isInteger(n) || n < 0 || n > 100)) return null;
    if (!Number.isInteger(d.ambition) || d.ambition < 1 || d.ambition > 10) return null;
    const interests = [...new Set<string>(d.interests)];
    const missing = [!d.name.trim(), !interests.length, !d.reason, !d.knowledgeLevel,
      !d.learningExp, false, !d.focusEnemy, false, false, false, !d.graspMethod].indexOf(true);
    if (d.ready && missing !== -1) return null;
    // Pick only questionnaire fields, never credentials, course content or AI output.
    return {
      version: 1, ownerId: d.ownerId, step: missing < 0 ? d.step : Math.min(d.step, missing),
      ready: d.ready, name: d.name, interests, reason: d.reason,
      knowledgeLevel: d.knowledgeLevel, learningExp: d.learningExp,
      dailyGoalMinutes: d.dailyGoalMinutes, focusEnemy: d.focusEnemy,
      workType: d.workType, memory: d.memory, learningStyle: d.learningStyle,
      graspMethod: d.graspMethod, ambition: d.ambition,
    };
  } catch {
    return null;
  }
}

export function readOnboardingDraft(courseIds: readonly string[], userId: string | null = null) {
  try {
    return parseOnboardingDraft(window.sessionStorage.getItem(STORAGE_KEY), courseIds, userId);
  } catch {
    return null;
  }
}

export function saveOnboardingDraft(draft: OnboardingDraft, courseIds: readonly string[]): boolean {
  try {
    const clean = parseOnboardingDraft(JSON.stringify(draft), courseIds, draft.ownerId);
    if (!clean) return false;
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
    return true;
  } catch {
    return false;
  }
}

export function clearOnboardingDraft() {
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage may be disabled; the caller can still finish in this tab.
  }
}
