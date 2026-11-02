import type { Metadata, Viewport } from "next";
import "@fontsource/work-sans/400.css";
import "@fontsource/work-sans/500.css";
import "@fontsource/work-sans/600.css";
import "@fontsource/work-sans/700.css";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Savan Sunil Portfolio",
  description: "Savan Sunil — Architect | Parametric Design | BIM & Technical Design.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <SiteChrome />
        <div id="content">{children}</div>
      </body>
    </html>
  );
}
