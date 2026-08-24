"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useProgress } from "@/hooks/use-progress";
import {
  fetchTopLeaderboard,
  type LeaderboardRow,
} from "@/lib/supabase";

export interface LeaderboardEntry {
  userId: string;
  name: string;
  xp: number;
  streak: number;
  rank: number; // 1-based position across all learners
  avatarColor: string;
  isCurrentUser: boolean;
}

/** Palette matching the old dummy board so the look stays familiar. */
const AVATAR_COLORS = [
  "#FF6B2C",
  "#3B82F6",
  "#EC4899",
  "#F4B942",
  "#8B5CF6",
  "#D94A16",
  "#22C55E",
];

const POLL_MS = 30_000;

function avatarColorFor(userId: string): string {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = (hash * 31 + userId.charCodeAt(i)) | 0;
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

/**
 * Real leaderboard backed by the Supabase `leaderboard` table. Fetches the
 * top rows, lightly polls so other learners' gains show up, and merges the
 * current user in from live progress values so their row is never a
 * round-trip behind.
 */
export function useLeaderboard(): {
  entries: LeaderboardEntry[];
  hydrated: boolean;
} {
  const { user, getToken } = useAuth();
  const { xp, streak, userName } = useProgress();

  const [rows, setRows] = useState<LeaderboardRow[] | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!user) return;

    let cancelled = false;

    const load = async () => {
      const data = await fetchTopLeaderboard(10, getToken);
      if (cancelled) return;
      // null result means no Supabase configured (localStorage-only mode);
      // fall back to showing just the signed-in learner.
      setRows(data ?? []);
      setHydrated(true);
    };

    void load();
    const poller = setInterval(() => void load(), POLL_MS);

    return () => {
      cancelled = true;
      clearInterval(poller);
    };
  }, [user, getToken]);

  return useMemo(() => {
    if (!user || !hydrated) return { entries: [], hydrated: false };

    const selfEntry: LeaderboardEntry = {
      userId: user.id,
      name: userName || user.name || "Anonim",
      xp,
      streak,
      rank: 0,
      avatarColor: avatarColorFor(user.id),
      isCurrentUser: true,
    };

    const others = (rows ?? [])
      .filter((r) => r.user_id !== user.id)
      .map((r): LeaderboardEntry => ({
        userId: r.user_id,
        name: r.display_name || "Anonim",
        xp: r.xp,
        streak: r.streak,
        rank: 0,
        avatarColor: avatarColorFor(r.user_id),
        isCurrentUser: false
      }));

    const merged = [...others, selfEntry].sort(
      (a, b) => b.xp - a.xp || b.streak - a.streak
    );
    const ranked = merged.map((entry, index) => ({ ...entry, rank: index + 1 }));
    const top = ranked.slice(0, 10);
    const selfRanked = ranked.find((e) => e.isCurrentUser);
    // Outside the top slice? Still show your own row at the bottom with your
    // real rank, Duolingo-style.
    if (selfRanked && !top.some((e) => e.isCurrentUser)) {
      top.push(selfRanked);
    }

    return { entries: top, hydrated };
  }, [rows, hydrated, user, xp, streak, userName]);
}
