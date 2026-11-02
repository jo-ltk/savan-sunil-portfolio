"use client";

/*
 * Shared, client-only motion helpers: GSAP + ScrollTrigger registration, the Lenis smooth-scroll
 * instance, the light/dark "room" tone, smooth anchor scrolling and the page-transition wipe.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";
import type { Tone } from "@/data/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger };

export const reduce = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Lenis (owned by SiteChrome) ---------- */
let lenis: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
  lenis = l;
};
export const getLenis = () => lenis;

/* ---------- ScrollTrigger refresh ---------- */
let refreshT: ReturnType<typeof setTimeout> | undefined;
export function refreshSoon() {
  clearTimeout(refreshT);
  refreshT = setTimeout(() => ScrollTrigger.refresh(), 120);
}
export function refreshNow() {
  lenis?.resize();
  ScrollTrigger.refresh();
}

/* ---------- rooms: ground colour and chrome follow the section in view ---------- */
let navTone: Tone = "light";
export const getNavTone = () => navTone;
export function setTone(tone: Tone) {
  navTone = tone;
  const col = tone === "dark" ? "#111111" : "#f5f4f0";
  const bg = document.getElementById("bg");
  if (bg) {
    if (!reduce()) gsap.to(bg, { backgroundColor: col, duration: 0.8, ease: "power2.inOut", overwrite: true });
    else bg.style.backgroundColor = col;
  }
  if (!document.body.classList.contains("menu-open")) document.getElementById("nav")?.setAttribute("data-theme", tone);
  document.getElementById("progress")?.setAttribute("data-theme", tone);
}

export function setCurrentNav(section: string) {
  document.querySelectorAll("#navList a").forEach((a) =>
    a.setAttribute("aria-current", a.getAttribute("data-sec") === section ? "true" : "false"),
  );
}

/* ---------- anchors ---------- */
function yOf(id: string): number | null {
  if (id === "top") return 0;
  const t = document.getElementById(id);
  if (!t) return null;
  const parent = t.parentElement;
  const el = parent && parent.classList.contains("pin-spacer") ? parent : t;
  return el.getBoundingClientRect().top + window.scrollY;
}
export function scrollToId(id: string, smooth: boolean) {
  lenis?.resize();
  const y = yOf(id);
  if (y == null) return;
  if (lenis) lenis.scrollTo(y, smooth ? { duration: 1.5 } : { immediate: true, force: true });
  else window.scrollTo({ top: y, behavior: smooth ? "smooth" : "auto" });
}
export function scrollTop() {
  if (lenis) {
    lenis.resize();
    lenis.scrollTo(0, { immediate: true, force: true });
  } else window.scrollTo(0, 0);
}

/* ---------- menu (registered by SiteChrome) ---------- */
let menuSetter: ((open: boolean) => void) | null = null;
export const registerMenu = (f: ((open: boolean) => void) | null) => {
  menuSetter = f;
};
export function closeMenu() {
  if (document.body.classList.contains("menu-open")) menuSetter?.(false);
}

/* ---------- page transition wipe ---------- */
let covered = false;
/** Slides the wipe up over the page, then runs `swap` (the navigation). */
export function wipeIn(swap: () => void) {
  const w = document.getElementById("wipe");
  if (!w || reduce()) {
    swap();
    return;
  }
  covered = true;
  gsap.killTweensOf(w);
  gsap.timeline().set(w, { y: 0, yPercent: 100 }).to(w, { yPercent: 0, duration: 0.65, ease: "expo.inOut" }).add(swap);
}
/** Called once the new route has rendered: reveals it by sliding the wipe away. */
export function wipeOut() {
  const w = document.getElementById("wipe");
  if (!w || !covered) return;
  covered = false;
  gsap.to(w, { yPercent: -100, duration: 0.75, ease: "expo.inOut", delay: 0.05 });
}
export const isCovered = () => covered;
