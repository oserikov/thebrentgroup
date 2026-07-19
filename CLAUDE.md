# CLAUDE.md

## Project

Vite + React + TS + Tailwind rebuild of the Brent Group site as a pixel-accurate
implementation of the Figma redesign (3 pages: About, Technology, Research).
Ships first at `oserikov.github.io/thebrentgroup`; migrates to
`thebrentgroup.github.io` later, replacing the sibling Jekyll repo at
`~/thebrentgroup-site` once approved. See `spec.md` for full scope.

## Content

All page copy lives in `/content/*.md` (frontmatter + markdown body), not in
the TSX. `scripts/build-content.mjs` generates `src/content.generated.ts`
(gitignored) from it — runs automatically via `npm run dev`/`npm run build`.
Never hardcode prose/copy in a component; add or edit a `.md` file instead.
See the README's "Editing content" section for the naming convention.

<!-- BEGIN pipeline:design-binding-rules -->
## Design binding rules (Figma-driven)

- Source of truth for all UI is the Figma design. Build to **visual parity** with
  the frames listed below. Any deviation must be justified against a recorded
  implementation nuance in `spec.md`.
- Implementation planning may NOT proceed unless every manifest frame is reachable
  via the figma-console MCP (`mcp__figma-console__figma_take_screenshot`).
- Pinned stack: Vite + React + Tailwind + TypeScript (multi-page build, no router).
- Design tokens come from Figma variables/exported styles → Tailwind theme.
  Do not hardcode values that exist as variables (see spec.md Tokens section).
- **Read Figma exclusively through figma-console.** Never substitute the official
  Figma remote MCP (`mcp.figma.com`) or any other Figma-adjacent MCP server, even if
  it happens to be connected and figma-console is not — its codegen/convenience
  tools can silently flatten precision-sensitive properties (a gradient stroke
  collapsed to one solid color, an exact numeric font-weight dropped to a guessed
  default) with no error and no visible sign in the returned code. This exact failure
  mode shipped multiple visual bugs in this project before being caught by manual
  review — see `PARITY.md`. When a visual property matters and a screenshot
  comparison can't settle it with confidence, pull
  `mcp__figma-console__figma_get_component_for_development` on that node and read the
  actual `fills`/`strokes`/`style` — don't guess, and don't infer from a sibling
  element's styling.

### Figma frame manifest

File key: `7f8Tpajeo1QRPjoaewEMqH`

| Frame (Figma name) | Intended page/component | Node id |
|---|---|---|
| Desktop - 3 | About page (`/`) | `8:61` |
| Desktop - 4 | Technology page (`/technology.html`) | `8:138` |
| Desktop - 5 | Research page (`/research.html`) | `8:173` |
| Frame 14 (nav, repeats per page) | Shared `<Nav>` component | `8:137` / `8:147` / `8:176` |
| Frame 12 (footer, repeats per page) | Shared `<Footer>` / contact component | `8:96` / `8:161` / `8:182` |
| Frame 10 (People section) | `<PeopleSection>` on About page | `8:88` |
| Frame 6 → Frame 3/4/5 (person card) | `<PersonCard>` component | `8:62` → `8:63`, `8:64`, `8:65` |
| Frame 9 (Publications) | `<Publications>` on About page | `8:75` |
| Frame 2 (off-canvas component defs) | `<PersonCard>` variants (Default/Variant2) | `8:187` → `2:17`, `8:188` |
<!-- END pipeline:design-binding-rules -->
