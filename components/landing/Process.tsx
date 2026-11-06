import { PROCESS } from "@/data/landing";
import { pad } from "@/data/site";
import Frame from "./Frame";

/** 06 — Design process: five stages on a vertical line that fills as you read; each stage shows its board. */
export default function Process() {
  return (
    <section className="room process" id="process" data-tone="light" aria-labelledby="procH">
      <div className="head">
        <span className="eyebrow">Design Process</span>
        <h2 className="h2 rv-lines" id="procH">
          <span className="line"><span>From research</span></span>
          <span className="line"><span className="outline">to documentation.</span></span>
        </h2>
      </div>

      <div className="pr-wrap">
        <div className="pr-line" aria-hidden="true"><i id="prLine" /></div>
        <ol className="pr-list">
          {PROCESS.map((s, i) => (
            <li className="pr-step" key={s.title}>
              <div className="pr-text">
                <span className="pr-big" aria-hidden="true">{pad(i + 1)}</span>
                <h3 className="rv">{s.title}</h3>
                <p className="rv">{s.text}</p>
              </div>
              <Frame pic={s.pic} sizes="(max-width: 760px) 100vw, 72vw" className="pr-pic" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
