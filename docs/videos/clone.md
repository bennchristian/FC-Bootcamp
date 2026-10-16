# Clone walkthrough: script

A draft for Ben to edit, then record. It runs 2:00–3:00 and is for Justin (PRD FR-15).

- **Spoken lines** are the quoted blocks. Everything in them comes from the repo.
- **`[your words: …]`** is a slot for your own opinion. The hint after the colon points to where the fact is, but the opinion is yours to give.
- **[ON SCREEN]** says what to show while you talk.

Live: https://fc-bootcamp.vercel.app · Repo: https://github.com/bennchristian/FC-Bootcamp

---

## 1. Hello (0:00–0:12)

**[ON SCREEN]** The live home page, https://fc-bootcamp.vercel.app.

> Hi Justin. This is my clone of Cadgy, OneLook's daily word puzzle. You pick one tile from each column to spell words, and try to find them all.

## 2. Why Cadgy, and what I cut (0:12–0:45)

**[ON SCREEN]** `PRD.md` in VS Code, scrolled to §4.4 "Clone: Cadgy", with the **Cut list** line visible.

> [your words: why you picked Cadgy. REFLECTION.md doesn't record a reason, so give one honest sentence on what drew you to it.]
>
> The real Cadgy has nothing for users to create, so I added it. Any player can make a puzzle, and only I, as editor, can make one the daily.
>
> To fit the time, I cut live multiplayer, printing, sharing, Spanish, music, the newsletter, "reveal all words", and editing or deleting puzzles. I also cut an archive page, apart from a "Past dailies" list.
>
> [your words: what you'd scope differently next time. Hint: the archive was cut at 14:45 because the second-account test hadn't passed yet.]

## 3. The repo (0:45–1:30)

**[ON SCREEN]** VS Code with the `clone/` folder expanded in the sidebar. Open each file as you name it.

> The repo holds two separate apps, and this is the clone.

**[ON SCREEN]** `clone/app/page.tsx`

> The `app` folder holds the pages. This one's the home page.

**[ON SCREEN]** `clone/app/play/[id]/Board.tsx`

> Board is the game. You tap tiles or type, tiles turn gold once no word left needs them, and progress saves after every guess. Leaderboard ranks the players.

**[ON SCREEN]** `clone/app/create/CreateForm.tsx`

> This is the create form, and `actions.ts` saves it on the server.

**[ON SCREEN]** `clone/lib/grid.ts`

> In `lib`, `grid.ts` checks whether a word can be built from a grid. `gemini.ts` calls Gemini, and `lib/supabase` plus `proxy.ts` keep you signed in.

**[ON SCREEN]** `clone/supabase/migrations/0001_tables.sql`

> This SQL is the database. There are four tables, and each one has rules for who can read and write it.

## 4. The hard part (1:30–2:15)

**[ON SCREEN]** The live site at `/create`. Press **✨ Generate puzzle** as you start talking, because it takes 10–15 seconds. When the words fill in, scroll through them. Then switch to `clone/lib/gemini.ts`.

> The hard part is the word list. Cadgy's editors use a dictionary and word-frequency data to find every word a grid can make. That's a project of its own.
>
> I started with hand-typed lists, but playing my own puzzle showed I'd missed obvious words like SHARD and SHORE. Now the app lists every string the grid can spell, Gemini picks the 20 most common real words, and the creator checks them before saving.
>
> That check matters. Gemini once slipped in CRONT, which isn't a word, and gave it a convincing fake definition.
>
> [your words: what CRONT taught you about trusting AI output. REFLECTION.md, 14:55.]

## 5. The demo login (2:15–2:45)

**[ON SCREEN]** A private window on https://fc-bootcamp.vercel.app. Click **Play as guest** and show the "Past dailies" scores. Then switch to `clone/supabase/migrations/0002_guest.sql`.

> To try it, click "Play as guest". Every click makes a brand-new anonymous account, and a database function gives it a couple of past games, so it's never empty.
>
> One stranger can't break it for the next, because nobody shares an account. Nobody can edit or delete puzzles, a guest's puzzles are visible only to that guest, and guests stay off the leaderboard.

## 6. Wrap-up (2:45–3:00)

**[ON SCREEN]** The GitHub repo, https://github.com/bennchristian/FC-Bootcamp.

> [your words: one thing you'd tell the next person. Hint: REFLECTION.md, 12:30, about starting the install in the background and doing the dashboard steps meanwhile.]
>
> The code's at github.com/bennchristian/FC-Bootcamp, and the clone's live at fc-bootcamp.vercel.app. Thanks for watching.

---

## Before recording

**Tabs to have open, in order**

1. https://fc-bootcamp.vercel.app, in a normal window where you're signed in.
2. VS Code with these files in tabs: `PRD.md` (at §4.4), `clone/app/page.tsx`, `clone/app/play/[id]/Board.tsx`, `clone/app/create/CreateForm.tsx`, `clone/lib/grid.ts`, `clone/lib/gemini.ts`, `clone/supabase/migrations/0001_tables.sql`, `clone/supabase/migrations/0002_guest.sql`.
3. https://fc-bootcamp.vercel.app/create
4. A private window on https://fc-bootcamp.vercel.app, not signed in yet.
5. https://github.com/bennchristian/FC-Bootcamp

**Test first, in a private window**

- [ ] Click **Play as guest**. You should land signed in as `guest-xxxxxx`, and the home page should show **Past dailies** with a score on at least one of them.
- [ ] Open today's daily as the guest and find a word. The score goes up and survives a refresh.
- [ ] On `/create`, press **✨ Generate puzzle** once. If it says "Gemini is busy", wait a minute and try again, so it works on camera.
- [ ] Don't press **Create puzzle** on camera from your own account, or the puzzle goes up publicly under your name. From the guest window, it stays visible only to that guest.

**Found while drafting (not fixed)**

- **The guest demo is empty right now.** On the live site (checked 2026-10-16), the only daily is dated 2026-10-16, and there's no "Past dailies" section. `seed_guest()` only seeds dailies dated before today (`clone/supabase/migrations/0002_guest.sql:33`), so a guest gets no history, which breaks the "never empty" line in section 5. The smallest fix: as editor, make one or two dailies dated 2026-10-15 and 2026-10-14, then repeat the private-window test.
- **The create form opens with an error.** A fresh form shows "Add at least one word." in red before you've typed anything. This is because `validatePuzzle` runs on the empty list (`clone/app/create/CreateForm.tsx:42`) and the result shows straight away (`clone/app/create/CreateForm.tsx:283`). It'll be on screen in section 4 until Generate finishes.
- **The timer resets if you refresh before your first guess.** The start time is only saved with a guess (`clone/app/play/[id]/Board.tsx:95`), so the timer goes back to 0:00. That's short of PRD FR-17's "timer runs from the player's first visit".
- **The leaderboard says nobody has played when a guest has.** Guests are left out on purpose (`clone/app/play/[id]/Leaderboard.tsx:31`), so a guest who's played still sees "No one has played this grid yet." (`clone/app/play/[id]/Leaderboard.tsx:59`). Justin will see this if he only uses the demo login.
- **The README is missing a key.** `clone/README.md:12` lists only the two Supabase variables, but auto-fill and Generate also need `GEMINI_API_KEY` (`clone/lib/gemini.ts:17`).
- **The board's placeholder is always five blanks** (`clone/app/play/[id]/Board.tsx:237`), even though grids can have 3–7 columns. It's cosmetic.
