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

**v3 addendum (post-grant cleanup):** the grant cycle this content was
written for has closed. This pass restores select substantial content from
the old Jekyll site that's worth keeping long-term (Roger's credibility
narrative, folded into a renamed page — "Team" in v3, further renamed
"Credibility" in v6, see below; the interactive LLM-repellents demo, as its
own page) while permanently dropping grant-cycle boilerplate (org chart,
budget/compensation/CV redirects, charity-status page). The restored pieces
have no Figma frame backing them — built by reusing this site's
already-established patterns rather than opening a new design phase.
See "Page: Credibility" and "Page: Demo" below for what changed and why.

## Stack

- Vite + React + TypeScript + Tailwind CSS.
- Multi-page Vite build: separate HTML entry points (`index.html`,
  `technology.html`, `credibility.html` — v3 renamed from `research.html` to
  `team.html`, v6 renamed again to `credibility.html`,
  `messages-to-the-future.html` — v5), plain `<a href>` navigation — no
  router library, no client-side routing. The LLM Repellents demo is a
  component, not its own entry point.
- Deploy: GitHub Pages, project-page mode. Vite `base: '/thebrentgroup/'`.
  A GitHub Actions workflow builds and publishes to Pages on push to `main`
  (project pages need a build step, unlike the old Jekyll repo).

## Frames → Pages

| Figma frame | Page | Route |
|---|---|---|
| Desktop - 3 | About (home) | `/` (`index.html`) |
| Desktop - 4 | Technology: LLM Repellents | `/technology.html` |
| Desktop - 5 | Credibility (formerly "Research: Expertise and relevant prior work", then "Team") | `/credibility.html` |

The LLM Repellents demo (v3) is not its own page/route — it's a component
embedded on the Technology page. See "Demo" below.

## Shared layout (every page)

- **Nav bar** — "the brent group" wordmark (links home, except on the home page
  where it's plain text) + `ABOUT / TECHNOLOGY / CREDIBILITY` links, uppercase,
  Space Grotesk (v3: third label renamed `RESEARCH` → `TEAM`; v6: renamed again
  `TEAM` → `CREDIBILITY`, pointing at `/credibility.html`). The current page's
  own nav item renders as plain (non-link) text; the others are `<a>` links.
  This pattern is already explicit in the Figma export (`about` is a `<p>` on
  the About page, an `<a>` elsewhere; same for the other labels) — implement
  generically as "if current route, no link."
- **v6: TECHNOLOGY is a hover dropdown**, not a plain link. It still links
  directly to `/technology.html` when clicked (or renders as plain text when
  already on a page in this group), but hovering reveals two options:
  "LLM Repellents" (`/technology.html`) and "Messages to the Future"
  (`/messages-to-the-future.html`). Both the Technology page and the Messages
  to the Future page count as "active" for this nav item (`Nav`'s `current`
  prop gained a `"messages-to-future"` value alongside `"technology"`, both
  of which suppress the TECHNOLOGY link and keep the dropdown working via
  hover regardless). Hover-only; no dedicated touch/tap alternative — out of
  scope for this pass, same as the rest of the site's desktop-first
  responsive posture.
  Styling: no border, no background, no card — just small-caps text
  (`lowercase` + `font-variant: small-caps`), left-aligned under the
  "TECHNOLOGY" word, one size step down (14px mobile / 15px desktop — first
  pass shipped 13px, bumped to 14px as too small). Below the `lg:` breakpoint
  the two options sit side by side (`flex-row`) rather than stacked
  (`flex-col`, used at `lg:` and up) — stacked vertically on a narrow
  viewport pushed the dropdown down far enough to overlap the hero title
  text directly below the nav.
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
- **Publications / Document hub — v7, now a real functioning tab toggle**
  (revised from the original "visible but non-functional placeholder" call).
  Heading is `PUBLICATIONS / Document hub`, click either label to switch the
  list below; the inactive label is grey (`#aeb6b0`), the active one black.
  Defaults to Publications. Both lists render each entry as a real hyperlink
  on the citation/label text itself — not raw URL text printed after the
  citation (the original implementation's link markdown put the bare URL
  right after the title as a second, separate link; fixed to make the title
  itself the link, one link per entry).
  - **Publications** list: same 9 citations as before, now with the title
    (not the trailing URL) as the link text. One entry (Brent & McKelvey
    2025) has no URL in the source and stays unlinked — no invented link.
  - **Document hub** list: real content, pasted verbatim from the old
    Jekyll site's homepage (the SFF rolling-application link list — 10
    numbered entries: long-form attachment, org site, org chart, charity
    status, budgets, compensation, 3 links of interest). These are outbound
    links to pages still live on `thebrentgroup.github.io` (the old site) —
    not new pages built in this repo. Rendered as an ordered list (new
    `.md-content ol` CSS rule; only `ul` existed before).
  - Fixed a pre-existing bug while touching this: the citation/list body
    text was inheriting `uppercase` from the section wrapper (applied for
    the `PUBLICATIONS / Document hub` heading), rendering the entire
    citation list in full caps. Added `normal-case` to the body content div
    to override it — no other page's body content had this problem since
    none of them wrapped body content in an `uppercase` section.
- **Contact** footer.

## Page: Technology (/technology.html)

- Hero: "Technology: LLM Repellents".
- "What are LLM Repellents?" heading + body paragraph (verbatim from Figma,
  new copy not present on the old site — this is new content for this page).
- **v4**: the TODO placeholder ("content from LLM Repellents goes here?")
  is removed — no longer a placeholder page, dropped along with
  `content/technology-todo.md` and the now-unused `<TodoPlaceholder>`
  component (no other page used it after the Team page's placeholder was
  replaced with Roger's content in v3).
- The LLM Repellents demo (see "Demo" below) is embedded directly on this
  page, below the "What are LLM Repellents?" body copy — not a separate
  route. Rendered in a wider inner container (`max-w-[1280px]`) than the
  surrounding prose column (`max-w-[700px]`), since the two-pane widget
  needs more room than a text column to stay legible.
- Contact footer.

## Page: Credibility (/credibility.html) — v6, renamed again from "Team"

Renamed "Research" → "Team" in v3, then "Team" → "Credibility" in v6 (file
`team.html` → `credibility.html`; nav label, hero, and page title all follow).
No new Figma frame backs any of these renames or the added section — it
reuses the existing page's layout/typography verbatim (heading +
body-paragraph pattern already established on this page and on Technology).
Per user: "reuse existing patterns" rather than open a new Figma design
phase for this.

- Hero: "Credibility".
- **First section — Roger's credibility** (restored from the old Jekyll
  site's `evidence-for-biosecurity-risk.md`, full prose, condensed
  references): heading + all 4 paragraphs (DARPA/biosecurity advisory
  history; Brent 2005 threat-model paper; Brent/McKelvey/Matheny 2024
  Foreign Affairs piece + Brent/McKelvey 2025 arXiv piece; LLM Repellents
  origin story; Williams et al. 2026 RAND risk-scoring work). Citations
  inline as hyperlinks (matching the rest of the site) — **no separate
  References/bibliography block**, drop the old page's formal reference
  list.
- **Second section — existing content**: "Volkov, Serikov, and coworkers —
  credibility for technical execution" heading (reworded from "expertise
  and relevant prior work" to match the page's new "Credibility" framing) +
  body paragraph, otherwise unchanged. Its inline-link citation style also
  loses no content — it never had a References block to drop.
- Drop the "content from relevant prior work goes here? Brent's archives?"
  TODO placeholder — real content (Roger's section) now fills that slot.
- Contact footer.

## Demo (embedded on Technology page) — v3, revised

Restored from the old Jekyll site's `/llm-repellents-example/` (the
canary-vs-original PDF comparison widget). **Not a separate page** (revised
from the original v3 plan, which gave it its own `/demo.html` route) — it
lives directly on the Technology page as a `<RepellentsDemo>` component,
below the "What are LLM Repellents?" body copy. No Figma frame — the demo is its own
pre-existing, self-contained HTML/CSS/JS widget (dark terminal-style compare
panes, draggable split, paper-tab switcher); port it close to verbatim
rather than redesigning it to match the Figma visual language, since it's a
functional artifact, not a brand surface.

- Intro copy ported from the old page: "The demo" heading, the RAND-context
  paragraph (full width), and the two per-panel paragraphs (dual-use-knowledge
  / repellent-embedding) each paired with their panel below.
- **Layout (v3, revised again)**: on reasonably wide screens (`lg:`, ≥1024px)
  the two panels sit in a 2-column grid — left column is the "Today,
  dual-use..." paragraph + the blue "Before/original" panel, right column is
  the "After we embed..." paragraph + the orange/red "After/repelled" panel,
  both open by default. On narrower screens the layout stays single-column
  (same stacking order as the grid's DOM order), but each panel is **folded
  behind its toggle button by default** — collapsed until clicked, rather
  than dumping two full PDF+terminal panels unasked onto a small screen. A
  panel the user has manually toggled stays as they left it across any
  further breakpoint changes (tracked via a `data-user-toggled` flag so a
  window resize doesn't fight a deliberate click).
- The interactive widget itself: two panes, each with a paper-tab switcher (9
  papers), an embedded PDF iframe, and a mock terminal pane showing an AI
  agent's response (helpful vs. refused), draggable split between PDF and
  terminal. Ported the existing inline `<style>`/`<script>` largely as-is,
  as a `dangerouslySetInnerHTML` widget (one per panel) with a React
  `useEffect` driving the DOM logic (tab population, split-drag, panel
  toggle, responsive fold/reveal).
- **Split-pane sizing**: the split defaults to an even 50/50 between the PDF
  pane and the terminal pane (not "give the terminal its full natural height
  and let the PDF pane take whatever's left, clamped to a min"). The
  original approach starved the PDF pane down to its 80px floor on shorter
  viewports/narrower containers — caught during local review after the
  embed narrowed the widget's available space. Drag clamps to a symmetric
  80px minimum on both sides.
- **PDF assets**: copy all 17 PDFs (9 originals + 9 "canary"/repelled
  versions) from the old repo's `repellents-effect-example/papers/` into
  this repo's `public/demo/papers/{original,canary}/` — self-contained, no
  dependency on the old site staying up.
- References: keep the widget's existing 2-item reference list
  (Williams et al. 2026; Barkan et al. in prep) as-is — this is the one
  place on the site that keeps a formal references block, because it's part
  of the ported widget rather than new site prose.

## Page: Messages to the Future (/messages-to-the-future.html) — v5, new

Second of the two pillars named on the About page ("Our pillars are
[LLM Repellents](...), and [Messages to the Future](...)") — content already
existed in `content/messages-to-the-future.md` (background + proposed-work
prose with inline-linked citations, three `## `-level subsections rendered
straight from markdown) but had no page to render it. No Figma frame — same
"reuse existing patterns" treatment as Team's added section: heading + body
column, same width/typography as Technology and Team.

- **Not in the top nav** — same pattern as the embedded Demo: reachable only
  via the About page's pillars sentence. `<Nav>` renders with no `current`
  page set, so none of the three nav items falsely highlight as active (this
  is genuinely a fourth, separate page, unlike the Demo which folded into an
  existing page). `current` on `<Nav>` is now optional for this reason.
- Hero: "Technology:" / "Messages to the Future" — two lines, same pattern
  as the Technology page's "Technology:" / "LLM Repellents" hero. Both pages
  are deliberately branded as parallel Technology pillars (per the About
  page's "Our pillars are LLM Repellents, and Messages to the Future"); an
  earlier pass dropped the `"Technology:"` prefix here on the theory that two
  pages sharing the word was an accidental collision — wrong call, reverted.
  The shared branding is the point: these are two peer pillars under one
  umbrella, not two competing "Technology" pages.
- Body markdown includes real `## ` subheadings (Background / Proposed work
  / Proposed liaison...) — added `.md-content h2` styling (20px Space
  Grotesk medium) since no prior page's content used in-body headings.

## Responsive

No mobile frame exists in Figma (1440px desktop only). Add a basic reflow
breakpoint (~768px): stack the People cards vertically, shrink hero/nav type
scale so it doesn't overflow. Use judgment — no dedicated mobile design to
match pixel-for-pixel.

## Out of Scope (this pass)

- Org chart (present on old Jekyll site, absent from Figma redesign) — drop it
  unless the user asks to keep it somewhere.
- Real "Document hub" destination/page.
- Custom domain, analytics, forms, CMS.
- Migrating `thebrentgroup.github.io` itself — that happens after review.
- **v3, explicitly dropped as grant-cycle boilerplate** (per user: "the grant
  time has passed"), not restored anywhere on the new site:
  - Budget/compensation/long-form redirect pages (`/ambitious-budget/`,
    `/base-budget/`, `/compensation/`, `/sff-long-form/`) and their linked
    Google Docs.
  - CV redirect pages (`/pi-cv/`, `/PI-CV/`) and the CV PDF asset.
  - Palisade Research Inc. charity-status page (`/palisade-charity-status/`)
    and its IRS-confirmation screenshot asset.
  - The homepage's "Document hub" link list (grant-submission checklist).
- About page's People section stays as-is (short bio cards) — no dedup with
  the Credibility page content; different altitude (quick intro vs. deep
  dive), some redundancy accepted.
- The old site's formal References/bibliography blocks are **not** restored
  as a site-wide pattern — only the embedded Demo keeps one (it's part of
  the ported widget, not new prose). Roger's restored credibility section
  and the Credibility page's second section both use inline-link citations.

## Done Criteria

- [ ] `npm run build` produces static output for 4 pages under `dist/`
      (`index.html`, `technology.html`, `credibility.html`,
      `messages-to-the-future.html`).
- [ ] The About page's "Messages to the Future" link resolves and the page
      renders with no nav item falsely highlighted as active.
- [ ] Visual diff against the 3 Figma screenshots at 1440px: nav, hero,
      People cards, publications list, footer all match (spacing, color,
      typography) within a reasonable tolerance. (Credibility's Roger
      section and the embedded Demo have no Figma frame to diff against —
      judged by consistency with the rest of the site instead.)
- [ ] All nav links work in both directions (About↔Technology↔Credibility);
      the current page's own nav item is not a link. The TECHNOLOGY nav item
      reveals a hover dropdown (LLM Repellents / Messages to the Future) and
      still functions as a direct link to `/technology.html` when clicked.
- [ ] Neither page has a TODO placeholder left (v4: Technology's dropped;
      Credibility's was replaced by Roger's restored content back in v3). No
      leftover references to `TodoPlaceholder` or `*-todo.md` files.
- [ ] Mailto link on every page's footer opens to `srkvoa@gmail.com`.
- [ ] At ~768px width, People cards stack and nothing overflows horizontally.
- [ ] Demo (on the Technology page): both compare panes load their PDFs from
      local `public/demo/papers/`, the paper-tab switcher and draggable
      split both work, the split defaults to an even 50/50 (not a
      near-collapsed pane on either side), and the page doesn't depend on
      `thebrentgroup.github.io` staying up.
- [ ] At ≥1024px width, the two demo panels render as a 2-column grid (blue
      panel + its paragraph on the left, red panel + its paragraph on the
      right), both open by default. Below that width they stack in the same
      order, each folded behind a "Show" button until clicked.
- [ ] No leftover references anywhere on the site to dropped pages (org
      chart, budget/compensation/CV redirects, charity status).
- [ ] GitHub Actions workflow builds and deploys to
      `oserikov.github.io/thebrentgroup` on push to `main`.
