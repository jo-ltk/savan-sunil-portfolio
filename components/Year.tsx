"use client";

import { useEffect, useRef } from "react";

/** "© <current year> Savan Sunil" — the year is filled in on the client so pages stay static. */
export default function Year() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.textContent = String(new Date().getFullYear());
  }, []);
  return (
    <>
      © <span ref={ref}>2026</span> Savan Sunil
    </>
  );
}
