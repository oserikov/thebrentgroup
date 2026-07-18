# The Brent Group — Frontend Implementation Spec (v2, Figma redesign)

## Problem

Build a pixel-accurate implementation of the new 3-page Figma design, as a new,
independent project. Ship at `oserikov.github.io/thebrentgroup` (a project page)
for review.

This is unrelated, at the repo and deployment level, to the existing single-page
Jekyll site at `~/thebrentgroup-site` (deployed at `thebrentgroup.github.io`) —
this build does not read from, write to, or deploy to that repo or URL, and
nothing here modifies it. It is noted only as prior art: its body copy is the
source for this site's content (see below), and if this new site is approved,
a *separate, manual, later* decision would be needed on whether/how to point
`thebrentgroup.github.io` at it. That step is out of scope here and nothing in
this spec or pipeline performs it automatically.

Figma source: `https://www.figma.com/design/7f8Tpajeo1QRPjoaewEMqH/Untitled--Copy-`
— 3 top-level frames: `Desktop - 3` (About/home, node `8:61`), `Desktop - 4`
(Technology, node `8:138`), `Desktop - 5` (Research, node `8:173`).

Body copy (mission, People bios, Publications list, Contact line) is identical to
the existing Jekyll site's `index.md` — it does not need to be re-sourced, only
re-laid-out per the new design.

## Stack

- Vite + React + TypeScript + Tailwind CSS.
- Multi-page Vite build: separate HTML entry points (`index.html`,
  `technology.html`, `research.html`), plain `<a href>` navigation — no router
  library, no client-side routing.
- Deploy: GitHub Pages, project-page mode. Vite `base: '/thebrentgroup/'`.
  A GitHub Actions workflow builds and publishes to Pages on push to `main`
  (project pages need a build step, unlike the old Jekyll repo).

## Frames → Pages

| Figma frame | Page | Route |
|---|---|---|
| Desktop - 3 | About (home) | `/` (`index.html`) |
| Desktop - 4 | Technology: LLM Repellents | `/technology.html` |
| Desktop - 5 | Research: Expertise and relevant prior work | `/research.html` |

## Shared layout (every page)

- **Nav bar** — "the brent group" wordmark (links home, except on the home page
  where it's plain text) + `ABOUT / TECHNOLOGY / RESEARCH` links, uppercase,
  Space Grotesk. The current page's own nav item renders as plain (non-link)
  text; the other two are `<a>` links. This pattern is already explicit in the
  Figma export (`about` is a `<p>` on the About page, an `<a>` elsewhere; same
  for the other two labels) — implement generically as "if current route, no
  link."
- **Footer / contact block** — gradient background
  (`rgba(255,255,255,.2) → rgba(134,185,192,.2) via 77.4% → rgba(89,130,93,.2)`,
  top to bottom), centered text: "Contact" (bold) / "oleg Serikov" / linked
  `mailto:srkvoa@gmail.com`.

## Tokens (from Figma; hardcode as Tailwind theme extensions, not literals)

- Background: `#f7f7f7`.
- Heading gradient text: `#195b36` → `#152d70`, left-to-right.
- Body copy: `#000000` (nav, hero subhead), `#393939` (People card bios).
- Card border: `1px solid #000`.
- Fonts: headings — Iosevka Charon, Medium weight, uppercase (user confirmed
  it's on Google Fonts — use that; verify the exact family name Google Fonts
  lists it under, it may differ slightly from "Iosevka Charon"). Body/nav —
  Space Grotesk (Regular / Light / Bold weights used across the design).

## Page: About (/)

- Hero: "Unconventional AI × Bio Countermeasures" (gradient heading) + mission
  paragraph (verbatim from old site's Mission section).
- Pull-quote line about Roger Brent (25+ years, U.S. defense agencies) —
  standalone styled paragraph between hero and People section.
- **People** — 3 cards, bordered, in a row (Roger Brent PI, Oleg Serikov
  Researcher, Dmitrii Volkov Advisor). Bios verbatim from old site. Cards use
  two Figma component variants of differing height (362px / 422px / 302px per
  card, driven by bio text length) — implement as one component, height driven
  by content (no fixed heights).
- **Publications / Document hub** — heading is `PUBLICATIONS / Document hub`
  where "Document hub" is visually de-emphasized (grey, no visible link target
  in the design). Treat as a **visible but non-functional placeholder** for now
  (same treatment as the other TODO markers below) — do not invent a
  destination. Publications list itself: verbatim bullet list from old site,
  each entry with its URL (render as real hyperlinks, not raw text — the URLs
  are already present inline).
- **Contact** footer.

## Page: Technology (/technology.html)

- Hero: "Technology: LLM Repellents".
- "What are LLM Repellents?" heading + body paragraph (verbatim from Figma,
  new copy not present on the old site — this is new content for this page).
- Below that: a **visible TODO placeholder** reading "content from LLM Repellents goes here?" (per user: keep visible, don't omit, don't invent content —
  it's the client's own reminder that more content is coming). Render it
  distinctly (e.g. dashed border, muted color) so it reads as an in-progress
  marker, not a design element.
- Contact footer.

## Page: Research (/research.html)

- Hero: "Research: Expertise and relevant prior work".
- "Volkov, Serikov, and coworkers — expertise and relevant prior work" heading
  + body paragraph (verbatim from Figma; includes one inline link,
  "Volkov et al. (2025)").
- Visible TODO placeholder: "content from relevant prior work goes here? Brent's archives?" — same treatment as the Technology page placeholder.
- Contact footer.

## Responsive

No mobile frame exists in Figma (1440px desktop only). Add a basic reflow
breakpoint (~768px): stack the People cards vertically, shrink hero/nav type
scale so it doesn't overflow. Use judgment — no dedicated mobile design to
match pixel-for-pixel.

## Out of Scope (this pass)

- Org chart (present on old Jekyll site, absent from Figma redesign) — drop it
  unless the user asks to keep it somewhere.
- Real "Document hub" destination/page.
- Real content for the two Russian TODO placeholders — ship them as visible
  placeholders, not real content.
- Custom domain, analytics, forms, CMS.
- Migrating `thebrentgroup.github.io` itself — that happens after review.

## Done Criteria

- [ ] `npm run build` produces static output for 3 pages under `dist/`.
- [ ] Visual diff against the 3 Figma screenshots at 1440px: nav, hero,
      People cards, publications list, footer all match (spacing, color,
      typography) within a reasonable tolerance.
- [ ] All nav links work in both directions (About↔Technology↔Research); the
      current page's own nav item is not a link.
- [ ] Both Russian placeholders render visibly, distinctly styled as TODOs.
- [ ] Mailto link on every page's footer opens to `srkvoa@gmail.com`.
- [ ] At ~768px width, People cards stack and nothing overflows horizontally.
- [ ] GitHub Actions workflow builds and deploys to
      `oserikov.github.io/thebrentgroup` on push to `main`.
