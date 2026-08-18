"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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
