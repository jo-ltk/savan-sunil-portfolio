import { ABOUT_RENDER, CONTACT, PORTRAIT, STATS } from "@/data/landing";
import { GoLink } from "@/components/links";
import { Chevron } from "@/components/ui";
import Frame from "./Frame";

/**
 * 08 — About: portrait beside the statement, a short introduction, three figures and the next steps;
 * then one wide render from the work closes the section.
 */
export default function About() {
  return (
    <section className="room about" id="about" data-tone="light" aria-labelledby="aboutH">
      <div className="ab-grid">
        <Frame pic={PORTRAIT} sizes="(max-width: 760px) 100vw, (max-width: 1100px) 40vw, 32vw" className="ab-portrait" />

        <div className="ab-copy">
          <div className="ab-intro">
            <span className="eyebrow">About</span>
            <h2 className="h2 rv-lines" id="aboutH">
              <span className="line"><span>Designing ideas into</span></span>
              <span className="line"><span className="outline">spatial experiences.</span></span>
            </h2>
            <p className="lead rv">
              I am Savan Sunil, an architect exploring the relationship between design, geometry and technology —
              combining architectural thinking, hand sketching and computational exploration to create thoughtful,
              purposeful architecture.
            </p>
          </div>

          <div className="ab-foot">
            <dl className="stats">
              {STATS.map((s) => (
                <div className="stat rv" key={s.label}>
                  <dt>{s.label}</dt>
                  <dd><span className="count" data-to={s.value}>{s.value}</span>{s.suffix}</dd>
                </div>
              ))}
            </dl>
            <div className="ab-links rv">
              <span className="eyebrow">Based in {CONTACT.location}</span>
              <div className="ab-ctas">
                <GoLink className="cta" to="resume">Resume <Chevron /></GoLink>
                <GoLink className="cta" to="contact">Let&apos;s talk</GoLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <figure className="ab-render">
        <Frame pic={ABOUT_RENDER.pic} sizes="(max-width: 760px) 100vw, calc(100vw - 120px)" className="ab-render-frame" />
        <figcaption>
          <span className="eyebrow">{ABOUT_RENDER.title}</span>
          <span className="eyebrow">{ABOUT_RENDER.place}</span>
        </figcaption>
      </figure>
    </section>
  );
}
