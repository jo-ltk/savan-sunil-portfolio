import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudy from "@/components/case/CaseStudy";
import { PROJECTS, projectIndex } from "@/data/site";

/** The three case studies are prerendered at build time. */
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJECTS[projectIndex(slug)];
  return p ? { title: `${p.title} — Savan Sunil` } : {};
}

async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projectIndex(slug);
  if (index < 0) notFound();
  // keyed by slug so moving between projects remounts the page and its motion
  return <CaseStudy key={slug} index={index} />;
}

export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  // the page wipe covers the screen while the case study streams in, so no visible fallback is needed
  return (
    <Suspense fallback={null}>
      <Project params={params} />
    </Suspense>
  );
}
