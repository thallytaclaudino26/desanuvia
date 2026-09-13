-- DesanuvIA — schema inicial: humor/diário e progresso das sessões.
-- Cada linha pertence a um usuário (user_id), e as políticas de RLS abaixo
-- garantem que cada pessoa só enxerga e altera os próprios dados.

create table if not exists public.mood_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  emoji text not null,
  score smallint not null check (score between 1 and 5),
  note text,
  time_of_day text not null check (time_of_day in ('madrugada', 'manha', 'tarde', 'noite')),
  created_at timestamptz not null default now()
);

create index if not exists mood_entries_user_id_created_at_idx
  on public.mood_entries (user_id, created_at desc);

create table if not exists public.progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  content_id text not null,
  status text not null default 'completed' check (status in ('completed')),
  created_at timestamptz not null default now()
);

create index if not exists progress_user_id_created_at_idx
  on public.progress (user_id, created_at desc);

alter table public.mood_entries enable row level security;
alter table public.progress enable row level security;

create policy "mood_entries: select own"
  on public.mood_entries for select
  using (auth.uid() = user_id);

create policy "mood_entries: insert own"
  on public.mood_entries for insert
  with check (auth.uid() = user_id);

create policy "progress: select own"
  on public.progress for select
  using (auth.uid() = user_id);

create policy "progress: insert own"
  on public.progress for insert
  with check (auth.uid() = user_id);
