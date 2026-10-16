# Clone walkthrough: script

A draft for Ben to edit, then record. It runs 2:00–3:00 and is for Justin (PRD FR-15).

- **Spoken lines** are the quoted blocks. Everything in them comes from the repo.
- **`[your words: …]`** is a slot for your own opinion. The hint after the colon points to where the fact is, but the opinion is yours to give.
- **[ON SCREEN]** says what to show while you talk.

Live: https://fc-bootcamp.vercel.app · Repo: https://github.com/bennchristian/FC-Bootcamp

---

## 1. Hello (0:00–0:10)

**[ON SCREEN]** A private window on https://fc-bootcamp.vercel.app, signed out.

> Hi Justin. This is my clone of Cadgy, OneLook's daily word puzzle. I'll show it working first, then walk through the repo.

## 2. The demo login (0:10–0:30)

**[ON SCREEN]** Click **Play as guest**. Show the "Past dailies" list with its scores.

> To try it, click "Play as guest". Every click makes a brand-new anonymous account, and a database function gives it a couple of past games, so it's never empty. Since nobody shares an account, one stranger can't break the demo for the next.

## 3. Core feature: playing (0:30–1:00)

**[ON SCREEN]** Open today's puzzle. Tap one tile per column to make a word, then type one and press Enter. Turn on **3D**, then scroll down to the leaderboard.

> The core feature is playing. You pick one tile from each column, or just type. Each word scores ten points, and a tile turns gold once no word left needs it. The 3D button stacks tiles by how many words still use them. Progress saves after every guess, and the leaderboard ranks players by score, then time. Guests stay off it.

## 4. Second feature: creating, and the hard part (1:00–1:45)

**[ON SCREEN]** Go to `/create` and press **✨ Generate puzzle** as you start talking, because it takes 10–15 seconds. Scroll through the words once they fill in. Don't press Create puzzle.

> The second feature is the create form, because the real Cadgy has nothing for users to make. Any player can make a puzzle, and only I, as editor, can make one the daily.
>
> It's also the hard part. Cadgy's editors use a dictionary and word-frequency data to find every word a grid can make, and that's a project of its own. My hand-typed lists missed obvious words like SHARD and SHORE. So now the app lists every string the grid can spell, Gemini picks the 20 most common real words, and the creator checks them. That check matters. Gemini once slipped in CRONT, which isn't a word, and gave it a convincing fake definition.
>
> [your words: what CRONT taught you about trusting AI output. REFLECTION.md, 14:55.]

## 5. Why Cadgy, and what I cut (1:45–2:10)

**[ON SCREEN]** `PRD.md` on GitHub (https://github.com/bennchristian/FC-Bootcamp/blob/main/PRD.md), scrolled to §4.4 "Clone: Cadgy", with the **Cut list** line visible.

> [your words: why you picked Cadgy. REFLECTION.md doesn't record a reason, so give one honest sentence.]
>
> To fit the time, I cut live multiplayer, printing, sharing, Spanish, music, the newsletter, "reveal all words", and editing or deleting puzzles.
>
> [your words: what you'd scope differently. Hint: the archive page was cut at 14:45 because the second-account test hadn't passed yet.]

## 6. The repo (2:10–2:50)

**[ON SCREEN]** The `clone` folder on GitHub (https://github.com/bennchristian/FC-Bootcamp/tree/main/clone). Open each file as you name it.

> Now the repo. It holds two separate apps, and this is the clone.

**[ON SCREEN]** `app/play/[id]/Board.tsx` (https://github.com/bennchristian/FC-Bootcamp/blob/main/clone/app/play/%5Bid%5D/Board.tsx)

> The `app` folder holds the pages: home, play and create. Board is the game you just saw, and Leaderboard sits next to it.

**[ON SCREEN]** `lib/gemini.ts` (https://github.com/bennchristian/FC-Bootcamp/blob/main/clone/lib/gemini.ts)

> In `lib`, `grid.ts` checks whether a word can be built from a grid, and `gemini.ts` calls Gemini. `proxy.ts` keeps you signed in.

**[ON SCREEN]** `supabase/migrations/0001_tables.sql` (https://github.com/bennchristian/FC-Bootcamp/blob/main/clone/supabase/migrations/0001_tables.sql)

> The migrations are the database. There are four tables, and each has rules for who can read and write it. That's why nobody can edit or delete puzzles, and why a guest's puzzles stay private.

## 7. Wrap-up (2:50–3:00)

**[ON SCREEN]** The repo's front page, https://github.com/bennchristian/FC-Bootcamp.

> [your words: one thing you'd tell the next person. Hint: REFLECTION.md, 12:30, about starting the install in the background and doing the dashboard steps meanwhile.]
>
> The code's at github.com/bennchristian/FC-Bootcamp, and the clone's live at fc-bootcamp.vercel.app. Thanks for watching.

---

## Before recording

**Tabs to have open, in order**

1. A private window on https://fc-bootcamp.vercel.app, not signed in yet. You'll use it for sections 1–4.
2. `PRD.md` on GitHub: https://github.com/bennchristian/FC-Bootcamp/blob/main/PRD.md
3. The clone folder: https://github.com/bennchristian/FC-Bootcamp/tree/main/clone
4. Board.tsx: https://github.com/bennchristian/FC-Bootcamp/blob/main/clone/app/play/%5Bid%5D/Board.tsx
5. gemini.ts: https://github.com/bennchristian/FC-Bootcamp/blob/main/clone/lib/gemini.ts
6. 0001_tables.sql: https://github.com/bennchristian/FC-Bootcamp/blob/main/clone/supabase/migrations/0001_tables.sql
7. The repo's front page: https://github.com/bennchristian/FC-Bootcamp

**Test first, in a private window**

- [ ] Click **Play as guest**. You should land signed in as `guest-xxxxxx`, and the home page should show **Past dailies** with a score on at least one of them.
- [ ] Open today's daily as the guest and find a word. The score goes up and survives a refresh.
- [ ] On `/create`, press **✨ Generate puzzle** once. If it says "Gemini is busy", wait a minute and try again, so it works on camera.
- [ ] The demo runs in the guest window, so if **Create puzzle** gets pressed by mistake, that puzzle stays visible only to that guest.

**Done:** the past-dated dailies (2026-10-15 and 2026-10-14) are live, so a guest now gets history.

**Fixed on 2026-10-16** (pushed in `ff33f42` and `ce14d5f`)

- The create form no longer opens with a red "Add at least one word." It shows that only once a word is typed (`clone/app/create/CreateForm.tsx`).
- The timer keeps going if you refresh before your first guess. The first visit saves the start time (`clone/app/play/[id]/Board.tsx`), and the leaderboard leaves out visits with no guesses (`clone/app/play/[id]/Leaderboard.tsx`).
- A guest now sees "Guest games aren't ranked. Sign up to get on the leaderboard." (`clone/app/play/[id]/Leaderboard.tsx`).
- `clone/README.md` lists `GEMINI_API_KEY`.
- The board's placeholder shows one blank per column (`clone/app/play/[id]/Board.tsx`).
