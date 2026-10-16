// Server-only: import it from server actions, never from a client component.
// Picks the most common real words from a grid's buildable strings, using Gemini's free tier.
// The key is server-only (GEMINI_API_KEY); the model can be swapped with GEMINI_MODEL.
const MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash";

export type Suggestion = { word: string; clue: string };

export async function suggestCommonWords(candidates: string[], limit: number): Promise<Suggestion[]> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("Auto-fill isn't set up yet (no GEMINI_API_KEY).");

  const prompt = [
    "These letter strings can be built from a word-puzzle grid.",
    "Choose the ones that are real English words a typical adult knows.",
    "No proper nouns, abbreviations or offensive words.",
    `Return up to ${limit}, most common first.`,
    "For each, give a clue: a plain definition of at most 12 words that doesn't use the word.",
    "",
    candidates.join(" "),
  ].join("\n");

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
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
          },
        },
      }),
    },
  );

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Gemini returned ${res.status}: ${detail.slice(0, 200)}`);
  }
  const body = await res.json();
  const text: string | undefined = body?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini returned no words.");
  return (JSON.parse(text) as { words: Suggestion[] }).words;
}
