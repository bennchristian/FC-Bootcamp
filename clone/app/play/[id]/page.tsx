import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Columns, PuzzleWord } from "@/lib/grid";
import { createClient } from "@/lib/supabase/server";
import Board from "./Board";

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
  const supabase = await createClient();
  const [{ data: puzzle }, { data: words }] = await Promise.all([
    supabase.from("puzzles").select("id, title, columns, daily_date").eq("id", id).maybeSingle(),
    supabase.from("puzzle_words").select("word, kind, clue").eq("puzzle_id", id).order("word"),
  ]);
  if (!puzzle) notFound();

  return (
    <>
      <h1 className="text-center text-2xl font-bold">
        {puzzle.daily_date ? `Daily · ${puzzle.daily_date}` : (puzzle.title ?? "Community puzzle")}
      </h1>
      <Board columns={puzzle.columns as Columns} words={(words ?? []) as PuzzleWord[]} />
    </>
  );
}
