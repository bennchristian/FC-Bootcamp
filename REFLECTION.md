# Reflection notes

Raw material for the **one** reflection video at the end of the bootcamp. Add a dated line the moment something is hard, surprising or slow; don't save it for later. This file is public with the repo, so keep it to things you'd say on camera.

## Prompts the video should answer

**Week 1: Get something live**
- What was hard about this process?

**Week 2: Take it apart**
- Which of the five portfolio changes made the biggest difference?
- What was difficult about breaking a product down?

**Week 3: Build it back**
- What cost the most time?
- What would I scope differently if I started again?
- What did I fake (the hard part), what did I do instead, and why?

**Week 4: Polish**
- How did the demo login work, and what did I do about strangers deleting things?
- What did the UI pass change?

**Overall**
- What was it like doing four weeks in about 36 hours?
- What would I tell the next person going through it?

## Log

<!-- Newest at the bottom. Format: YYYY-MM-DD HH:MM · week · note -->

- 2026-10-15 14:00 · setup · Started the accelerated run. Scaffolded the planning docs and installed BMAD before writing any code.
- 2026-10-16 12:10 · W3 · Picked Cadgy (OneLook's daily word-tile game) for the clone. It has nothing users create, so the create form became "players submit puzzles" with me as editor of the dailies. The hard part, finding every word a grid can make with a dictionary, is faked: creators type the word list by hand.
- 2026-10-16 12:30 · W3 · `create-next-app` took 6 minutes, almost all of it `npm install`. Lesson for a tight schedule: start installs in the background and do the dashboard steps in parallel.
- 2026-10-16 13:40 · W3 · Playing my own clone showed the faked hard part was too fake: a hand-typed word list missed obvious words like SHARD and SHORE. Swapped in Gemini (free tier) to pick the 20 most common words from every string the grid can spell. 3D mode came back off the cut list, since it's how Cadgy shows where the remaining words are.
- 2026-10-16 14:55 · W3 · Gemini's word picks aren't fully trustworthy. Asked for the 20 most common real words in a grid, it slipped in CRONT, which isn't a word, and wrote a convincing fake definition for it. That's why the create form says to check the words before saving, and why a human (or a real dictionary) still matters for the "fully automatic daily" goal.
- 2026-10-16 15:25 · W1 · Started the portfolio with two hours left before the hard stop. Kicked off `create-next-app` before anything else this time, and it was done in about a minute while I updated the docs. v1 shipped deliberately plain, so each later change would be easy to see side by side.
- 2026-10-16 16:05 · W2 · Asked for every piece of portfolio text to be editable with a toggle. The portfolio has no backend, so editing works on localhost only: edits save to `content/site.json`, and a commit and push publishes them. Editing on the live site would have needed a backend and a sign-in to keep strangers out.
