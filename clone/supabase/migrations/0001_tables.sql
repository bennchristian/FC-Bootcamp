-- 0001_tables: the four tables, their RLS policies, the profile trigger and create_puzzle.
-- Paste the whole file into the Supabase SQL Editor and run it once. See SCHEMA.md.

-- profiles ------------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null unique,
  is_editor boolean not null default false,
  is_guest boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are readable by everyone"
  on public.profiles for select
  using (true);

-- Supabase creates the auth user but not the profile row, so this trigger does.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, username, is_guest)
  values (
    new.id,
    coalesce(
      nullif(trim(new.raw_user_meta_data ->> 'username'), ''),
      case when new.is_anonymous then 'guest-' else 'player-' end || left(new.id::text, 6)
    ),
    coalesce(new.is_anonymous, false)
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- puzzles -------------------------------------------------------------------

create table public.puzzles (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  title text,
  columns jsonb not null check (jsonb_typeof(columns) = 'array'),
  daily_date date unique,
  created_at timestamptz not null default now()
);

alter table public.puzzles enable row level security;

create policy "Puzzles are readable unless a guest made them"
  on public.puzzles for select
  using (
    creator_id = (select auth.uid())
    or not exists (
      select 1 from public.profiles p where p.id = creator_id and p.is_guest
    )
  );

create policy "Players create their own puzzles; only editors set a daily date"
  on public.puzzles for insert
  to authenticated
  with check (
    creator_id = (select auth.uid())
    and (
      daily_date is null
      or exists (
        select 1 from public.profiles p where p.id = (select auth.uid()) and p.is_editor
      )
    )
  );

-- puzzle_words --------------------------------------------------------------

create table public.puzzle_words (
  id uuid primary key default gen_random_uuid(),
  puzzle_id uuid not null references public.puzzles (id) on delete cascade,
  word text not null,
  kind text not null check (kind in ('basic', 'bonus')),
  clue text,
  unique (puzzle_id, word),
  check (kind = 'basic' or clue is not null)
);

alter table public.puzzle_words enable row level security;

-- The subquery runs under the puzzles policy, so a word is readable exactly when its puzzle is.
create policy "Words are readable when their puzzle is"
  on public.puzzle_words for select
  using (exists (select 1 from public.puzzles p where p.id = puzzle_id));

create policy "Creators add words to their own puzzles"
  on public.puzzle_words for insert
  to authenticated
  with check (
    exists (
      select 1 from public.puzzles p
      where p.id = puzzle_id and p.creator_id = (select auth.uid())
    )
  );

-- plays ---------------------------------------------------------------------

create table public.plays (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  puzzle_id uuid not null references public.puzzles (id) on delete cascade,
  found text[] not null default '{}',
  invalid_count int not null default 0,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  unique (user_id, puzzle_id)
);

alter table public.plays enable row level security;

create policy "Signed-in players can read all plays"
  on public.plays for select
  to authenticated
  using (true);

create policy "Players create their own plays"
  on public.plays for insert
  to authenticated
  with check (user_id = (select auth.uid()));

create policy "Players update their own plays"
  on public.plays for update
  to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

-- create_puzzle: the puzzle and its words in one transaction ----------------

-- security invoker, so the RLS policies above still apply to the caller.
create function public.create_puzzle(
  p_title text,
  p_columns jsonb,
  p_daily_date date,
  p_words jsonb
)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare
  new_id uuid;
begin
  insert into public.puzzles (creator_id, title, columns, daily_date)
  values (auth.uid(), nullif(trim(p_title), ''), p_columns, p_daily_date)
  returning id into new_id;

  insert into public.puzzle_words (puzzle_id, word, kind, clue)
  select new_id, upper(trim(w ->> 'word')), w ->> 'kind', nullif(trim(w ->> 'clue'), '')
  from jsonb_array_elements(p_words) as w;

  return new_id;
end;
$$;
