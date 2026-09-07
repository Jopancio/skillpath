"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { daysBetween, todayKey, xpProgress } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import {
  persistUserData,
  supabase,
  upsertLeaderboardEntry,
} from "@/lib/supabase";

const BASE_STORAGE_KEY = "skillpath-progress-v1";

export interface QuizResult {
  score: number; // percentage 0-100
  passed: boolean;
  date: string;
}

export interface OnboardingData {
  interests: string[]; // course ids picked by the user
  reason: string; // "career" | "business" | "hobby" | "school"
  knowledgeLevel: string; // "beginner" | "some" | "comfortable"
  learningExp: string; // "self" | "course" | "first"
  dailyGoalMinutes: number; // 5 | 10 | 15 | 20
  // Personalization answers (steps 7-12)
  focusEnemy?: string; // "phone" | "people" | "boredom" | "tired"
  workType?: number; // 0-100 (0 = speed, 100 = accuracy)
  memory?: number; // 0-100 (0 = forget details, 100 = hard grasp concepts)
  learningStyle?: number; // 0-100 (0 = theory first, 100 = straight to practice)
  graspMethod?: string; // "example" | "visual" | "analogy" | "try"
  ambition?: number; // 1-10
}

/** User-facing profile answers, sent to the AI course generator. */
export interface OnboardingProfile {
  name: string;
  reason: string;
  knowledgeLevel: string;
  learningExp: string;
  dailyGoalMinutes: number;
  focusEnemy?: string;
  workType?: number;
  memory?: number;
  learningStyle?: number;
  graspMethod?: string;
  ambition?: number;
}

/** Result of the AI diagnostic quiz at the end of onboarding. */
export interface PlacementResult {
  level: string; // "beginner" | "intermediate" | "advanced"
  message: string;
  tips: string[];
  strengths: string[];
  scorePercent: number;
  date: string;
}

interface PersistedState {
  xp: number;
  streak: number;
  lastActive: string; // YYYY-MM-DD
  completedLessons: string[];
  quizResults: Record<string, QuizResult>;
  /** End-of-chapter quiz results, keyed `${courseId}::${moduleId}` (kept separate from final-quiz results). */
  moduleQuizResults?: Record<string, QuizResult>;
  userName: string;
  onboarded: boolean;
  onboarding: OnboardingData | null;
  placement: PlacementResult | null;
}

const initialState: PersistedState = {
  xp: 0,
  streak: 0,
  lastActive: "",
  completedLessons: [],
  quizResults: {},
  moduleQuizResults: {},
  userName: "",
  onboarded: false,
  onboarding: null,
  placement: null,
};

interface ProgressContextValue {
  xp: number;
  streak: number;
  /** YYYY-MM-DD of the last active day (drives the dashboard streak-risk nudge). */
  lastActive: string;
  level: number;
  levelProgress: { current: number; needed: number; percent: number };
  completedLessons: ReadonlySet<string>;
  quizResults: Record<string, QuizResult>;
  /** Chapter-quiz results keyed `${courseId}::${moduleId}`. */
  moduleQuizResults: Record<string, QuizResult>;
  userName: string;
  onboarded: boolean;
  onboarding: OnboardingData | null;
  placement: PlacementResult | null;
  lessonsCompletedCount: number;
  hydrated: boolean;
  completeLesson: (lessonId: string, xp: number) => void;
  recordQuiz: (courseId: string, score: number, passed: boolean) => void;
  recordModuleQuiz: (
    courseId: string,
    moduleId: string,
    score: number,
    passed: boolean
  ) => void;
  setUserName: (name: string) => void;
  completeOnboarding: (data: OnboardingData & { name?: string }) => void;
  setPlacement: (result: PlacementResult) => void;
  setDailyGoal: (minutes: number) => void;
  resetAll: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  // Remount per user so each account gets its own storage slice.
  return (
    <ProgressInner
      key={user?.id ?? "anonymous"}
      userId={user?.id ?? null}
      storageKey={user ? `${BASE_STORAGE_KEY}:${user.id}` : null}
    >
      {children}
    </ProgressInner>
  );
}

function ProgressInner({
  children,
  userId,
  storageKey,
}: {
  children: ReactNode;
  userId: string | null;
  storageKey: string | null;
}) {
  const [state, setState] = useState<PersistedState>(initialState);
  const [hydrated, setHydrated] = useState(!storageKey);
  const [hydrationFailed, setHydrationFailed] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { user, getToken } = useAuth();

  const migrateState = useCallback((raw: PersistedState): PersistedState => {
    // Migrate states persisted before onboarding fields existed
    const migrated: PersistedState = {
      ...raw,
      onboarded: raw.onboarded ?? false,
      onboarding: raw.onboarding ?? null,
      placement: raw.placement ?? null,
      moduleQuizResults: raw.moduleQuizResults ?? {},
    };
    // Streak continuity check
    const today = todayKey();
    if (migrated.lastActive && migrated.lastActive !== today) {
      const gap = daysBetween(migrated.lastActive, today);
      if (gap > 1) migrated.streak = 0;
    }
    return migrated;
  }, []);

  // Load once on mount (keyed remount per user)
  useEffect(() => {
    if (!storageKey) return;
    let cancelled = false;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration from storage
        setState(migrateState(JSON.parse(raw) as PersistedState));
      }
    } catch {
      // corrupted storage -> start fresh
    }
    // Do not expose writable defaults until the account's remote copy is known.
    void (async () => {
      try {
        if (userId && supabase) {
          const token = await getToken();
          if (!token) throw new Error("Missing session token");
          const { data } = await supabase.from("progress").select("data")
            .eq("user_id", userId).setHeader("Authorization", `Bearer ${token}`)
            .abortSignal(AbortSignal.timeout(15000)).maybeSingle().throwOnError();
          if (cancelled) return;
          if (data?.data) setState(migrateState(data.data as PersistedState));
        }
        if (!cancelled) setHydrated(true);
      } catch {
        // A failed read is not an empty account. Never upload defaults over it.
        if (!cancelled) setHydrationFailed(true);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- stable per remount
  }, []);

  // Debounced persist
  useEffect(() => {
    if (!hydrated || !storageKey) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(state));
      } catch {
        // Remote persistence still works when local storage is unavailable.
      }
      if (userId && supabase) {
        void persistUserData("progress", userId, state, getToken);
        // Publish the stats that power the dashboard leaderboard.
        void upsertLeaderboardEntry(
          userId,
          {
            displayName: state.userName || user?.name || "Anonim",
            xp: state.xp,
            streak: state.streak,
            lessonsDone: state.completedLessons.length,
          },
          getToken
        );
      }
    }, 150);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [state, hydrated, storageKey, userId, user, getToken]);

  const touchStreak = useCallback((s: PersistedState): PersistedState => {
    const today = todayKey();
    if (s.lastActive === today) return s;
    const yesterday = s.lastActive ? daysBetween(s.lastActive, today) === 1 : false;
    return {
      ...s,
      lastActive: today,
      streak: s.lastActive ? (yesterday ? s.streak + 1 : 1) : 1,
    };
  }, []);

  const completeLesson = useCallback(
    (lessonId: string, xp: number) => {
      setState((s) => {
        if (s.completedLessons.includes(lessonId)) return s;
        const next: PersistedState = {
          ...s,
          completedLessons: [...s.completedLessons, lessonId],
          xp: s.xp + xp,
        };
        return touchStreak(next);
      });
    },
    [touchStreak]
  );

  const recordQuiz = useCallback(
    (courseId: string, score: number, passed: boolean) => {
      setState((s) => {
        const prev = s.quizResults[courseId];
        const firstPass = passed && !prev?.passed;
        const bestScore = Math.max(prev?.score ?? 0, score);
        const next: PersistedState = {
          ...s,
          xp: firstPass ? s.xp + 100 : s.xp,
          quizResults: {
            ...s.quizResults,
            [courseId]: {
              score: bestScore,
              passed: (prev?.passed ?? false) || passed,
              date: todayKey(),
            },
          },
        };
        return touchStreak(next);
      });
    },
    [touchStreak]
  );

  const setUserName = useCallback((name: string) => {
    setState((s) => ({ ...s, userName: name }));
  }, []);

  // Chapter quizzes live in their own record so badges/certificates that read
  // `quizResults` only ever react to the final course quiz.
  const recordModuleQuiz = useCallback(
    (courseId: string, moduleId: string, score: number, passed: boolean) => {
      const key = `${courseId}::${moduleId}`;
      setState((s) => {
        const prev = s.moduleQuizResults?.[key];
        const firstPass = passed && !prev?.passed;
        const bestScore = Math.max(prev?.score ?? 0, score);
        const next: PersistedState = {
          ...s,
          xp: firstPass ? s.xp + 40 : s.xp,
          moduleQuizResults: {
            ...(s.moduleQuizResults ?? {}),
            [key]: {
              score: bestScore,
              passed: (prev?.passed ?? false) || passed,
              date: todayKey(),
            },
          },
        };
        return touchStreak(next);
      });
    },
    [touchStreak]
  );

  const completeOnboarding = useCallback(
    (data: OnboardingData & { name?: string }) => {
      if (!hydrated || !userId) return;
      setState((s) => {
        if (s.onboarded) return s;
        const next: PersistedState = {
          ...s,
          onboarded: true,
          onboarding: {
            interests: data.interests,
            reason: data.reason,
            knowledgeLevel: data.knowledgeLevel,
            learningExp: data.learningExp,
            dailyGoalMinutes: data.dailyGoalMinutes,
            focusEnemy: data.focusEnemy,
            workType: data.workType,
            memory: data.memory,
            learningStyle: data.learningStyle,
            graspMethod: data.graspMethod,
            ambition: data.ambition,
          },
          userName: data.name?.trim() ? data.name.trim() : s.userName,
        };
        // Count onboarding day as an active day so the streak starts
        return touchStreak(next);
      });
    },
    [touchStreak, hydrated, userId]
  );

  const setPlacement = useCallback((result: PlacementResult) => {
    setState((s) => ({ ...s, placement: result }));
  }, []);

  const setDailyGoal = useCallback((minutes: number) => {
    setState((s) =>
      s.onboarding
        ? { ...s, onboarding: { ...s.onboarding, dailyGoalMinutes: minutes } }
        : s
    );
  }, []);

  const resetAll = useCallback(() => {
    setState(initialState);
    if (storageKey) window.localStorage.removeItem(storageKey);
  }, [storageKey]);

  const lessonsCompletedCount = state.completedLessons.length;
  const { level, current, needed, percent } = xpProgress(state.xp);

  const value = useMemo<ProgressContextValue>(
    () => ({
      xp: state.xp,
      streak: state.streak,
      lastActive: state.lastActive,
      level,
      levelProgress: {
        current,
        needed,
        percent,
      },
      completedLessons: new Set(state.completedLessons),
      quizResults: state.quizResults,
      moduleQuizResults: state.moduleQuizResults ?? {},
      userName: state.userName,
      onboarded: state.onboarded,
      onboarding: state.onboarding,
      placement: state.placement,
      lessonsCompletedCount,
      hydrated,
      completeLesson,
      recordQuiz,
      recordModuleQuiz,
      setUserName,
      completeOnboarding,
      setPlacement,
      setDailyGoal,
      resetAll,
    }),
    [state, lessonsCompletedCount, hydrated, completeLesson, recordQuiz, recordModuleQuiz, setUserName, completeOnboarding, setPlacement, setDailyGoal, resetAll, level, current, needed, percent]
  );

  if (hydrationFailed) {
    return <div role="alert" className="p-8 text-center">
      <p>Data akun gagal dimuat. / Could not load account data.</p>
      <button type="button" onClick={() => window.location.reload()}>Coba lagi / Retry</button>
    </div>;
  }

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
