"use client";

import { useEffect, useMemo, useState } from "react";
import { type Columns, type PuzzleWord, POINTS_PER_WORD, findPath } from "@/lib/grid";

const WIN_SECONDS = 180;

type Props = {
  columns: Columns;
  words: PuzzleWord[];
};

export default function Board({ columns, words }: Props) {
  const [picks, setPicks] = useState<(number | null)[]>(() => columns.map(() => null));
  const [typed, setTyped] = useState("");
  const [found, setFound] = useState<string[]>([]);
  const [invalidCount, setInvalidCount] = useState(0);
  const [message, setMessage] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);

  const answers = useMemo(() => new Set(words.map((w) => w.word)), [words]);
  const allFound = words.length > 0 && found.length === words.length;

  // Which words use each tile, keyed "column-row". A tile turns gold once all of them are found.
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

  const elapsed = startedAt && now ? Math.floor((now - startedAt) / 1000) : 0;

  function submit(guess: string) {
    const word = guess.toUpperCase();
    if (!word) return;
    if (found.includes(word)) {
      setMessage(`You already found ${word}.`);
    } else if (answers.has(word)) {
      setFound([...found, word]);
      setMessage(`${word}: +${POINTS_PER_WORD}`);
    } else {
      setInvalidCount(invalidCount + 1);
      setMessage(`${word} isn't on this puzzle's list.`);
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
          ⏱ {Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, "0")}
        </span>
      </div>

      <div className="flex gap-2">
        {columns.map((column, col) => (
          <div key={col} className="flex flex-col gap-2">
            {column.map((tile, row) => {
              const tileWords = wordsByTile.get(`${col}-${row}`) ?? [];
              const gold = tileWords.length > 0 && tileWords.every((w) => found.includes(w));
              const picked = picks[col] === row;
              return (
                <button
                  key={row}
                  type="button"
                  onClick={() => pickTile(col, row)}
                  style={{ width: `min(3.5rem, calc((100vw - 3rem) / ${columns.length} - 0.5rem))` }}
                  className={`aspect-square rounded-md text-lg font-bold text-neutral-900 shadow transition ${
                    gold ? "bg-amber-400" : "bg-[#f1dcae]"
                  } ${picked ? "ring-4 ring-sky-400" : ""}`}
                >
                  {tile === "" ? "❤️" : tile}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex min-h-10 flex-col items-center gap-1">
        <p className="text-2xl font-bold tracking-[0.4em]">{current || "_ _ _ _ _"}</p>
        <p className="text-sm text-neutral-400" aria-live="polite">
          {message || "Tap one tile per column, or type a word and press Enter."}
        </p>
      </div>

      {allFound && (
        <p className="rounded-lg bg-amber-400 px-4 py-2 font-semibold text-neutral-900">
          {won ? "You won!" : "All words found!"} {found.length} words in{" "}
          {Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, "0")}
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
