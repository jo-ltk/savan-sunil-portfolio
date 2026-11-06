"use client";

import { useEffect } from "react";

const MAX = 6;

/**
 * A drafting "snap" mark wherever the page is clicked or tapped: guide lines cross through the point,
 * a ring opens, an accent snap square settles and the X/Y coordinates print beside it, then it all fades.
 * Mouse marks on press; touch marks only on a real tap (not the start of a scroll). Off with reduced motion.
 */
export default function TapMark() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let start: { x: number; y: number; t: number } | null = null;

    const mark = (x: number, y: number) => {
      if (reduce.matches) return;
      const live = document.querySelectorAll(".tap");
      if (live.length >= MAX) live[0].remove();
      const dark = document.getElementById("nav")?.getAttribute("data-theme") === "dark";
      const el = document.createElement("div");
      el.className = "tap" + (dark ? " tap-dark" : "");
      el.setAttribute("aria-hidden", "true");
      el.style.left = x + "px";
      el.style.top = y + "px";
      el.innerHTML =
        '<i class="tap-h"></i><i class="tap-v"></i><i class="tap-ring"></i><i class="tap-snap"></i>' +
        `<span class="tap-xy">X ${Math.round(x)} &middot; Y ${Math.round(y)}</span>`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1100);
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        if (e.button === 0) mark(e.clientX, e.clientY);
        return;
      }
      start = { x: e.clientX, y: e.clientY, t: e.timeStamp };
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType === "mouse" || !start) return;
      const tap = Math.hypot(e.clientX - start.x, e.clientY - start.y) < 10 && e.timeStamp - start.t < 500;
      start = null;
      if (tap) mark(e.clientX, e.clientY);
    };
    const onCancel = () => { start = null; };

    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onCancel, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onCancel);
      document.querySelectorAll(".tap").forEach((n) => n.remove());
    };
  }, []);

  return null;
}
