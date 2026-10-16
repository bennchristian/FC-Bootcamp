# Portfolio walkthrough: script

A draft for Ben to edit, then record. It runs 1:00–2:00 and is for Justin (PRD FR-15).

- **Spoken lines** are the quoted blocks. Everything in them comes from the repo.
- **`[your words: …]`** is a slot for your own opinion. The hint after the colon points to where the fact is, but the opinion is yours to give.
- **[ON SCREEN]** says what to show while you talk.

Live: https://bennett-christian-portfolio.vercel.app · Repo: https://github.com/bennchristian/FC-Bootcamp

---

## 1. Hello (0:00–0:10)

**[ON SCREEN]** The live site on your laptop, at the top of the page.

> Hi Justin. This is my portfolio, live on Vercel. It's one page: who I am, what I'm making and learning, and how to reach me.

## 2. The site (0:10–0:40)

**[ON SCREEN]** Scroll slowly from the intro to the bottom. Then show it on your phone, open **Menu** and tap **Contact**.

> Up top is a short intro and a photo. Under "What I'm making" there's the Cadgy clone, with links to play it and read the code. Then two side projects I built with AI: a finance tracker that reads my bank alert emails and sorts them automatically, and a fitness app that interviews you and builds a personal plan. Last is the repo for this whole bootcamp.
>
> "What I'm learning" is a log from my notes this week: scoping before code, taking a product apart, and row-level security. Contact has email, phone, LinkedIn and GitHub.
>
> On a phone, the links fold into a menu, and nothing scrolls sideways.

## 3. How it changed (0:40–1:05)

**[ON SCREEN]** GitHub, the portfolio's commit history: https://github.com/bennchristian/FC-Bootcamp/commits/main/portfolio

> It went live first with three plain sections, then I fixed the tab title. After that, every change was its own commit, and Vercel redeployed after each push: project write-ups with real links, the learning section, the phone layout and menu, the photo, the extra contact details, and my two side projects.
>
> [your words: which change made the biggest difference. Hint: compare the first commit with now; the project links and the photo are the biggest visual jumps.]

## 4. The files (1:05–1:35)

**[ON SCREEN]** VS Code with `portfolio/` expanded. Open each file as you name it.

> `app/page.tsx` stacks the sections in order, and each section is its own file in `app/components`. `layout.tsx` sets the fonts and the tab title.
>
> Every word on the page lives in one file, `content/site.json`.

**[ON SCREEN]** `npm run dev` running. Click **Edit text**, click the intro, and show the dashed outlines. Don't save a change you don't want, or undo it after with `git checkout portfolio/content/site.json`.

> When I run it locally, this toggle lets me edit any text on the page, and it saves straight back to that file. The live site has no backend, so to publish, I commit and push.

## 5. What was hard (1:35–1:50)

**[ON SCREEN]** Back to the live site.

> [your words: what was hard about this process. Hint: you built it in about two hours before a hard stop, right after the clone; REFLECTION.md has the 15:25 and 16:05 notes.]
>
> Thanks for watching. The clone walkthrough is next.

---

## Before recording

**Tabs to have open, in order**

1. https://bennett-christian-portfolio.vercel.app on your laptop, scrolled to the top.
2. The same URL on your phone, or the browser's device mode at 375px.
3. https://github.com/bennchristian/FC-Bootcamp/commits/main/portfolio
4. VS Code with `portfolio/app/page.tsx`, `portfolio/app/components/`, `portfolio/app/layout.tsx` and `portfolio/content/site.json`.
5. A terminal in `portfolio/` running `npm run dev`.

**Check first**

- [ ] The intro is still my plain draft. If you want it in your own words on camera, rewrite it with **Edit text**, then commit `portfolio: intro in my own words` and push before recording.
- [ ] Click the LinkedIn link once. It's the only link that couldn't be checked automatically.
- [ ] Phone number and both emails are on a public page. Keep them only if you're happy for anyone to see them.
