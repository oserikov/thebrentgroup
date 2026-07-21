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
    label: "Technical countermeasures",
    labelX: VIEW_W,
    labelY: 152,
    bandY: 50,
    bandHeight: 125,
    rows: [
      {
        circleY: 135,
        captionTop: 60,
        milestones: [
          { id: "repellents", x: 0, lines: ["Repellents"], state: "done" },
          { id: "honeypot", x: 200, lines: ["Honeypots", "(Reworr & Volkov, 2025)"], state: "done" },
          { id: "lpr", x: 400, lines: ["License Plate", "Reader (LPR)"], state: "not-started" },
          { id: "tbt", x: 600, lines: ["Token-Burning Trap", "(needs partner)"], state: "not-started" },
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
          { id: "demo", x: 0, lines: ["Demo", "(live example)"], state: "done" },
          { id: "preprint-deploy", x: 400, lines: ["Preprint Servers", "Deployment (arXiv / bioRxiv)"], state: "in-progress" },
          { id: "notice-design", x: 800, lines: ["Notice design", "iteration"], state: "not-started" },
        ],
      },
      {
        circleY: 397,
        captionTop: 322,
        milestones: [
          { id: "perplexity", x: 200, lines: ["Perplexity", "ingestion checks"], state: "not-started" },
          { id: "memory-baseline", x: 600, lines: ["Memory-probe", "baseline"], state: "not-started" },
          { id: "repeat-probes", x: 950, lines: ["Repeat probes"], state: "not-started" },
          { id: "inference-tests", x: 1100, lines: ["Inference-time", "behavior tests"], state: "not-started" },
        ],
      },
    ],
  },
  {
    label: "Liaison & ecosystem",
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
          { id: "license", x: 600, lines: ["No-AI-Agent license", "variants (possible, not promised)"], state: "not-started" },
        ],
      },
    ],
  },
];

// Sequential chains, one per row, plus the one cross-row dependency
// (Notice design iteration feeds Repeat probes).
const EDGES: [string, string][] = [
  ["repellents", "honeypot"],
  ["honeypot", "lpr"],
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

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="w-full h-auto"
        style={{ minWidth: 700, aspectRatio: `${VIEW_W} / ${VIEW_H}` }}
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
              glass=1 style: a soft white sheen across the top of each band,
              fading to nothing by mid-height. */}
          <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity={0.5} />
            <stop offset="55%" stopColor="#ffffff" stopOpacity={0} />
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
        <text x={0} y={22} fontSize={20} className="font-charon font-bold fill-black">
          Brent Group SFF Roadmap
        </text>
        <text x={0} y={42} fontSize={20} className="font-charon font-bold fill-black">
          Technical AI Countermeasures &amp; AI Influencers · Jun 2026 - May 2027
        </text>

        {/* Legend */}
        <circle cx={837.5} cy={17.5} r={12.5} fill="#ffffff" stroke="#000000" strokeWidth={1} />
        <text x={855} y={22} fontSize={14} className="font-space fill-black">
          not started
        </text>
        <circle cx={987.5} cy={17.5} r={12.5} fill="url(#in-progress-fill)" stroke="#000000" strokeWidth={1} />
        <text x={1005} y={22} fontSize={14} className="font-space fill-black">
          in progress
        </text>
        <circle cx={1137.5} cy={17.5} r={12.5} fill="#ccdccd" stroke="#000000" strokeWidth={1} />
        <text x={1155} y={22} fontSize={14} className="font-space fill-black">
          done
        </text>

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

        {/* Timeline */}
        <line x1={0} y1={TIMELINE_Y} x2={VIEW_W} y2={TIMELINE_Y} stroke="#000000" strokeWidth={1} markerEnd="url(#arrowhead)" />
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
