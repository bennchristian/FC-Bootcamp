const projects = [
  {
    name: "Cadgy clone",
    stack: "Next.js · Supabase · Gemini",
    summary:
      "A working rebuild of OneLook's Cadgy, a daily word-tile puzzle: pick one tile per column to spell words. It has accounts, a one-click guest login, a create form where Gemini suggests the word list, and a leaderboard for every puzzle.",
    links: [
      { label: "Play it", href: "https://fc-bootcamp.vercel.app" },
      {
        label: "Code",
        href: "https://github.com/bennchristian/FC-Bootcamp/tree/main/clone",
      },
    ],
  },
  {
    name: "FC-Bootcamp",
    stack: "Claude Code · GitHub · Vercel",
    summary:
      "The repo for my run through the Frontier Commons Build Bootcamp: four weeks of material in about 36 hours. It holds this site, the clone, and the PRD and planning docs that scoped them.",
    links: [
      {
        label: "Repo",
        href: "https://github.com/bennchristian/FC-Bootcamp",
      },
    ],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="border-t border-line py-12">
      <h2 className="font-serif text-3xl">What I&apos;m making</h2>
      <div className="mt-8 space-y-10">
        {projects.map((project) => (
          <article key={project.name}>
            <h3 className="font-serif text-2xl">{project.name}</h3>
            <p className="mt-1 text-xs uppercase tracking-widest text-muted">
              {project.stack}
            </p>
            <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>
            <p className="mt-3 flex gap-5">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  className="text-accent underline underline-offset-4"
                  href={link.href}
                >
                  {link.label} →
                </a>
              ))}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
