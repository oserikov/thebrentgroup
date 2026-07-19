# The Brent Group — website

Vite + React + TypeScript + Tailwind, built to visual parity with the Figma
redesign (see `spec.md` and `PARITY.md`). Three static pages, no router:

- `index.html` — About
- `technology.html` — Technology: LLM Repellents
- `research.html` — Research: Expertise and relevant prior work

## Editing content

All page text — mission copy, person bios, publications, page body text,
the "TODO" placeholders — lives in `/content/*.md`, not in the React code.
Edit the `.md` file, then regenerate:

```
npm run content
```

(`npm run dev` / `npm run build` already do this automatically — you only
need to run it manually if you want to check the output without a full
dev/build cycle.)

File naming: one file per page (`about.md`, `technology.md`, `research.md`),
plus `<page>-<specifics>.md` for anything a page needs more than one of —
e.g. `about-people-roger-brent.md`, `about-publications.md`. Shared/global
strings (site name, contact info) are in `site.md`.

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
