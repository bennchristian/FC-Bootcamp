"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { type Columns, type PuzzleWord, POINTS_PER_WORD, findPath, formatSeconds } from "@/lib/grid";
import { createClient } from "@/lib/supabase/client";

const WIN_SECONDS = 180;
const MAX_LAYERS = 6; // 3D stacks taller than this show a count instead
const LAYER_PX = 4;
const FLASH_MS = 2000;

// Only called from event handlers and timers, never while rendering.
const clock = () => Date.now();

// Timestamps are milliseconds since 1970.
export type SavedPlay = {
  found: string[];
  invalidCount: number;
  startedAt: number;
  finishedAt: number | null;
};

type Props = {
  puzzleId: string;
  userId: string;
  columns: Columns;
  words: PuzzleWord[];
  saved: SavedPlay | null;
};

export default function Board({ puzzleId, userId, columns, words, saved }: Props) {
  const [picks, setPicks] = useState<(number | null)[]>(() => columns.map(() => null));
  const [typed, setTyped] = useState("");
  const [found, setFound] = useState<string[]>(saved?.found ?? []);
  const [invalidCount, setInvalidCount] = useState(saved?.invalidCount ?? 0);
  const [message, setMessage] = useState("");
  // The word just found, shown big in the middle of the screen for FLASH_MS. `at` restarts the
  // animation when two words are found back to back.
  const [flash, setFlash] = useState<{ word: string; clue: string | null; at: number } | null>(null);
  const [saveError, setSaveError] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(saved?.startedAt ?? null);
  const [finishedAt, setFinishedAt] = useState<number | null>(saved?.finishedAt ?? null);
  const [now, setNow] = useState<number | null>(null);
  const [threeD, setThreeD] = useState(false);
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();
  const saving = useRef(Promise.resolve());
  const gridRef = useRef<HTMLDivElement>(null);
  const [link, setLink] = useState<string>("");

  const answers = useMemo(() => new Map(words.map((w) => [w.word, w])), [words]);
  const allFound = words.length > 0 && found.length === words.length;

  // Which words use each tile, keyed "column-row".
  const wordsByTile = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const { word } of words) {
      findPath(columns, word)?.forEach((row, col) => {
        const key = `${col}-${row}`;
        map.set(key, [...(map.get(key) ?? []), word]);
      });
    }
    return map;
  }, [columns, words]);

  // The timer starts on the first visit and stops once every word is found.
  useEffect(() => {
    if (allFound) return;
    function tick() {
      const t = Date.now();
      setStartedAt((start) => start ?? t);
      setNow(t);
    }
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [allFound]);

  // A first visit saves the start time, so refreshing before the first guess keeps the timer.
  useEffect(() => {
    if (saved) return;
    const started = new Date().toISOString();
    saving.current = saving.current.then(async () => {
      await supabase
        .from("plays")
        .upsert(
          { user_id: userId, puzzle_id: puzzleId, started_at: started },
          { onConflict: "user_id,puzzle_id", ignoreDuplicates: true },
        );
    });
  }, [saved, supabase, userId, puzzleId]);

  useEffect(() => {
    if (!flash) return;
    const id = setTimeout(() => setFlash(null), FLASH_MS);
    return () => clearTimeout(id);
  }, [flash]);

  const end = finishedAt ?? now;
  // How many unfound words still use each tile. At 0 the tile turns gold; in 3D it's the stack height.
  const remainingByTile = useMemo(() => {
    const map = new Map<string, number>();
    columns.forEach((column, col) =>
      column.forEach((_, row) => {
        const key = `${col}-${row}`;
        map.set(key, (wordsByTile.get(key) ?? []).filter((w) => !found.includes(w)).length);
      }),
    );
    return map;
  }, [columns, wordsByTile, found]);
  const tallest = Math.min(MAX_LAYERS, Math.max(0, ...remainingByTile.values()));

  const elapsed = startedAt && end ? Math.max(0, Math.floor((end - startedAt) / 1000)) : 0;

  // Saves the whole play each time. Saves run one after another so an older one can't land last.
  function save(next: { found: string[]; invalidCount: number; finishedAt: number | null }) {
    const started = new Date(startedAt ?? clock()).toISOString();
    saving.current = saving.current.then(async () => {
      const { error } = await supabase.from("plays").upsert(
        {
          user_id: userId,
          puzzle_id: puzzleId,
          found: next.found,
          invalid_count: next.invalidCount,
          started_at: started,
          finished_at: next.finishedAt ? new Date(next.finishedAt).toISOString() : null,
        },
        { onConflict: "user_id,puzzle_id" },
      );
      setSaveError(error ? "Couldn't save your progress. Check your connection." : "");
      if (!error) router.refresh(); // updates the leaderboard below
    });
  }

  function submit(guess: string) {
    const word = guess.toUpperCase();
    if (!word) return;
    if (found.includes(word)) {
      setMessage(`You already found ${word}.`);
    } else if (answers.has(word)) {
      const nextFound = [...found, word];
      const nextFinished = nextFound.length === words.length ? clock() : null;
      setFound(nextFound);
      setFinishedAt(nextFinished);
      setMessage(`${word}: +${POINTS_PER_WORD}`);
      const { kind, clue } = answers.get(word)!;
      setFlash({ word, clue: kind === "bonus" ? clue : null, at: clock() });
      save({ found: nextFound, invalidCount, finishedAt: nextFinished });
    } else {
      setInvalidCount(invalidCount + 1);
      setMessage(`${word} isn't on this puzzle's list.`);
      save({ found, invalidCount: invalidCount + 1, finishedAt });
    }
    setPicks(columns.map(() => null));
    setTyped("");
  }

  function pickTile(col: number, row: number) {
    const next = picks.map((pick, c) => (c === col ? (pick === row ? null : row) : pick));
    setTyped("");
    if (next.every((pick) => pick !== null)) {
      submit(next.map((row, c) => columns[c][row as number]).join(""));
    } else {
      setPicks(next);
    }
  }

  // Draws a line through the picked tiles, left to right. Re-measured when the picks change,
  // the window resizes, or the 3D gap finishes animating.
  const measureLink = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const box = grid.getBoundingClientRect();
    const points = picks.flatMap((row, col) => {
      const tile = row === null ? null : grid.querySelector(`[data-tile="${col}-${row}"]`);
      if (!tile) return [];
      const r = tile.getBoundingClientRect();
      return [`${r.left - box.left + r.width / 2},${r.top - box.top + r.height / 2}`];
    });
    setLink(points.length > 1 ? points.join(" ") : "");
  }, [picks]);

  useLayoutEffect(() => {
    measureLink();
    window.addEventListener("resize", measureLink);
    return () => window.removeEventListener("resize", measureLink);
  }, [measureLink, threeD]);

  // Typing works too: letters, Backspace, Enter to submit, Escape to clear.
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (/^[a-zA-Z]$/.test(event.key)) {
        setPicks(columns.map(() => null));
        setTyped((t) => t + event.key.toUpperCase());
      } else if (event.key === "Backspace") {
        setTyped((t) => t.slice(0, -1));
      } else if (event.key === "Escape") {
        setTyped("");
        setPicks(columns.map(() => null));
      } else if (event.key === "Enter") {
        event.preventDefault(); // otherwise Enter also "clicks" the last tile tapped
        submit(typed);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const current =
    typed || picks.map((row, c) => (row === null ? "" : columns[c][row])).join("");
  const basic = words.filter((w) => w.kind === "basic");
  const bonus = words.filter((w) => w.kind === "bonus");
  const won = allFound && (elapsed <= WIN_SECONDS || invalidCount === 0);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-3 text-sm">
        <span className="rounded-full border border-neutral-600 px-3 py-1">
          Score: <strong>{found.length * POINTS_PER_WORD}</strong>
        </span>
        <span className="rounded-full border border-neutral-600 px-3 py-1 tabular-nums">
          ⏱ {formatSeconds(elapsed)}
        </span>
        <button
          type="button"
          onClick={() => setThreeD(!threeD)}
          aria-pressed={threeD}
          title="Stack each tile by how many unfound words still use it"
          className={`rounded-full border px-3 py-1 ${
            threeD ? "border-amber-400 bg-amber-400 text-neutral-900" : "border-neutral-600"
          }`}
        >
          3D
        </button>
      </div>

      <div ref={gridRef} className="relative flex gap-2" onTransitionEnd={measureLink}>
        {/* Behind the tiles, so it shows in the gaps without covering letters. */}
        {link && (
          <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden>
            <polyline
              points={link}
              fill="none"
              stroke="#38bdf8"
              strokeWidth={8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {columns.map((column, col) => (
          <div
            key={col}
            className="flex flex-col transition-[gap]"
            style={{ gap: 8 + (threeD ? tallest * LAYER_PX : 0) }}
          >
            {column.map((tile, row) => {
              const remaining = remainingByTile.get(`${col}-${row}`) ?? 0;
              const layers = threeD ? Math.min(remaining, MAX_LAYERS) : 0;
              const picked = picks[col] === row;
              return (
                <button
                  key={row}
                  type="button"
                  data-tile={`${col}-${row}`}
                  aria-pressed={picked}
                  onClick={() => pickTile(col, row)}
                  aria-label={`${tile || "blank"}, used by ${remaining} more ${remaining === 1 ? "word" : "words"}`}
                  style={{
                    width: `min(3.5rem, calc((100vw - 3rem) / ${columns.length} - 0.5rem))`,
                    boxShadow: layers
                      ? Array.from(
                          { length: layers },
                          (_, i) => `0 ${(i + 1) * LAYER_PX}px 0 ${i % 2 ? "#e2c793" : "#b98f4f"}`,
                        ).join(", ")
                      : undefined,
                  }}
                  className={`relative aspect-square rounded-md text-lg font-bold shadow transition ${
                    picked
                      ? "scale-105 bg-sky-500 text-white ring-2 ring-sky-300"
                      : remaining === 0
                        ? "bg-amber-400 text-neutral-900"
                        : "bg-[#f1dcae] text-neutral-900"
                  }`}
                >
                  {tile === "" ? "❤️" : tile}
                  {threeD && remaining > MAX_LAYERS && (
                    <span className="absolute top-0.5 right-1 text-[10px] font-semibold">
                      {remaining}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex min-h-10 flex-col items-center gap-1">
        <p className="text-2xl font-bold tracking-[0.4em]">
          {current || columns.map(() => "_").join(" ")}
        </p>
        <p className="text-sm text-neutral-400" aria-live="polite">
          {message || "Tap one tile per column, or type a word and press Enter."}
        </p>
        {saveError && (
          <p className="text-sm text-red-400" aria-live="polite">
            {saveError}
          </p>
        )}
      </div>

      {flash && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            key={flash.at}
            className="word-flash rounded-xl bg-orange-500 px-4 py-3 text-center text-white shadow-2xl"
            // As wide as the board: 3.5rem tiles with 0.5rem gaps.
            style={{ width: `min(${columns.length * 4 - 0.5}rem, 100%)` }}
          >
            <p className="text-3xl font-bold tracking-widest">{flash.word}</p>
            {flash.clue && <p className="mt-1 text-sm text-orange-50">{flash.clue}</p>}
          </div>
        </div>
      )}

      {allFound && (
        <p className="rounded-lg bg-amber-400 px-4 py-2 font-semibold text-neutral-900">
          {won ? "You won!" : "All words found!"} {found.length} words in{" "}
          {formatSeconds(elapsed)}
        </p>
      )}

      <div className="grid w-full gap-4 sm:grid-cols-2">
        <section className="rounded-lg border border-neutral-700 p-4">
          <h2 className="mb-3 font-semibold text-green-400">
            Basic words ({basic.filter((w) => found.includes(w.word)).length}/{basic.length})
          </h2>
          {basic.some((w) => found.includes(w.word)) ? (
            <ul className="flex flex-wrap gap-2">
              {basic
                .filter((w) => found.includes(w.word))
                .map((w) => (
                  <li key={w.word} className="rounded bg-neutral-800 px-2 py-1 font-semibold">
                    {w.word}
                  </li>
                ))}
            </ul>
          ) : (
            <p className="text-sm text-neutral-500">Basic words will appear here as you find them.</p>
          )}
        </section>

        <section className="rounded-lg border border-neutral-700 p-4">
          <h2 className="mb-3 font-semibold text-sky-400">
            Bonus words ({bonus.filter((w) => found.includes(w.word)).length}/{bonus.length})
          </h2>
          <ul className="flex flex-col gap-2">
            {bonus.map((w) => (
              <li key={w.word} className="rounded bg-neutral-800 px-3 py-2 text-sm">
                {found.includes(w.word) && <strong className="block text-base">{w.word}</strong>}
                {w.clue}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
