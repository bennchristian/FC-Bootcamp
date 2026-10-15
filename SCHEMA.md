<!-- scaffold-project:stub -->
# SCHEMA: FC-Bootcamp

**No database exists yet.** This file stays a stub until the clone is chosen (after the Week 2 breakdown), scoped (Week 3 scope check), and its tables are created in Supabase.

What's already decided:

- **`portfolio/`** has no database. Its content is static and lives in the app's source.
- **`clone/`** will use Supabase (Postgres, Auth, and Storage only if needed). The bootcamp caps it at **three or four tables**. Needing more means the scope is wrong, not the schema.

## Entity overview

TODO(Ben + agent): ERD once the clone's scope check names its tables. Most clones need a `profiles` table keyed to `auth.users`, one table for the core thing users create, and one for the multi-user feature (comments, replies, bookings, messages).

## Tables

TODO(Ben + agent): one subsection per table: columns, types, nullability, foreign keys, and who writes each row.

## Off-store state

| What | Where | Notes |
|---|---|---|
| Supabase project URL and keys | `clone/.env.local` (gitignored), **and** the clone's Vercel project env vars | Exact variable names: TODO when `clone/` is scaffolded. Ben adds them to Vercel in the dashboard. |
| Vercel projects | Two projects from this one repo: Root Directory `portfolio` and Root Directory `clone` | Project names and URLs: TODO, recorded in `CLAUDE.md` §1 once they exist. |
| Supabase Storage bucket | Only if the clone uploads files | TODO: name and policies, if needed. |
| Demo login account (Week 4) | A real Supabase Auth user plus its seeded rows | TODO: how it's reset or protected so a stranger can't wipe it. |

State outside the database (caches, properties, environment, external services) doesn't show up in a schema dump. It's the part people forget when they reason about what a change touches.

## Access control (Row Level Security)

TODO(agent): one policy block per table, written alongside the table.

Access rules are the security boundary, not a convenience layer. Every table a client can reach needs an explicit policy. In Postgres, a table with RLS enabled and no policy denies everything, and a table without RLS grants everything. Both fail silently. The bootcamp warns about the first one specifically: a query that returns **empty results with no error** usually means the table is locked, not that the query is wrong.

## Migrations

TODO(agent): where migrations live (SQL saved in `clone/supabase/` vs. the Supabase dashboard SQL editor). Decide once `clone/` exists.

Once a migration has been applied to any shared environment, it's append-only. To change an applied migration, write a new one that corrects it.

## Keeping this true

This file describes what exists. When it disagrees with the migrations, the migrations are right and this file is stale. Regenerate the affected section rather than reconciling by hand.
