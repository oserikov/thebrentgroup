# CLAUDE.md

## Project

Vite + React + TS + Tailwind rebuild of the Brent Group site as a pixel-accurate
implementation of the Figma redesign (3 pages: About, Technology, Research).
Ships first at `oserikov.github.io/thebrentgroup`; migrates to
`thebrentgroup.github.io` later, replacing the sibling Jekyll repo at
`~/thebrentgroup-site` once approved. See `spec.md` for full scope.

<!-- BEGIN pipeline:design-binding-rules -->
## Design binding rules (Figma-driven)

- Source of truth for all UI is the Figma design. Build to **visual parity** with
  the frames listed below. Any deviation must be justified against a recorded
  implementation nuance in `spec.md`.
- Implementation planning may NOT proceed unless every manifest frame is reachable
  via the Figma MCP (`get_screenshot`).
- Pinned stack: Vite + React + Tailwind + TypeScript (multi-page build, no router).
- Design tokens come from Figma variables/exported styles → Tailwind theme.
  Do not hardcode values that exist as variables (see spec.md Tokens section).

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
