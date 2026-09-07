import assert from "node:assert/strict";
import { test } from "node:test";
// @ts-expect-error -- Node's native TS runner requires the source extension.
import { parseOnboardingDraft, readOnboardingDraft, saveOnboardingDraft, clearOnboardingDraft } from "./onboarding-draft.ts";

const courseIds = ["barista", "photography"];
const draft = {
  version: 1 as const, ownerId: null, step: 11, ready: true, name: "Learner",
  interests: ["photography", "barista"], reason: "career", knowledgeLevel: "beginner",
  learningExp: "first", dailyGoalMinutes: 10, focusEnemy: "phone", workType: 50,
  memory: 50, learningStyle: 50, graspMethod: "try", ambition: 5,
};

test("round trips complete answers and preserves selected course order", () => {
  assert.deepEqual(parseOnboardingDraft(JSON.stringify(draft), courseIds), draft);
});

test("rejects corrupt, oversized, unknown version and invalid field values", () => {
  for (const raw of [null, "{", "null", "[]", "x".repeat(8193)]) {
    assert.equal(parseOnboardingDraft(raw, courseIds), null);
  }
  for (const invalid of [
    { version: 2 }, { step: -1 }, { step: 12 }, { ready: "yes" },
    { name: "a".repeat(41) }, { interests: ["//evil.example"] },
    { interests: ["removed-course"] }, { reason: "invalid" },
    { knowledgeLevel: "invalid" }, { learningExp: "invalid" },
    { dailyGoalMinutes: 100 }, { focusEnemy: "invalid" }, { workType: 101 },
    { memory: -1 }, { learningStyle: 0.5 }, { graspMethod: "invalid" },
    { ambition: 11 }, { ownerId: 1 },
  ]) {
    assert.equal(parseOnboardingDraft(JSON.stringify({ ...draft, ...invalid }), courseIds), null);
  }
});

test("incomplete drafts resume at the first missing answer, never evaluation", () => {
  const incomplete = { ...draft, ready: false, reason: "" };
  assert.equal(parseOnboardingDraft(JSON.stringify(incomplete), courseIds)?.step, 2);
  assert.equal(parseOnboardingDraft(JSON.stringify({ ...incomplete, ready: true }), courseIds), null);
  assert.equal(parseOnboardingDraft(JSON.stringify({ ...draft, name: "  " }), courseIds), null);
});

test("allows guest transfer but isolates drafts once claimed by an account", () => {
  assert.ok(parseOnboardingDraft(JSON.stringify(draft), courseIds, "user-a"));
  const claimed = JSON.stringify({ ...draft, ownerId: "user-a" });
  assert.ok(parseOnboardingDraft(claimed, courseIds, "user-a"));
  assert.equal(parseOnboardingDraft(claimed, courseIds, "user-b"), null);
  assert.equal(parseOnboardingDraft(claimed, courseIds), null);
});

test("strips extra payload fields and duplicate interests", () => {
  assert.deepEqual(parseOnboardingDraft(JSON.stringify({ ...draft,
    interests: ["photography", "barista", "photography"], password: "never-store", aiOutput: {},
  }), courseIds), draft);
});

test("survives remount-style reads and handles unavailable storage", () => {
  const values = new Map<string, string>();
  Object.defineProperty(globalThis, "window", { configurable: true, value: {
    sessionStorage: {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
      removeItem: (key: string) => values.delete(key),
    },
  } });
  try {
    assert.equal(saveOnboardingDraft(draft, courseIds), true);
    assert.deepEqual(readOnboardingDraft(courseIds), draft);
    assert.deepEqual(readOnboardingDraft(courseIds, "new-account"), draft);
    clearOnboardingDraft();
    assert.equal(readOnboardingDraft(courseIds), null);
    Object.defineProperty(globalThis, "window", { configurable: true, get() { throw new Error("blocked"); } });
    assert.equal(saveOnboardingDraft(draft, courseIds), false);
    assert.equal(readOnboardingDraft(courseIds), null);
    assert.doesNotThrow(clearOnboardingDraft);
  } finally {
    Reflect.deleteProperty(globalThis, "window");
  }
});
