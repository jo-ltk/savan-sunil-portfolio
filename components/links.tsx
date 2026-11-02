"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { closeMenu, reduce, scrollToId, wipeIn } from "@/lib/motion";

type AnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { children?: ReactNode };

/**
 * In-page section link (#projects, #about …).
 * On the landing page it scrolls smoothly; from a project page it wipes back to the landing page section.
 */
export function GoLink({ to, children, onClick, ...rest }: AnchorProps & { to: string }) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <a
      href={`/#${to}`}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        closeMenu();
        if (pathname === "/") {
          history.replaceState(history.state, "", `#${to}`);
          scrollToId(to, !reduce());
        } else {
          wipeIn(() => router.push(`/#${to}`, { scroll: false }));
        }
      }}
    >
      {children}
    </a>
  );
}

/** Link to another page (project case studies) with the full-screen wipe transition. */
export function PageLink({ href, children, onClick, ...rest }: AnchorProps & { href: string }) {
  const router = useRouter();
  return (
    <Link
      href={href}
      scroll={false}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        closeMenu();
        wipeIn(() => router.push(href, { scroll: false }));
      }}
    >
      {children}
    </Link>
  );
}

/** Back-to-top button in the landing footer. */
export function BackToTop() {
  return (
    <button className="cta" id="topBtn" onClick={() => scrollToId("top", !reduce())}>
      Back to top ↑
    </button>
  );
}
