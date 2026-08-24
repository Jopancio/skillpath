-- Leaderboard for the dashboard: one row per learner, published from
-- src/hooks/use-progress.tsx whenever progress is saved.
--
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor).
-- RLS keys on the Clerk session token's `sub` claim (= Clerk user ID),
-- the same convention as the existing `progress` / `custom_courses`
-- tables — if those use a different policy expression, mirror it here.

create table public.leaderboard (
  user_id      text primary key,          -- Clerk user ID
  display_name text not null default '',
  xp           integer not null default 0,
  streak       integer not null default 0,
  lessons_done integer not null default 0,
  updated_at   timestamptz not null default now()
);

alter table public.leaderboard enable row level security;

-- Signed-in users can read the board; anonymous visitors cannot.
create policy "leaderboard_select_authenticated"
  on public.leaderboard
  for select to authenticated
  using (true);

-- Learners may only create/update their own row.
create policy "leaderboard_insert_own"
  on public.leaderboard
  for insert to authenticated
  with check ((auth.jwt() ->> 'sub') = user_id);

create policy "leaderboard_update_own"
  on public.leaderboard
  for update to authenticated
  using ((auth.jwt() ->> 'sub') = user_id)
  with check ((auth.jwt() ->> 'sub') = user_id);
