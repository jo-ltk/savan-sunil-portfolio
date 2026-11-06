import { BEHIND } from "@/data/landing";
import { pad } from "@/data/site";
import Frame from "./Frame";

/** Rendered width of each group on wide screens (see .b-grid), used for next/image `sizes`. */
const SIZES = ["62vw", "31vw", "46vw", "46vw"];

/**
 * 07 — Behind the design: drawings at their native proportions, from 0.8:1 details to 5:1 elevations.
 * Groups are paired by proportion (data/landing.ts) so each row's columns end at nearly the same height.
 */
export default function Behind() {
  // running number of each group's first drawing (01, 02 … across groups)
  const starts = BEHIND.map((_, g) => BEHIND.slice(0, g).reduce((sum, grp) => sum + grp.length, 0));
  return (
    <section className="room behind" id="behind" data-tone="dark" data-theme="dark" aria-labelledby="behH">
      <div className="head">
        <span className="eyebrow">Behind the Design</span>
        <h2 className="h2 rv-lines" id="behH">
          <span className="line"><span>The work behind</span></span>
          <span className="line"><span className="outline">the work.</span></span>
        </h2>
      </div>
      <div className="b-grid">
        {BEHIND.map((group, g) => (
          <div className="b-col" key={g}>
            {group.map((b, i) => (
              <figure className="b-item" key={b.title}>
                <Frame pic={b.pic} sizes={`(max-width: 760px) 100vw, ${SIZES[g]}`} />
                <figcaption>
                  <span className="eyebrow">{pad(starts[g] + i + 1)}</span>
                  <span className="eyebrow">{b.title}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
