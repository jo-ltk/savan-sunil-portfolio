import { CONTACT } from "@/data/landing";
import { ROLE } from "@/data/site";
import { BackToTop, GoLink } from "@/components/links";
import Year from "@/components/Year";

/** 10 — Contact and footer. */
export default function Contact() {
  return (
    <section className="room contact" id="contact" data-tone="dark" data-theme="dark" aria-labelledby="cH">
      <h2 className="big" id="cH">
        <span className="line"><span>Have a project</span></span>
        <span className="line"><span className="outline">in mind?</span></span>
      </h2>

      <div className="c-grid">
        <span className="eyebrow">Contact</span>
        <div className="c-main">
          <p className="rv">Let&apos;s create something meaningful together. Open to architectural projects and collaborations.</p>
          <a className="c-mail rv" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </div>
        <dl className="c-list">
          <div className="c-item rv"><dt className="eyebrow">Phone</dt><dd><a href={`tel:${CONTACT.tel}`}>{CONTACT.phone}</a></dd></div>
          <div className="c-item rv"><dt className="eyebrow">Location</dt><dd>{CONTACT.location}</dd></div>
        </dl>
        <a className="c-cta" href={`mailto:${CONTACT.email}`} data-cursor="view"><span>Get in touch</span></a>
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
