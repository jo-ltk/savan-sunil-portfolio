import { GoLink } from "@/components/links";

export default function NotFound() {
  return (
    <main className="room" data-tone="light" style={{ minHeight: "100vh", display: "grid", alignContent: "center", gap: 24, padding: "0 var(--g) 0 var(--col)" }}>
      <span className="eyebrow">404</span>
      <h1 className="h2" style={{ margin: 0 }}>This page could not be found.</h1>
      <GoLink className="cta" to="projects">← Back to projects</GoLink>
    </main>
  );
}
