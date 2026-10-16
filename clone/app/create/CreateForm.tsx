"use client";

import { useActionState, useState, useTransition } from "react";
import type { PuzzleWord } from "@/lib/grid";
import {
  MAX_COLUMNS,
  MAX_ROWS,
  MIN_COLUMNS,
  MIN_ROWS,
  validateGrid,
  validatePuzzle,
} from "@/lib/puzzle";
import { type CreateState, createPuzzle, generatePuzzle, suggestWords } from "./actions";

const input = "rounded-md border border-neutral-600 bg-neutral-900 px-3 py-2";

// Keeps existing tiles when the grid is resized; new tiles start blank.
function resize(tiles: string[][], cols: number, rows: number): string[][] {
  return Array.from({ length: cols }, (_, c) =>
    Array.from({ length: rows }, (_, r) => tiles[c]?.[r] ?? ""),
  );
}

const emptyWord = (): PuzzleWord => ({ word: "", kind: "basic", clue: "" });

export default function CreateForm({ isEditor }: { isEditor: boolean }) {
  const [tiles, setTiles] = useState(() => resize([], 5, 4));
  const [title, setTitle] = useState("");
  const [dailyDate, setDailyDate] = useState("");
  const [words, setWords] = useState<PuzzleWord[]>([emptyWord(), emptyWord(), emptyWord()]);
  const [state, formAction, pending] = useActionState<CreateState, FormData>(createPuzzle, {
    message: "",
  });
  const [filling, startFilling] = useTransition();
  const [generating, startGenerating] = useTransition();
  const [fillMessage, setFillMessage] = useState("");
  const busy = filling || generating;

  const cols = tiles.length;
  const rows = tiles[0].length;
  const filledWords = words.filter((w) => w.word.trim() !== "");
  const problem = validatePuzzle(tiles, filledWords);

  function setTile(col: number, row: number, value: string) {
    const letters = value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 3);
    setTiles(tiles.map((column, c) => column.map((tile, r) => (c === col && r === row ? letters : tile))));
  }

  function autoFill() {
    setFillMessage("");
    startFilling(async () => {
      let result;
      try {
        result = await suggestWords(tiles);
      } catch {
        setFillMessage("Auto-fill didn't respond. Try again, or list the words by hand.");
        return;
      }
      if ("message" in result) {
        setFillMessage(result.message);
      } else {
        setWords(result.words);
        setFillMessage(`Found ${result.words.length} words. Check them before you save.`);
      }
    });
  }

  function generate() {
    setFillMessage("");
    startGenerating(async () => {
      let result;
      try {
        result = await generatePuzzle(cols, rows);
      } catch {
        setFillMessage("Generating didn't respond. Try again.");
        return;
      }
      if ("message" in result) {
        setFillMessage(result.message);
      } else {
        setTiles(result.columns);
        setWords(result.words);
        setFillMessage(
          `Generated a grid with ${result.words.length} words. Check them, then press Create puzzle.`,
        );
      }
    });
  }

  function setWord(index: number, change: Partial<PuzzleWord>) {
    setWords(words.map((w, i) => (i === index ? { ...w, ...change } : w)));
  }

  const payload = JSON.stringify({
    title,
    dailyDate: isEditor ? dailyDate : "",
    columns: tiles,
    words: filledWords.map((w) => ({
      word: w.word.trim().toUpperCase(),
      kind: w.kind,
      clue: w.kind === "bonus" ? w.clue : null,
    })),
  });

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <input type="hidden" name="payload" value={payload} />

      <section className="flex flex-col gap-3 rounded-lg border border-amber-400/40 bg-amber-400/5 p-4 text-sm">
        <h2 className="font-semibold">How to make a puzzle</h2>
        <ol className="flex list-decimal flex-col gap-1 pl-5 text-neutral-300">
          <li>
            Players spell words by picking <strong>one tile from each column</strong>, left to
            right. A 5-column grid makes 5-letter words.
          </li>
          <li>
            <strong>Fastest:</strong> choose a grid size below and press{" "}
            <strong>✨ Generate puzzle</strong>. Gemini builds a grid and finds its 20 most common
            words, which takes about 20–30 seconds.
          </li>
          <li>
            <strong>Or build it yourself:</strong> type letters into the tiles, then press{" "}
            <strong>Find words in my grid</strong>, or list the words by hand.
          </li>
          <li>
            The first 10 words are <strong>basic</strong>. Words 11–20 are <strong>bonus</strong>{" "}
            words, and each needs a clue that players see before they find it.
          </li>
          <li>Check the words, then press <strong>Create puzzle</strong> at the bottom.</li>
        </ol>
      </section>

      <section className="flex flex-col gap-3">
        <label className="flex flex-col gap-1 text-sm">
          Title <span className="text-neutral-500">(optional)</span>
          <input className={input} value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        {isEditor && (
          <label className="flex flex-col gap-1 text-sm">
            Daily date <span className="text-neutral-500">(editors only; leave empty for a community puzzle)</span>
            <input
              className={input}
              type="date"
              value={dailyDate}
              onChange={(e) => setDailyDate(e.target.value)}
            />
          </label>
        )}
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-semibold">Grid</h2>
          <button
            type="button"
            onClick={generate}
            disabled={busy}
            className="rounded-md bg-amber-400 px-3 py-1.5 text-sm font-semibold text-neutral-900 hover:bg-amber-300 disabled:opacity-50"
          >
            {generating ? "Generating…" : "✨ Generate puzzle"}
          </button>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <label className="flex items-center gap-2">
            Columns
            <select
              className={input}
              value={cols}
              onChange={(e) => setTiles(resize(tiles, Number(e.target.value), rows))}
            >
              {Array.from({ length: MAX_COLUMNS - MIN_COLUMNS + 1 }, (_, i) => MIN_COLUMNS + i).map(
                (n) => (
                  <option key={n}>{n}</option>
                ),
              )}
            </select>
          </label>
          <label className="flex items-center gap-2">
            Tiles per column
            <select
              className={input}
              value={rows}
              onChange={(e) => setTiles(resize(tiles, cols, Number(e.target.value)))}
            >
              {Array.from({ length: MAX_ROWS - MIN_ROWS + 1 }, (_, i) => MIN_ROWS + i).map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </label>
        </div>
        <p className="text-sm text-neutral-500">
          One letter per tile, or up to 3 for a combo tile like QU. An empty tile is a blank ❤️,
          which hand-listed words can skip. Auto-fill only uses words with a letter from every
          column.
        </p>
        <div className="flex gap-2">
          {tiles.map((column, c) => (
            <div key={c} className="flex flex-col gap-2">
              {column.map((tile, r) => (
                <input
                  key={r}
                  aria-label={`Column ${c + 1}, tile ${r + 1}`}
                  value={tile}
                  placeholder="❤️"
                  onChange={(e) => setTile(c, r, e.target.value)}
                  style={{ width: `min(3.5rem, calc((100vw - 3rem) / ${cols} - 0.5rem))` }}
                  className="aspect-square rounded-md bg-[#f1dcae] text-center text-lg font-bold text-neutral-900 uppercase placeholder:opacity-40"
                />
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-semibold">Words</h2>
          <button
            type="button"
            onClick={autoFill}
            disabled={busy || validateGrid(tiles) !== null}
            className="rounded-md border border-amber-400 px-3 py-1.5 text-sm font-semibold text-amber-400 hover:bg-amber-400 hover:text-neutral-900 disabled:opacity-50"
          >
            {filling ? "Finding words…" : "Find words in my grid"}
          </button>
        </div>
        <p className="text-sm text-neutral-500">
          Every word takes one tile from each column. You can edit, remove or add words by hand.
        </p>
        {fillMessage && (
          <p className="text-sm text-neutral-300" aria-live="polite">
            {fillMessage}
          </p>
        )}
        {words.map((w, i) => (
          <div key={i} className="flex flex-col gap-2 rounded-lg border border-neutral-700 p-3">
            <div className="flex gap-2">
              <input
                className={`${input} min-w-0 flex-1 uppercase`}
                aria-label={`Word ${i + 1}`}
                placeholder="Word"
                value={w.word}
                onChange={(e) => setWord(i, { word: e.target.value })}
              />
              <select
                className={input}
                aria-label={`Word ${i + 1} kind`}
                value={w.kind}
                onChange={(e) => setWord(i, { kind: e.target.value as PuzzleWord["kind"] })}
              >
                <option value="basic">Basic</option>
                <option value="bonus">Bonus</option>
              </select>
              <button
                type="button"
                aria-label={`Remove word ${i + 1}`}
                onClick={() => setWords(words.filter((_, j) => j !== i))}
                className="px-2 text-neutral-400 hover:text-neutral-200"
              >
                ✕
              </button>
            </div>
            {w.kind === "bonus" && (
              <input
                className={input}
                aria-label={`Word ${i + 1} clue`}
                placeholder="Clue"
                value={w.clue ?? ""}
                onChange={(e) => setWord(i, { clue: e.target.value })}
              />
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => setWords([...words, emptyWord()])}
          className="self-start rounded-md border border-neutral-500 px-4 py-2 text-sm hover:border-neutral-300"
        >
          + Add word
        </button>
      </section>

      {(state.message || problem) && (
        <p className="text-sm text-red-400" aria-live="polite">
          {state.message || problem}
        </p>
      )}
      <button
        disabled={pending || problem !== null}
        className="rounded-lg bg-amber-400 px-6 py-3 font-semibold text-neutral-900 hover:bg-amber-300 disabled:opacity-50"
      >
        {pending ? "Saving…" : "Create puzzle"}
      </button>
    </form>
  );
}
