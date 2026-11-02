import { IMG } from "@/data/site";
import { GoLink } from "@/components/links";
import { Chevron } from "@/components/ui";

/** 01 — Hero: sky, name and building on three depths. */
export default function Hero() {
  return (
    <section className="room hero" id="top" data-tone="light" aria-labelledby="heroH">
      <div className="hero-layer" id="heroBg">
        <img src={IMG.cabin} alt="" fetchPriority="high" />
      </div>
      <p className="hero-name" id="heroName" aria-hidden="true">
        <span className="line"><span>Savan Sunil</span></span>
      </p>
      <div className="hero-layer hero-fg" id="heroFg">
        <img src={IMG.cabinCut} alt="Dark timber cabin on a rocky hillside" />
      </div>
      <div className="hero-fade" aria-hidden="true" />
      <div className="hero-meta h-in">
        <span className="eyebrow">Architect — Parametric · BIM · Design</span>
        <span className="eyebrow status">
          <i aria-hidden="true" />
          <span className="tbd" data-edit="location">Location / availability</span>
        </span>
      </div>
      <div className="hero-bottom">
        <div className="scroll-cue h-in" aria-hidden="true"><span>Scroll</span><i /></div>
        <h1 id="heroH">
          <span className="sr" style={{ position: "absolute", left: -9999 }}>Savan Sunil — </span>
          <span className="line"><span>Architecture</span></span>
          <span className="line"><span>Beyond Boundaries.</span></span>
        </h1>
        <aside className="h-in">
          <p>An architect exploring the intersection of architectural design, computational thinking and technical precision.</p>
          <div className="hero-ctas">
            <GoLink className="cta" to="projects">Selected projects <Chevron /></GoLink>
            <GoLink className="cta" to="about">About</GoLink>
          </div>
        </aside>
      </div>
      <span className="credit">Temporary reference image</span>
    </section>
  );
}
