# Portfolio walkthrough: script

A draft for Ben to edit, then record. It runs 1:30–2:00 and is for Justin (PRD FR-15). Laptop only, with two browser tabs.

- **Spoken lines** are the quoted blocks. Everything in them comes from the repo.
- **`[your words: …]`** is a slot for your own opinion. The hint after the colon points to the facts, but the opinion is yours.
- **[ON SCREEN]** says what to show while you talk.

Tab 1: https://bennett-christian-portfolio.vercel.app · Tab 2: https://github.com/bennchristian/FC-Bootcamp/tree/main/portfolio

---

## 1. What it is (0:00–0:10)

**[ON SCREEN]** Tab 1, the live site, at the top of the page.

> Hi Justin. This is my portfolio, live on Vercel. It's one page: who I am, what I'm making and learning, and how to reach me.

## 2. The features (0:10–0:45)

**[ON SCREEN]** Scroll slowly down the page. Pause on each section as you name it. At Resume, click **Read my resume** and scroll inside it, then point at **Resume ↓** in the top right.

> Up top is a short intro and a photo. Under "What I'm making" there's the Cadgy clone, with links to play it and read the code. Then two side projects I built with AI: a finance tracker that reads my bank alert emails and sorts them automatically, and a fitness app that interviews you and builds a personal plan.
>
> "What I'm learning" is a log from my notes this week. My resume opens right on the page to scroll through, and this button downloads the PDF. Contact has email, phone, LinkedIn, GitHub and Buy Me a Coffee.
>
> It also works on a phone: the links fold into a menu.

## 3. Why these (0:45–1:05)

**[ON SCREEN]** Scroll back up to the projects.

> [your words: why you chose these sections. Hint: the example portfolios Justin shared all had real projects with working links, a photo and contact details, and the polished ones added an extra section like "what I'm learning". The side projects show what you've built outside the bootcamp, and the resume covers your law and research background.]

## 4. What was hard (1:05–1:20)

**[ON SCREEN]** Stay on the live site.

> [your words: what was hard. Hint: you built it in about two hours before a hard stop, right after the clone, and publishing each change as its own commit meant checking every one before the next.]

## 5. The repo (1:20–1:50)

**[ON SCREEN]** Tab 2, the `portfolio` folder on GitHub. Click into each folder or file as you name it.

> This is the code on GitHub. The portfolio is its own app in this folder, separate from the clone.

**[ON SCREEN]** Click `app`, then `components`.

> `app/page.tsx` stacks the sections in order, and each section is its own file in `components`: the intro, projects, learning, resume, contact and the menu.

**[ON SCREEN]** Go back and click `content`, then `site.json`.

> Every word on the page lives in this one file, so changing the text never means touching the layout. Running locally, there's an edit toggle that saves straight into it.

**[ON SCREEN]** Go back and click **Commits** (or the clock icon) to show the history.

> Every change was its own commit, and Vercel redeployed the site after each push.
>
> Thanks for watching. The clone walkthrough is next.

---

## Before recording

- [ ] Open both tabs above, on your laptop, and close anything else.
- [ ] The intro is still my plain draft. If you want it in your own words on camera, tell me the words first and I'll push them.
- [ ] Click the LinkedIn link once. It's the only link that couldn't be checked automatically.
