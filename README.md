# The Brent Group — website

Vite + React + TypeScript + Tailwind, built to visual parity with the Figma
redesign (see `spec.md` and `PARITY.md`). Three static pages, no router:

- `index.html` — About
- `technology.html` — Technology: LLM Repellents
- `research.html` — Research: Expertise and relevant prior work

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
