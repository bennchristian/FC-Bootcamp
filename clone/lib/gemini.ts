// Server-only: import it from server actions, never from a client component.
// Word help from Gemini's free tier. The key is GEMINI_API_KEY.
// Tried in order: the free tier often answers 503 "high demand", so a busy model hands over
// to the next one. GEMINI_MODEL, when set, goes first.
const MODELS = [
  process.env.GEMINI_MODEL,
  "gemini-3.5-flash",
  "gemini-flash-latest",
  "gemini-flash-lite-latest",
  "gemini-2.5-flash",
].filter((m, i, all): m is string => !!m && all.indexOf(m) === i);

export type Suggestion = { word: string; clue: string };

// One JSON-mode call. `schema` uses Gemini's responseSchema format.
async function askGemini<T>(prompt: string, schema: object): Promise<T> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("Auto-fill isn't set up yet (no GEMINI_API_KEY).");

  let lastError = "";
  for (const model of MODELS) {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": key },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json", responseSchema: schema },
        }),
      },
    );
    if (!res.ok) {
      lastError = `${model} returned ${res.status}`;
      continue;
    }
    const body = await res.json();
    const text: string | undefined = body?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (text) return JSON.parse(text) as T;
    lastError = `${model} returned nothing`;
  }
  throw new Error(`Gemini is busy right now (${lastError}). Try again in a minute.`);
}

// Seed words for generating a grid: common words of exactly `length` letters.
export async function commonWordsOfLength(length: number, count: number): Promise<string[]> {
  const prompt = [
    `List ${count} different common English words of exactly ${length} letters.`,
    "Everyday words a typical adult knows. No proper nouns, abbreviations or offensive words.",
    "Vary the words widely, with many different starting letters.",
    `Variety seed: ${Math.floor(Math.random() * 1_000_000)}`,
  ].join("\n");
  const { words } = await askGemini<{ words: string[] }>(prompt, {
    type: "OBJECT",
    properties: { words: { type: "ARRAY", items: { type: "STRING" } } },
    required: ["words"],
  });
  return words;
}

// From a grid's buildable strings, the most common real words, most common first, with clues.
export async function suggestCommonWords(candidates: string[], limit: number): Promise<Suggestion[]> {
  const prompt = [
    "These letter strings can be built from a word-puzzle grid.",
    "Choose the ones that are real English words a typical adult knows.",
    "No proper nouns, abbreviations or offensive words.",
    `Return up to ${limit}, most common first.`,
    "For each, give a clue: a plain definition of at most 12 words that doesn't use the word.",
    "",
    candidates.join(" "),
  ].join("\n");
  const { words } = await askGemini<{ words: Suggestion[] }>(prompt, {
    type: "OBJECT",
    properties: {
      words: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: { word: { type: "STRING" }, clue: { type: "STRING" } },
          required: ["word", "clue"],
        },
      },
    },
    required: ["words"],
  });
  return words;
}
