/*
 * Landing-page content (everything below the hero).
 * Images are imported statically so next/image knows their real dimensions: every frame takes the
 * picture's own aspect ratio and is never cropped. Each image appears in one section only.
 */
import type { StaticImageData } from "next/image";
import { CASES, PROJECTS, type Project } from "@/data/site";

import bbHero from "@/public/images/bear-bourne-hero.jpg";
import bbNight from "@/public/images/bear-bourne-night.jpg";
import bbSections from "@/public/images/bear-bourne-sections.jpg";
import bbWaterfall from "@/public/images/bear-bourne-waterfall.jpg";
import lhAerial from "@/public/images/lumina-hills-aerial.jpg";
import lhConcepts from "@/public/images/lumina-hills-concepts.jpg";
import lhPlaza from "@/public/images/lumina-hills-plaza.jpg";
import awHero from "@/public/images/awaken-hero.jpg";
import awColonnade from "@/public/images/awaken-colonnade.jpg";
import awAxo from "@/public/images/awaken-axonometric.jpg";
import awPlans from "@/public/images/awaken-plans.jpg";
import awMasterplan from "@/public/images/awaken-masterplan.jpg";
import enHero from "@/public/images/enliven-hero.jpg";
import enShells from "@/public/images/enliven-shells.jpg";
import enTensile from "@/public/images/enliven-tensile.jpg";
import enAmphi from "@/public/images/enliven-amphitheatre.jpg";
import enMasterplan from "@/public/images/enliven-masterplan.jpg";
import baHero from "@/public/images/baah-hero.jpg";
import baInterior from "@/public/images/baah-interior.jpg";
import vvHero from "@/public/images/verdure-valley-hero.jpg";
import vvCabins from "@/public/images/verdure-valley-cabins.jpg";
import vvPlans from "@/public/images/verdure-valley-plans.jpg";
import vvMasterplan from "@/public/images/verdure-valley-masterplan.jpg";
import hoHero from "@/public/images/housing-hero.jpg";
import hoPlaza from "@/public/images/housing-plaza.jpg";
import hoConcepts from "@/public/images/housing-concepts.jpg";
import hoGroundplan from "@/public/images/housing-groundplan.jpg";
import ronSketches from "@/public/images/ron-sketches.jpg";
import b01 from "@/public/images/behind-01-sketch.jpg";
import b03 from "@/public/images/behind-03-elevation.jpg";
import b05 from "@/public/images/behind-05-technical.jpg";
import b06 from "@/public/images/behind-06-3dmodel.jpg";
import b08 from "@/public/images/behind-08-detail-clean.jpg";
import b09 from "@/public/images/behind-09-render.jpg";
import portrait from "@/public/images/savan-sunil-portrait.jpg";

export interface Pic {
  src: StaticImageData;
  alt: string;
}

/* ---------- 02 selected projects (with case studies) ---------- */
export interface Featured {
  project: Project;
  place: string;
  cover: Pic;
  details: [Pic, Pic];
}

const DETAILS: Record<string, { cover: Pic; details: [Pic, Pic] }> = {
  "architecture-project-01": {
    cover: { src: bbHero, alt: "Bear Bourne resort lodges along the Beas River at dusk, Manali" },
    details: [
      { src: bbNight, alt: "Site study, terraced platforms and the chalets lit at night" },
      { src: bbSections, alt: "Site sections above a render of the hillside chalets in the mist" },
    ],
  },
  "parametric-project-01": {
    cover: { src: lhPlaza, alt: "Lumina Hills site sections above the glazed hub and plaza in the Shillong mist" },
    details: [
      { src: lhAerial, alt: "Floor plans and an aerial view of the hillside campus" },
      { src: lhConcepts, alt: "Contour reading and form-finding concept diagrams" },
    ],
  },
  "bim-project-01": {
    cover: { src: awHero, alt: "Awaken cultural hub: courtyard, steps and open artisan studios" },
    details: [
      { src: awColonnade, alt: "Colonnade spine with Kathakali and Theyyam studies" },
      { src: awAxo, alt: "Axonometric cut-away of the studios and terraces" },
    ],
  },
};

export const FEATURED: Featured[] = PROJECTS.map((project) => ({
  project,
  place: CASES[project.slug]?.location ?? "",
  ...DETAILS[project.slug],
}));

/* ---------- 03 archive: further studio and academic work ---------- */
export const ARCHIVE: { title: string; type: string; place: string; pic: Pic }[] = [
  { title: "Enliven", type: "International Performing Arts Centre", place: "Wellington Island, Kochi", pic: { src: enHero, alt: "Enliven performing arts centre: concept diagrams and the white shell roof by the lake" } },
  { title: "Baah", type: "Community Pavilion", place: "Assam, India", pic: { src: baHero, alt: "Baah bamboo and thatch community pavilion in a forest clearing" } },
  { title: "Verdure Valley", type: "Eco-tourism & Botanical Preservatory", place: "Yumthang Valley, Sikkim", pic: { src: vvHero, alt: "Verdure Valley cabins along a river below snow peaks" } },
  { title: "Housing", type: "Housing Redevelopment", place: "Santhipuram Colony, Kochi", pic: { src: hoHero, alt: "Terracotta housing block on pilotis with butterfly relief facade" } },
];

/* ---------- 04 philosophy ---------- */
export const QUOTE = "Architecture is more than form. It is a process of exploration.";

export const THEMES: { title: string; text: string; pic: Pic }[] = [
  { title: "Design thinking", text: "Every project starts with questions about the site, the people and the brief.", pic: { src: ronSketches, alt: "Hand sketches of courtyards and climate strategies" } },
  { title: "Spatial experience", text: "Light, sequence and proportion shape how a space is lived.", pic: { src: baInterior, alt: "Inside the Baah pavilion under its bamboo roof" } },
  { title: "Sustainable architecture", text: "Working with climate and context, so buildings ask less of their place.", pic: { src: vvCabins, alt: "Verdure Valley timber cabins below the Himalaya" } },
  { title: "Material exploration", text: "Texture, weight and ageing are part of the design, not a finish.", pic: { src: bbWaterfall, alt: "Stone and timber chalets of Bear Bourne above the river" } },
  { title: "Innovation through technology", text: "Parametric and BIM tools turn complex ideas into buildable geometry.", pic: { src: enAmphi, alt: "Enliven's sweeping shell roof over the open amphitheatre" } },
  { title: "Human-centred spaces", text: "In the end, architecture is for people: clear, comfortable and generous.", pic: { src: hoPlaza, alt: "People crossing a shaded housing plaza between terracotta blocks" } },
];

/* ---------- 05 expertise ---------- */
export const EXPERTISE: { title: string; text: string; tags: string[]; pic: Pic }[] = [
  { title: "Parametric Architecture", text: "Complex geometries, computational workflows and new architectural forms.", tags: ["Form finding", "Parametric facades", "Rationalisation"], pic: { src: enShells, alt: "Aerial view of Enliven's parametric shell roofs on the waterfront" } },
  { title: "BIM & Technical Design", text: "Concepts carried into coordinated models, drawings and documentation.", tags: ["Revit modelling", "Coordinated drawings", "Detailing"], pic: { src: awPlans, alt: "Awaken ground and first floor plans with sections" } },
  { title: "Architectural Design", text: "Research, concept and spatial planning that grow from the site.", tags: ["Concept design", "Spatial planning", "Site response"], pic: { src: vvMasterplan, alt: "Verdure Valley site analysis and masterplan" } },
  { title: "Computational Design", text: "Algorithms and data to test options and inform decisions.", tags: ["Algorithmic design", "Analysis", "Optimisation"], pic: { src: enMasterplan, alt: "Enliven masterplan over terrain contours" } },
];

/* ---------- 06 process ---------- */
export const PROCESS: { title: string; text: string; pic: Pic }[] = [
  { title: "Research & Analysis", text: "Site, climate, people and brief, mapped before any form appears.", pic: { src: vvPlans, alt: "Level plans, project aims and reference imagery for Verdure Valley" } },
  { title: "Concept Development", text: "Sketches and diagrams that test the idea in many directions.", pic: { src: hoConcepts, alt: "Concept sketches and massing diagrams for the housing project" } },
  { title: "Computational Exploration", text: "Geometry generated, tested and refined across many iterations.", pic: { src: enTensile, alt: "Tensile roof studies and shell geometry explorations" } },
  { title: "Technical Development", text: "Plans, landscape and structure coordinated into one model.", pic: { src: hoGroundplan, alt: "Landscape layers and ground floor plan for the housing project" } },
  { title: "Design Documentation", text: "A clear drawing set that carries the design to site.", pic: { src: awMasterplan, alt: "Awaken masterplan with concept sketches" } },
];

/* ---------- 07 behind the design: drawings at their native proportions ----------
 * Grouped by proportion so neighbouring columns finish level: the two long drawings (3:1, 4.9:1) stack
 * beside the tall detail (0.8:1), then two near-square boards (1.25:1, 1.32:1) share the second row. */
export interface BehindItem {
  title: string;
  pic: Pic;
}
export const BEHIND: BehindItem[][] = [
  [
    { title: "Hand-drawn sketch", pic: { src: b01, alt: "Ink and watercolour sketch of layered sweeping roofs" } },
    { title: "Elevation", pic: { src: b03, alt: "Elevation of the Baah pavilion among trees" } },
  ],
  [{ title: "Construction detail", pic: { src: b08, alt: "Exploded bamboo construction detail of the Baah pavilion" } }],
  [{ title: "Technical drawing", pic: { src: b05, alt: "Unit plans, cluster plans and sections" } }],
  [{ title: "3D model", pic: { src: b06, alt: "Cut-away 3D model of a two-storey courtyard library above a lily pond" } }],
];

/* ---------- 08 about ---------- */
export const PORTRAIT: Pic = { src: portrait, alt: "Portrait of Savan Sunil" };

export const ABOUT_RENDER: { pic: Pic; title: string; place: string } = {
  pic: { src: b09, alt: "Final render of Verdure Valley: timber lodges and a glasshouse beside a glacial river below snow peaks" },
  title: "Verdure Valley — final render",
  place: "Yumthang Valley, Sikkim",
};

export const STATS: { value: number; suffix?: string; label: string }[] = [
  { value: 3, suffix: "+", label: "Years in practice" },
  { value: FEATURED.length + ARCHIVE.length, label: "Projects shown here" },
  { value: 3, label: "Countries: UAE, India, Egypt" },
];

/* ---------- 09 resume ---------- */
export const EXPERIENCE: [when: string, studio: string, role: string, place: string][] = [
  ["2024 — 2026", "Xbd Collective", "Architect", "Dubai · India · Egypt"],
  ["2026", "Bloc Forms", "3D Visualiser (Freelance)", "Kottayam, India"],
  ["2023 — 2024", "Hitanshu Jishtu Architects", "Junior Architect", "Himachal Pradesh, India"],
  ["2022 — 2023", "Prashant Pradhan Architects", "Intern Architect", "Sikkim, India"],
];

export const EDUCATION: [when: string, degree: string, school: string][] = [
  ["2018 — 2023", "Bachelor of Architecture", "Mahatma Gandhi University, Kerala"],
];

export const SKILLS: { name: string; items: string[] }[] = [
  { name: "Architecture Design", items: ["SketchUp", "Rhino", "Grasshopper"] },
  { name: "BIM | Technical", items: ["AutoCAD", "Revit", "Navisworks"] },
  { name: "Visualisation", items: ["D5 Render", "Lumion", "Twinmotion", "V-Ray", "Enscape"] },
  { name: "Graphics", items: ["Photoshop", "InDesign", "Canva", "Sketching"] },
  { name: "AI", items: ["ChatGPT", "Google AI Studio", "ComfyUI", "Claude", "Nano Banana"] },
];

/* ---------- 10 contact ---------- */
export const CONTACT = {
  email: "ar.savan.works@gmail.com",
  phone: "+971 56 560 9242",
  tel: "+971565609242",
  location: "Dubai, United Arab Emirates",
  born: "27 . 05 . 2000",
};
