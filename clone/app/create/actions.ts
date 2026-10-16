"use server";

import { redirect } from "next/navigation";
import { suggestCommonWords } from "@/lib/gemini";
import { type Columns, type PuzzleWord, buildableStrings } from "@/lib/grid";
import { getCurrentPlayer } from "@/lib/player";
import { validateGrid, validatePuzzle } from "@/lib/puzzle";
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
const MAX_CANDIDATES = 5000;

// Auto-fill: Gemini picks the most common real words the grid can make (PRD §4.4).
export async function suggestWords(
  columns: Columns,
): Promise<{ words: PuzzleWord[] } | { message: string }> {
  if (!(await getCurrentPlayer())) return { message: "Sign in to use auto-fill." };
  const problem = validateGrid(columns);
  if (problem) return { message: problem };

  const candidates = buildableStrings(columns);
  if (candidates.length > MAX_CANDIDATES) {
    return { message: "This grid is too big to auto-fill. List the words by hand." };
  }

  let suggestions;
  try {
    suggestions = await suggestCommonWords(candidates, SUGGESTED);
  } catch (error) {
    return { message: error instanceof Error ? error.message : "Auto-fill failed." };
  }

  // Keep only words the grid can really make, in Gemini's order, without repeats.
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
