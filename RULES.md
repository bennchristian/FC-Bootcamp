# RULES: coding and implementation

## Principles

1. **SOLID.** One responsibility per file and per function. Depend on small named helpers, not on incidental structure that can shift underneath you.
2. **DRY at 4.** Extract a shared helper only when the same logic appears 4 or more times. Below that, repetition is fine and clearer. The wrong abstraction couples callers that had no reason to be coupled, and it costs more to unwind than the duplication cost to tolerate.
3. **KISS.** A new function does one thing in the simplest way that passes the check. No options objects, no abstractions "for later", no configuration that nothing reads.

## Stack rules

The bootcamp fixes the stack: **Next.js, Supabase, Vercel, and Claude Code**, with no substitutions.

- Both apps are Next.js with the **App Router**, and each one lives in its own folder (`portfolio/`, `clone/`) with its own `package.json`. Neither imports from the other.
- Supabase is used **only in `clone/`**. The portfolio has no backend.
- Both apps deploy through Vercel's GitHub integration, one Vercel project per folder.
- **No library beyond the stack without Ben's OK**, however much it looks like it would help. Every extra dependency is one more thing that can break. Whatever `create-next-app` ships by default is fine.
- **Supabase clients in `clone/`:** `lib/supabase/server.ts` for Server Components and server actions (a new client per request), `lib/supabase/client.ts` for Client Components, and `proxy.ts` to refresh the session on every request. Get the signed-in player with `getCurrentPlayer()` from `lib/player.ts`.
- **Writes go through RLS as the player.** No Supabase secret key exists in either app. Multi-row writes that must succeed together go through a `security invoker` SQL function (for example `create_puzzle`).
- **Other secrets stay server-only.** `GEMINI_API_KEY` is read only in `lib/gemini.ts`, which is imported only from server actions. Nothing secret gets a `NEXT_PUBLIC_` prefix.

## Security rules

- **Never commit `.env*`.** Keys live in `.env.local` on Ben's machine and in the Vercel dashboard. Ben enters them in the dashboard; the agent never does.
- **Every Supabase table gets RLS enabled plus an explicit policy** in the same change that creates it. See `SCHEMA.md`.
- **Create the `profiles` row on signup.** Supabase creates the auth user but not the app's profile row, so the app (or a database trigger) has to insert it.
- **The demo login (Week 4) can't destroy shared data.** Decide how it's reset or limited *before* building it.
- `docs/bootcamp/` holds course materials and is gitignored. Don't move it, quote it at length, or commit it. This repo is public.

## Data rules

- **Nothing in the clone is typed into the code.** Content comes from the database. Hand-typed rows in Supabase are fine during build step 3, and get deleted once the create form works.
- **It survives a refresh.** Close the browser, come back, and it's still there.
- **A second account sees its own things.** A feature isn't done until it's been checked as a second user in a different browser.

Column and field contracts in `SCHEMA.md` are fixed. Add fields at the end, and update `SCHEMA.md` in the same change.

## Process rules

- Before any implementation, the eight context files exist and are current: CLAUDE, AGENTS, ARCHITECTURE, DESIGN, PRD, RULES, SCHEMA, SKILLS.
- `PRD.md` is the scope contract. Work outside it stops and asks rather than widening.
- **One change per commit**, with a message that says what it did, prefixed with the app it touches: `portfolio: add projects section`, `clone: comments table and RLS`. The history should read like the build order.
- **Push after each change and confirm Vercel redeployed** before starting the next one.
- **When a deploy breaks, read the Vercel build log to the file and line, then revert** rather than patching forward.
- **Check command**, run inside each app folder: `npm run lint && npm run build`. It must pass before every push and every handover.
- Keep an explicit resolved/unresolved list when auditing. Never imply a pass fixed more than it did.

## Prefer enforcement over prose

A rule that a linter, formatter, type checker, or CI check can enforce belongs there instead of here. Rules in this file are followed by hand every time; a check fails the build once and is never forgotten. When a rule above becomes mechanically enforced, delete it from this file.
