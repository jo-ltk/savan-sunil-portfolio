import { ARCHIVE } from "@/data/landing";
import { pad } from "@/data/site";
import Frame from "./Frame";

/** 03 — Further work: a pinned horizontal gallery on wide screens, a native swipe rail elsewhere. */
export default function Archive() {
  const N = ARCHIVE.length;
  return (
    <section className="room archive" id="archive" data-tone="dark" data-theme="dark" aria-labelledby="arH">
      <div className="ar-pin">
        <div className="head">
          <span className="eyebrow">Studio &amp; Academic Work</span>
          <h2 className="h2 rv-lines" id="arH">
            <span className="line"><span>More from</span></span>
            <span className="line"><span className="outline">the archive.</span></span>
          </h2>
          <span className="ar-count" aria-hidden="true">
            <b id="arNow">01</b> / {pad(N)}
          </span>
        </div>

        <div className="ar-rail" tabIndex={0} aria-label="Archive projects, scroll horizontally">
          <ol className="ar-track" id="arTrack">
            {ARCHIVE.map((a, i) => (
              <li className="ar-card" key={a.title}>
                <Frame pic={a.pic} sizes="(max-width: 760px) 86vw, (max-width: 1100px) 70vw, 60vw" reveal={false} />
                <div className="ar-cap">
                  <span className="ar-n">{pad(i + 1)}</span>
                  <h3>{a.title}</h3>
                  <span className="eyebrow ar-type">{a.type}</span>
                  <span className="eyebrow ar-place">{a.place}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="ar-bar" aria-hidden="true"><i id="arBar" /></div>
      </div>
    </section>
  );
}
