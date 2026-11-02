import { BEHIND, ROLE, pad } from "@/data/site";
import { BackToTop, GoLink } from "@/components/links";
import Year from "@/components/Year";
import Image from "next/image";

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
  const skillGroups = [
    { name: "Architecture Design", skills: ["SketchUp", "Rhino", "Grasshopper"] },
    { name: "BIM | Technical", skills: ["AutoCAD", "Revit", "Navisworks"] },
    { name: "Visualization", skills: ["D5 Render", "Lumion", "Twinmotion", "V-Ray", "Enscape"] },
    { name: "Graphics", skills: ["Photoshop", "InDesign", "Canva", "Sketching"] },
    { name: "AI", skills: ["ChatGPT", "Google AI Studio", "ComfyUI", "Claude", "Nano Banana"] },
  ];

  return (
    <section className="room resume" id="resume" data-tone="light" aria-labelledby="resH">
      <div className="head">
        <span className="eyebrow">Resume &amp; Credentials</span>
        <h2 className="h2 rv-lines" id="resH"><span className="line"><span>Resume</span></span></h2>
        <GoLink className="cta" to="contact">Request full CV</GoLink>
      </div>
      <div className="cv">
        <section className="cv-overview rv" aria-label="Profile">
          <div className="cv-portrait">
            <Image src="/images/savan-sunil.png" alt="Savan Sunil" fill sizes="(max-width: 760px) 240px, (max-width: 1100px) 30vw, 280px" />
          </div>
          <div className="cv-overview-copy">
            <div className="cv-identity">
              <span className="eyebrow">Architect</span>
              <h3 className="cv-name">Savan Sunil</h3>
            </div>
            <dl className="cv-details">
              <div><dt>Date of birth</dt><dd>27 | 05 | 2000</dd></div>
              <div><dt>Location</dt><dd>Dubai, United Arab Emirates</dd></div>
              <div><dt>Email</dt><dd><a href="mailto:ar.savan.works@gmail.com">ar.savan.works@gmail.com</a></dd></div>
              <div><dt>Phone</dt><dd><a href="tel:+971565609242">+971-565609242</a></dd></div>
            </dl>
            <div className="cv-profile">
              <span className="eyebrow">Profile</span>
              <p>Hi, I&apos;m Savan, an Architect. With 3 years of professional experience, passionate about conceptual development, hand sketching, and exploring the relationship between architecture, people, and place. I enjoy transforming initial ideas into meaningful spaces through creative thinking, design development, and architectural visualization.</p>
              <p>With skills in Revit, AutoCAD, Rhino, SketchUp, Adobe Creative Suite, Lumion, V-Ray, D5 Render, and AI-driven architectural workflows, I strive to combine design sensitivity, technical understanding, and computational exploration to create thoughtful, purposeful architecture.</p>
            </div>
          </div>
        </section>
        <section className="cv-education rv">
          <h3>Education</h3>
          <ol className="tl">
            <li><span className="when">2018 – 2023</span><div><strong>Bachelor of Architecture</strong><span>Mahatma Gandhi University, Kerala, India</span></div></li>
          </ol>
        </section>
        <section className="cv-experience rv">
          <h3>Professional Experience</h3>
          <ol className="tl">
            <li><span className="when">2024 – 2026</span><div><strong>Xbd Collective</strong><span>Architect · Dubai | India | Egypt</span></div></li>
            <li><span className="when">2026</span><div><strong>Bloc Forms</strong><span>3D Visualizer (Freelancer) · Kottayam, India</span></div></li>
            <li><span className="when">2023 – 2024</span><div><strong>Hitanshu Jishtu Architects</strong><span>Jr. Architect · Himachal Pradesh, India</span></div></li>
            <li><span className="when">2022 – 2023</span><div><strong>Prashant Pradhan Architects</strong><span>Intern Architect · Sikkim, India</span></div></li>
          </ol>
        </section>
        <section className="cv-skills rv">
          <h3>Skills</h3>
          <div className="cv-skills-grid">
            {skillGroups.map((group) => (
              <div className="cv-skill-group" key={group.name}>
                <h4>{group.name}</h4>
                <ul className="chips">{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>
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
