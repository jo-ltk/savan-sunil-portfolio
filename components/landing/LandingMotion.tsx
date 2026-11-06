"use client";

import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, isCovered, refreshNow, scrollToId, scrollTop, setCurrentNav, setTone, wipeOut } from "@/lib/motion";

const pad = (n: number) => (n < 10 ? "0" + n : "" + n);
const STEPS = 5; // interlude stages: site & grid, structure, floors, envelope, light & life
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector(s) as T;
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll(s)) as T[];

/** Scroll choreography for the landing page. Renders nothing; all motion is scoped to #landing and reverted on unmount. */
export default function LandingMotion() {
  useGSAP(() => {
    const body = document.body;
    const landing = $("#landing");
    const offs: (() => void)[] = [];

    /* archive rail (touch / narrow screens): counter and bar follow the native horizontal scroll */
    const rail = $(".ar-rail"), arBar = $("#arBar"), arNow = $("#arNow");
    const arN = $$(".ar-card").length;
    const setArchive = (p: number) => {
      arBar.style.transform = `scaleX(${Math.max(0.04, p)})`;
      arNow.textContent = pad(Math.min(arN, Math.round(p * (arN - 1)) + 1));
    };
    const onRail = () => setArchive(rail.scrollLeft / Math.max(1, rail.scrollWidth - rail.clientWidth));
    rail.addEventListener("scroll", onRail, { passive: true });
    offs.push(() => rail.removeEventListener("scroll", onRail));
    setArchive(0);

    /* philosophy: the active theme lights its row, picture and counter */
    const themes = $$(".theme"), themePics = $$("#philoPic img"), philoN = $("#philoN");
    function setTheme(i: number) {
      themes.forEach((t, k) => t.classList.toggle("on", k === i));
      themePics.forEach((im, k) => im.classList.toggle("on", k === i));
      philoN.textContent = pad(i + 1);
    }
    /** wide screens: the sticky picture follows the theme in view (not an animation, so it also runs with reduced motion) */
    function livePhilosophy(local: (() => void)[]) {
      const philo = $("#philosophy");
      philo.classList.add("is-live");
      local.push(() => philo.classList.remove("is-live"));
      themes.forEach((t, i) => {
        ScrollTrigger.create({ trigger: t, start: "top 55%", end: "bottom 55%", onToggle: (s) => { if (s.isActive) setTheme(i); } });
      });
      setTheme(0);
    }

    const mm = gsap.matchMedia();
    mm.add(
      { motion: "(prefers-reduced-motion: no-preference)", reduced: "(prefers-reduced-motion: reduce)", wide: "(min-width: 1101px)", tall: "(min-height: 560px)", fine: "(hover: hover) and (pointer: fine)" },
      (ctx) => {
        const c = ctx.conditions as Record<string, boolean>;
        const local: (() => void)[] = [];
        if (c.reduced) {
          body.classList.add("no-pin");
          setTone("light");
          $$(".philo-quote .w").forEach((w) => { w.style.opacity = "1"; });
          if (c.wide) livePhilosophy(local);
          return () => local.forEach((f) => f());
        }
        body.classList.add("tone-js");
        if (!c.wide) body.classList.add("no-pin");

        /* 06½ interlude: the building constructs itself, stage by stage, scrubbed to the scroll.
           Set up first: going live changes the section's layout, and later triggers measure below it. */
        {
          const bd = $("#build"), pct = $("#bdPct"), steps = $$(".bd-steps li", bd);
          const stage = (i: number) => $$(`.bd-live [data-stage="${i}"] path`, bd);
          const texts = (i: number) => $$(`.bd-live [data-stage="${i}"] text`, bd);
          const crane = $("#bdCrane"), wins = $$(".bd-win", bd);
          const all = $$(".bd-live path, .bd-live text, .bd-win", bd);
          bd.classList.add("is-live");
          const paths = $$(".bd-live path", bd);
          gsap.set(paths, { attr: { "stroke-dasharray": 1, "stroke-dashoffset": 1 } });
          gsap.set($$(".bd-live text", bd), { opacity: 0 });
          gsap.set(wins, { opacity: 0 });
          gsap.set(crane, { opacity: 1 });
          const setStep = (p: number) => {
            const s = Math.min(STEPS - 1, Math.floor(p * (STEPS + 0.5)));
            steps.forEach((li, k) => { li.classList.toggle("on", k <= s); li.classList.toggle("now", k === s); });
            pct.textContent = String(Math.min(100, Math.round((p * (STEPS + 0.5) / STEPS) * 100)));
          };
          setStep(0);
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            // wide: a full-screen room pinned at the top; narrower: content-sized and pinned centred on screen
            scrollTrigger: {
              trigger: bd, start: c.wide ? "top top" : "center center", end: () => "+=" + innerHeight * (c.wide ? 2.4 : 1.6),
              pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true, refreshPriority: -1,
              onUpdate: (s) => setStep(s.progress),
            },
          });
          for (let i = 0; i < STEPS; i++) {
            const ps = stage(i);
            tl.to(ps, { attr: { "stroke-dashoffset": 0 }, duration: 0.6, stagger: 0.4 / Math.max(1, ps.length - 1) }, i);
            if (texts(i).length) tl.to(texts(i), { opacity: 1, duration: 0.25 }, i + 0.55);
          }
          tl.to(wins, { opacity: 0.85, duration: 0.25, stagger: { each: 0.05, from: "random" } }, STEPS - 1 + 0.15)
            .to(crane, { opacity: 0, duration: 0.4 }, STEPS - 1 + 0.4)
            .to({}, { duration: 0.5 }, STEPS); // hold the finished building before the section scrolls away
          local.push(() => {
            bd.classList.remove("is-live");
            gsap.set([...all, crane], { clearProps: "all" });
            paths.forEach((p) => { p.removeAttribute("stroke-dasharray"); p.removeAttribute("stroke-dashoffset"); });
            steps.forEach((li) => { li.classList.add("on"); li.classList.remove("now"); });
            pct.textContent = "100";
          });
        }

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

        /* frames: the clip opens and the picture settles from a slight zoom to exactly 1 (uncropped at rest) */
        // frames that sit side by side (same top edge) open one after another rather than all at once
        let rowTop = NaN, inRow = 0;
        $$("#landing [data-reveal]").forEach((f) => {
          const inner = $(".frame-in", f);
          if (f.matches(".pj-frame, .ab-render-frame")) {
            // wide covers: scrubbed to the scroll, so the picture "opens" as it arrives
            gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: f, start: "top bottom", end: "top 25%", scrub: 0.6 } })
              .fromTo(f, { clipPath: "inset(10% 7% 10% 7%)" }, { clipPath: "inset(0% 0% 0% 0%)" }, 0)
              .fromTo(inner, { scale: 1.16 }, { scale: 1 }, 0);
            return;
          }
          const top = Math.round(f.getBoundingClientRect().top + scrollY);
          inRow = Math.abs(top - rowTop) < 4 ? inRow + 1 : 0;
          rowTop = top;
          gsap.timeline({ delay: inRow * 0.14, scrollTrigger: { trigger: f, start: "top 88%", toggleActions: "play none none reverse" } })
            .fromTo(f, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut" }, 0)
            .fromTo(inner, { scale: 1.2 }, { scale: 1, duration: 1.8, ease: "expo.out" }, 0.1);
        });

        /* depth: elements marked data-speed drift against the scroll (wide screens only, where they sit side by side) */
        if (c.wide) {
          $$("#landing [data-speed]").forEach((el) => {
            const s = parseFloat(el.dataset.speed || "0");
            gsap.fromTo(el, { y: () => -s * innerHeight }, {
              y: () => s * innerHeight, ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
            });
          });
        }

        /* 03 archive: pinned horizontal gallery, scrolling down moves it right. Phones too when there is
           height for it; short landscape phones keep the native swipe rail. */
        if (c.wide || c.tall) {
          const sec = $("#archive"), tr = $("#arTrack");
          sec.classList.add("is-pinned");
          local.push(() => sec.classList.remove("is-pinned"));
          // the rail is overflow-visible while pinned: measure against the viewport minus the rail's gutters
          const dist = () => {
            const cs = getComputedStyle(rail);
            return Math.max(0, tr.scrollWidth - (document.documentElement.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)));
          };
          gsap.timeline({
            scrollTrigger: {
              // wide: a full-screen room; narrower: the section keeps its own height and pins centred on screen
              trigger: sec, start: c.wide ? "top top" : "center center", end: () => "+=" + dist(), pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1,
              onUpdate: (s) => setArchive(s.progress),
            },
          })
            .to(tr, { x: () => -dist(), ease: "none" }, 0)
            .fromTo($$(".ar-card .frame-in", tr), { xPercent: 6 }, { xPercent: -6, ease: "none" }, 0);
        }

        /* 04 philosophy: the quote lights up word by word; on wide screens the themes drive the sticky picture */
        gsap.to(".philo-quote .w", { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: ".philo-quote", start: "top 80%", end: "bottom 45%", scrub: true } });
        if (c.wide) livePhilosophy(local);

        /* 06 process: the line fills as you read; each stage switches on when it reaches it */
        gsap.fromTo("#prLine", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".pr-wrap", start: "top 60%", end: "bottom 60%", scrub: true } });
        $$(".pr-step").forEach((st) => {
          ScrollTrigger.create({ trigger: st, start: "top 60%", onEnter: () => st.classList.add("on"), onLeaveBack: () => st.classList.remove("on") });
        });

        /* 08 about: figures count up */
        $$(".count").forEach((el) => {
          gsap.from(el, { textContent: 0, duration: 1.6, ease: "power2.out", snap: { textContent: 1 }, scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" } });
        });

        /* 05 expertise: each card opens as it arrives (picture, then copy) and eases away as it leaves */
        $$("#expertise .x-card").forEach((card, i) => {
          const frame = $(".frame", card), inner = $(".frame-in", card), body = $(".x-body", card);
          const wideRow = c.wide ? i % 2 : 0;
          gsap.set(frame, { clipPath: "inset(100% 0% 0% 0%)" });
          gsap.set(inner, { scale: 1.2 });
          gsap.set(body, { y: 30, opacity: 0 });
          gsap.timeline({ delay: wideRow * 0.14, scrollTrigger: { trigger: card, start: "top 92%", toggleActions: "play none none reverse" } })
            .to(frame, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut" }, 0)
            .to(inner, { scale: 1, duration: 1.8, ease: "expo.out" }, 0.1)
            .to(body, { y: 0, opacity: 1, duration: 1, ease: "expo.out" }, 0.5);
          // closing: scrubbed fade and lift while the card leaves through the top of the screen
          gsap.fromTo(card, { y: 0, opacity: 1 }, { y: -60, opacity: 0.1, ease: "none", immediateRender: false, scrollTrigger: { trigger: card, start: "bottom 30%", end: "bottom -10%", scrub: true } });
        });
        local.push(() => gsap.set("#expertise .x-card, #expertise .frame, #expertise .frame-in, #expertise .x-body", { clearProps: "opacity,transform,clipPath" }));

        /* headings, copy, contact */
        $$(".rv-lines").forEach((h) => {
          gsap.from(h.querySelectorAll(".line > span"), { yPercent: 110, stagger: 0.08, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: h, start: "top 88%", toggleActions: "play none none reverse" } });
        });
        // copy blocks that arrive together (stats, cards in a row, chips) enter as one staggered group
        const rv = $$("#landing .rv");
        gsap.set(rv, { y: 30, opacity: 0 });
        ScrollTrigger.batch(rv, {
          start: "top 92%",
          onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 1, ease: "expo.out", stagger: 0.08, overwrite: true }),
          onLeaveBack: (els) => gsap.to(els, { y: 30, opacity: 0, duration: 0.4, ease: "power2.in", overwrite: true }),
        });
        local.push(() => gsap.set(rv, { clearProps: "opacity,transform" }));
        gsap.from("#cH .line > span", { yPercent: 110, stagger: 0.12, duration: 1.3, ease: "expo.out", scrollTrigger: { trigger: "#contact", start: "top 70%", toggleActions: "play none none reverse" } });
        gsap.fromTo("#cH", { xPercent: 4 }, { xPercent: -6, ease: "none", scrollTrigger: { trigger: "#contact", start: "top bottom", end: "bottom top", scrub: true } });
        gsap.from(".foot > *", { y: 40, opacity: 0, stagger: 0.1, duration: 1, ease: "expo.out", scrollTrigger: { trigger: ".foot", start: "top 95%", toggleActions: "play none none reverse" } });

        /* pointer: hero image and name follow the mouse; the contact button is magnetic */
        if (c.fine) {
          const bgx = gsap.quickTo("#heroBg img", "x", { duration: 1.6, ease: "power3" });
          const nmx = gsap.quickTo("#heroName", "x", { duration: 1.5, ease: "power3" });
          const onMove = (e: MouseEvent) => {
            const nx = e.clientX / innerWidth - 0.5;
            bgx(-nx * 10); nmx(nx * 18);
          };
          window.addEventListener("mousemove", onMove);
          local.push(() => window.removeEventListener("mousemove", onMove));

          const cta = $(".c-cta");
          const cx = gsap.quickTo(cta, "x", { duration: 0.6, ease: "power3" }), cy = gsap.quickTo(cta, "y", { duration: 0.6, ease: "power3" });
          const onCta = (e: MouseEvent) => {
            const r = cta.getBoundingClientRect();
            cx((e.clientX - r.left - r.width / 2) * 0.3); cy((e.clientY - r.top - r.height / 2) * 0.3);
          };
          const offCta = () => { cx(0); cy(0); };
          cta.addEventListener("mousemove", onCta);
          cta.addEventListener("mouseleave", offCta);
          local.push(() => { cta.removeEventListener("mousemove", onCta); cta.removeEventListener("mouseleave", offCta); });
        }

        /* rooms (last, so every pin is already measured) */
        $$("#landing .room").forEach((r) => {
          ScrollTrigger.create({
            trigger: r, start: "top 50%", end: "bottom 50%",
            onToggle: (s) => {
              if (!s.isActive) return;
              setTone(r.getAttribute("data-tone") === "dark" ? "dark" : "light");
              setCurrentNav(r.id || r.closest("section[id]")?.id || "");
            },
          });
        });
        ScrollTrigger.sort();

        return () => local.forEach((f) => f());
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

    // eager images that finish loading later can change heights: re-measure. Lazy frames reserve their
    // space from the image's intrinsic size, so they never shift the layout and need no refresh.
    const imgs = $$<HTMLImageElement>("img", landing).filter((i) => !i.complete && i.loading !== "lazy");
    let t: ReturnType<typeof setTimeout> | undefined;
    const onLoad = () => { clearTimeout(t); t = setTimeout(() => ScrollTrigger.refresh(), 120); };
    imgs.forEach((i) => i.addEventListener("load", onLoad, { once: true }));

    return () => {
      clearTimeout(t);
      imgs.forEach((i) => i.removeEventListener("load", onLoad));
      offs.forEach((f) => f());
      mm.revert();
    };
  });

  return null;
}
