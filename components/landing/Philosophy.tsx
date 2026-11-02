import { Fragment } from "react";
import { THEMES, pad } from "@/data/site";

const QUOTE = "Architecture is more than form. It is a process of exploration.";

/** 03 — Philosophy: the quote lights up word by word; each theme swaps the picture. */
export default function Philosophy() {
  const words = QUOTE.split(" ");
  return (
    <section className="room philo" id="philosophy" data-tone="dark" data-theme="dark" aria-labelledby="philoH">
      <div className="head" style={{ paddingBottom: 64 }}>
        <span className="eyebrow">Architectural Philosophy</span>
        <span />
      </div>
      <blockquote className="philo-quote" id="philoH">
        {words.map((w, i) => (
          <Fragment key={i}>
            <span className="w">{w}</span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </blockquote>
      <div className="philo-grid">
        <div className="philo-pic" id="philoPic">
          {THEMES.map((t, i) => (
            <img key={i} src={t[2]} alt="" style={{ objectPosition: t[3] }} className={i ? "" : "on"} loading="lazy" />
          ))}
          <span className="credit">Temporary reference image</span>
        </div>
        <ol className="themes" id="themes">
          {THEMES.map((t, i) => (
            <li className="theme" data-i={i} key={i}>
              <span className="n">{pad(i + 1)} / {pad(THEMES.length)}</span>
              <h3>{t[0]}</h3>
              <p>{t[1]}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
