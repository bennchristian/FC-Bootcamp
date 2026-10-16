const entries = [
  {
    date: "Oct 15",
    topic: "Scope before code",
    note: "Wrote the PRD, the rules and the schema before any code, so every later change had a contract to check against.",
  },
  {
    date: "Oct 16",
    topic: "Taking a product apart",
    note: "Picked Cadgy for the clone. It had nothing for users to create, so I turned it into players submitting puzzles, with me as editor of the dailies.",
  },
  {
    date: "Oct 16",
    topic: "The prompt, commit, deploy loop",
    note: "create-next-app took six minutes, almost all of it npm install. Now I start installs in the background and do the dashboard steps while they run.",
  },
  {
    date: "Oct 16",
    topic: "Row-level security",
    note: "Every Supabase table gets RLS and an explicit policy in the same change that creates it, so a second account can't touch what the first one made.",
  },
  {
    date: "Oct 16",
    topic: "AI is not a dictionary",
    note: "Asked for the 20 most common words in a grid, Gemini slipped in CRONT, which isn't a word, and wrote it a convincing definition. A person still checks the list.",
  },
];

export default function Learning() {
  return (
    <section id="learning" className="border-t border-line py-12">
      <h2 className="font-serif text-3xl">What I&apos;m learning</h2>
      <ol className="mt-8 space-y-6">
        {entries.map((entry) => (
          <li
            key={entry.topic}
            className="grid gap-1 sm:grid-cols-[5rem_1fr] sm:gap-6"
          >
            <span className="text-xs uppercase tracking-widest text-muted sm:pt-1.5">
              {entry.date}
            </span>
            <div>
              <h3 className="font-serif text-xl">{entry.topic}</h3>
              <p className="mt-1 leading-relaxed text-muted">{entry.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
