---
title: FC-Bootcamp
status: final
created: 2026-10-15
updated: 2026-10-15
---

# PRD: FC-Bootcamp

## 0. Document purpose

This is the scope contract for Ben's accelerated run through the Frontier Commons Build Bootcamp. Ben (owner) uses it to decide what's in and out, and Claude Code uses it to implement one change at a time.

It builds on Justin's brief to the fellows, the course docs in `docs/bootcamp/` (local only, gitignored) and Justin's reference examples. Terms in §3 are used exactly. Inferred items carry `[ASSUMPTION]` and are indexed in §10. Detail for the build, including the reference quality bar, lives in [`addendum.md`](_bmad-output/planning-artifacts/prds/prd-FC-Bootcamp-2026-10-15/addendum.md), next to this run's decision log (`.memlog.md`).

- **Product behaviour** is FR-8 to FR-10, FR-12 to FR-14, and the product-specific FRs in §4.4. The other FRs are deliverables Ben produces.
- **Repo rules** (stack, security, data, commits) live in `RULES.md`, and roles and gates in `AGENTS.md`. This PRD points to them rather than restating them.
- **§4.4** holds the clone's product requirements (Cadgy), filled on 2026-10-16 from the scope check.

## 1. Vision

Ben is a fellow in the Frontier Commons fellowship. After Gloo, Justin is putting the fellows through an accelerated version of the Build Bootcamp to build technical skill and sharpen product sense. The course is four weeks of material that fellows condense into about two days and roughly 10 hours of work, because they already know much of it.

The run produces three things for Justin: a live **portfolio**, a live working **clone** of an existing product, and two **walkthrough videos**: one of 2–3 minutes on the clone repo and one of 1–2 minutes on the portfolio. Everything is built on Path B: Claude Code, GitHub and Vercel, plus Supabase for the clone.

Done well means that by Fri 2026-10-16 17:30, Justin can see two things in a few minutes. First, that Ben can take a product from breakdown to a working, deployed clone. Second, how Ben thinks about scope, through the product breakdown and scope check he receives. The clone matches Justin's own YouTube clone (real accounts, persisted data, three or more working features) and adds a one-button demo login, which only one of the three reference clones has.

## 2. Target user

### 2.1 Jobs to be done

- **Justin (the only reviewer):** judge quickly whether Ben can ship a working product end to end, and how he scopes it.
- **Ben (the builder):** practise the full Path B loop (prompt, commit, push, redeploy) on two real apps, and show product sense through the product breakdown and the scope check.

### 2.2 Non-users

Recruiters, clients and real end users of the clone. The portfolio is public but not optimised for them in this run. The clone's only users are Justin, through the demo login, and Ben's own test accounts.

### 2.3 Key user journeys

- **UJ-1. Justin reads the portfolio.** On a laptop or phone, he sees who Ben is and something he's made or is learning, and finds how to reach him.
- **UJ-2. Justin tries the clone.** He clicks the demo login, lands in an account that already has content, and uses the core feature, the create form and the third feature, without signing up.
- **UJ-3. Ben's second account uses the clone.** In a different browser, Ben signs up as someone else and creates things. Those things persist and are his, and he can't change what another account made.
- **UJ-4. Justin watches the walkthroughs.** He watches two short videos: the portfolio (1–2 min), and the clone repo (2–3 min) with why Ben picked this product and the hard part that was faked.

## 3. Glossary

- **Portfolio**: Ben's site in `portfolio/`. A Next.js app with no backend, and its own Vercel project.
- **Clone**: the rebuild of an existing product in `clone/`. A Next.js + Supabase app with its own Vercel project.
- **Repo**: the public GitHub repo `FC-Bootcamp`, which holds both apps.
- **Live link**: a public `*.vercel.app` URL that loads in a private window.
- **Product breakdown**: three existing products analysed, one from each course category (big consumer, ministry tools, small and simple). It picks the clone's product.
- **Scope check**: the written plan made before any clone code: the product, three features, the tables, and the hard part with its substitute.
- **Hard part**: the one genuinely hard piece of the cloned product, such as video hosting. It's replaced with something simpler, and the substitution is disclosed.
- **Core feature**: the one feature without which the product stops being that product.
- **Build order**: the course's eight clone steps: scaffold, tables, core feature, accounts, create form, third feature, redeploy after each step, second-account test.
- **Substantial change**: a portfolio change Justin could spot comparing the two versions side by side. A font colour, one photo or spacing doesn't count.
- **Demo login**: one button on the clone that signs a visitor into a demo account with content already in it, with no sign-up.
- **Second-account test**: UJ-3, run on the live link.
- **Cut list**: features left out of the first clone build, from the scope check and the breakdown's skip list.
- **Walkthrough videos**: the two recordings for Justin (FR-15), one on the clone repo (2–3 min) and one on the portfolio (1–2 min).
- **Hand-off**: sending Justin everything in FR-16.

## 4. Features

### 4.1 Portfolio

Realizes UJ-1.

#### FR-1: Portfolio is live with three sections

Ben can share a live link to the portfolio, which has three sections: who Ben is, something he's made or is learning, and how to reach him.

- The first deploy is a manual Vercel dashboard import (Week 1).
- The contact section has at least one working contact method. Ben chose work email, personal email, LinkedIn and GitHub (2026-10-16).

#### FR-2: One change after publishing

Ben makes one change after the portfolio is live. It reaches the live link through an automatic redeploy after the push.

#### FR-3: Five substantial changes

Ben makes five substantial changes, one at a time.

- All five are listed before the first one starts.
- Each is its own commit, pushed and redeployed before the next one starts.

### 4.2 Product breakdown

#### FR-4: Three products broken down

Ben breaks down one product from each course category. For each, he answers the course's six questions in order, counting features rather than pages: what it's for and who it's for, the key features, the screens per feature, what gets stored, the core feature, and the build order including what to skip.

- At least one of the three fits the FR-6 limits: three or four tables and a named substitute for the hard part.
- It's written in Ben's copy of the course's breakdown template. `[ASSUMPTION: the Google Doc template]`

#### FR-5: Clone product picked

Ben picks the clone's product from the breakdown or elsewhere. It isn't YouTube. §4.4 is filled through a `bmad-prd` update before FR-6 starts.

### 4.3 Clone: build

Realizes UJ-2 and UJ-3.

#### FR-6: Scope check and schema before building

Before any clone code exists, Ben writes the scope check and `SCHEMA.md` is filled from it.

- The scope check names the product, the core feature, the create form, the third feature, three or four tables `[ASSUMPTION: including profiles]`, and the hard part with its substitute and why.
- It's written in the course's scope-check template `[ASSUMPTION: a Google Doc]`, and its link goes in the hand-off.
- Both exist before the first `clone:` commit.

#### FR-7: Live from the first step, redeployed every step

The clone is live as an empty Next.js app before it does anything, and it's redeployed after every build-order step.

- There's one commit per build-order step that changes code, so the history reads like the build order.
- Ben's dashboard steps come first: the Supabase project, the second Vercel import, and the environment variables. Keys follow `RULES.md`.

#### FR-8: Accounts

A visitor can sign up, sign in and sign out. `[ASSUMPTION: email and password]`

- A new user can sign in straight after signing up, without waiting on a confirmation email. Ben turns Supabase email confirmation off as a dashboard step.
- Signing up creates the user's `profiles` row.
- Accounts exist before any app code writes to the database.

#### FR-9: Three working features on real data

A signed-in user can use the core feature, the create form and a third feature, all backed by Supabase. The third is usually the one that makes it multi-user, such as comments or bookings. `[ASSUMPTION: accounts don't count as one of the three]`

- The data rules in `RULES.md` hold: nothing is typed into the code, hand-typed rows are deleted once the create form works, and every table has RLS with an explicit policy.

#### FR-10: Data persists and belongs to its creator

Whatever a user creates survives a refresh and closing the browser.

- On the live link, a second account's content appears for that account and persists. It can't edit or delete another account's content, and anything private isn't visible across accounts.
- This holds for every feature, including FR-14.

### 4.4 Clone: Cadgy

Filled on 2026-10-16 from the scope check. Ben chose to write it directly instead of running a full `bmad-prd` update, to save time.

**Product:** a clone of [Cadgy](https://www.onelook.com/cadgy/) by OneLook (Datamuse). It's a daily word-tile puzzle for word-game players: pick one tile per column to spell words, and find every word on the puzzle's list. The footer says it's a bootcamp clone and isn't affiliated with OneLook. Every puzzle is written by Ben or a user, never copied from Cadgy.

**Hard part and substitute:** Cadgy's editors use a dictionary and word-frequency data to find every word a grid can make, and publish a new grid at midnight PT. In this clone, the create form lists every letter string the grid can spell and asks Gemini (free tier) to pick the 20 most common real words, with clues for words 11–20. The creator reviews the list and can edit it or type it by hand, and the form checks that each word can be built from the grid. Daily puzzles are keyed to one time zone (UTC+8). Building a dictionary and frequency ranking would be a project of its own. Ben changed this on 2026-10-16 after finding that hand-typed lists missed common words.

**Eventual goal (not in this run):** generate each daily puzzle automatically, grid and word list included, so a new one appears every day without an editor checking it.

**Cut list:** live multiplayer, the printable version, share, Spanish, music, the newsletter, "reveal all words", and editing or deleting a puzzle.

#### FR-17: Play a puzzle (core feature)

A signed-in player opens a puzzle and builds words by picking one tile per column, either by tapping tiles or by typing.

- A word on the puzzle's list scores 10 points and appears under basic or bonus words. Anything else counts as an invalid guess.
- The clues for bonus words show before those words are found.
- A tile turns gold once no unfound word uses it.
- A 3D toggle stacks each tile one layer per unfound word that still uses it. Ben brought it back from the cut list on 2026-10-16.
- A timer runs from the player's first visit. Finding every word within 3 minutes, or with no invalid guesses, counts as a win.
- Progress survives a refresh and closing the browser (FR-10).

#### FR-18: Create a puzzle (create form)

A signed-in player creates a puzzle. They pick the number of columns and the tiles per column (5×4 by default), fill each tile with 0–3 letters (a blank tile shows as ❤️), and list the words. Each word is marked basic or bonus, and every bonus word needs a clue.

- Every word must be buildable from the grid, and the form names any word that isn't.
- An "Auto-fill words" button fills in the 20 most common words via Gemini: the top 10 as basic words and 11–20 as bonus words with clues. The creator can edit them before saving.
- An editor (Ben) can give a puzzle a daily date. The home page shows the newest daily puzzle dated today or earlier. Everyone else's puzzles are community puzzles.

#### FR-19: Leaderboard and puzzle stats (third feature)

Each puzzle shows its players ranked by score and then by time. Above the ranking it shows the average score, the share of players who found every word, and the median time to finish. Guest accounts are left out.

#### FR-20: Archive and personal stats (the FR-14 extra feature)

**Cut on 2026-10-16 at 14:45** by the §6.2 cut rule (the second-account test hadn't passed yet). What survives is a "Past dailies" list on the home page with your score on each, which FR-12 needs so a guest can see their seeded history.

A player sees every puzzle they've played, with their score and whether they won, plus their totals.

**Demo login pattern (FR-12):** a "Play as guest" button signs the visitor in with a fresh Supabase anonymous account, and a database function gives that account a few past plays. Each visitor starts clean. A puzzle a guest creates is visible only to that guest, and guests never appear on a leaderboard.

### 4.5 Clone: polish

Realizes UJ-2.

#### FR-11: Fix before adding

Ben lists what's half-working from the build. Each item is fixed, or cut and mentioned in the walkthrough video, before FR-12 starts.

#### FR-12: Demo login

A visitor can click one button and land in a demo account with content already in it, with no sign-up.

- It works from a private window on the live link.
- What one visitor does can't leave the next visitor with an empty or broken demo. The pattern is chosen before FR-12 is built (Fri around 10:30). `[ASSUMPTION: default is a fresh, pre-seeded demo account per click, as in the Spotify-style reference; see addendum A]`

#### FR-13: UI pass

The clone handles what a stranger runs into. Each check is done on the live link, on a laptop and on a phone.

- Every empty list shows an instruction or a call to action.
- Every form shows a loading state while it saves and a message when it fails.
- Buttons, spacing and fonts match across screens, compared side by side.
- At 375px there's no horizontal scroll, and every primary action can be reached.

#### FR-14: One extra feature

A user can use one more feature from the cut list. It passes the second-account test (FR-10).

### 4.6 Walkthrough video and hand-off

Realizes UJ-4.

#### FR-15: Walkthrough videos

Changed on 2026-10-16 by Justin's new brief: two videos instead of one. Ben records and narrates both. Claude drafts a script for each from facts in the repo, leaving slots for Ben's own opinions, and Ben edits it before recording (Ben's decision, replacing "checklist, not a script").

**Clone repo walkthrough (2–3 min):**
- the repo: what the main folders and files are for
- about 30 seconds on why this product and what was scoped out
- the hard part, what replaced it, and why

**Portfolio walkthrough (1–2 min):**
- the live portfolio, on a laptop and a phone
- its sections, and the changes made after publishing

Justin can watch it without signing in. `[ASSUMPTION: unlisted YouTube or Loom]`

#### FR-16: Hand-off

By Fri 2026-10-16 17:30, Justin receives:
- the portfolio live link
- the clone live link
- the repo link
- the product breakdown link
- the scope check link
- the demo login instructions
- both walkthrough video links

`[ASSUMPTION: sent through the fellowship Space]`

Before sending:
- Every link opens in a private window.
- Neither app has placeholder text, dead links or template leftovers.
- The portfolio links to the live clone. `[ASSUMPTION]`
- The check command in `RULES.md` passes in both apps.

### 4.7 Cross-cutting

- **Repo rules:** `RULES.md` governs the stack, security, data and commits, including reading the build log and reverting when a deploy breaks by accident.
- **Phone:** both apps meet the FR-13 phone check.
- **Gates:** `AGENTS.md` gates still apply. Claude doesn't start the next block without Ben's go-ahead. The owner decision points are FR-5, FR-6 and FR-12.

## 5. Non-goals

- The Week 4 Claude-artifact prototypes.
- The Week 2 deliberate broken deploy and revert.
- A reflection video. It's deferred because it belongs to the Gloo Hackathon, and the two walkthrough videos (FR-15) are the only videos. `[ASSUMPTION: Justin accepts the walkthrough video in place of the reflection video he asked for]` Adding notes to `REFLECTION.md` is optional.
- Lovable or Path A.
- Libraries beyond Next.js, Supabase, Vercel and what `create-next-app` ships with.
- A YouTube clone.
- A backend for the portfolio.
- A custom domain.
- Deliverables 3 and 4 of the programme (the pitch and Ben's own project).
- `ARCHITECTURE.md` and `DESIGN.md` for this run. This is an explicit exception to the `RULES.md` rule that all eight docs exist before code (§8).

## 6. MVP scope

### 6.1 In scope

- FR-1 to FR-16.
- The product-specific FRs from FR-17 on (§4.4).

### 6.2 Out of scope for MVP

- A second layer of product features beyond FR-14, such as tagging, profiles or playlists. Three features that work beat six that half work.
- Building the hard part for real, unless the scope check finds it cheap.

**Cut triggers** `[ASSUMPTION]`:

| Checkpoint | If it isn't done | What gets cut |
|---|---|---|
| Thu 17:45 | FR-3 | FR-3 stops at the changes already made; the rest move into Friday's buffer if there's time |
| Thu 22:45 | Clone build steps 1–4 | FR-14 |
| Fri 12:00 | Polish | FR-13 shrinks to the phone check |

FR-12, FR-15 and FR-16 are never cut.

## 7. Success metrics

**Primary**
- **SM-1: Hand-off on time.** Justin has every FR-16 item, including the product breakdown and scope check, by Fri 17:30. Validates FR-4, FR-6, FR-15 and FR-16.
- **SM-2: The clone is real.** On the live link, created data survives a refresh and the second-account test passes for every feature. Validates FR-8 to FR-10 and FR-14.
- **SM-3: The demo works for a stranger.** The demo login works in a private window, and a previous visitor's actions don't break it. Validates FR-12.

**Secondary**
- **SM-4: Time on the clone.** Total working time stays around 10 hours, with about 60% on the clone. Validates §8.

**Counter-metrics (do not optimise)**
- **SM-C1: Feature count.** More features beyond three plus one isn't better. It counterbalances SM-2.
- **SM-C2: Portfolio design time.** Time beyond the portfolio's 2.5-hour budget comes out of the clone. It counterbalances SM-4.

## 8. Time budget and schedule

All times are Ben's local time (UTC+8). The hard stop is **Fri 2026-10-16 17:30**, because Ben has a dinner after. Justin's own deadline is Sunday night, so Sunday is buffer, not plan.

**Doc gates (Ben's decision):**
- The portfolio starts on `PRD.md`, `RULES.md` and `AGENTS.md`.
- The clone waits only for the scope check and `SCHEMA.md` (FR-6).
- `ARCHITECTURE.md` and `DESIGN.md` are waived for this run.

**Budget** (the split is confirmed by Ben; the PRD update and schema were added):

| Block | FRs | Time |
|---|---|---|
| Portfolio live with three sections and one change | FR-1, FR-2 | 1 h |
| Five substantial changes | FR-3 | 1.5 h |
| Product breakdown and clone pick | FR-4, FR-5 | 45 min |
| PRD update, scope check, `SCHEMA.md` | FR-5, FR-6 | 45 min |
| Clone build: the build order and second-account test | FR-7 to FR-10 | 4 h |
| Clone polish | FR-11 to FR-14 | 1.5 h |
| Walkthrough video and hand-off | FR-15, FR-16 | 45 min |
| **Total** | | **about 10 h 15 min, with about 6 h 15 min (60%) on the clone** |

**Hour by hour** `[ASSUMPTION: windows inferred from "now, this evening, tomorrow morning and afternoon"]`:

| When | Block |
|---|---|
| Thu 15:15–16:15 | FR-1, FR-2: portfolio scaffold, three sections, Vercel import, one change |
| Thu 16:15–17:45 | FR-3: five substantial changes |
| Thu 17:45–18:30 | FR-4, FR-5: product breakdown and clone pick |
| Thu 18:30–19:30 | Break |
| Thu 19:30–20:15 | `bmad-prd` update (§4.4), scope check, `SCHEMA.md` (FR-6) |
| Thu 20:15–22:45 | Clone build steps 1–4: Ben's dashboard steps, scaffold and deploy, tables with RLS, core feature, accounts |
| Fri 09:00–10:30 | Clone build steps 5–8: create form, third feature, redeploy, second-account test |
| Fri 10:30–12:00 | FR-11 to FR-14: fixes, demo login, UI pass, extra feature |
| Fri 12:00–15:30 | Lunch, then buffer for anything that slipped |
| Fri 15:30–16:15 | FR-15, FR-16: link the clone from the portfolio, record the video, check every link, hand off |
| Fri 16:15–17:30 | Final margin before the hard stop |

**Revised Fri 2026-10-16 12:07 (Ben's decision):** the portfolio hadn't been started. The clone runs first, from about 12:20 to 15:00, and the portfolio gets what's left before 17:30. Cut rule: if the second-account test hasn't passed by 14:45, FR-14 is cut. By 15:15 at the latest, FR-13 shrinks to the phone check.

**Revised Fri 2026-10-16 15:15 (Ben's decision):** the portfolio runs from about 15:25 to 17:00, covering FR-1 to FR-3 and both video scripts, and Ben records the two videos after 17:00. If change 5 of FR-3 hasn't started by 16:40, it shrinks to "no sideways scroll at 375px".

## 9. Open questions

1. ~~Which product is the clone?~~ Resolved 2026-10-16: Cadgy (§4.4).

## 10. Assumptions index

Non-blocking. Ben confirms or corrects them by approving this PRD.

- FR-4: the breakdown goes in a copy of the course's Google Doc template.
- FR-6: the three or four tables include `profiles`.
- FR-6: the scope check uses the course's Google Doc template.
- FR-8: accounts use email and password.
- FR-9: accounts don't count as one of the three features.
- FR-12: the default demo pattern is a fresh, pre-seeded account per click.
- FR-15: the video is hosted as unlisted YouTube or Loom.
- FR-16: the hand-off goes through the fellowship Space.
- FR-16: the portfolio links to the live clone.
- §5: Justin accepts the walkthrough video in place of the reflection video.
- §6.2: the cut triggers.
- §8: the hour-by-hour windows.
- Sources: deliverables were taken from the course docs. The weekly walkthrough videos weren't reviewed.
