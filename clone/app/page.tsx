import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import GuestButton from "@/app/GuestButton";
import { todayUtc8 } from "@/lib/daily";
import { POINTS_PER_WORD } from "@/lib/grid";
import { getCurrentPlayer } from "@/lib/player";
import { createClient } from "@/lib/supabase/server";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-8 px-4 py-10">
      <header className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-4xl font-bold tracking-[0.3em]">CADGY</h1>
        <p className="text-neutral-400">
          A daily word-tile puzzle. Pick one tile from each column to make a word.
        </p>
      </header>
      <Suspense fallback={<p className="text-center text-neutral-500">Loading puzzles…</p>}>
        <PuzzleLists />
      </Suspense>
    </main>
  );
}

async function PuzzleLists() {
  await connection(); // "today" changes over time, so render per request
  const supabase = await createClient();
  const [player, { data: daily }, { data: past }, { data: community }] = await Promise.all([
    getCurrentPlayer(),
    supabase
      .from("puzzles")
      .select("id, title, daily_date")
      .lte("daily_date", todayUtc8())
      .order("daily_date", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("puzzles")
      .select("id, daily_date")
      .lt("daily_date", todayUtc8())
      .order("daily_date", { ascending: false })
      .limit(7),
    supabase
      .from("puzzles")
      .select("id, title, created_at, profiles(username)")
      .is("daily_date", null)
      .order("created_at", { ascending: false }),
  ]);

  // Your score on each past daily, so a returning player (or a seeded guest) sees their history.
  const { data: myPlays } = player
    ? await supabase
        .from("plays")
        .select("puzzle_id, found, finished_at")
        .eq("user_id", player.id)
        .in("puzzle_id", (past ?? []).map((p) => p.id))
    : { data: [] };
  const playByPuzzle = new Map((myPlays ?? []).map((play) => [play.puzzle_id, play]));

  return (
    <>
      <section className="flex flex-col items-center gap-3">
        {daily ? (
          <Link
            href={`/play/${daily.id}`}
            className="rounded-lg bg-amber-400 px-6 py-3 font-semibold text-neutral-900 hover:bg-amber-300"
          >
            Play today&apos;s puzzle · {daily.daily_date}
          </Link>
        ) : (
          <p className="text-neutral-400">No daily puzzle yet. Check back soon.</p>
        )}
        {!player && <GuestButton />}
      </section>

      {past && past.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">Past dailies</h2>
          <ul className="flex flex-col gap-2">
            {past.map((puzzle) => {
              const play = playByPuzzle.get(puzzle.id);
              return (
                <li key={puzzle.id}>
                  <Link
                    href={`/play/${puzzle.id}`}
                    className="flex justify-between rounded-lg border border-neutral-700 px-4 py-3 hover:border-neutral-500"
                  >
                    <span>{puzzle.daily_date}</span>
                    <span className="text-neutral-400">
                      {play
                        ? `${play.found.length * POINTS_PER_WORD} pts${play.finished_at ? " · finished" : ""}`
                        : player
                          ? "Not played"
                          : ""}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold">Community puzzles</h2>
          <Link href="/create" className="text-sm text-amber-400 hover:text-amber-300">
            Make your own →
          </Link>
        </div>
        {community && community.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {community.map((puzzle) => (
              <li key={puzzle.id}>
                <Link
                  href={`/play/${puzzle.id}`}
                  className="flex justify-between rounded-lg border border-neutral-700 px-4 py-3 hover:border-neutral-500"
                >
                  <span>{puzzle.title ?? "Untitled puzzle"}</span>
                  <span className="text-neutral-500">
                    by {(puzzle.profiles as { username?: string } | null)?.username ?? "someone"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-neutral-400">No community puzzles yet. Be the first to make one.</p>
        )}
      </section>
    </>
  );
}
