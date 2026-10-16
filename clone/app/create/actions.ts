"use server";

import { redirect } from "next/navigation";
import { commonWordsOfLength, suggestCommonWords } from "@/lib/gemini";
import { type Columns, type PuzzleWord, buildableStrings, gridFromWords } from "@/lib/grid";
import { getCurrentPlayer } from "@/lib/player";
import {
  MAX_COLUMNS,
  MAX_ROWS,
  MIN_COLUMNS,
  MIN_ROWS,
  validateGrid,
  validatePuzzle,
} from "@/lib/puzzle";
import { createClient } from "@/lib/supabase/server";

export type CreateState = { message: string };

type Payload = {
  title: string;
  dailyDate: string;
  columns: Columns;
  words: PuzzleWord[];
};

export async function createPuzzle(_prev: CreateState, formData: FormData): Promise<CreateState> {
  let payload: Payload;
  try {
    payload = JSON.parse(String(formData.get("payload")));
  } catch {
    return { message: "Something went wrong reading the form. Try again." };
  }

  const problem = validatePuzzle(payload.columns, payload.words);
  if (problem) return { message: problem };

  const supabase = await createClient();
  const { data: id, error } = await supabase.rpc("create_puzzle", {
    p_title: payload.title,
    p_columns: payload.columns,
    p_daily_date: payload.dailyDate || null,
    p_words: payload.words,
  });

  if (error) {
    if (error.code === "23505") return { message: "There's already a daily puzzle for that date." };
    if (error.code === "42501") return { message: "Only editors can set a daily date." };
    return { message: `Couldn't save the puzzle: ${error.message}` };
  }

  redirect(`/play/${id}`);
}

const SUGGESTED = 20; // the top 10 become basic words, 11–20 bonus words with clues
const BASIC = 10;
const MAX_CANDIDATES = 8000;
const SEED_WORDS = 60;

type FillResult = { message: string } | { words: PuzzleWord[] };

// Asks Gemini for the grid's most common words and keeps only ones the grid can really make,
// in Gemini's order, without repeats.
async function commonWordsIn(columns: Columns): Promise<FillResult> {
  const candidates = buildableStrings(columns);
  if (candidates.length === 0) return { message: "Fill in the tiles first." };
  if (candidates.length > MAX_CANDIDATES) {
    return { message: "This grid is too big to auto-fill. Use fewer tiles, or list words by hand." };
  }

  let suggestions;
  try {
    suggestions = await suggestCommonWords(candidates, SUGGESTED);
  } catch (error) {
    return { message: error instanceof Error ? error.message : "Auto-fill failed." };
  }

  const allowed = new Set(candidates);
  const seen = new Set<string>();
  const words: PuzzleWord[] = [];
  for (const { word, clue } of suggestions) {
    const upper = word.trim().toUpperCase();
    if (!allowed.has(upper) || seen.has(upper)) continue;
    seen.add(upper);
    const kind = words.length < BASIC ? "basic" : "bonus";
    words.push({ word: upper, kind, clue: kind === "bonus" ? clue.trim() : null });
    if (words.length === SUGGESTED) break;
  }

  if (words.length === 0) return { message: "Gemini didn't find any common words in this grid." };
  return { words };
}

// "Find words in my grid": the most common words a hand-made grid can make (PRD §4.4).
export async function suggestWords(columns: Columns): Promise<FillResult> {
  if (!(await getCurrentPlayer())) return { message: "Sign in to use auto-fill." };
  const problem = validateGrid(columns);
  if (problem) return { message: problem };
  return commonWordsIn(columns);
}

// "Generate puzzle": a new grid built from Gemini's seed words, then its most common words.
export async function generatePuzzle(
  cols: number,
  rows: number,
): Promise<{ message: string } | { columns: Columns; words: PuzzleWord[] }> {
  if (!(await getCurrentPlayer())) return { message: "Sign in to generate a puzzle." };
  if (cols < MIN_COLUMNS || cols > MAX_COLUMNS || rows < MIN_ROWS || rows > MAX_ROWS) {
    return { message: "Pick a grid size first." };
  }

  let seeds: string[];
  try {
    seeds = (await commonWordsOfLength(cols, SEED_WORDS))
      .map((w) => w.trim().toUpperCase())
      .filter((w) => w.length === cols && /^[A-Z]+$/.test(w));
  } catch (error) {
    return { message: error instanceof Error ? error.message : "Generating failed." };
  }
  if (seeds.length < 10) return { message: "Gemini didn't suggest enough words. Try again." };

  const columns = gridFromWords(seeds, cols, rows);
  const result = await commonWordsIn(columns);
  return "message" in result ? result : { columns, words: result.words };
}
