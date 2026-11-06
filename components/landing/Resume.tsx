import { CONTACT, EDUCATION, EXPERIENCE, SKILLS } from "@/data/landing";
import { GoLink } from "@/components/links";

/** 09 — Resume: experience as an index, then education, skills and details. */
export default function Resume() {
  return (
    <section className="room resume" id="resume" data-tone="light" aria-labelledby="resH">
      <div className="head">
        <span className="eyebrow">Resume &amp; Credentials</span>
        <h2 className="h2 rv-lines" id="resH"><span className="line"><span>Resume</span></span></h2>
        <GoLink className="cta" to="contact">Request full CV</GoLink>
      </div>

      <div className="cv">
        <div className="cv-block cv-exp">
          <h3 className="cv-h">Experience</h3>
          <ol className="xp">
            {EXPERIENCE.map(([when, studio, role, place]) => (
              <li className="xp-row rv" key={studio}>
                <span className="xp-when">{when}</span>
                <strong className="xp-studio">{studio}</strong>
                <span className="xp-role">{role}</span>
                <span className="xp-place">{place}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="cv-block cv-edu">
          <h3 className="cv-h">Education</h3>
          <ol className="xp">
            {EDUCATION.map(([when, degree, school]) => (
              <li className="xp-row edu-row rv" key={degree}>
                <span className="xp-when">{when}</span>
                <strong className="xp-studio">{degree}</strong>
                <span className="xp-place">{school}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="cv-block cv-skills">
          <h3 className="cv-h">Skills</h3>
          <div className="sk-list">
            {SKILLS.map((g, i) => (
              <div className="sk rv" key={g.name}>
                <span className="sk-n">{String(i + 1).padStart(2, "0")}</span>
                <h4>{g.name}</h4>
                <ul className="chips">{g.items.map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>

        <div className="cv-block cv-info rv">
          <h3 className="cv-h">Details</h3>
          <dl className="cv-details">
            <div><dt>Born</dt><dd>{CONTACT.born}</dd></div>
            <div><dt>Based in</dt><dd>{CONTACT.location}</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}
