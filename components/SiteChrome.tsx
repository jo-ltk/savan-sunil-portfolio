"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { NAV, ROLE } from "@/data/site";
import { GoLink } from "@/components/links";
import { gsap, ScrollTrigger, closeMenu, getNavTone, reduce, refreshSoon, registerMenu, setLenis } from "@/lib/motion";

const MENU = [...NAV, { id: "contact", label: "Contact" }];
const pad = (n: number) => (n < 10 ? "0" + n : "" + n);

/**
 * Fixed chrome shared by every page: background "room" colour, header, full-screen menu,
 * scroll progress, custom cursor and the page-transition wipe. Also owns Lenis smooth scrolling.
 */
export default function SiteChrome() {
  const menuRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  /* ---------- menu ---------- */
  useEffect(() => {
    const menu = menuRef.current!, btn = btnRef.current!, nav = navRef.current!, body = document.body;
    const setMenu = (open: boolean) => {
      body.classList.toggle("menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      labelRef.current!.textContent = open ? "Close" : "Menu";
      nav.setAttribute("data-theme", open ? "dark" : getNavTone());
      if (open) menu.classList.add("open");
      if (!reduce()) {
        gsap.to(menu, {
          clipPath: open ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)", duration: 0.8, ease: "expo.inOut",
          onComplete: () => { if (!open) menu.classList.remove("open"); },
        });
        if (open) gsap.fromTo(menu.querySelectorAll("li a"), { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.05, duration: 0.9, ease: "expo.out", delay: 0.25 });
      } else {
        menu.style.clipPath = open ? "none" : "";
        if (!open) menu.classList.remove("open");
      }
    };
    registerMenu(setMenu);
    const onBtn = () => setMenu(!body.classList.contains("menu-open"));
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeMenu(); };
    btn.addEventListener("click", onBtn);
    document.addEventListener("keydown", onKey);
    return () => { registerMenu(null); btn.removeEventListener("click", onBtn); document.removeEventListener("keydown", onKey); };
  }, []);

  /* ---------- screen height, progress, nav solid / hide ---------- */
  useEffect(() => {
    const html = document.documentElement, nav = navRef.current!, body = document.body;
    const pct = document.getElementById("pct")!, bar = document.getElementById("pbar")!;
    const setSH = () => html.style.setProperty("--sh", window.innerHeight + "px");
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY, max = html.scrollHeight - window.innerHeight, p = max > 0 ? Math.min(1, y / max) : 0;
      pct.textContent = pad(Math.round(p * 100));
      bar.style.transform = `scaleX(${p})`;
      nav.classList.toggle("solid", y > 60);
      if (!body.classList.contains("menu-open")) {
        if (y > lastY + 6 && y > 500) nav.classList.add("hide");
        else if (y < lastY - 6) nav.classList.remove("hide");
      }
      lastY = y;
    };
    const onResize = () => { setSH(); refreshSoon(); };
    setSH();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", refreshSoon);
    document.fonts?.ready.then(refreshSoon);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", refreshSoon);
    };
  }, []);

  /* ---------- Lenis, layout classes and the cursor ---------- */
  useGSAP(() => {
    const body = document.body;
    const mm = gsap.matchMedia();
    mm.add(
      { motion: "(prefers-reduced-motion: no-preference)", reduced: "(prefers-reduced-motion: reduce)", wide: "(min-width: 1101px)", fine: "(hover: hover) and (pointer: fine)" },
      (ctx) => {
        const c = ctx.conditions as Record<string, boolean>;
        const offs: (() => void)[] = [];
        if (c.reduced) {
          body.classList.add("no-pin");
          return () => body.classList.remove("no-pin");
        }
        body.classList.add("tone-js");
        if (!c.wide) body.classList.add("no-pin");

        const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
        const raf = (t: number) => lenis.raf(t * 1000);
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);
        setLenis(lenis);
        offs.push(() => { gsap.ticker.remove(raf); lenis.destroy(); setLenis(null); });

        if (c.fine) {
          body.classList.add("has-cursor");
          const cur = document.querySelector<HTMLElement>(".cursor")!;
          const cx = gsap.quickTo(cur, "x", { duration: 0.45, ease: "power3" });
          const cy = gsap.quickTo(cur, "y", { duration: 0.45, ease: "power3" });
          const onMove = (e: MouseEvent) => { cx(e.clientX); cy(e.clientY); };
          const onOver = (e: MouseEvent) => {
            const t = e.target as Element | null;
            if (!t || !t.closest) return;
            const v = t.closest('[data-cursor="view"]'), l = t.closest("a, button");
            cur.classList.toggle("big", !!v);
            gsap.to(cur, { width: v ? 92 : l ? 52 : 34, height: v ? 92 : l ? 52 : 34, margin: v ? -46 : l ? -26 : -17, duration: 0.45, ease: "expo.out" });
            gsap.to("#cursorText", { opacity: v ? 1 : 0, duration: 0.2 });
          };
          window.addEventListener("mousemove", onMove);
          document.addEventListener("mouseover", onOver);
          offs.push(() => { window.removeEventListener("mousemove", onMove); document.removeEventListener("mouseover", onOver); body.classList.remove("has-cursor"); });
        }
        return () => { body.classList.remove("tone-js", "no-pin"); offs.forEach((f) => f()); };
      },
    );
    return () => mm.revert();
  });

  return (
    <>
      <div id="bg" aria-hidden="true" />

      <header className="nav" id="nav" data-theme="light" ref={navRef}>
        <GoLink className="mark" to="top">Savan Sunil</GoLink>
        <nav aria-label="Primary">
          <ul id="navList">
            {NAV.map((n) => (
              <li key={n.id}>
                <GoLink to={n.id} data-sec={n.id}>{n.label}</GoLink>
              </li>
            ))}
          </ul>
        </nav>
        <GoLink className="cta say" to="contact">Let&apos;s talk</GoLink>
        <button className="menu-btn" id="menuBtn" aria-expanded="false" aria-controls="menu" ref={btnRef}>
          <span id="menuLabel" ref={labelRef}>Menu</span>
          <i aria-hidden="true" />
        </button>
      </header>

      <nav className="menu" id="menu" aria-label="Menu" ref={menuRef}>
        <ol>
          {MENU.map((n, i) => (
            <li key={n.id}>
              <GoLink to={n.id}><span>{pad(i + 1)}</span>{n.label}</GoLink>
            </li>
          ))}
        </ol>
        <span className="eyebrow" style={{ color: "#858585" }}>Savan Sunil — {ROLE}</span>
      </nav>

      <div className="progress" id="progress" aria-hidden="true">
        <span id="pct">00</span>
        <span className="bar"><i id="pbar" /></span>
      </div>
      <div className="cursor" aria-hidden="true"><span id="cursorText">View</span></div>
      <div className="wipe" id="wipe" aria-hidden="true" />
    </>
  );
}
