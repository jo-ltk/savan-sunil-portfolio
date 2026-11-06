import { FEATURED } from "@/data/landing";
import { pad } from "@/data/site";
import { PageLink } from "@/components/links";
import { Chevron, Lines } from "@/components/ui";
import Frame from "./Frame";

/** 02 — Selected projects: a full-width cover per project, its title line, and two supporting boards. */
export default function Projects() {
  const N = FEATURED.length;
  return (
    <section className="room works" id="projects" data-tone="light" aria-labelledby="pjH">
      <div className="head">
        <span className="eyebrow">Selected Projects</span>
        <h2 className="h2 rv-lines" id="pjH">
          <span className="line"><span>Selected</span></span>
          <span className="line"><span className="outline">work.</span></span>
        </h2>
        <span className="head-n rv">({pad(N)})</span>
      </div>

      <div className="pj-list">
        {FEATURED.map(({ project: p, place, cover, details }, i) => (
          <article className={"pj" + (i % 2 ? " pj-alt" : "")} key={p.slug} aria-labelledby={`pj-${p.slug}`}>
            <PageLink href={`/projects/${p.slug}`} className="pj-cover" data-cursor="view" aria-label={`View ${p.title}`}>
              <Frame pic={cover} sizes="(max-width: 760px) 100vw, calc(100vw - 120px)" className="pj-frame" />
            </PageLink>

            <div className="pj-info">
              <span className="pj-n" aria-hidden="true">{pad(i + 1)}</span>
              <h3 className="pj-title rv-lines" id={`pj-${p.slug}`}><Lines text={p.t2} /></h3>
              <div className="pj-side rv">
                <dl className="pj-meta">
                  <div><dt>Discipline</dt><dd>{p.cat}</dd></div>
                  <div><dt>Location</dt><dd>{place}</dd></div>
                  <div><dt>Year</dt><dd>{p.year}</dd></div>
                </dl>
                <PageLink className="cta" href={`/projects/${p.slug}`}>
                  View project <Chevron />
                </PageLink>
              </div>
            </div>

            <div className="pj-details">
              {details.map((d, k) => (
                <figure className={`pj-d pj-d${k + 1}`} key={k} data-speed={k ? "-0.03" : "0.02"}>
                  <Frame pic={d} sizes="(max-width: 760px) 100vw, 50vw" />
                  <figcaption className="eyebrow">{d.alt}</figcaption>
                </figure>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
