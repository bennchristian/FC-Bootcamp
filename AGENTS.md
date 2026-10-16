# AGENTS: who does what

## Roles

| Role | Who | Does | Never does |
|---|---|---|---|
| Owner | Ben | Decides scope and picks the clone. Approves each phase gate. Does the dashboard steps: GitHub repo, Vercel import, Supabase project, keys, env vars. Runs the second-account test. Records the two walkthrough videos and posts in the Space. | — |
| Bootcamp lead | Justin | Sets the deliverables and reviews what's posted in the Space | — |
| AI agent (Claude Code) | — | Scaffolds and implements **one change at a time** against `PRD.md` and `RULES.md`. Explains any file it creates in plain words when asked. Logs reflection-worthy moments in `REFLECTION.md`. | Widens scope, adds a library outside the stack, commits or pushes without being asked, enters keys or passwords into any dashboard, records or scripts Ben's reflection in Ben's voice |

## Brief format for an implementer

Every brief is self-contained and includes:

- the plan file path
- the reading order
- the rules block from `RULES.md`
- the exact findings to address
- the files and functions expected to change
- what must not change
- the check command
- the required final report: per-finding changes, skipped items with reasons, and the check output verbatim

The usual failure is a brief that assumes the implementer shares this conversation's context. The implementer starts cold every time.

## Phase gating

The timeline is compressed: the whole bootcamp runs Thu 2026-10-15 14:00 to a **hard stop at Fri 2026-10-16 17:30** (`PRD.md` §8). Phases run in order, and each one ends with something live.

1. **Plan.** The eight docs exist. `PRD.md`, `ARCHITECTURE.md` and `DESIGN.md` are filled by their BMAD runs.
2. **Portfolio live (W1).** `portfolio/` is deployed with three sections (who Ben is, something made or being learned, how to reach him). It gets one change after publishing.
3. **Portfolio better, and break it down (W2).**
   - Five substantial changes, one commit each.
   - A deliberate broken deploy, read in the build log, then reverted.
   - Three products broken down (in the Google Doc copy), and the clone picked.
4. **Clone built (W3, the biggest share of the time).**
   - The scope check is filled in first.
   - Then the 8-step build order: scaffold, tables, core feature, accounts, create form, third feature, redeploy after each step, second-account test.
5. **Clone polished (W4).** Fix anything half-working, add a demo login, one more feature, and a UI pass on laptop and phone.
6. **Ship.** Record the two walkthrough videos (the clone repo, 2–3 min, and the portfolio, 1–2 min) from Claude's draft scripts. Post the portfolio URL, clone URL, demo login instructions and both videos in the Space.

The agent doesn't move work to the next phase on its own. Ben confirms each gate.

## Handover

End every session by:

- updating `CLAUDE.md` §3 with anything that actually cost time
- appending to `REFLECTION.md`
- listing the open `TODO(owner)` items from the eight documents, grouped by owner

<!-- bmad:context -->
<!-- bmad-project-context manages this block. Run it once the repo has real code to scan;
     it path-checks every claim it writes, so running it against an empty repo produces
     guesses or nothing. Everything above these markers is preserved across its runs. -->
<!-- /bmad:context -->
