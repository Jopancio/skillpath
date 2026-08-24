"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
// The dashboard names this key NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
// fall back to the legacy anon-key name so either spelling works.
const anonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Client-side Supabase client. Requests are authorized with a Clerk session
 * token (native Clerk <-> Supabase integration adds role: authenticated).
 * RLS keys on the token's `sub` claim (Clerk user ID). Falls back to null
 * when env keys are missing, in which case the app runs localStorage-only.
 */
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;

type GetToken = () => Promise<string | null>;

let cachedClient: SupabaseClient | null = null;
let cachedToken: string | null = null;

function clientFor(token: string): SupabaseClient | null {
  if (!url || !anonKey) return null;
  if (cachedClient && cachedToken === token) return cachedClient;
  cachedClient = createClient(url, anonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
  cachedToken = token;
  return cachedClient;
}

export async function fetchUserData<T>(
  table: "progress" | "custom_courses",
  userId: string,
  getToken: GetToken
): Promise<T | null> {
  if (!supabase) return null;
  const token = await getToken();
  if (!token) return null;
  const client = clientFor(token);
  if (!client) return null;
  const { data } = await client
    .from(table)
    .select("data")
    .eq("user_id", userId)
    .maybeSingle();
  return (data?.data as T | undefined) ?? null;
}

export async function persistUserData(
  table: "progress" | "custom_courses",
  userId: string,
  data: unknown,
  getToken: GetToken
) {
  if (!supabase) return;
  const token = await getToken();
  if (!token) return;
  const client = clientFor(token);
  if (!client) return;
  await client
    .from(table)
    .upsert(
      {
        user_id: userId,
        data,
        updated_at: new Date().toISOString(),
      }
    );
}

export interface LeaderboardRow {
  user_id: string;
  display_name: string;
  xp: number;
  streak: number;
  lessons_done: number;
  updated_at: string;
}

/** Top rows of the public leaderboard, best XP first. */
export async function fetchTopLeaderboard(
  limit: number,
  getToken: GetToken
): Promise<LeaderboardRow[] | null> {
  if (!supabase) return null;
  const token = await getToken();
  if (!token) return null;
  const client = clientFor(token);
  if (!client) return null;
  const { data } = await client
    .from("leaderboard")
    .select("*")
    .order("xp", { ascending: false })
    .order("streak", { ascending: false })
    .limit(limit);
  return (data as LeaderboardRow[] | null) ?? null;
}

/** Publish the signed-in learner's stats so they appear on the board. */
export async function upsertLeaderboardEntry(
  userId: string,
  entry: {
    displayName: string;
    xp: number;
    streak: number;
    lessonsDone: number;
  },
  getToken: GetToken
) {
  if (!supabase) return;
  const token = await getToken();
  if (!token) return;
  const client = clientFor(token);
  if (!client) return;
  await client.from("leaderboard").upsert({
    user_id: userId,
    display_name: entry.displayName,
    xp: entry.xp,
    streak: entry.streak,
    lessons_done: entry.lessonsDone,
    updated_at: new Date().toISOString(),
  });
}
