-- 0002_guest: sample history for "Play as guest" accounts (the FR-12 demo login).
-- Run once in the Supabase SQL Editor, after turning on Authentication → Allow anonymous sign-ins.

-- Gives the calling guest plays on the two most recent past dailies: every word found in
-- 2:40 on the newer one, and about half the words on the older one, still unfinished.
-- Real accounts get nothing. Guests are left out of leaderboards, so this never skews them.
create function public.seed_guest()
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
  -- 'Etc/GMT-8' is UTC+8 (POSIX zone names flip the sign); dailies use one time zone.
  today date := (now() at time zone 'Etc/GMT-8')::date;
begin
  if me is null or not exists (select 1 from public.profiles where id = me and is_guest) then
    return;
  end if;

  insert into public.plays (user_id, puzzle_id, found, invalid_count, started_at, finished_at)
  select
    me,
    d.id,
    case when d.rn = 1 then w.words else w.words[1:greatest(1, cardinality(w.words) / 2)] end,
    case when d.rn = 1 then 0 else 2 end,
    now() - make_interval(days => d.rn),
    case when d.rn = 1 then now() - make_interval(days => d.rn) + interval '2 minutes 40 seconds' end
  from (
    select id, row_number() over (order by daily_date desc) as rn
    from public.puzzles
    where daily_date < today
    order by daily_date desc
    limit 2
  ) as d
  cross join lateral (
    select array(select pw.word from public.puzzle_words pw where pw.puzzle_id = d.id order by pw.word) as words
  ) as w
  on conflict (user_id, puzzle_id) do nothing;
end;
$$;

revoke execute on function public.seed_guest() from public, anon;
grant execute on function public.seed_guest() to authenticated;
