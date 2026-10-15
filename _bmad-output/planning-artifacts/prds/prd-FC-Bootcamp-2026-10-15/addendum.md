# Addendum: FC-Bootcamp PRD

Depth that informed the PRD but belongs to the build, `bmad-ux` or `bmad-architecture` rather than the scope contract.

## A. The reference quality bar

Justin shared four portfolios and three clones as examples of finished work. They were surveyed read-only on 2026-10-15.

### Portfolios (four examples)

**What all four have:**
- one page with anchor navigation, a hero with a name and headline, and a bio
- a section for projects or work
- contact details: email in all four, and LinkedIn or GitHub in three
- a clean layout at phone width, with a mobile menu in three of the four
- a distinct visual identity: a theme, a font pairing and a photo

**What none of them has:** a resume link, a contact form, a dark-mode toggle, or case-study-length project write-ups. Even the polished ones give each project one to three sentences.

**What separates the polished ones from the minimal one:**
- **Real project entries with working live links**, instead of "Project One" placeholders and dead `#` links. This is the biggest gap.
- A real photo and a personal voice in the copy.
- More than three sections, such as education, "currently learning" or a dated growth log.
- A fade-in or keyframe animation.
- No leftovers like placeholder alt text, wrong tab titles or broken buttons.

**Candidates for the five substantial changes (FR-3).** These come from the course's own list and this bar. Ben picks the five:
- real project write-ups with working links (the live clone is linked later, at hand-off, per FR-16)
- an intro rewritten in Ben's own voice
- a real photo
- a fixed phone layout
- a new section, such as what he's learning now

### Clones (three examples)

| Product cloned | What a user can do | Hard part | Demo login |
|---|---|---|---|
| YouTube (Justin's own) | browse, watch, like, comment, publish | Video hosting **faked** with YouTube embeds; the grid is partly seeded rows | None |
| Instagram | feed, photo post with caption and location, like, comment, tag users, profiles, search, activity | Image upload done for real | None |
| Spotify-style music sharing | browse and play songs, upload audio, comment, playlists with a public/private toggle | Audio upload to Supabase Storage done for real | **Yes** |

**What all three have:** email and password sign-up and sign-in, data persisted in Supabase rather than hard-coded, four to six things a user can do, and a clean phone layout. Two of the three show public content to signed-out visitors and require sign-in to write.

**What separates the polished ones:** uploads that work end to end, content from several real users in the live database, mobile-native navigation (a bottom tab bar), and a second layer of product features such as tagging, profiles, playlists and privacy toggles.

**Demo login patterns (for FR-12).** The Spotify-style clone's button creates a throwaway account for each visitor, pre-loaded with sample songs, a comment and a playlist. Demo accounts can't upload, and there's an exit-demo button. That design survives a stranger deleting everything, because the next visitor gets a fresh account.

The other common pattern is one shared demo account that's reset or has destructive actions blocked. Which one to use is a build decision, made before the demo login is built (`RULES.md`).

## B. How the course docs were read

The course docs are written for a four-week cohort. These readings were applied where they were ambiguous:

- **"Three features" in Week 3** means the core feature, the create form and a third feature. Accounts are infrastructure and don't count.
- **"One commit per step"** means one per step of the eight-step build order.
- **"One or two new features" in Week 4** means one (FR-14).
- **Course dates** (September to October 4) are stale. The "scope check by Tuesday" gate becomes "before the first `clone:` commit".
- **Videos.** The course asks for a reflection video in Weeks 1 to 3. Justin's brief to the fellows says one reflection video is enough, and Ben has since replaced it with the walkthrough video (FR-15), deferring the reflection video to the Gloo Hackathon.

## C. Known Week 3 blockers (for the build)

From the course, the three most common clone failures:

- **Empty query results with no error:** RLS is blocking because a read policy is missing.
- **Signed in, but no profile:** Supabase created the login but not the `profiles` row. Insert it at sign-up.
- **Works locally, breaks live:** the environment variables were never entered in the Vercel dashboard.
- **Sign-up stalls on an inbox:** Supabase email confirmation is on, so a new account (or a demo account) waits for an email. Turn it off for this run (FR-8).
