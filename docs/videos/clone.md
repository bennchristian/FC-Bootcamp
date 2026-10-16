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

**[ON SCREEN]** `PRD.md` on GitHub (https://github.com/bennchristian/FC-Bootcamp/blob/main/PRD.md), scrolled to §4.4 "Clone: Cadgy", with the **Cut list** line visible.

> [your words: why you picked Cadgy. REFLECTION.md doesn't record a reason, so give one honest sentence on what drew you to it.]
>
> The real Cadgy has nothing for users to create, so I added it. Any player can make a puzzle, and only I, as editor, can make one the daily.
>
> To fit the time, I cut live multiplayer, printing, sharing, Spanish, music, the newsletter, "reveal all words", and editing or deleting puzzles. I also cut an archive page, apart from a "Past dailies" list.
>
> [your words: what you'd scope differently next time. Hint: the archive was cut at 14:45 because the second-account test hadn't passed yet.]

## 3. The repo (0:45–1:30)

**[ON SCREEN]** The `clone` folder on GitHub (https://github.com/bennchristian/FC-Bootcamp/tree/main/clone). Open each file as you name it; the links are below.

> The repo holds two separate apps, and this is the clone.

**[ON SCREEN]** `clone/app/page.tsx` (https://github.com/bennchristian/FC-Bootcamp/blob/main/clone/app/page.tsx)

> The `app` folder holds the pages. This one's the home page.

**[ON SCREEN]** `clone/app/play/[id]/Board.tsx` (https://github.com/bennchristian/FC-Bootcamp/blob/main/clone/app/play/%5Bid%5D/Board.tsx)

> Board is the game. You tap tiles or type, tiles turn gold once no word left needs them, and progress saves after every guess. Leaderboard ranks the players.

**[ON SCREEN]** `clone/app/create/CreateForm.tsx` (https://github.com/bennchristian/FC-Bootcamp/blob/main/clone/app/create/CreateForm.tsx)

> This is the create form, and `actions.ts` saves it on the server.

**[ON SCREEN]** `clone/lib/grid.ts` (https://github.com/bennchristian/FC-Bootcamp/blob/main/clone/lib/grid.ts)

> In `lib`, `grid.ts` checks whether a word can be built from a grid. `gemini.ts` calls Gemini, and `lib/supabase` plus `proxy.ts` keep you signed in.

**[ON SCREEN]** `clone/supabase/migrations/0001_tables.sql` (https://github.com/bennchristian/FC-Bootcamp/blob/main/clone/supabase/migrations/0001_tables.sql)

> This SQL is the database. There are four tables, and each one has rules for who can read and write it.

## 4. The hard part (1:30–2:15)

**[ON SCREEN]** The live site at `/create`. Press **✨ Generate puzzle** as you start talking, because it takes 10–15 seconds. When the words fill in, scroll through them. Then switch to `clone/lib/gemini.ts` (https://github.com/bennchristian/FC-Bootcamp/blob/main/clone/lib/gemini.ts).

> The hard part is the word list. Cadgy's editors use a dictionary and word-frequency data to find every word a grid can make. That's a project of its own.
>
> I started with hand-typed lists, but playing my own puzzle showed I'd missed obvious words like SHARD and SHORE. Now the app lists every string the grid can spell, Gemini picks the 20 most common real words, and the creator checks them before saving.
>
> That check matters. Gemini once slipped in CRONT, which isn't a word, and gave it a convincing fake definition.
>
> [your words: what CRONT taught you about trusting AI output. REFLECTION.md, 14:55.]

## 5. The demo login (2:15–2:45)

**[ON SCREEN]** A private window on https://fc-bootcamp.vercel.app. Click **Play as guest** and show the "Past dailies" scores. Then switch to `clone/supabase/migrations/0002_guest.sql` (https://github.com/bennchristian/FC-Bootcamp/blob/main/clone/supabase/migrations/0002_guest.sql).

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
2. GitHub tabs for each file in sections 2–5, using the links in the [ON SCREEN] cues.
3. https://fc-bootcamp.vercel.app/create
4. A private window on https://fc-bootcamp.vercel.app, not signed in yet.
5. https://github.com/bennchristian/FC-Bootcamp

**Test first, in a private window**

- [ ] Click **Play as guest**. You should land signed in as `guest-xxxxxx`, and the home page should show **Past dailies** with a score on at least one of them.
- [ ] Open today's daily as the guest and find a word. The score goes up and survives a refresh.
- [ ] On `/create`, press **✨ Generate puzzle** once. If it says "Gemini is busy", wait a minute and try again, so it works on camera.
- [ ] Don't press **Create puzzle** on camera from your own account, or the puzzle goes up publicly under your name. From the guest window, it stays visible only to that guest.

**Done:** the past-dated dailies (2026-10-15 and 2026-10-14) are live, so a guest now gets history.

**Fixed on 2026-10-16** (the create form fix is pushed in `ff33f42`; the rest aren't committed yet)

- The create form no longer opens with a red "Add at least one word." It shows that only once a word is typed (`clone/app/create/CreateForm.tsx`).
- The timer keeps going if you refresh before your first guess. The first visit saves the start time (`clone/app/play/[id]/Board.tsx`), and the leaderboard leaves out visits with no guesses (`clone/app/play/[id]/Leaderboard.tsx`).
- A guest now sees "Guest games aren't ranked. Sign up to get on the leaderboard." (`clone/app/play/[id]/Leaderboard.tsx`).
- `clone/README.md` lists `GEMINI_API_KEY`.
- The board's placeholder shows one blank per column (`clone/app/play/[id]/Board.tsx`).
