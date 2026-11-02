"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { EXPERTISE, pad } from "@/data/site";
import { gsap, reduce, refreshSoon } from "@/lib/motion";

/** 04 — Expertise: accordion (tap) with a swapping visual (desktop: opens on hover). */
export default function Expertise() {
  const [open, setOpen] = useState(0);
  const prev = useRef(0);
  const list = useRef<HTMLOListElement>(null);

  // animate the body heights when the open item changes
  useLayoutEffect(() => {
    const was = prev.current;
    prev.current = open;
    if (was === open || reduce() || !list.current) return;
    const bodies = list.current.querySelectorAll<HTMLElement>(".x-body");
    const opening = bodies[open], closing = bodies[was];
    if (opening) gsap.fromTo(opening, { height: 0 }, { height: "auto", duration: 0.7, ease: "expo.out", onComplete: refreshSoon });
    if (closing) {
      const h = (closing.firstElementChild as HTMLElement | null)?.offsetHeight ?? 0;
      gsap.fromTo(closing, { height: h }, { height: 0, duration: 0.5, ease: "expo.inOut", clearProps: "height", onComplete: refreshSoon });
    }
  }, [open]);

  return (
    <section className="room expertise" id="expertise" data-tone="light" aria-labelledby="expH">
      <div className="head">
        <span className="eyebrow">Expertise &amp; Services</span>
        <h2 className="h2 rv-lines" id="expH">
          <span className="line"><span>Four disciplines,</span></span>
          <span className="line"><span>one way of working.</span></span>
        </h2>
      </div>
      <div className="x-wrap">
        <ol className="x-list" id="xList" ref={list}>
          {EXPERTISE.map((x, i) => (
            <li
              key={x[0]}
              className={"x-item" + (open === i ? " open" : "")}
              onMouseEnter={() => {
                if (window.matchMedia("(hover: hover) and (min-width: 1101px)").matches) setOpen(i);
              }}
            >
              <button
                aria-expanded={open === i}
                aria-controls={`xb${i}`}
                onClick={() => setOpen(open === i && window.innerWidth < 1101 ? -1 : i)}
              >
                <span className="n">{pad(i + 1)}</span>
                <h3>{x[0]}</h3>
                <i aria-hidden="true" />
              </button>
              <div className="x-body" id={`xb${i}`}>
                <div>
                  <p>{x[1]}</p>
                  <ul>{x[2].map((c) => <li key={c}>{c}</li>)}</ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <div className="x-visual" id="xVisual" aria-hidden="true">
          {EXPERTISE.map((x, i) => (
            <img key={x[0]} src={x[3]} alt="" className={open === i ? "on" : ""} style={{ objectPosition: x[4] }} loading="lazy" />
          ))}
          <span className="credit">Temporary reference image</span>
          <span className="xv-n" id="xvN">{pad(open + 1)}</span>
        </div>
      </div>
    </section>
  );
}
