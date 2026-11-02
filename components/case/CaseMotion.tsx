"use client";

import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, reduce, refreshNow, scrollTop, setCurrentNav, setTone, wipeOut } from "@/lib/motion";

/** Motion for a project case study. Renders nothing; reverted when the page unmounts. */
export default function CaseMotion({ darkHero }: { darkHero: boolean }) {
  useGSAP(() => {
    const d = document.getElementById("detail")!;
    const q = (s: string) => Array.from(d.querySelectorAll<HTMLElement>(s));

    scrollTop();
    setCurrentNav("projects");
    setTone(darkHero ? "dark" : "light");
    refreshNow();

    if (!reduce()) {
      // hero: image reveal, title rise, then depth on scroll (only for the layers this hero variant has)
      const has = (a: HTMLElement[]) => a.length > 0;
      const reveal = gsap.timeline({ defaults: { ease: "expo.out" } });
      const frame = q(".cs-hero .ph, .hl .bg"), frameImg = q(".cs-hero .ph img, .hl .bg img"), fg = q(".hl .fg");
      if (has(frame)) reveal.from(frame, { clipPath: "inset(12% 10% 12% 10%)", duration: 1.6, ease: "expo.inOut" }, 0);
      if (has(frameImg)) reveal.from(frameImg, { scale: 1.25, duration: 2.2 }, 0);
      if (has(fg)) reveal.from(fg, { yPercent: 16, duration: 2 }, 0);
      reveal
        .from(q(".cs-h1 .line > span, .ttl-back .line > span"), { yPercent: 115, stagger: 0.1, duration: 1.3 }, 0.4)
        .from(q(".cs-in, .cs-hero-top"), { y: 24, opacity: 0, stagger: 0.08, duration: 1 }, 0.8);
      const depth = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: d.querySelector(".cs-hero"), start: "top top", end: "bottom top", scrub: true } });
      const drift = q(".cs-hero .ph .in, .hl .bg"), back = q(".ttl-back");
      if (has(drift)) depth.to(drift, { yPercent: 10 }, 0);
      if (has(fg)) depth.to(fg, { yPercent: -6 }, 0);
      if (has(back)) depth.to(back, { yPercent: 60 }, 0);
      depth.to(q(".cs-hero-text"), { yPercent: -20, opacity: 0 }, 0);

      // photographs: frames open, inner layers drift
      q(".cs-ph .ph, .fin .ph").forEach((f) => {
        const inner = f.querySelector(".in");
        gsap.fromTo(inner, { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: f, start: "top bottom", end: "bottom top", scrub: true } });
        if (!f.closest(".fin")) {
          gsap.fromTo(f, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut", scrollTrigger: { trigger: f, start: "top 88%", toggleActions: "play none none reverse" } });
        }
      });
      q(".cs-lines").forEach((h) => {
        gsap.from(h.querySelectorAll(".line > span"), { yPercent: 110, stagger: 0.08, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: h, start: "top 88%", toggleActions: "play none none reverse" } });
      });
      q(".cs-rv").forEach((e) => {
        gsap.from(e, { y: 34, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: e, start: "top 92%", toggleActions: "play none none reverse" } });
      });
      // chrome follows the light and dark parts of the page
      q(".cs > [data-theme]").forEach((sec) => {
        ScrollTrigger.create({
          trigger: sec, start: "top 50%", end: "bottom 50%",
          onToggle: (s) => {
            if (s.isActive) setTone(sec.getAttribute("data-theme") === "dark" && !sec.classList.contains("hl") ? "dark" : "light");
          },
        });
      });
      ScrollTrigger.refresh();
    }

    wipeOut();

    const imgs = Array.from(d.querySelectorAll("img")).filter((i) => !i.complete);
    let t: ReturnType<typeof setTimeout> | undefined;
    const onLoad = () => { clearTimeout(t); t = setTimeout(() => ScrollTrigger.refresh(), 120); };
    imgs.forEach((i) => i.addEventListener("load", onLoad, { once: true }));
    return () => { clearTimeout(t); imgs.forEach((i) => i.removeEventListener("load", onLoad)); };
  });

  return null;
}
