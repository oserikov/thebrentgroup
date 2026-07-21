// Native SVG re-implementation of brent-group-roadmap.drawio — same coordinate
// space (1275×669) and same visual language (circles for milestones, filled
// solid/gradient/blank for done/in-progress/not-started, seasonal background,
// timeline arrow), but as live markup: scales fluidly, stays legible on
// mobile (horizontal scroll below a floor width, instead of shrinking text
// past reading size), and inherits the site's real fonts/colors instead of
// a flattened raster/vector export. Edit the arrays below, not the JSX.

type MilestoneState = "done" | "in-progress" | "not-started";

interface Milestone {
  id: string;
  x: number; // left edge — shared by the circle and its caption, per the site's caption convention
  lines: string[];
  state: MilestoneState;
}

interface Row {
  circleY: number;
  captionTop: number;
  milestones: Milestone[];
}

interface Lane {
  label: string;
  labelX: number;
  labelY: number;
  bandY: number; // lane band ("glass" highlight) bounding box, full canvas width
  bandHeight: number;
  rows: Row[];
}

const VIEW_W = 1275;
const VIEW_H = 669;
const CIRCLE_R = 25;

const FILL: Record<MilestoneState, string> = {
  done: "#ccdccd",
  "in-progress": "url(#in-progress-fill)",
  "not-started": "#ffffff",
};

const LANES: Lane[] = [
  {
    label: "Technical Countermeasures",
    labelX: VIEW_W,
    labelY: 152,
    bandY: 50,
    bandHeight: 125,
    rows: [
      {
        circleY: 135,
        captionTop: 60,
        milestones: [
          { id: "honeypot", x: 0, lines: ["Honeypots", "(Reworr & Volkov, 2025)"], state: "done" },
          { id: "repellents", x: 200, lines: ["Repellents"], state: "done" },
          { id: "lpr", x: 400, lines: ["License Plate", "Reader (LPR)"], state: "not-started" },
          { id: "tbt", x: 600, lines: ["Token-Burning Trap", "(Needs Partner)"], state: "not-started" },
        ],
      },
    ],
  },
  {
    label: "Messages to the Future",
    labelX: VIEW_W,
    labelY: 450,
    bandY: 188,
    bandHeight: 275,
    rows: [
      {
        circleY: 273,
        captionTop: 198,
        milestones: [
          { id: "demo", x: 0, lines: ["Demo", "(Live Example)"], state: "done" },
          { id: "preprint-deploy", x: 400, lines: ["Preprint Servers", "Deployment (arXiv / bioRxiv)"], state: "in-progress" },
          { id: "notice-design", x: 800, lines: ["Notice Design", "Iteration"], state: "not-started" },
        ],
      },
      {
        circleY: 397,
        captionTop: 322,
        milestones: [
          { id: "perplexity", x: 200, lines: ["Perplexity", "Ingestion Checks"], state: "not-started" },
          { id: "memory-baseline", x: 600, lines: ["Memory-Probe", "Baseline"], state: "not-started" },
          { id: "repeat-probes", x: 950, lines: ["Repeat Probes"], state: "not-started" },
          { id: "inference-tests", x: 1100, lines: ["Inference-Time", "Behavior Tests"], state: "not-started" },
        ],
      },
    ],
  },
  {
    label: "Liaison & Ecosystem",
    labelX: VIEW_W,
    labelY: 578,
    bandY: 475,
    bandHeight: 125,
    rows: [
      {
        circleY: 560,
        captionTop: 485,
        milestones: [
          { id: "outreach-1", x: 0, lines: ["Outreach:", "Whittaker & Ball"], state: "in-progress" },
          { id: "outreach-2", x: 200, lines: ["Outreach:", "Moglen & Stallman"], state: "in-progress" },
          { id: "license", x: 600, lines: ["No-AI-Agent License", "Variants (Possible, Not Promised)"], state: "not-started" },
        ],
      },
    ],
  },
];

// Sequential chains, one per row, plus the one cross-row dependency
// (Notice design iteration feeds Repeat probes).
const EDGES: [string, string][] = [
  ["honeypot", "repellents"],
  ["repellents", "lpr"],
  ["lpr", "tbt"],
  ["demo", "preprint-deploy"],
  ["preprint-deploy", "notice-design"],
  ["perplexity", "memory-baseline"],
  ["memory-baseline", "repeat-probes"],
  ["repeat-probes", "inference-tests"],
  ["notice-design", "repeat-probes"],
  ["outreach-1", "outreach-2"],
  ["outreach-2", "license"],
];

// Season background, as two gradient "shapes" reused across four zones
// instead of the ten flat rects a static export would need. LONG seasons
// (well-known, more data) ramp in, hold a flat one-circle-wide plateau at
// the peak, then ramp out. SHORT seasons (further out, less certain) are a
// plain ramp with no plateau. Both are symmetric, so one gradient per shape
// covers every zone — just re-anchored to that zone's x-range.
type SeasonShape = "long" | "short";
interface Season {
  id: string; // gradient id — keep it a plain slug, not the display name: an
  // unquoted `url(#...)` reference breaks on spaces/apostrophes and silently
  // falls back to solid black fill, which is exactly what "Summer '26" did.
  name: string;
  color: string;
  shape: SeasonShape;
  x: number;
  width: number;
  labelX: number;
}

const SEASONS: Season[] = [
  { id: "summer", name: "Summer '26", color: "#FFF2CC", shape: "long", x: 100, width: 338, labelX: 268.5 },
  { id: "fall", name: "Fall '26", color: "#EDD4C4", shape: "long", x: 438, width: 337, labelX: 606.5 },
  { id: "winter", name: "Winter '26/'27", color: "#DAE8FC", shape: "short", x: 775, width: 250, labelX: 900 },
  { id: "spring", name: "Spring '27", color: "#D5E8D4", shape: "short", x: 1025, width: 250, labelX: 1149.5 },
];

const SEASON_LABEL_Y = 651.5;
const TIMELINE_Y = 619;
const TIMELINE_ARROW_LEN = 20;
const TIMELINE_SHAFT_HALF = 1.5;
const TIMELINE_HEAD_HALF = 6;

// Right-aligned to the canvas edge, vertically centered with the title —
// computed from box widths instead of hand-placed x's, so the block stays
// self-consistent if a label ever changes.
const HEADER_CENTER_Y = 25;
const LEGEND_R = 12.5;
const LEGEND_CIRCLE_TEXT_GAP = 8;
const LEGEND_ITEM_GAP = 20;
const LEGEND: { state: MilestoneState; label: string; boxWidth: number }[] = [
  { state: "not-started", label: "Not Started", boxWidth: 95 },
  { state: "in-progress", label: "In Progress", boxWidth: 95 },
  { state: "done", label: "Done", boxWidth: 55 },
];

function Caption({ x, top, lines }: { x: number; top: number; lines: string[] }) {
  return (
    <text x={x} y={top + 14} fontSize={14} className="font-space font-normal fill-black">
      {lines.map((line, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : 18}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

function Edge({ from, to }: { from: { cx: number; cy: number }; to: { cx: number; cy: number } }) {
  const path =
    from.cy === to.cy
      ? `M ${from.cx + CIRCLE_R} ${from.cy} L ${to.cx - CIRCLE_R} ${to.cy}`
      : `M ${from.cx} ${from.cy + CIRCLE_R} L ${from.cx} ${to.cy} L ${to.cx - CIRCLE_R} ${to.cy}`;
  return <path d={path} fill="none" stroke="#000000" strokeWidth={1} markerEnd="url(#arrowhead)" />;
}

export default function RoadmapDiagram() {
  const centers = new Map<string, { cx: number; cy: number }>();
  for (const lane of LANES) {
    for (const row of lane.rows) {
      for (const m of row.milestones) {
        centers.set(m.id, { cx: m.x + CIRCLE_R, cy: row.circleY });
      }
    }
  }

  // Laid out right-to-left so the last item's text is anchored (textAnchor
  //="end") at exactly VIEW_W — the same convention the lane labels use —
  // instead of a left-to-right pass whose final edge only approximated
  // VIEW_W by however close the guessed boxWidth was to the real glyph
  // metrics. boxWidth still governs the (approximate, and here harmless)
  // circle-to-text spacing for every item but the earlier ones.
  let legendCursor = VIEW_W;
  const legendLayout = [...LEGEND].reverse().map((item) => {
    const textRight = legendCursor;
    const circleCenter = textRight - item.boxWidth - LEGEND_CIRCLE_TEXT_GAP - LEGEND_R;
    legendCursor = circleCenter - LEGEND_R - LEGEND_ITEM_GAP;
    return { ...item, cx: circleCenter, textRight };
  }).reverse();

  const timelinePath = [
    `M 0 ${TIMELINE_Y - TIMELINE_SHAFT_HALF}`,
    `L ${VIEW_W - TIMELINE_ARROW_LEN} ${TIMELINE_Y - TIMELINE_SHAFT_HALF}`,
    `L ${VIEW_W - TIMELINE_ARROW_LEN} ${TIMELINE_Y - TIMELINE_HEAD_HALF}`,
    `L ${VIEW_W} ${TIMELINE_Y}`,
    `L ${VIEW_W - TIMELINE_ARROW_LEN} ${TIMELINE_Y + TIMELINE_HEAD_HALF}`,
    `L ${VIEW_W - TIMELINE_ARROW_LEN} ${TIMELINE_Y + TIMELINE_SHAFT_HALF}`,
    `L 0 ${TIMELINE_Y + TIMELINE_SHAFT_HALF}`,
    "Z",
  ].join(" ");

  return (
    <div className="w-full overflow-x-auto">
      <svg
        // 2px of padding on every side: circles sitting flush against x=0
        // (Honeypots, Demo, Outreach) have their 1px stroke half clipped by
        // the viewBox edge otherwise, reading as a visibly cut-off ring.
        viewBox={`-2 -2 ${VIEW_W + 4} ${VIEW_H + 4}`}
        className="w-full h-auto"
        style={{ minWidth: 700, aspectRatio: `${VIEW_W + 4} / ${VIEW_H + 4}` }}
        role="img"
        aria-label="Brent Group SFF roadmap: Technical countermeasures, Messages to the Future, and Liaison & ecosystem workstreams plotted against a Jun 2026 – May 2027 seasonal timeline"
      >
        <defs>
          {/* Solid on the left, fading to white on the right — matches the
              source .drawio's gradientDirection="east" (fillColor at the
              west edge, gradientColor/white at the east edge). */}
          <linearGradient id="in-progress-fill" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ccdccd" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          <marker id="arrowhead" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#000000" />
          </marker>
          {/* "Glass" lane highlight — approximates the source .drawio's
              glass=1 style: a bright sheen at the top, fading through the
              middle, but with a little visibility still left at the bottom
              rather than fading all the way to nothing. */}
          <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity={0.5} />
            <stop offset="55%" stopColor="#ffffff" stopOpacity={0.05} />
            <stop offset="100%" stopColor="#ffffff" stopOpacity={0.18} />
          </linearGradient>
          {SEASONS.map((s) => (
            <linearGradient key={s.id} id={`season-${s.id}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset={s.shape === "long" ? "42.6%" : "50%"} stopColor={s.color} />
              <stop offset={s.shape === "long" ? "57.4%" : "50%"} stopColor={s.color} />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          ))}
        </defs>

        {/* Seasonal background */}
        {SEASONS.map((s) => (
          <rect key={s.id} x={s.x} y={0} width={s.width} height={VIEW_H} fill={`url(#season-${s.id})`} />
        ))}

        {/* Title */}
        <text x={0} y={HEADER_CENTER_Y + 7} fontSize={20} className="font-charon font-bold fill-black">
          Our Roadmap
        </text>

        {/* Legend — right-aligned to the canvas edge, vertically centered
            with the title, laid out from the LEGEND array above rather than
            hand-placed coordinates. */}
        {legendLayout.map((item) => (
          <g key={item.state}>
            <circle
              cx={item.cx}
              cy={HEADER_CENTER_Y}
              r={LEGEND_R}
              fill={FILL[item.state]}
              stroke="#000000"
              strokeWidth={1}
            />
            <text x={item.textRight} y={HEADER_CENTER_Y + 5} textAnchor="end" fontSize={14} className="font-space fill-black">
              {item.label}
            </text>
          </g>
        ))}

        {/* Lane bands ("glass" highlight) */}
        {LANES.map((lane) => (
          <rect key={`band-${lane.label}`} x={0} y={lane.bandY} width={VIEW_W} height={lane.bandHeight} rx={12} fill="url(#glass)" />
        ))}

        {/* Lanes */}
        {LANES.map((lane) => (
          <g key={lane.label}>
            <text x={lane.labelX} y={lane.labelY} textAnchor="end" fontSize={16} className="font-space font-bold fill-black">
              {lane.label}
            </text>
            {lane.rows.map((row) => (
              <g key={row.circleY}>
                {row.milestones.map((m) => (
                  <g key={m.id}>
                    <Caption x={m.x} top={row.captionTop} lines={m.lines} />
                    <circle
                      cx={m.x + CIRCLE_R}
                      cy={row.circleY}
                      r={CIRCLE_R}
                      fill={FILL[m.state]}
                      stroke="#000000"
                      strokeWidth={1}
                    />
                  </g>
                ))}
              </g>
            ))}
          </g>
        ))}

        {/* Dependency arrows, drawn after circles so they don't tuck under fills */}
        {EDGES.map(([from, to]) => (
          <Edge key={`${from}-${to}`} from={centers.get(from)!} to={centers.get(to)!} />
        ))}

        {/* Timeline — matches the source .drawio's flexArrow: a HOLLOW ribbon
            (stroked outline, no fill), so the shaft shows as two thin
            parallel lines with a visible gap between them, converging into
            an open (unfilled) triangular head. Confirmed against a fresh
            `drawio -x` render of the .drawio file, not guessed. */}
        <path d={timelinePath} fill="none" stroke="#000000" strokeWidth={1} strokeLinejoin="round" />
        {SEASONS.map((s) => (
          <text
            key={s.name}
            x={s.labelX}
            y={SEASON_LABEL_Y}
            textAnchor="middle"
            fontSize={16}
            className="font-space font-bold fill-black"
          >
            {s.name}
          </text>
        ))}
      </svg>
    </div>
  );
}
