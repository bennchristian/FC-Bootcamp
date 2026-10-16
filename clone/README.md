# Cadgy clone

A bootcamp clone of [OneLook's Cadgy](https://www.onelook.com/cadgy/), built with Next.js and Supabase. Scope and requirements are in the repo root's `PRD.md` §4.4, and the tables are in `SCHEMA.md`.

Run it from this folder:

```bash
npm install
npm run dev
```

It needs `.env.local` with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, plus `GEMINI_API_KEY` for the create form's "✨ Generate puzzle" and "Find words in my grid" buttons. `GEMINI_MODEL` is optional and picks which Gemini model to try first.
