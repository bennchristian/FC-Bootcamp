// Server-only: import it from server actions, never from a client component.
// Picks the most common real words from a grid's buildable strings, using Gemini's free tier.
// The key is server-only (GEMINI_API_KEY); the model can be swapped with GEMINI_MODEL.
const MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash";

export type Suggestion = { word: string; clue: string };

const SCHEMA = {
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
};

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

  const res = await callGemini(key, prompt);
  if (res.status === 503) throw new Error("Gemini is busy right now. Try again in a minute.");
  if (res.status === 429) throw new Error("Gemini's free quota is used up for now. Try again later.");
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Gemini returned ${res.status}: ${detail.slice(0, 200)}`);
  }
  const body = await res.json();
  const text: string | undefined = body?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini returned no words.");
  return (JSON.parse(text) as { words: Suggestion[] }).words;
}

// The free tier sometimes answers 503 "high demand", so one busy reply gets a second try.
async function callGemini(key: string, prompt: string): Promise<Response> {
  for (let attempt = 1; ; attempt++) {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": key },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            // Thinking off: about 4s instead of about 15s, and the word picks are just as good.
            thinkingConfig: { thinkingBudget: 0 },
            responseMimeType: "application/json",
            responseSchema: SCHEMA,
          },
        }),
      },
    );
    if (res.status !== 503 || attempt === 2) return res;
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }
}
