-- SkillPath progress storage (one row per Clerk user).
-- Requires the native Clerk <-> Supabase integration: tokens carry the
-- role: authenticated claim, and RLS keys on the token's `sub` claim,
-- which is the Clerk user ID.

create table if not exists public.progress (
  user_id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.custom_courses (
  user_id text primary key,
  data jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.progress enable row level security;
alter table public.custom_courses enable row level security;

drop policy if exists "own progress" on public.progress;
create policy "own progress"
  on public.progress
  for all
  using (auth.jwt() ->> 'sub' = user_id)
  with check (auth.jwt() ->> 'sub' = user_id);

drop policy if exists "own custom_courses" on public.custom_courses;
create policy "own custom_courses"
  on public.custom_courses
  for all
  using (auth.jwt() ->> 'sub' = user_id)
  with check (auth.jwt() ->> 'sub' = user_id);

grant select, insert, update, delete on public.progress to authenticated;
grant select, insert, update, delete on public.custom_courses to authenticated;
