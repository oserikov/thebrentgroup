# The Brent Group — website

Vite + React + TypeScript + Tailwind, built to visual parity with the Figma
redesign (see `spec.md` and `PARITY.md`). Four static pages, no router:

- `index.html` — About
- `technology.html` — Technology: LLM Repellents (also embeds the
  `<RepellentsDemo>` component — interactive demo, no Figma frame)
- `credibility.html` — Credibility (formerly "Research", then "Team";
  renamed post-grant, see spec.md v3/v6)
- `messages-to-the-future.html` — Technology: Messages to the Future (no
  Figma frame; linked from About's pillars sentence and from a hover
  dropdown on the nav's TECHNOLOGY item, not itself a top-level nav item)

## Editing content

All page text — mission copy, person bios, publications, page body text —
lives in `/content/*.md`, not in the React code. Edit the `.md` file, then
regenerate:

```
npm run content
```

(`npm run dev` / `npm run build` already do this automatically — you only
need to run it manually if you want to check the output without a full
dev/build cycle.)

File naming: one file per page (`about.md`, `technology.md`, `credibility.md`,
`messages-to-the-future.md`), plus `<page>-<specifics>.md` for anything a
page needs more than one of — e.g. `about-people-roger-brent.md`,
`about-publications.md`, `credibility-roger.md`. Shared/global strings
(site name, contact info) are in `site.md`. The demo's copy is inline in
`src/components/RepellentsDemo.tsx`, not in `/content` — it's a ported
widget with structural HTML, not prose.

Frontmatter (YAML between `---` lines) holds structured fields — headings,
names, roles. The markdown body below the frontmatter is prose and supports
normal markdown: `[link text](url)` for links, blank lines for separate
paragraphs. `scripts/build-content.mjs` converts all of this into
`src/content.generated.ts` (gitignored, rebuilt from the `.md` files every
time — never edit it directly). External links (`https://…`) automatically
get `target="_blank"`; internal links (like `/thebrentgroup/technology.html`)
don't.

## Develop

```
npm install
npm run dev
```

## Build

```
npm run build   # outputs to dist/
npm run preview # serve the built output locally
```

Deploys to GitHub Pages via `.github/workflows/deploy.yml` on push to `main`
(project page at `oserikov.github.io/thebrentgroup`, `base: '/thebrentgroup/'`
in `vite.config.ts`).
