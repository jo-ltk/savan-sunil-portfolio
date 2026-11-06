import { Fragment } from "react";
import Image from "next/image";
import { QUOTE, THEMES } from "@/data/landing";
import { pad } from "@/data/site";
import Frame from "./Frame";

/**
 * 04 — Philosophy: the quote lights up word by word. On wide screens a sticky frame swaps its picture as
 * each theme passes; on smaller screens every theme carries its own picture.
 */
export default function Philosophy() {
  const words = QUOTE.split(" ");
  const N = THEMES.length;
  return (
    <section className="room philo" id="philosophy" data-tone="light" aria-labelledby="philoH">
      <div className="head">
        <span className="eyebrow">Architectural Philosophy</span>
        <blockquote className="philo-quote" id="philoH">
          {words.map((w, i) => (
            <Fragment key={i}>
              <span className="w">{w}</span>
              {i < words.length - 1 ? " " : null}
            </Fragment>
          ))}
        </blockquote>
      </div>

      <div className="philo-grid">
        <ol className="themes">
          {THEMES.map((t, i) => (
            <li className={"theme" + (i === 0 ? " on" : "")} key={t.title}>
              <span className="n">{pad(i + 1)} / {pad(N)}</span>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
              <Frame pic={t.pic} sizes="100vw" className="theme-pic" />
            </li>
          ))}
        </ol>

        <div className="philo-stage" aria-hidden="true">
          <div className="philo-pic" id="philoPic" style={{ aspectRatio: `${THEMES[0].pic.src.width} / ${THEMES[0].pic.src.height}` }}>
            {THEMES.map((t, i) => (
              <Image key={t.title} src={t.pic.src} alt="" sizes="(max-width: 1100px) 1px, 72vw" placeholder="blur" className={i === 0 ? "on" : ""} />
            ))}
          </div>
          <span className="philo-n"><b id="philoN">01</b> / {pad(N)}</span>
        </div>
      </div>
    </section>
  );
}
