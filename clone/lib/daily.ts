// Daily puzzles use one time zone, UTC+8 (PRD §4.4). Returns YYYY-MM-DD.
export function todayUtc8(): string {
  return new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString().slice(0, 10);
}
