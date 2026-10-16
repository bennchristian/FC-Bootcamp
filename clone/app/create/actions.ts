"use server";

import { redirect } from "next/navigation";
import type { Columns, PuzzleWord } from "@/lib/grid";
import { validatePuzzle } from "@/lib/puzzle";
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
