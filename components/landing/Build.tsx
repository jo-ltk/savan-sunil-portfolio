import { pad } from "@/data/site";

const STEPS = ["Site & grid", "Structure", "Floors", "Envelope", "Light & life"];

/* elevation geometry (viewBox 600×420, ground at y 380) */
const AXES = [150, 250, 350, 450];
const SLABS = [310, 240, 170, 100];
const MULLIONS = [183, 217, 283, 317, 383, 417];
// window panes: one per bay per floor, [x, y, w, h]
const PANES = [316, 246, 176, 106].flatMap((top) =>
  AXES.slice(0, 3).map((x) => [x + 6, top + 6, 88, 58] as const),
);
const circle = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`;
const person = (x: number) => `${circle(x, 352, 4)}M${x} 356V370L${x - 4} 380M${x} 370L${x + 4} 380M${x - 6} 362H${x + 6}`;

/** The elevation, grouped by construction stage. */
function art() {
  return (
    <>
      {/* 0 · site & grid */}
      <g data-stage="0">
        <path pathLength={1} d="M20 380H580" />
        {AXES.map((x) => <path key={x} pathLength={1} d={`M${x - 12} 380V392H${x + 12}V380`} />)}
        {AXES.map((x) => <path key={"a" + x} className="a" pathLength={1} d={`M${x} 392V398${circle(x, 408, 9)}`} />)}
        {AXES.map((x, i) => <text key={"t" + x} x={x} y={411.5} textAnchor="middle">{"ABCD"[i]}</text>)}
      </g>
      {/* 1 · structure, with the crane */}
      <g data-stage="1">
        {AXES.map((x) => <path key={x} pathLength={1} d={`M${x} 380V100`} />)}
      </g>
      <g data-stage="1" id="bdCrane">
        <path pathLength={1} d="M524 380V44M536 380V44" />
        <path pathLength={1} d="M524 360L536 340L524 320L536 300L524 280L536 260L524 240L536 220L524 200L536 180L524 160L536 140L524 120L536 100L524 80L536 60" />
        <path pathLength={1} d="M370 44H590M530 18V44M530 18L370 44M530 18L590 44" />
        <path pathLength={1} d="M402 44V118M396 118H408" />
      </g>
      {/* 2 · floors, bottom up */}
      <g data-stage="2">
        {SLABS.map((y) => <path key={y} pathLength={1} d={`M130 ${y}H470M130 ${y + 6}H470`} />)}
        <path pathLength={1} d="M130 100V90H470V100" />
      </g>
      {/* 3 · envelope */}
      <g data-stage="3">
        {MULLIONS.map((x) => <path key={x} pathLength={1} d={`M${x} 106V380`} />)}
        <path pathLength={1} d="M285 380V346H315V380M232 340H368" />
        <path pathLength={1} d="M170 70H430M180 90V70M300 90V70M420 90V70" />
        <path className="a" pathLength={1} d="M496 380V90M490 380H502M490 90H502" />
        <text x={506} y={238}>+18.6</text>
      </g>
      {/* 4 · light & life */}
      <g data-stage="4">
        {PANES.map(([x, y, w, h]) => <rect key={x + "-" + y} className="bd-win" x={x} y={y} width={w} height={h} />)}
        <path pathLength={1} d={`M78 380V334${circle(78, 312, 24)}`} />
        <path pathLength={1} d={`M560 380V352${circle(560, 336, 16)}`} />
        <path pathLength={1} d={person(110)} />
        <path pathLength={1} d={person(388)} />
      </g>
    </>
  );
}

/** 06½ — Interlude: a building constructs itself as you scroll (sticky; the drawing is scrubbed by LandingMotion). */
export default function Build() {
  return (
    // not a "room": it carries its own dark ground, so it reads the same whatever tone the page is in
    <section className="build" id="build" data-theme="dark" aria-labelledby="bdH">
      <div className="bd-stage">
        <div className="bd-copy">
          <span className="eyebrow">Interlude</span>
          <h2 className="h2 rv-lines" id="bdH">
            <span className="line"><span>From a line</span></span>
            <span className="line"><span className="outline">to a building.</span></span>
          </h2>
          <ol className="bd-steps">
            {STEPS.map((s, i) => (
              <li key={s} className="on"><span>{pad(i + 1)}</span>{s}</li>
            ))}
          </ol>
          <p className="bd-meter"><b id="bdPct">100</b>% built</p>
        </div>

        <svg className="bd-draw" viewBox="0 0 600 420" fill="none" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label="Line drawing of a four-storey building being constructed, from ground and grid to a lit facade">
          <g className="bd-live">{art()}</g>
        </svg>
      </div>
    </section>
  );
}
