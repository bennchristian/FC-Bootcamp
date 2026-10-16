@AGENTS.md

# FC-Bootcamp: project guide

Keep this file current and short. After every change, remove anything stale and fold new facts into the sections below. It is the handover; nothing else is.

**Read these first. They are the contract; this file is the running commentary.**

| File | Holds |
|---|---|
| `PRD.md` | Scope, MVP, what is deliberately out |
| `ARCHITECTURE.md` | Flow, patterns, trust boundaries |
| `SCHEMA.md` | Data contracts, off-store state |
| `DESIGN.md` | Palette, typography, spacing, accessibility |
| `RULES.md` | SOLID / DRY-at-4 / KISS, plus the bootcamp stack rules |
| `AGENTS.md` | Who does what, phase gating |
| `SKILLS.md` | Which skill wins which job |

Anything below that contradicts them is stale and should be fixed here, not there.

## 1. What this is

Ben's run through an **accelerated** Frontier Commons Build Bootcamp: four weeks of material in about 36 hours, from Thu 2026-10-15 14:00 to a **hard stop at Fri 2026-10-16 17:30** (UTC+8, `PRD.md` §8). It produces three things:

1. **Portfolio**: a live site with who Ben is, what he's made or learning, and how to reach him. Weeks 1–2.
2. **Clone**: a live, working rebuild of an existing product with at least three features, real data, accounts, and a demo login. Weeks 3–4. The product is OneLook's **Cadgy**, a daily word-tile puzzle (`PRD.md` §4.4).
3. **Two walkthrough videos** (`PRD.md` FR-15, from Justin's new brief): the clone repo (2–3 min) and the portfolio (1–2 min). They replace the reflection video. Claude drafts the scripts in `docs/videos/`, and Ben edits and records them.

Justin, the bootcamp lead, expects Week 3 (the clone) to be the hardest, so it gets the most time.

**Layout:** one repo with two independent Next.js apps.

- `portfolio/`: Bennett's portfolio (Next.js App Router, static, no backend). A light editorial look with Newsreader headings and Geist body text.
- `clone/`: the Cadgy clone (Next.js App Router + Supabase). Migrations are in `clone/supabase/migrations/`.

Each folder deploys as its own Vercel project, using Vercel's Root Directory setting.

**Stack:** Path B only: VS Code, Claude Code, GitHub, Vercel. The clone adds Supabase. No Lovable.

**Links:**
- GitHub (public): https://github.com/bennchristian/FC-Bootcamp
- Portfolio: https://bennett-christian-portfolio.vercel.app (Root Directory `portfolio`)
- Clone: https://fc-bootcamp.vercel.app (Vercel project `fc-bootcamp`, Root Directory `clone`)
- Walkthrough videos (clone, portfolio): TODO, recorded after 17:00 Fri

## 2. How to work on it

- **Course materials** are in `docs/bootcamp/week-{1..4}.md`. They're gitignored and live only on this machine, because the repo is public. BMAD reads `docs/` as project knowledge.
- **Run `npm` commands from inside an app folder**, never at the repo root. The two apps share nothing.
- **Portfolio text** all lives in `portfolio/content/site.json`. Under `npm run dev`, the "Edit text" toggle edits it in place and saves back to that file (`portfolio/README.md`). The live site has no editing.
- **Deploy** happens by pushing to `main`. Vercel's GitHub integration rebuilds whichever project's Root Directory changed. Week 1 says to do the first deploy by hand through the Vercel dashboard import before using any shortcut.
- **BMAD** is installed in `_bmad/`. Its planning runs write into dated folders under `_bmad-output/`. A run's output gets promoted to the root `PRD.md`, `ARCHITECTURE.md` or `DESIGN.md` once that run is final. Never repoint BMAD output at the repo root.
- **Supabase and Vercel dashboard steps belong to Ben** (see `AGENTS.md`). When one is needed, say which page to open and what to set, then wait.

## 3. Gotchas that cost real time

- **Next 16 ships with Cache Components on** (`clone/next.config.ts`). Anything per-request (Supabase reads, `cookies()`, route `params`, `Date.now()`) must sit inside `<Suspense>`, and "today" needs `await connection()` first, or dev shows a "blocking-prerender" error. Read `clone/node_modules/next/dist/docs/` before guessing.
- **Turbopack dev can serve a stale server render** of an edited client component, which shows up as a hydration mismatch. If `curl` of the page doesn't contain the new markup, restart the dev server; the code is fine.

Only observed mistakes belong here: something that actually went wrong, not something that looks like it might.

## 4. Working with Ben

- Ben has used a code editor before. He's on Path B and should stay there.
- Commit and push only when asked.
- Week 1 expects Ben to walk Justin through the files Claude made. When a new file appears, be ready to explain what it's for in one or two plain sentences.
- When something is hard, surprising, or slow, add a dated line to `REFLECTION.md` right then. The video is recorded from those notes.
- Time is the tightest constraint. If a request would cost more than it's worth before the deadline, say so and propose the smaller version.
