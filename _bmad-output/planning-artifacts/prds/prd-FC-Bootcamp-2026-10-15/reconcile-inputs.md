# Input reconciliation: FC-Bootcamp PRD

Scope: `prd.md` + `addendum.md` checked against inputs A to E. Decisions logged in `.memlog.md` override the inputs and are not reported as gaps (about 8 to 10 working hours, hard stop Fri 2026-10-16 17:30, W4 prototypes out, W2 broken deploy and revert out, walkthrough video replaces the reflection video, W2 broken commit does not count toward the five changes). Course material is paraphrased throughout because the repo is public.

Severity key: high = the PRD contradicts or silently drops something that changes what Ben builds or hands over; medium = a real expectation missing, cheap to add; low = nice to have or covered downstream.

## Gaps by input

### A. Course extract (weeks 1 to 4)

1. **Scope check is written but never shared, and no template is named** (medium).
   - Input: A, Week 3 graded items and cross-week notes. The course treats the scope check as a mandatory document filled in from a template and posted in the Space before any building. The memlog assumption says "posted in the Space before any building".
   - PRD: FR-6 only says the scope check "exists before the first `clone:` commit". It does not say where it lives, which template it uses, or whether Justin sees it. It is also not in the §10 assumptions index.
   - Fix: FR-6 consequence: "filled in the course's scope-check template and posted in the Space (or linked in the hand-off) before the first `clone:` commit." Add it to §10. This shares its fix with B-1.
2. **Supabase account and project creation, and the second Vercel project, are not scheduled** (low).
   - Input: A, Week 3 workflow steps 2 and 3. These are Ben-owned dashboard steps (also in AGENTS.md roles).
   - PRD: §8 Thu 20:05 block jumps straight to "scaffold and deploy". FR-7 only mentions keys.
   - Fix: add a line to the Thu 20:05 row (about 10 to 15 min, Ben) or note in FR-7 that the Supabase project and Vercel import exist before step 1 starts.
3. **Ben must be able to explain every file Claude made** (low).
   - Input: A, Week 1 (Ben walks Justin through the files). Also CLAUDE.md §4.
   - PRD: FR-15 says the video walks through "the portfolio and the clone repo" but not that file-level explanation is the expectation.
   - Fix: FR-15 consequence: the repo walkthrough names what each top-level folder and main file is for.
4. **Breakdown method details dropped** (low).
   - Input: A, Week 2. The six questions are answered in order, before looking at design detail, and count features rather than pages. The course template has two differently linked copies, so "the template" is ambiguous.
   - PRD: FR-4 lists the six questions but not the order, the features-not-pages rule, or which template copy.
   - Fix: one consequence in FR-4: "answered in the course order, features not pages." Leave the template choice to Ben at breakdown time.
5. **Prompt and failure discipline not carried anywhere** (low).
   - Input: A, Week 1 (prompt = context, one change, expected result, guardrails; paste the actual error; after two failed fixes, go back to the last working state) and Week 3 (if the next change cannot be said in one sentence, it is too big).
   - PRD: silent. §4.7 does not point to a process home, and `RULES.md` does not hold them either.
   - Fix: not a PRD requirement. Add a one-line pointer in §4.7 ("working method lives in `AGENTS.md`/`RULES.md`") and put the three habits in `AGENTS.md`.

### B. Justin's brief to the fellows

1. **HIGH. Product sense is a stated aim, but nothing that shows it reaches Justin.**
   - Input: B (technical upskilling and product sense; Justin reviews; he expects to see how fellows scope). A, Week 2 and Week 3 make the breakdown and scope check the vehicles for that.
   - PRD: §2.1 says Ben shows product sense "through the breakdown and the scope check" and §1 says Justin should judge "how he thinks about scope". But FR-16 hands over only portfolio, clone, repo, demo login instructions and video. FR-15's video covers the portfolio, the repo and the hard part only. The breakdown and scope check are produced (FR-4, FR-6) and then not delivered.
   - Fix: either add the breakdown doc and scope check links to FR-16 (cheapest, and consistent with posting the scope check per A-1), or add about 30 seconds on the pick and scope to FR-15, or remove the product-sense claim from §2.1. Pick one and record it.
2. **Reference bar is asserted in §1 but untestable in the FRs** (medium).
   - Input: B (example portfolios and clones). The addendum's survey says the biggest portfolio gap is real project entries with working links, a real photo, a personal voice, and no leftovers (placeholder alt text, wrong tab title, dead links, broken buttons).
   - PRD: §1 claims the work "meets the bar". FR-1 and FR-3 have no consequence for placeholder content or dead links. The portfolio's "something he made" cannot link to the clone until it is live on Friday, and §8 has no step that adds the clone link back to the portfolio.
   - Fix: FR-1 or FR-3 consequence: "no placeholder text, dead links or wrong tab title at hand-off." Add a Fri 15:30 line: "link the live clone from the portfolio" before the FR-16 link check.
3. **Walkthrough videos not reviewed** (medium).
   - Input: B told fellows to go through each week's walkthrough video and doc to learn the expected deliverables.
   - PRD: §0 lists docs, the extract and the reference examples as sources; memlog shows only the docs were extracted. Nothing says the videos were skipped.
   - Fix: add an assumption in §10 ("deliverables taken from the docs; walkthrough videos not reviewed") or an open question for Ben to skim the Week 3 build demo and the Week 4 demo-login material.
4. **Justin's acceptance of the video swap is not recorded** (low).
   - Input: B says one reflection video is enough. Ben's logged decision replaces it with the walkthrough. This is not a challenge to that decision; the gap is that nothing records whether Justin knows or has agreed.
   - Fix: §5 or §10 assumption: "Justin accepts the walkthrough video in place of the reflection video for this run."
5. **Deadline time zone unstated** (low).
   - Input: B and course notes (Justin's deadline is Sunday night; course deadlines use CST).
   - PRD: §1, §8 and SM-1 say Fri 17:30 without a time zone.
   - Fix: write "17:30 local (Ben's time zone)" once in §8.

### C. CLAUDE.md section 1

1. **REFLECTION.md has no home in the PRD after the video swap** (low).
   - Input: C (reflection notes collected as we go in `REFLECTION.md`; video recorded from them). CLAUDE.md §4 and AGENTS.md handover repeat this.
   - PRD: silent on `REFLECTION.md`. §5 defers the reflection video to the Gloo Hackathon but does not say whether notes keep being collected.
   - Fix: one line in §5: "`REFLECTION.md` notes keep accumulating for the deferred reflection video and can feed the walkthrough." Or tell Ben to drop the habit.
2. **One shared repo is not reflected in the hand-off wording** (low).
   - Input: C layout (one repo, two apps, one Vercel project per folder via the Root Directory setting).
   - PRD: FR-15 and FR-16 say "the clone repo" and "the clone's GitHub repo link", but the repo holds both apps. The glossary says "own Vercel project" but not the per-folder Root Directory setting.
   - Fix: reword to "the GitHub repo (the `clone/` folder holds the clone)". Leave the Root Directory detail to `ARCHITECTURE.md`.

### D. AGENTS.md phase gating

1. **Gate confirmations by Ben are dropped** (medium).
   - Input: D (phases run in order; Ben confirms each gate; the agent never advances on its own).
   - PRD: §8 is a time-boxed schedule with no gates. It does not say whether D's gates still apply in the compressed run, or where the owner-decision points fall (FR-5 pick, FR-6 scope check, FR-12 demo-login reset choice).
   - Fix: add one sentence to §8: "Ben confirms each block before the next starts; the decision points are FR-5, FR-6 and FR-12." Or state the gates are waived for this run.
2. **Scripting rule vs the new walkthrough video** (low).
   - Input: D roles table says the agent never records or scripts Ben's reflection in Ben's voice.
   - PRD: FR-15 does not say who writes or speaks the walkthrough. With 45 minutes budgeted and "never cut" status, drafting a script is the obvious shortcut.
   - Fix: FR-15: "Ben records and speaks it himself; Claude may supply a checklist of what to cover." Update `AGENTS.md` wording to say whether it covers the walkthrough.

The Phase 1 "eight docs exist" gate is in E-1 below, where it is highest severity.

### E. RULES.md

1. **HIGH. "Eight context files exist and are current before any implementation" is violated by the schedule without a decision.**
   - Input: E Process rules, first bullet; also D Phase 1 and the global CLAUDE.md scaffolding rule.
   - PRD: §8 starts portfolio scaffolding at Thu 15:15 and budgets no time for `ARCHITECTURE`, `DESIGN`, `SCHEMA`, `SKILLS` or refreshing `RULES`/`AGENTS`. §9 open question 2 only covers the `bmad-architecture` and `bmad-ux` runs and defers the answer. `SCHEMA.md` cannot exist until the clone is picked at about 18:30, and nothing says it is produced before the first `clone:` commit.
   - Fix: record one decision in §8 or §9: which docs gate the portfolio start (probably none beyond `PRD`/`RULES`/`AGENTS`), which gate the clone start (`SCHEMA.md` after FR-5, `ARCHITECTURE.md`, `DESIGN.md` or a stated waiver), and where the time comes from. Add an explicit waiver note if RULES.md is being relaxed for this run.
2. **Fix-by-revert rule for real breakages not carried** (low).
   - Input: E Process rules (when a deploy breaks, read the build log to the file and line, then revert rather than patch forward).
   - PRD: the deliberate broken-deploy exercise is out (logged), so nothing mentions it. The rule still applies to accidental breakage during the build.
   - Fix: one line in §4.7: "accidental deploy failures follow `RULES.md` (read the log, revert)."
3. **Check command is not a PRD-level requirement** (low).
   - Input: E (build and lint must pass before every handover; command still a TODO(agent)).
   - PRD: success metrics only check the live link. Nothing says the build and lint pass before hand-off.
   - Fix: add to FR-16 consequences: "build and lint pass in both apps before hand-off (command per `RULES.md`)."

## Input docs now stale

- `CLAUDE.md` section 1: lists the third output as one reflection video, says "about 36 hours", and gives the deadline as Sat 2026-10-17 02:00 with Thu 14:00 start. Superseded by memlog: deadline Fri 2026-10-16 17:30; 8 to 10 working hours; third output changed to a ~3 minute walkthrough video; reflection video deferred. Also the "Reflection video: TODO" link line, and the `REFLECTION.md` note-taking line in section 4 (pending the C-1 decision).
- `AGENTS.md` Phase gating: the opening timeline sentence (Sat 02:00) is stale. Phase 3 includes the deliberate broken deploy and revert, superseded by "Portfolio OUT: W2 deliberate broken deploy + revert". Phase 6 says record the reflection video, superseded by the walkthrough-video change. The roles table (Owner "records the reflection video") and the handover step ("append to `REFLECTION.md`") follow the same swap.
- `RULES.md`: no content is superseded by a memlog decision. The only issue is the E-1 tension with the schedule, which is a PRD decision to record, not a stale line. The "Week 4" label on the demo login is cosmetic in a compressed run.
- `bootcamp-extract.md` (input A, scratchpad, not in the repo): its header gives the old window (Thu 14:00 to Sat 02:00), and its cross-week notes treat the W4 prototypes, the reflection-video count, the broken-commit ambiguity and the broken-deploy exercise as open or required. All are now resolved by memlog decisions (prototypes out; one walkthrough video; broken commit does not count; broken deploy out).
- Justin's brief (input B, not a file): "by Sunday night" is superseded by the Fri 17:30 deadline; "one reflection video" is superseded by the walkthrough video. See B-4 for recording Justin's acceptance.
