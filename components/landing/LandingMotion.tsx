"use client";

import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, isCovered, refreshNow, scrollToId, scrollTop, setCurrentNav, setTone, wipeOut } from "@/lib/motion";

const pad = (n: number) => (n < 10 ? "0" + n : "" + n);
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector(s) as T;
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll(s)) as T[];

/** Scroll choreography for the landing page. Renders nothing; all motion is scoped to #landing and reverted on unmount. */
export default function LandingMotion() {
  useGSAP(() => {
    const body = document.body;
    const landing = $("#landing");

    function setTheme(i: number) {
      $$("#philoPic img").forEach((im, k) => im.classList.toggle("on", k === i));
      $$(".theme").forEach((t, k) => { $("h3", t).style.opacity = k === i ? "1" : ".35"; });
    }

    const mm = gsap.matchMedia();
    mm.add(
      { motion: "(prefers-reduced-motion: no-preference)", reduced: "(prefers-reduced-motion: reduce)", wide: "(min-width: 1101px)", fine: "(hover: hover) and (pointer: fine)" },
      (ctx) => {
        const c = ctx.conditions as Record<string, boolean>;
        const offs: (() => void)[] = [];
        if (c.reduced) {
          body.classList.add("no-pin");
          setTone("light");
          $$(".philo-quote .w").forEach((w) => { w.style.opacity = "1"; });
          return;
        }
        body.classList.add("tone-js");
        if (!c.wide) body.classList.add("no-pin");

        /* 01 hero: image and name entrance, then subtle depth on scroll */
        gsap.timeline({ defaults: { ease: "expo.out" } })
          .from("#heroBg", { scale: 1.12, duration: 2.4 }, 0)
          .from("#heroName .line > span", { yPercent: 110, duration: 1.4 }, 0.3)
          .from("#heroH .line > span", { yPercent: 110, duration: 1.2, stagger: 0.08 }, 0.6)
          .from(".h-in, #nav > *", { opacity: 0, y: 16, duration: 0.9, stagger: 0.05, clearProps: "opacity,transform" }, 0.8);
        gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: "#top", start: "top top", end: "bottom top", scrub: true } })
          .to("#heroBg", { yPercent: 8 }, 0)
          .to("#heroName", { yPercent: 70, opacity: 0.2 }, 0)
          .to(".hero-bottom", { yPercent: -40, opacity: 0 }, 0);

        /* 02 projects: each scene slides up over the last. While it arrives, panel, picture and type travel
           at three different speeds; while the next one covers it, it sinks back and dims. All scrubbed. */
        const scenes = $$(".scene");
        scenes.forEach((sc, i) => {
          const pic = $(".s-pic", sc), panel = $(".s-panel", sc), copy = $$(".s-copy, .s-count, .s-label", sc), inner = $(".s-inner", sc);
          const png = pic.classList.contains("png");
          if (i > 0) {
            gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: sc, start: "top bottom", end: "top top", scrub: true } })
              .fromTo(panel, { yPercent: 14 }, { yPercent: 0 }, 0)
              .fromTo(pic, { yPercent: png ? 38 : 22, scale: png ? 1.08 : 1.04 }, { yPercent: 0, scale: 1 }, 0)
              .fromTo(copy, { yPercent: 60 }, { yPercent: 0 }, 0);
          }
          // the type rises line by line once the scene is mostly in place
          gsap.from($$(".line > span", sc), { yPercent: 115, duration: 1.1, stagger: 0.06, ease: "expo.out", scrollTrigger: { trigger: sc, start: i ? "top 35%" : "top 70%", toggleActions: "play none none reverse" } });
          // while in place, the building keeps drifting against its frame (depth)
          const nx = scenes[i + 1];
          if (nx) {
            gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: nx, start: "top bottom", end: "top top", scrub: true } })
              .to(inner, { scale: 0.92, yPercent: -4 }, 0)
              .to(pic, { yPercent: png ? -18 : -8 }, 0)
              .to($(".s-shade", sc), { opacity: 0.55 }, 0);
          }
        });
        // first scene: the frame opens and the building rises into it as the section arrives
        const s0 = scenes[0];
        gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: s0, start: "top bottom", end: "top top", scrub: true } })
          .fromTo($(".s-panel", s0), { clipPath: "inset(20% 20% 20% 20%)" }, { clipPath: "inset(0% 0% 0% 0%)" }, 0)
          .fromTo($(".s-pic", s0), { yPercent: 40 }, { yPercent: 0 }, 0);

        /* 03 philosophy: quote lights up word by word; themes swap the picture */
        gsap.to(".philo-quote .w", { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: ".philo-quote", start: "top 80%", end: "bottom 40%", scrub: true } });
        $$(".theme").forEach((t, i) => {
          ScrollTrigger.create({ trigger: t, start: "top 60%", end: "bottom 60%", onToggle: (s) => { if (s.isActive) setTheme(i); } });
        });
        setTheme(0);

        /* 05 process: pinned horizontal timeline (wide screens) */
        if (c.wide) {
          const tr = $("#prTrack"), steps = $$(".pr-step", tr);
          const vw = () => document.documentElement.clientWidth;
          const dist = () => tr.scrollWidth - vw() + vw() * 0.18;
          let last = -1;
          gsap.timeline({
            scrollTrigger: {
              trigger: ".pr-pin", start: "top top", end: () => "+=" + dist(), pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1,
              onUpdate: (s) => {
                const k = Math.min(4, Math.floor(s.progress * 5));
                if (k !== last) {
                  last = k;
                  $("#prNow").textContent = pad(k + 1);
                  steps.forEach((st, j) => { st.classList.toggle("on", j <= k); st.style.opacity = j <= k ? "1" : ".35"; });
                }
              },
            },
          })
            .to(tr, { x: () => -dist(), ease: "none" }, 0)
            .to("#prLine", { scaleX: 1, ease: "none" }, 0);
        }

        /* 06 behind the design: frames open one by one */
        $$(".b-item").forEach((b, i) => {
          gsap.fromTo($(".box", b), { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "expo.inOut", scrollTrigger: { trigger: b, start: "top 88%", toggleActions: "play none none reverse" } });
          gsap.fromTo(b, { y: 60 * ((i % 3) + 1) }, { y: -30 * ((i % 3) + 1), ease: "none", scrollTrigger: { trigger: b, start: "top bottom", end: "bottom top", scrub: true } });
        });

        /* headings, copy, contact */
        $$(".rv-lines").forEach((h) => {
          gsap.from(h.querySelectorAll(".line > span"), { yPercent: 110, stagger: 0.08, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: h, start: "top 88%", toggleActions: "play none none reverse" } });
        });
        $$("#landing .rv").forEach((e) => {
          gsap.from(e, { y: 30, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: e, start: "top 92%", toggleActions: "play none none reverse" } });
        });
        gsap.from("#cH .line > span", { yPercent: 110, stagger: 0.12, duration: 1.3, ease: "expo.out", scrollTrigger: { trigger: "#contact", start: "top 70%", toggleActions: "play none none reverse" } });
        gsap.fromTo("#cH", { xPercent: 4 }, { xPercent: -6, ease: "none", scrollTrigger: { trigger: "#contact", start: "top bottom", end: "bottom top", scrub: true } });
        gsap.from(".foot > *", { y: 40, opacity: 0, stagger: 0.1, duration: 1, ease: "expo.out", scrollTrigger: { trigger: ".foot", start: "top 95%", toggleActions: "play none none reverse" } });

        /* pointer: hero image and name follow the mouse */
        if (c.fine) {
          const bgx = gsap.quickTo("#heroBg img", "x", { duration: 1.6, ease: "power3" });
          const nmx = gsap.quickTo("#heroName", "x", { duration: 1.5, ease: "power3" });
          const onMove = (e: MouseEvent) => {
            const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5;
            bgx(-nx * 10); nmx(nx * 18);
            const t = e.target as Element | null;
            const sc = t && t.closest ? t.closest(".scene") : null;
            if (sc) {
              gsap.to($(".s-pic img", sc), { x: -nx * 36, y: -ny * 18, duration: 1.2, ease: "power3.out", overwrite: "auto" });
              gsap.to($(".s-text", sc), { x: nx * 12, y: ny * 8, duration: 1.2, ease: "power3.out", overwrite: "auto" });
            }
          };
          window.addEventListener("mousemove", onMove);
          offs.push(() => window.removeEventListener("mousemove", onMove));
        }

        /* rooms (last, so every pin is already measured) */
        $$("#landing .room").forEach((r) => {
          ScrollTrigger.create({
            trigger: r, start: "top 50%", end: "bottom 50%",
            onToggle: (s) => {
              if (!s.isActive) return;
              setTone(r.getAttribute("data-tone") === "dark" ? "dark" : "light");
              const sid = r.id || r.closest("section[id]")?.id || "";
              setCurrentNav(sid);
            },
          });
        });
        ScrollTrigger.sort();

        return () => offs.forEach((f) => f());
      },
    );

    /* arrival: open at the requested section (/#about), reveal the page from behind the wipe */
    const arrivedByWipe = isCovered();
    refreshNow();
    const id = decodeURIComponent(location.hash.slice(1));
    if (id && document.getElementById(id)) scrollToId(id, false);
    else if (arrivedByWipe) scrollTop();
    if (!id) setCurrentNav("");
    wipeOut();

    // images that finish loading later change heights: re-measure
    const imgs = $$<HTMLImageElement>("img", landing).filter((i) => !i.complete);
    let t: ReturnType<typeof setTimeout> | undefined;
    const onLoad = () => { clearTimeout(t); t = setTimeout(() => ScrollTrigger.refresh(), 120); };
    imgs.forEach((i) => i.addEventListener("load", onLoad, { once: true }));

    return () => {
      clearTimeout(t);
      imgs.forEach((i) => i.removeEventListener("load", onLoad));
      mm.revert();
    };
  });

  return null;
}
