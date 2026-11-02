import { BEHIND, ROLE, pad } from "@/data/site";
import { BackToTop, GoLink } from "@/components/links";
import Year from "@/components/Year";

/** 05 — Design process: pinned horizontal timeline on wide screens, a stacked list elsewhere. */
export function Process() {
  const steps = ["Research & Analysis", "Concept Development", "Computational Exploration", "Technical Development", "Design Documentation"];
  return (
    <section className="room process" id="process" data-tone="light" aria-labelledby="procH" style={{ background: "var(--surface-mist)" }}>
      <div className="pr-pin">
        <div className="head">
          <span className="eyebrow">Design Process</span>
          <h2 className="h2 rv-lines" id="procH">
            <span className="line"><span>From research</span></span>
            <span className="line"><span>to documentation.</span></span>
          </h2>
          <span className="pr-now"><span id="prNow">01</span> / 05</span>
        </div>
        <div className="pr-rail">
          <div className="pr-line"><i id="prLine" /></div>
          <ol className="pr-track" id="prTrack">
            {steps.map((s, i) => (
              <li key={s} className={"pr-step" + (i === 0 ? " on" : "")}>
                <span className={"big" + (i % 2 ? " outline" : "")}>{pad(i + 1)}</span>
                <h3>{s}</h3>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** 06 — Behind the design: an editable gallery of drawings and studies. */
export function Behind() {
  return (
    <section className="room behind" id="behind" data-tone="dark" data-theme="dark" aria-labelledby="behH">
      <div className="head">
        <span className="eyebrow">Behind the Design</span>
        <h2 className="h2 rv-lines" id="behH">
          <span className="line"><span>The work behind</span></span>
          <span className="line"><span className="outline">the work.</span></span>
        </h2>
      </div>
      <div className="b-grid" id="bGrid">
        {BEHIND.map((b, i) => (
          <figure className={`b-item b${i + 1}`} key={b}>
            <div className="box"><div className="slot">Add {b.toLowerCase()}</div></div>
            <figcaption>
              <span className="eyebrow">{pad(i + 1)}</span>
              <span className="eyebrow">{b}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/** 07 — About. */
export function About() {
  return (
    <section className="room about" id="about" data-tone="light" aria-labelledby="aboutH">
      <div className="ab-grid">
        <span className="eyebrow">About</span>
        <div className="ab-left">
          <h2 className="h2 rv-lines" id="aboutH">
            <span className="line"><span>Designing ideas</span></span>
            <span className="line"><span>into spatial</span></span>
            <span className="line"><span>experiences.</span></span>
          </h2>
          <div className="slot portrait rv">Add portrait photograph</div>
        </div>
        <div className="ab-right">
          <p className="lead rv">
            I am Savan Sunil, an architect interested in exploring the relationship between design, geometry and technology. My work combines architectural thinking, computational exploration and technical development.
          </p>
          <div className="ab-block rv"><span className="eyebrow">Background</span><p className="tbd">Add architectural background</p></div>
          <div className="ab-block rv"><span className="eyebrow">Philosophy</span><p>An approach shaped by curiosity, experimentation and precision.</p></div>
          <div className="ab-block rv"><span className="eyebrow">Experience</span><p className="tbd">Add professional experience summary</p></div>
          <div className="ab-block rv"><span className="eyebrow">Skills</span><p>Revit · BIM · Technical documentation · Parametric design <span className="tbd">Add further software</span></p></div>
          <div className="ab-block rv"><span className="eyebrow">Education</span><p className="tbd">Add degree, institution and year</p></div>
        </div>
      </div>
    </section>
  );
}

/** 08 — Resume & credentials. */
export function Resume() {
  return (
    <section className="room resume" id="resume" data-tone="light" aria-labelledby="resH">
      <div className="head">
        <span className="eyebrow">Resume &amp; Credentials</span>
        <h2 className="h2 rv-lines" id="resH"><span className="line"><span>Resume</span></span></h2>
        <GoLink className="cta" to="contact">Request full CV</GoLink>
      </div>
      <div className="cv">
        <section className="rv"><h3>Education</h3><ol className="tl"><li><span className="when tbd">Year</span><div><strong className="tbd">Degree</strong><span>Institution, city</span></div></li></ol></section>
        <section className="rv"><h3>Professional Experience</h3><ol className="tl"><li><span className="when tbd">Years</span><div><strong className="tbd">Role</strong><span>Practice, city</span></div></li></ol></section>
        <section className="rv"><h3>Software</h3><ul className="chips"><li>Revit</li><li className="tbd">Add software</li></ul></section>
        <section className="rv">
          <h3>Technical Capabilities</h3>
          <ul className="chips">
            <li>Parametric Architecture</li><li>BIM modelling</li><li>Technical documentation</li>
            <li>Coordinated drawings</li><li>Architectural Design</li><li>Computational Design</li>
          </ul>
        </section>
        <section className="rv"><h3>Certifications</h3><ol className="tl"><li><span className="when tbd">Year</span><div><strong className="tbd">Certification</strong><span>Issuer</span></div></li></ol></section>
      </div>
    </section>
  );
}

/** 09 — Contact and footer. */
export function Contact() {
  return (
    <section className="room contact" id="contact" data-tone="dark" data-theme="dark" aria-labelledby="cH">
      <h2 className="big" id="cH">
        <span className="line"><span>Have a project</span></span>
        <span className="line"><span className="outline">in mind?</span></span>
      </h2>
      <div className="c-grid">
        <span className="eyebrow">Contact</span>
        <p className="rv">Let&apos;s create something meaningful together. Open to architectural projects and collaborations.</p>
        <div className="c-item rv"><dt className="eyebrow">Email</dt><dd className="tbd">Add email address</dd></div>
        <div className="c-item rv"><dt className="eyebrow">LinkedIn</dt><dd className="tbd">Add LinkedIn URL</dd></div>
        <span />
        <div className="c-item rv"><dt className="eyebrow">Portfolio links</dt><dd className="tbd">Add Behance / Issuu</dd></div>
        <div className="c-item rv"><dt className="eyebrow">Location</dt><dd className="tbd">Add city, country</dd></div>
        <GoLink className="c-cta rv" to="top" data-cursor="view">Get in touch</GoLink>
      </div>
      <footer className="foot">
        <span className="mark">Savan Sunil</span>
        <nav aria-label="Footer">
          <GoLink to="projects">Projects</GoLink><GoLink to="philosophy">Philosophy</GoLink><GoLink to="expertise">Expertise</GoLink>
        </nav>
        <nav aria-label="Footer more">
          <GoLink to="process">Process</GoLink><GoLink to="about">About</GoLink><GoLink to="resume">Resume</GoLink>
        </nav>
      </footer>
      <div className="foot-bar">
        <span className="eyebrow" id="copy"><Year /></span>
        <span className="eyebrow">{ROLE}</span>
        <BackToTop />
      </div>
    </section>
  );
}
