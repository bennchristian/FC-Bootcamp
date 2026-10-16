// A puzzle grid is a list of columns; each column is a list of tiles.
// A tile holds 0–3 uppercase letters, and "" is a blank tile (shown as a heart).
export type Columns = string[][];

export type PuzzleWord = {
  word: string;
  kind: "basic" | "bonus";
  clue: string | null;
};

export const POINTS_PER_WORD = 10;

// The row picked in each column to spell `word`, or null when the grid can't make it.
// Every column gives exactly one tile, and a blank tile gives no letters.
export function findPath(columns: Columns, word: string): number[] | null {
  const target = word.toUpperCase();

  function walk(col: number, pos: number): number[] | null {
    if (col === columns.length) return pos === target.length ? [] : null;
    for (let row = 0; row < columns[col].length; row++) {
      const tile = columns[col][row];
      if (!target.startsWith(tile, pos)) continue;
      const rest = walk(col + 1, pos + tile.length);
      if (rest) return [row, ...rest];
    }
    return null;
  }

  return walk(0, 0);
}
