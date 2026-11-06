import { EXPERTISE } from "@/data/landing";
import { pad } from "@/data/site";
import Frame from "./Frame";

/** 05 — Expertise: four disciplines on an even two-column grid, each led by a drawing or render from the work. */
export default function Expertise() {
  return (
    <section className="room expertise" id="expertise" data-tone="dark" data-theme="dark" aria-labelledby="expH">
      <div className="head">
        <span className="eyebrow">Expertise &amp; Services</span>
        <h2 className="h2 rv-lines" id="expH">
          <span className="line"><span>Four disciplines,</span></span>
          <span className="line"><span className="outline">one way of working.</span></span>
        </h2>
      </div>

      <ol className="x-grid">
        {EXPERTISE.map((x, i) => (
          <li className="x-card" key={x.title}>
            <Frame pic={x.pic} sizes="(max-width: 760px) 100vw, 50vw" reveal={false} />
            <div className="x-body">
              <span className="x-n">{pad(i + 1)}</span>
              <div>
                <h3>{x.title}</h3>
                <p>{x.text}</p>
                <ul className="x-tags">{x.tags.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
