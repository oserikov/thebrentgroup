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
