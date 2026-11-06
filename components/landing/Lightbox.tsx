"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap, getLenis } from "@/lib/motion";

interface Item {
  src: string;
  alt: string;
}
interface View {
  items: Item[];
  i: number;
}

const toItem = (img: HTMLImageElement, alt = img.alt): Item => ({ src: img.src, alt });
const SELECTOR = "#landing .frame";

/** Every picture on the page that can open (skips covers that are links, the portrait, and hidden frames). */
function collect() {
  return Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).filter(
    (f) => !f.closest("a") && !f.classList.contains("ab-portrait") && f.getClientRects().length > 0,
  );
}

/**
 * Full-screen gallery. Any picture on the landing page opens here at its full proportions; arrows, swipe and
 * the keyboard move between pictures, Esc / a click on the backdrop closes. Philosophy's sticky picture opens
 * its own set of six. Renders nothing until a picture is chosen.
 */
export default function Lightbox() {
  const [view, setView] = useState<View | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const closing = useRef(false);
  const origin = useRef<HTMLElement | null>(null);

  const open = useCallback((v: View, from?: HTMLElement | null) => {
    origin.current = from ?? null;
    closing.current = false;
    setView(v);
  }, []);

  const close = useCallback(() => {
    if (closing.current || !root.current) return;
    closing.current = true;
    gsap.to(root.current, { opacity: 0, duration: 0.25, ease: "power2.in", onComplete: () => setView(null) });
  }, []);

  const go = useCallback((d: number) => {
    setView((v) => (v ? { ...v, i: (v.i + d + v.items.length) % v.items.length } : v));
  }, []);

  /* open: click or Enter/Space on a picture; mark them as buttons so they are reachable by keyboard too */
  useEffect(() => {
    const mark = () =>
      collect().forEach((f) => {
        f.setAttribute("data-cursor", "view");
        f.setAttribute("role", "button");
        f.setAttribute("tabindex", "0");
        f.setAttribute("aria-label", "View image full screen");
      });
    mark();
    const t = setTimeout(mark, 800);

    const onActivate = (e: Event) => {
      const t = e.target as HTMLElement;
      const stage = t.closest<HTMLElement>(".philo-stage");
      if (stage) {
        const imgs = Array.from(stage.querySelectorAll<HTMLImageElement>("#philoPic img"));
        const names = Array.from(document.querySelectorAll(".theme h3")).map((h) => h.textContent || "");
        const on = Math.max(0, imgs.findIndex((im) => im.classList.contains("on")));
        open({ items: imgs.map((im, k) => toItem(im, names[k])), i: on }, stage);
        return;
      }
      const f = t.closest<HTMLElement>(SELECTOR);
      if (!f || f.closest("a") || f.classList.contains("ab-portrait")) return;
      const all = collect();
      const i = all.indexOf(f);
      if (i < 0) return;
      open({ items: all.map((fr) => toItem(fr.querySelector("img")!)), i }, f);
    };
    const onClick = (e: MouseEvent) => onActivate(e);
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "Enter" || e.key === " ") && (e.target as HTMLElement).matches?.(SELECTOR)) {
        e.preventDefault();
        onActivate(e);
      }
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* while open: freeze page scroll, keys, focus */
  const isOpen = view !== null;
  useEffect(() => {
    if (!isOpen) return;
    getLenis()?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    gsap.fromTo(root.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
    root.current?.querySelector<HTMLElement>(".lb-close")?.focus();
    const from = origin.current;
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      getLenis()?.start();
      from?.focus({ preventScroll: true });
    };
  }, [isOpen, close, go]);

  /* each picture eases in; its neighbours are fetched ahead of time */
  const idx = view?.i ?? 0;
  useEffect(() => {
    if (!view) return;
    if (imgRef.current) gsap.fromTo(imgRef.current, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.5, ease: "expo.out" });
    [1, -1].forEach((d) => {
      const n = view.items[(idx + d + view.items.length) % view.items.length];
      if (n) new Image().src = n.src;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, isOpen]);

  /* swipe */
  const x0 = useRef<number | null>(null);
  const onDown = (e: React.PointerEvent) => { x0.current = e.clientX; };
  const onUp = (e: React.PointerEvent) => {
    if (x0.current === null) return;
    const dx = e.clientX - x0.current;
    x0.current = null;
    if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
  };

  if (!view) return null;
  const cur = view.items[view.i];
  const many = view.items.length > 1;
  const pad = (n: number) => (n < 10 ? "0" + n : "" + n);

  // portal to <body>: #content is its own stacking layer, which would keep the gallery beneath the fixed nav
  return createPortal(
    <div
      className="lb"
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery"
      onPointerDown={onDown}
      onPointerUp={onUp}
      onClick={(e) => { if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains("lb-stage")) close(); }}
    >
      <div className="lb-top">
        <span className="lb-count"><b>{pad(view.i + 1)}</b> / {pad(view.items.length)}</span>
        <button className="lb-close" type="button" onClick={close} aria-label="Close gallery">Close <i aria-hidden="true" /></button>
      </div>

      <div className="lb-stage">
        <img ref={imgRef} key={cur.src} src={cur.src} alt={cur.alt} draggable={false} />
      </div>

      {many && (
        <>
          <button className="lb-nav lb-prev" type="button" onClick={() => go(-1)} aria-label="Previous image"><span aria-hidden="true">←</span></button>
          <button className="lb-nav lb-next" type="button" onClick={() => go(1)} aria-label="Next image"><span aria-hidden="true">→</span></button>
        </>
      )}

      <p className="lb-cap" aria-live="polite">{cur.alt}</p>
    </div>,
    document.body,
  );
}
