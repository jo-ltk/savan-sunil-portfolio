# Savan Sunil — Portfolio

Architect | Parametric Design | BIM & Technical Design.

Next.js 16 (App Router) + TypeScript, with GSAP + ScrollTrigger for motion and Lenis for smooth scrolling.

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

`npm run lint` runs ESLint; `npx tsc --noEmit` type-checks.

## Routes

| Route | Page |
| --- | --- |
| `/` | Landing page (hero, selected projects, philosophy, expertise, process, behind the design, about, resume, contact) |
| `/#about`, `/#projects` … | Landing page opened at a section |
| `/projects/architecture-project-01` | Case study |
| `/projects/parametric-project-01` | Case study |
| `/projects/bim-project-01` | Case study |

## Structure

```
app/
  layout.tsx                 root layout: fonts, global CSS, fixed site chrome
  page.tsx                   landing page
  projects/[slug]/page.tsx   case-study route (prerendered for each project)
  not-found.tsx
  globals.css                design tokens + all page styles
components/
  SiteChrome.tsx             header, menu, scroll progress, cursor, page wipe, Lenis
  links.tsx                  GoLink (section anchors), PageLink (wipe transition), BackToTop
  ui.tsx                     Lines (masked headline lines), Chevron
  Year.tsx
  landing/                   one component per landing section + LandingMotion (scroll choreography)
  case/                      CaseStudy template + CaseMotion
data/site.ts                 all content: projects, case studies, themes, expertise, behind-the-design
lib/motion.ts                GSAP/ScrollTrigger setup, Lenis instance, room tone, anchors, wipe
public/images/               images
```

## Editing content

- All text and project data lives in `data/site.ts`. Add a project by adding an entry to `PROJECTS` and a matching entry in `CASES`; its page is generated automatically.
- Case-study copy is **sample content** (marked on each page) — replace it with the real project details.
- Images in `public/images` are **temporary crops of the reference screenshot** (labelled "Temporary reference image" on the page). Replace the files, or point the paths in `data/site.ts` at new ones. `cabin-cutout.png` is a transparent cut-out used for the layered hero and the first project scene.
- Placeholders such as "+ Add email address" are intentional: fill them in with Savan's real details.

## Motion notes

- All motion respects `prefers-reduced-motion: reduce` (no smooth scrolling, pinning, scrubbing or reveals).
- The process timeline pins and scrolls horizontally only at widths ≥ 1101px; below that it is a stacked list.
- The custom cursor and mouse parallax only run on devices with a fine pointer.
