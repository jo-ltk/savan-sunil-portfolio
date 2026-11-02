import { PROJECTS, pad } from "@/data/site";
import { PageLink } from "@/components/links";
import { Chevron, Lines } from "@/components/ui";

/** 02 — Selected projects: three full-screen scenes that stack over each other. */
export default function Projects() {
  const N = PROJECTS.length;
  return (
    <section className="works" id="projects" aria-label="Selected projects">
      <div className="scenes" id="scenes">
        {PROJECTS.map((p, i) => (
          <article
            key={p.slug}
            className="scene room"
            data-tone={p.tone}
            data-theme={p.tone}
            data-room="Selected Projects"
            aria-label={`${i + 1} of ${N}: ${p.title}`}
          >
            <div className="s-inner">
              <div className="s-panel" />
              <div className={"s-pic" + (p.png ? " png" : "")}>
                <img src={p.img} alt={p.alt} decoding="async" loading={i ? "lazy" : undefined} />
              </div>
              <div className="s-text">
                <span className="s-label eyebrow">{i === 0 ? `Selected Projects (${pad(N)})` : p.year}</span>
                <div className="s-copy">
                  <span className="eyebrow line"><span>{p.cat}</span></span>
                  <h3><Lines text={p.t2} /></h3>
                  <span className="line">
                    <span>
                      <PageLink className="cta" href={`/projects/${p.slug}`} data-cursor="view">
                        View Project <Chevron />
                      </PageLink>
                    </span>
                  </span>
                </div>
                <div className="s-count" aria-hidden="true">
                  <b>{pad(i + 1)}</b><i>/</i><span>{pad(N)}</span>
                </div>
                <ul className="s-dots" aria-hidden="true">
                  {PROJECTS.map((q, k) => <li key={q.slug} className={k === i ? "on" : undefined} />)}
                </ul>
              </div>
            </div>
            <div className="s-shade" />
            <span className="credit">Temporary reference image</span>
          </article>
        ))}
      </div>
    </section>
  );
}
