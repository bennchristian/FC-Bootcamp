import { type Columns, type PuzzleWord, findPath } from "@/lib/grid";

export const MIN_COLUMNS = 3;
export const MAX_COLUMNS = 7;
export const MIN_ROWS = 2;
export const MAX_ROWS = 6;

const TILE = /^[A-Z]{0,3}$/;
const WORD = /^[A-Z]+$/;

// Checks a puzzle before it's saved. Returns the first problem, or null when it's fine.
// The create form runs it for quick feedback and the server action runs it again.
export function validatePuzzle(columns: Columns, words: PuzzleWord[]): string | null {
  if (columns.length < MIN_COLUMNS || columns.length > MAX_COLUMNS) {
    return `Use ${MIN_COLUMNS}–${MAX_COLUMNS} columns.`;
  }
  const rows = columns[0]?.length ?? 0;
  if (rows < MIN_ROWS || rows > MAX_ROWS || columns.some((c) => c.length !== rows)) {
    return `Every column needs the same number of tiles (${MIN_ROWS}–${MAX_ROWS}).`;
  }
  if (columns.some((c) => c.some((tile) => !TILE.test(tile)))) {
    return "Tiles hold 0–3 letters, A to Z.";
  }
  if (words.length === 0) return "Add at least one word.";

  const seen = new Set<string>();
  for (const { word, kind, clue } of words) {
    if (!WORD.test(word)) return `"${word || "(blank)"}" isn't a word. Use letters only.`;
    if (seen.has(word)) return `${word} is listed twice.`;
    seen.add(word);
    if (!findPath(columns, word)) return `${word} can't be made from this grid.`;
    if (kind === "bonus" && !clue?.trim()) return `Bonus word ${word} needs a clue.`;
  }
  return null;
}
