# Visual Parity Report

Comparisons made at 1440×viewport (Figma design width) using Playwright
screenshots of the built app (`vite preview`) against Figma `get_screenshot`
reference renders. Also checked at 768px for the mobile reflow requirement
(no Figma frame exists at that width; judged by absence of horizontal
overflow and sane stacking).

## About (`/`) — Figma node `8:61`

- Reference: `.parity/ref-about.png`
- App: `.parity/app-about.png`
- **Verdict: match.**
- Notes: nav, hero gradient heading, mission paragraph, pull-quote, People
  cards (now correctly varying height per bio length instead of
  stretch-equalized), Publications list with real hyperlinks, "Document hub"
  de-emphasized grey non-link text, footer gradient + contact — all present
  and spatially consistent with the reference. Minor deviation: horizontal
  margins simplified to symmetric `px-20` (80px) rather than the design's
  slightly asymmetric 80px/103px nav margins — visually indistinguishable at
  a glance and treated as design tolerance, not a real token.

## Technology (`/technology.html`) — Figma node `8:138`

- Reference: `.parity/ref-technology.png`
- App: `.parity/app-technology.png`
- **Verdict: match.**
- Notes: hero heading corrected from an initial guessed 64px down to the
  actual 72px/leading-80px (verified via `get_design_context` on `8:146`).
  Body copy verbatim. Russian TODO placeholder rendered distinctly (dashed
  border, muted grey) per spec — not omitted, not invented content.

## Research (`/research.html`) — Figma node `8:173`

- Reference: `.parity/ref-research.png`
- App: `.parity/app-research.png`
- **Verdict: match.**
- Notes: hero heading corrected to actual 72px (verified via
  `get_design_context` on `8:175`); the long second line ("Expertise and
  relevant prior work") fits on one line at 1440px as in the design. Inline
  link on "Volkov et al. (2025)" preserved. Both TODO placeholder lines
  rendered.

## Bugs found and fixed during the parity pass

1. **Nav shrink-wrap bug**: `Nav`'s outer flex container was missing `w-full`,
   so inside the page's `flex flex-col` parent it shrank to content width
   and centered itself instead of spanning full width — collapsing the
   `justify-between` gap between the wordmark and nav links. Fixed by adding
   `w-full`.
2. **People card heights**: cards used `items-stretch`, forcing all three to
   the tallest card's height. Figma has each card sized to its own bio length
   (362 / 422 / 302px). Fixed by switching to `items-start` (desktop) /
   natural stacking (mobile).
3. **Hero font sizes on Technology/Research**: guessed at 64px/56px before
   confirming via `get_design_context`; both are actually 72px/leading-80px,
   same as the About page. Corrected.

## Responsive (768px, no Figma frame — judgment call)

- Initially used Tailwind's `md:` (768px) breakpoint for desktop-only rules,
  which meant testing exactly at 768px triggered the desktop rules (Tailwind
  breakpoints are `min-width`) and the Research page's `whitespace-nowrap`
  hero overflowed horizontally. Switched all responsive overrides to `lg:`
  (1024px) so 768px reliably gets the mobile/stacked treatment.
- Verified via Playwright at 768px: `document.documentElement.scrollWidth ===
  clientWidth` (no overflow) on all three pages; nav stacks to a column,
  People cards stack full-width, hero type scales down.

## Build

- `npm run build` succeeds, emits `dist/index.html`, `dist/technology.html`,
  `dist/research.html` plus hashed assets.
- `vite preview` serves the built output correctly at `base: '/thebrentgroup/'`.

## Round 2 fixes (post user review)

The first pass matched at thumbnail resolution but missed several things a
closer look (and re-querying `get_design_context` on the actual root frames
`8:61`, `8:145`, `8:174`, plus the person-card component variants `8:187`)
caught:

1. **Hero background was applied to the whole page**, not just the hero
   band. Figma's `8:66`/`8:145`/`8:174` frames show `bg-[#f7f7f7]` scoped to
   a fixed-height band (680px on About, 432px on Technology/Research) with
   the rest of the page on `bg-white`. Fixed by wrapping only Nav + hero
   heading (+ mission, About only) in their own `bg-[#f7f7f7]` container.
2. **Nav-to-heading gap was double-counted.** The heading wrapper had its
   own `pt-[206px]` stacked *after* Nav's own `pt-[53px]` + rendered height,
   pushing the heading ~200px too far down. Figma's absolute coordinates
   (nav bottom at y=79, heading top at y=206 on About; y=272 vs nav bottom
   79 on Technology/Research) give the actual needed gap: 127px (About),
   193px (Technology/Research). Fixed by using those gap values directly as
   the heading wrapper's `padding-top` instead of the absolute Figma
   y-coordinate.
3. **Pull-quote alignment was wrong.** Design node `8:87` is `text-right`,
   24px, `font-medium` — not `text-center` at 20px as originally built.
   Combining `text-center` with `ml-auto` (right-shifted box, centered text
   inside it) produced the "right yet centered" look the user flagged.
   Fixed to `text-right` at the correct size/weight.
4. **Person card hover was missing.** `Frame 2`'s two variants (`2:17`
   Default, `8:188` Variant2) are a hover state: Variant2 swaps the 1px
   black border for a 12px `#195b36` (the gradient's green) border, same
   layout otherwise. Added `hover:border-[12px] hover:border-[#195b36]`
   with a transition.
5. **Publications list and footer contact were not uppercase.** The
   Publications wrapper (`8:75`) and footer contact wrapper (`8:98`) both
   carry Figma's `uppercase` text-case at the container level, cascading to
   every child including the URL text — confirmed against a zoomed Figma
   reference render of the footer, not just the low-res full-page
   thumbnail. Removed the `normal-case` overrides that had been added to
   the footer and added `uppercase` to the Publications section.
6. **Footer gradient was compressed.** The footer was sized by content
   (`py-24` padding) rather than Figma's fixed 392px band height, so the
   gradient rendered over a much shorter span than intended, at the wrong
   position. Fixed to `lg:h-[392px]` with `pt-[172px]` on the inner text
   block, matching Figma's absolute values exactly. Verified via Playwright
   bounding box: footer height is now exactly 392px.

Re-verified after fixes: `npm run build`/`npm run lint` clean, no 768px
overflow, hover state screenshot confirmed matching the Variant2 component,
footer bounding box `{height: 392}` exact.
