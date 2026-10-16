import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Columns, PuzzleWord } from "@/lib/grid";
import GuestButton from "@/app/GuestButton";
import { getCurrentPlayer } from "@/lib/player";
import { createClient } from "@/lib/supabase/server";
import Board from "./Board";
import Leaderboard from "./Leaderboard";

export default function PlayPage(props: PageProps<"/play/[id]">) {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-8">
      <Link href="/" className="text-sm text-neutral-400 hover:text-neutral-200">
        ← All puzzles
      </Link>
      <Suspense fallback={<p className="text-center text-neutral-500">Loading puzzle…</p>}>
        <PuzzleLoader params={props.params} />
      </Suspense>
    </main>
  );
}

async function PuzzleLoader({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const player = await getCurrentPlayer();
  if (!player) {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <p className="text-neutral-300">Sign in to play, so your progress is saved.</p>
        <Link
          href={`/login?next=/play/${id}`}
          className="rounded-lg bg-amber-400 px-6 py-3 font-semibold text-neutral-900 hover:bg-amber-300"
        >
          Sign in to play
        </Link>
        <GuestButton next={`/play/${id}`} />
      </div>
    );
  }

  const supabase = await createClient();
  const [{ data: puzzle }, { data: words }, { data: play }] = await Promise.all([
    supabase.from("puzzles").select("id, title, columns, daily_date").eq("id", id).maybeSingle(),
    supabase.from("puzzle_words").select("word, kind, clue").eq("puzzle_id", id).order("word"),
    supabase
      .from("plays")
      .select("found, invalid_count, started_at, finished_at")
      .eq("puzzle_id", id)
      .eq("user_id", player.id)
      .maybeSingle(),
  ]);
  if (!puzzle) notFound();

  return (
    <>
      <h1 className="text-center text-2xl font-bold">
        {puzzle.daily_date ? `Daily · ${puzzle.daily_date}` : (puzzle.title ?? "Community puzzle")}
      </h1>
      <Board
        puzzleId={puzzle.id}
        userId={player.id}
        columns={puzzle.columns as Columns}
        words={(words ?? []) as PuzzleWord[]}
        saved={
          play && {
            found: play.found,
            invalidCount: play.invalid_count,
            startedAt: Date.parse(play.started_at),
            finishedAt: play.finished_at ? Date.parse(play.finished_at) : null,
          }
        }
      />
      <Suspense fallback={<p className="text-sm text-neutral-500">Loading leaderboard…</p>}>
        <Leaderboard
          puzzleId={puzzle.id}
          totalWords={words?.length ?? 0}
          playerId={player.id}
          isGuest={player.isGuest}
        />
      </Suspense>
    </>
  );
}
