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

// Every distinct string the grid can spell with a lettered tile from every column.
// Blank tiles are skipped, so auto-filled words always use all the columns.
export function buildableStrings(columns: Columns): string[] {
  let strings = [""];
  for (const column of columns) {
    const tiles = column.filter((tile) => tile !== "");
    strings = strings.flatMap((prefix) => tiles.map((tile) => prefix + tile));
  }
  return [...new Set(strings)];
}

// Builds a grid from seed words of the grid's length. It packs whole seed words into the
// columns (each column holds at most `rows` letters), tries many word orders, and keeps the
// grid that can spell the most seeds. Leftover slots get each position's most common letters.
export function gridFromWords(words: string[], cols: number, rows: number): Columns {
  const shuffled = () => [...words].sort(() => Math.random() - 0.5);
  const spells = (sets: Set<string>[]) =>
    words.filter((w) => [...w].every((ch, i) => sets[i].has(ch))).length;

  let best: Set<string>[] = [];
  let bestCount = -1;
  for (let attempt = 0; attempt < 300; attempt++) {
    const sets = Array.from({ length: cols }, () => new Set<string>());
    for (const word of shuffled()) {
      if ([...word].every((ch, i) => sets[i].has(ch) || sets[i].size < rows)) {
        [...word].forEach((ch, i) => sets[i].add(ch));
      }
    }
    const count = spells(sets);
    if (count > bestCount) [best, bestCount] = [sets, count];
  }

  return best.map((set, col) => {
    const byFrequency = [...new Set(words.map((w) => w[col]))].sort(
      (a, b) => words.filter((w) => w[col] === b).length - words.filter((w) => w[col] === a).length,
    );
    for (const letter of [...byFrequency, ..."EARSTOLINDUCHMPBGKWY"]) {
      if (set.size === rows) break;
      set.add(letter);
    }
    return [...set].sort(() => Math.random() - 0.5);
  });
}

// 75 → "1:15"
export function formatSeconds(total: number): string {
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}
