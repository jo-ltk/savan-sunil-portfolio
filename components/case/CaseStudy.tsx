import { CASES, PROJECTS, ROLE, pad } from "@/data/site";
import { GoLink, PageLink } from "@/components/links";
import { Lines } from "@/components/ui";
import Year from "@/components/Year";
import CaseMotion from "./CaseMotion";

/** A photograph in a frame: inner layer drifts on scroll, the crop/zoom comes from the data. */
function Ph({ src, pos = "50% 50%", zoom = 1, ratio, cap, eager }: { src: string; pos?: string; zoom?: number; ratio?: string; cap?: string; eager?: boolean }) {
  return (
    <figure className="ph" style={ratio ? { aspectRatio: ratio } : undefined}>
      <div className="in">
        <img
          src={src}
          alt={cap || ""}
          loading={eager ? undefined : "lazy"}
          decoding="async"
          style={{ objectPosition: pos, transform: `scale(${zoom})`, transformOrigin: pos }}
        />
      </div>
      {cap ? <figcaption>{cap}</figcaption> : null}
    </figure>
  );
}

/** One data-driven template for every project case study. */
export default function CaseStudy({ index }: { index: number }) {
  const N = PROJECTS.length;
  const p = PROJECTS[index], c = CASES[p.slug];
  const prev = PROJECTS[(index - 1 + N) % N], next = PROJECTS[(index + 1) % N];
  const n = `${pad(index + 1)} / ${pad(N)}`;

  const facts = (
    <dl className="cs-facts">
      <div><dt>Category</dt><dd>{p.cat}</dd></div>
      <div><dt>Location</dt><dd>{c.location}</dd></div>
      <div><dt>Year</dt><dd>{c.year}</dd></div>
      <div><dt>Type</dt><dd>{c.type}</dd></div>
    </dl>
  );
  const top = (
    <div className="cs-hero-top">
      <GoLink className="cta" to="projects">← Back to projects</GoLink>
      <span className="eyebrow">{n} — {p.cat}</span>
    </div>
  );
  const textInner = (
    <>
      <h1 className="cs-h1"><Lines text={p.t2 || p.title} /></h1>
      <p className="intro cs-in">{c.intro}</p>
      <div className="cs-in">{facts}</div>
    </>
  );

  let hero;
  if (c.hero === "layered") {
    hero = (
      <header className="cs-hero hl" data-theme="light">
        <div className="lay bg"><img src={c.heroImg} alt="" /></div>
        <p className="ttl-back" aria-hidden="true"><span className="line"><span>{pad(index + 1)}</span></span></p>
        <div className="lay fg"><img src={c.heroCut} alt={p.alt} /></div>
        {top}
        <div data-theme="dark" style={{ position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none" }}>
          <div className="cs-hero-text" style={{ pointerEvents: "auto" }}>{textInner}</div>
        </div>
      </header>
    );
  } else if (c.hero === "split") {
    hero = (
      <header className="cs-hero hs" data-theme="light">
        {top}
        <div className="cs-hero-text">{textInner}</div>
        <Ph src={c.heroImg} pos={c.heroPos} zoom={1.08} eager />
      </header>
    );
  } else {
    hero = (
      <header className="cs-hero hb" data-theme="dark">
        <Ph src={c.heroImg} pos={c.heroPos} zoom={1.08} eager />
        {top}
        <div className="cs-hero-text">{textInner}</div>
      </header>
    );
  }

  return (
    <article id="detail" aria-live="polite">
      <div className="cs" data-theme="light">
        {hero}

        <section className="cs-sec cs-grid" data-theme="light">
          <span className="eyebrow">Overview</span>
          <div>
            <p className="lead cs-rv">{c.overview}</p>
            <div className="ov-items">
              {c.items.map((it) => (
                <div className="cs-rv" key={it[0]}><h3>{it[0]}</h3><p className="txt">{it[1]}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section className="gal" data-theme="light" aria-label="Gallery">
          {c.gallery.map((g, k) =>
            g.length === 2 ? (
              <p className="note lead cs-rv" key={k}>{g[1]}</p>
            ) : (
              <div className={`${g[0]} cs-ph`} key={k}>
                <Ph src={g[2]} pos={g[3]} zoom={g[4]} ratio={g[1]} cap={g[5]} />
              </div>
            ),
          )}
        </section>

        <section className="cs-sec cs-grid" data-theme="light">
          <span className="eyebrow">Design concept &amp; development</span>
          <div>
            <h2 className="cs-lines"><Lines text={"From idea\nto architecture"} /></h2>
            <div className="dev-split">
              <p className="lead cs-rv">{c.devText}</p>
              <div className="cs-ph"><Ph src={c.devImg[0]} pos={c.devImg[1]} zoom={c.devImg[2]} ratio="4/3" cap="Concept detail" /></div>
            </div>
            <div className="dev">
              {c.dev.map((d, k) => (
                <div className="cs-rv" key={d[0]}><span className="n">{pad(k + 1)}</span><h3>{d[0]}</h3><p className="txt">{d[1]}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section className="cs-sec tech" data-theme="dark">
          <div className="cs-grid">
            <span className="eyebrow">Technical details</span>
            <div>
              <h2 className="cs-lines"><Lines text="Technical details" /></h2>
              <dl className="spec">
                {c.spec.map((s) => (
                  <div className={"cs-rv" + (s[2] ? " big" : "")} key={s[0]}><dt>{s[0]}</dt><dd>{s[1]}</dd></div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="cs-sec" data-theme="light">
          <div className="cs-grid">
            <span className="eyebrow">Project highlights</span>
            <h2 className="cs-lines"><Lines text={"What makes\nit work"} /></h2>
          </div>
          <ol className="hi-list">
            {c.highlights.map((h, k) => (
              <li className="cs-rv" key={h[0]}><span className="n">{pad(k + 1)}</span><h3>{h[0]}</h3><p className="txt">{h[1]}</p></li>
            ))}
          </ol>
        </section>

        <section className="fin" data-theme="dark">
          <Ph src={c.finImg[0]} pos={c.finImg[1]} zoom={c.finImg[2]} />
          <blockquote className="cs-rv">{c.fin}</blockquote>
        </section>

        <nav className="cs-nav" data-theme="light" aria-label="More projects">
          <PageLink href={`/projects/${prev.slug}`}><span className="eyebrow">← Previous project</span><strong>{prev.title}</strong></PageLink>
          <GoLink className="all" to="projects"><span className="eyebrow">Index</span><strong>All projects</strong></GoLink>
          <PageLink className="nx" href={`/projects/${next.slug}`}><span className="eyebrow">Next project →</span><strong>{next.title}</strong></PageLink>
        </nav>

        <footer className="foot-bar" data-theme="light">
          <span className="eyebrow"><Year /></span>
          <span className="eyebrow">{ROLE}</span>
          <GoLink className="cta" to="contact">Contact</GoLink>
        </footer>
      </div>
      <CaseMotion darkHero={c.hero === "bleed"} />
    </article>
  );
}
