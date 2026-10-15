# Skills and agents for FC-Bootcamp

One winner per job. When several installed skills could plausibly handle a task, this table decides. It also names the ones not to pick, since those are what get chosen by mistake.

BMAD 6.12.4 (core + bmm) is installed in this repo: `_bmad/`, with 29 skills in `.claude/skills/bmad-*`. It was installed without the deprecated compatibility shims, so retired names like `bmad-create-prd` or `bmad-quick-dev` don't exist here. BMAD owns the planning path for `PRD.md`, `ARCHITECTURE.md` and `DESIGN.md`. The code-phase winners are `bmad-build` plus the built-ins.

## Routing

| Job | Winner | Not these |
|---|---|---|
| Scaffold or gap-fill the eight docs | `scaffold-project` | `init`, `document-generate` |
| Not sure which BMAD step comes next | `bmad-help` | — |
| Product requirements (create, update, validate) | `bmad-prd` | `bmad-agent-pm`, `bmad-product-brief`, `bmad-prfaq`, `bmad-spec`, `spec`, `office-hours` |
| Architecture | `bmad-architecture` | `bmad-agent-architect`, `bmad-spec`, `design-consultation`, `plan-eng-review` |
| Design system / visual identity | `bmad-ux` | `bmad-agent-ux-designer`, `design-consultation`, `design-html`, `design-shotgun`, `design-and-templates`, `canva` |
| Implement a feature or fix, one at a time | `bmad-build` | `bmad-build-auto`, `bmad-agent-dev`, `ship` |
| Explain what a change or new file is for, before walking Justin through it | `bmad-walkthrough` | `review`, `/code-review` |
| Run or preview an app locally | `run` | `qa`, `qa-only`, `browse`, `open-gstack-browser` |
| Deploy | No skill: push to `main`, and Vercel's GitHub integration redeploys. The first deploy of each app is a manual Vercel dashboard import (Week 1). | `ship`, `land-and-deploy`, `setup-deploy`, `canary` |
| Debug a failure, including a failed Vercel build | `investigate` | `bmad-build`, `qa` |
| Simplify existing code | `/simplify` | `health`, `review` |
| Review a diff (**only when Ben asks**) | `/code-review` or `bmad-review` | `bmad-code-review`, `review`, `plan-eng-review`, `plan-design-review`, `plan-ceo-review` |
| Repo agent instructions (the `AGENTS.md` BMAD block) | `bmad-project-context`, run **last**, once real code exists | `init` |
| Change a BMAD setting | `bmad-customize` (writes to `_bmad/custom/`) | hand-editing `_bmad/config.toml` or `_bmad/config.user.toml` (installer-managed, overwritten on reinstall) |

## Delegating to a subagent

Suggest a subagent; don't auto-delegate. It's worth the cost for broad fan-out search across many files, or for independent tasks that can genuinely run in parallel. For a single known file or symbol, searching directly is faster than briefing an agent.

## Not in scope here

Installed, but not competing for any job in this project:

- **BMAD story and sprint tooling:** `bmad-create-epics-and-stories`, `bmad-sprint-planning`, `bmad-retrospective`, `bmad-correct-course`, `bmad-qa-generate-e2e-tests`. At a 36-hour, two-app scale it's overhead with no payoff. `PRD.md` and the bootcamp's 8-step build order are the plan.
- **BMAD ideation:** `bmad-brainstorming`, `bmad-forge-idea`, `bmad-party-mode`, `bmad-deep-recon`. Picking the clone is Ben's Week 2 breakdown exercise, and the Week 4 prototypes aren't tracked here.
- The social-media and content suite (caption, carousel, reels, LinkedIn, Instagram, etc.)
- The iOS suite (`ios-*`)
- Figma skills (`figma:*`). There's no Figma file for this project.
- gstack deploy and ops (`ship`, `canary`, `land-and-deploy`, `benchmark`)
- `anthropic-skills:ifi-brand`. The portfolio is Ben's personal site, not IFI's.

`bmad-advanced-elicitation` is left out on purpose: other BMAD workflows call it internally.

## Maintaining this file

Re-check it when the installed skill set changes. A row naming a skill that's no longer installed sends the agent after something that isn't there, which is worse than having no table. If a winner loses in practice, change the row rather than routing around it.
