import Link from "next/link";
import { POINTS_PER_WORD, formatSeconds } from "@/lib/grid";
import { createClient } from "@/lib/supabase/server";

type Props = {
  puzzleId: string;
  totalWords: number;
  playerId: string;
  isGuest: boolean;
};

type Row = {
  userId: string;
  username: string;
  score: number;
  seconds: number | null; // null until every word is found
};

function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

// Everyone's results on one puzzle, guests left out. Refreshes with the page, not live.
export default async function Leaderboard({ puzzleId, totalWords, playerId, isGuest }: Props) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("plays")
    .select(
      "user_id, found, invalid_count, started_at, finished_at, profiles!inner(username, is_guest)",
    )
    .eq("puzzle_id", puzzleId)
    .eq("profiles.is_guest", false);

  if (error) {
    return <p className="text-sm text-red-400">Couldn&apos;t load the leaderboard.</p>;
  }

  const rows: Row[] = (data ?? [])
    // A play starts on the first visit, but only players who've made a guess are ranked.
    .filter((play) => play.found.length > 0 || play.invalid_count > 0)
    .map((play) => ({
      userId: play.user_id,
      username: (play.profiles as unknown as { username: string }).username,
      score: play.found.length * POINTS_PER_WORD,
      seconds: play.finished_at
        ? Math.round((Date.parse(play.finished_at) - Date.parse(play.started_at)) / 1000)
        : null,
    }))
    .sort((a, b) => b.score - a.score || (a.seconds ?? Infinity) - (b.seconds ?? Infinity));

  const finishTimes = rows.flatMap((r) => (r.seconds === null ? [] : [r.seconds]));
  const average = rows.length
    ? Math.round(rows.reduce((sum, r) => sum + r.score, 0) / rows.length)
    : 0;
  const medianTime = median(finishTimes);
  const max = totalWords * POINTS_PER_WORD;

  return (
    <section className="w-full rounded-lg border border-neutral-700 p-4">
      <h2 className="mb-2 font-semibold">Leaderboard</h2>
      {isGuest && (
        <p className="mb-2 text-sm text-neutral-400">
          Guest games aren&apos;t ranked.{" "}
          <Link href="/login" className="text-amber-400 underline hover:text-amber-300">
            Sign up
          </Link>{" "}
          to get on the leaderboard.
        </p>
      )}
      {rows.length === 0 ? (
        <p className="text-sm text-neutral-500">
          {isGuest
            ? "No signed-up player has played this grid yet."
            : "No one has played this grid yet. Be the first."}
        </p>
      ) : (
        <>
          <p className="mb-3 text-sm text-neutral-400">
            {rows.length} {rows.length === 1 ? "player" : "players"} averaged {average} of {max}{" "}
            points. {Math.round((finishTimes.length / rows.length) * 100)}% found every word
            {medianTime !== null && `, with a median time of ${formatSeconds(medianTime)}`}.
          </p>
          <ol className="flex flex-col gap-1 text-sm">
            {rows.slice(0, 10).map((row, i) => (
              <li
                key={row.userId}
                className={`flex justify-between rounded px-2 py-1 ${
                  row.userId === playerId ? "bg-neutral-800 font-semibold" : ""
                }`}
              >
                <span>
                  {i + 1}. {row.username}
                </span>
                <span className="tabular-nums text-neutral-300">
                  {row.score} pts{row.seconds !== null && ` · ${formatSeconds(row.seconds)}`}
                </span>
              </li>
            ))}
          </ol>
        </>
      )}
    </section>
  );
}
