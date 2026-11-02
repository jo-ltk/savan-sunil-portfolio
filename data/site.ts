/*
 * Site content.
 * Everything known is filled in. Missing facts render as "+ Add …" placeholders, never as invented facts.
 * Images in /public/images are TEMPORARY crops of the reference screenshot — replace them with Savan's own work.
 * png: true marks a transparent cut-out that breaks out of its frame.
 */

export const IMG = {
  cabin: "/images/cabin.jpg",
  cabinCut: "/images/cabin-cutout.png",
  villa: "/images/villa.jpg",
  facade: "/images/facade.jpg",
} as const;

export type Tone = "light" | "dark";

export interface Project {
  slug: string;
  title: string;
  /** Title broken over two lines with "\n". */
  t2: string;
  cat: string;
  tone: Tone;
  year: string;
  img: string;
  png?: boolean;
  hero: string;
  alt: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "architecture-project-01",
    title: "Architecture Project 01",
    t2: "Architecture\nProject 01",
    cat: "Architectural Design",
    tone: "light",
    year: "",
    img: IMG.cabinCut,
    png: true,
    hero: IMG.cabin,
    alt: "Dark timber cabin on a rocky hillside",
  },
  {
    slug: "parametric-project-01",
    title: "Parametric Project 01",
    t2: "Parametric\nProject 01",
    cat: "Parametric Architecture",
    tone: "light",
    year: "",
    img: IMG.villa,
    hero: IMG.villa,
    alt: "Angular white house with a deep-set lit window",
  },
  {
    slug: "bim-project-01",
    title: "BIM Project 01",
    t2: "BIM\nProject 01",
    cat: "BIM & Technical Design",
    tone: "dark",
    year: "",
    img: IMG.facade,
    hero: IMG.facade,
    alt: "Textured facade with a recessed window behind trees",
  },
];

/** [layout class, aspect ratio, image, crop position, zoom, caption] — or ["note", text] */
export type GalleryItem = [string, string, string, string, number, string] | ["note", string];
/** [image, crop position, zoom] */
export type Crop = [string, string, number];

export interface CaseStudy {
  hero: "bleed" | "split" | "layered";
  heroImg: string;
  heroPos?: string;
  heroCut?: string;
  location: string;
  year: string;
  type: string;
  intro: string;
  overview: string;
  items: [string, string][];
  gallery: GalleryItem[];
  devText: string;
  dev: [string, string][];
  devImg: Crop;
  /** [label, value, big?] */
  spec: ([string, string] | [string, string, 1])[];
  highlights: [string, string][];
  finImg: Crop;
  fin: string;
}

/*
 * CASE STUDIES — one template, driven by this data.
 * SAMPLE CONTENT: realistic dummy copy and figures, marked on each page as sample content.
 * Replace with the real project information.
 */
export const CASES: Record<string, CaseStudy> = {
  "parametric-project-01": {
    hero: "bleed", heroImg: IMG.villa, heroPos: "55% 55%",
    location: "Western Ghats, India", year: "2024", type: "Private residence",
    intro: "A hillside house whose folded roof is generated from one parametric surface, tuned to the view, the sun and the slope.",
    overview: "The house is a single continuous plane folded over the living spaces. It rises where the valley opens up and drops low to shelter the private rooms, so the building reads as part of the ridge rather than an object placed on it.",
    items: [
      ["Design concept", "One folded plane wraps every room, rising for views and lowering for privacy."],
      ["Architectural vision", "A house that belongs to the ridge line, quiet from the road and open to the valley."],
      ["Objectives", "Frame the long view, control western sun, and keep the geometry buildable with flat panels."],
      ["Site context", "A steep, west-facing plot at the edge of a forest clearing, exposed to monsoon rain and strong afternoon light."],
    ],
    gallery: [
      ["g-full", "21/9", IMG.villa, "50% 45%", 1, "Exterior from the valley"],
      ["g-l5", "4/5", IMG.villa, "28% 60%", 1.5, "Folded roof edge"],
      ["g-r7 g-down", "4/3", IMG.villa, "52% 72%", 1.7, "Deep-set window"],
      ["note", "Every opening is cut where a view cone meets the roof surface, so no window looks at nothing."],
      ["g-r5 g-up", "3/4", IMG.villa, "88% 70%", 1.9, "Panel and glazing detail"],
    ],
    devText: "The form was found, not drawn. View cones, sun angles and the slope drove a single surface, which was then simplified until it could be built from flat panels.",
    dev: [
      ["Form finding", "Roof surface generated from view cones and annual sun paths, then tested in dozens of iterations."],
      ["Rationalisation", "Double curvature reduced to 38 flat panel types without losing the fold."],
      ["Coordination", "The final geometry moved into BIM for structure, envelope and fabrication drawings."],
    ],
    devImg: [IMG.villa, "70% 40%", 1.6],
    spec: [
      ["Site area", "1,850 m²", 1], ["Built-up area", "420 m²", 1], ["Building type", "Private residence"],
      ["Structure", "Steel frame with timber roof cassettes"], ["Materials", "Fibre-cement panels, oak, glass, exposed concrete"],
      ["Software", "Rhino, Grasshopper, Revit, Enscape"], ["Techniques", "Parametric form finding, panel rationalisation, solar analysis"],
      ["Status", "Design development"],
    ],
    highlights: [
      ["A single folded roof", "One surface covers living, sleeping and terrace spaces."],
      ["Shading by depth", "Deep reveals keep the west glass in shadow through the afternoon."],
      ["38 panel types", "A complex form built from a small kit of flat parts."],
      ["Daylight by design", "Every room receives light from two sides."],
    ],
    finImg: [IMG.villa, "40% 50%", 1.05],
    fin: "A roof that bends to its landscape, and a house that opens only where the view deserves it.",
  },
  "bim-project-01": {
    hero: "split", heroImg: IMG.facade, heroPos: "45% 40%",
    location: "Kochi, India", year: "2023", type: "Gallery & workshop",
    intro: "A cultural building documented end to end in BIM, from early massing to a fully coordinated construction set.",
    overview: "Heavy, textured volumes are cut by deep window reveals around a courtyard of retained trees. Behind the calm surfaces sits one federated model shared by architecture, structure and services, from which every drawing and schedule was produced.",
    items: [
      ["Design concept", "Solid textured masses opened by a few deep, precise reveals."],
      ["Architectural vision", "Make the technical work invisible, so the material and light can speak."],
      ["Objectives", "No clashes at tender, one shared model, and a drawing set generated from it."],
      ["Site context", "A dense urban plot whose mature street trees were kept and mapped into the model."],
    ],
    gallery: [
      ["g-l8", "16/10", IMG.facade, "50% 40%", 1, "Street facade"],
      ["g-r4 g-down", "3/4", IMG.facade, "45% 25%", 1.8, "Window reveal"],
      ["g-l4", "1/1", IMG.facade, "20% 30%", 2, "Masonry texture"],
      ["g-r6 g-down", "4/3", IMG.facade, "70% 75%", 1.6, "Trees against the facade"],
      ["g-full", "21/9", IMG.facade, "50% 60%", 1.1, "Courtyard elevation"],
    ],
    devText: "Design and documentation ran as one process. Each decision was made in the model and tested against structure and services before it reached a drawing.",
    dev: [
      ["Massing (LOD 200)", "Volumes and openings set against daylight, programme and the retained trees."],
      ["Coordination", "Architecture, structure and MEP federated, with weekly clash detection."],
      ["Documentation", "Plans, sections, details and schedules generated directly from the model."],
    ],
    devImg: [IMG.facade, "35% 35%", 1.5],
    spec: [
      ["Site area", "3,200 m²", 1], ["Built-up area", "2,650 m²", 1], ["Building type", "Gallery & workshop"],
      ["Structure", "RC frame with load-bearing textured masonry"], ["Materials", "Lime-rendered masonry, precast concrete reveals, bronze frames"],
      ["Software", "Revit, Navisworks, Dynamo, AutoCAD"], ["Techniques", "LOD 350 modelling, clash detection, model-based scheduling"],
      ["Deliverable", "Coordinated construction set"],
    ],
    highlights: [
      ["One federated model", "Every discipline worked in the same coordinated model."],
      ["Precast reveals at 1:5", "Each window reveal detailed and scheduled from the model."],
      ["Automated schedules", "Doors, windows and finishes updated live from BIM data."],
      ["Trees in the model", "Retained trees surveyed and protected through design."],
    ],
    finImg: [IMG.facade, "55% 50%", 1.05],
    fin: "Precision that never shows, so the building can feel effortless.",
  },
  "architecture-project-01": {
    hero: "layered", heroImg: IMG.cabin, heroCut: IMG.cabinCut,
    location: "Himachal Pradesh, India", year: "2022", type: "Mountain retreat",
    intro: "A mountain refuge of dark timber volumes set on bare rock, open to the weather and the long view.",
    overview: "Simple volumes are turned slightly apart on the rock, each framing its own view. Point foundations leave the ground almost untouched, while the dark metal skin and warm timber interior make the refuge legible from the trail at dusk.",
    items: [
      ["Design concept", "Simple volumes, turned apart, each with one large view."],
      ["Architectural vision", "Shelter that sits lightly on the ground and stands strong against the wind."],
      ["Objectives", "Minimal excavation, materials that weather well, a warm interior that glows at dusk."],
      ["Site context", "An exposed rocky plateau with heavy snow, strong winds and a wide valley view."],
    ],
    gallery: [
      ["g-full", "21/9", IMG.cabin, "50% 55%", 1, "The refuge on the rock"],
      ["note", "The volumes step with the rock rather than flattening it, so the ground stays as it was found."],
      ["g-r5", "4/5", IMG.cabin, "62% 40%", 1.9, "Picture window"],
      ["g-l6 g-up", "4/3", IMG.cabin, "30% 90%", 1.7, "Rock and lichen"],
      ["g-r6 g-down", "16/10", IMG.cabin, "85% 45%", 1.8, "Standing-seam skin"],
    ],
    devText: "The project began on the rock itself: mapping the outcrops, the wind and the sun, then placing each volume where the ground and the view allowed.",
    dev: [
      ["Site study", "Rock outcrops, wind direction and winter sun mapped before any form."],
      ["Volumes", "Three simple forms rotated to catch views and shelter the entrance."],
      ["Detailing", "Prefabricated timber panels on point foundations, clad in dark metal."],
    ],
    devImg: [IMG.cabin, "45% 50%", 1.6],
    spec: [
      ["Site area", "900 m²", 1], ["Built-up area", "160 m²", 1], ["Building type", "Mountain retreat"],
      ["Structure", "Timber frame on point foundations"], ["Materials", "Standing-seam metal, larch, triple glazing, local stone"],
      ["Software", "SketchUp, Revit, Lumion"], ["Techniques", "Prefabricated panels, passive solar orientation"],
      ["Build time", "6 weeks on site"],
    ],
    highlights: [
      ["Point foundations", "The rock stays intact beneath the building."],
      ["Framed views", "Each volume has one large window onto the valley."],
      ["Prefabricated panels", "Assembled on site in six weeks between snowfalls."],
      ["Dark skin, warm core", "Metal absorbs winter sun; timber warms the interior."],
    ],
    finImg: [IMG.cabin, "50% 70%", 1.05],
    fin: "Small rooms on the rock, and the whole mountain as the view.",
  },
};

/** [title, text, image, object-position] — draft copy, edit freely */
export const THEMES: [string, string, string, string][] = [
  ["Design thinking", "Every project starts with questions: about the site, the people and the brief, before any form appears.", IMG.cabin, "30% 60%"],
  ["Spatial experience", "Architecture is felt by moving through it. Light, sequence and proportion shape how a space is lived.", IMG.villa, "70% 60%"],
  ["Sustainable architecture", "Working with climate, orientation and context, so buildings ask less of the places they stand in.", IMG.cabin, "80% 90%"],
  ["Material exploration", "Materials carry meaning. Their texture, weight and ageing are part of the design, not a finish applied after it.", IMG.facade, "40% 30%"],
  ["Innovation through technology", "Parametric and BIM tools turn complex ideas into geometry that can be tested, coordinated and built.", IMG.villa, "30% 40%"],
  ["Human-centred spaces", "In the end, architecture is for people: spaces that are clear, comfortable and generous to use.", IMG.facade, "75% 70%"],
];

/** [title, description, tags, image, object-position] */
export const EXPERTISE: [string, string, string[], string, string][] = [
  ["Parametric Architecture", "Exploring complex geometries, computational workflows and innovative architectural forms.", ["Form finding", "Parametric facades", "Geometry rationalisation", "Design iteration"], IMG.villa, "60% 50%"],
  ["BIM & Technical Design", "Transforming architectural concepts into detailed digital models, coordinated drawings and technical documentation.", ["Revit modelling", "Coordinated drawings", "Technical documentation", "Detailing"], IMG.facade, "40% 40%"],
  ["Architectural Design", "Developing meaningful architectural spaces through research, conceptual thinking, spatial planning and visual exploration.", ["Concept design", "Spatial planning", "Site response", "Visual storytelling"], IMG.cabin, "50% 80%"],
  ["Computational Design", "Using algorithms and data to test options, analyse performance and inform design decisions.", ["Algorithmic design", "Design analysis", "Optimisation", "Workflow automation"], IMG.villa, "20% 60%"],
];

export const BEHIND = ["Hand-drawn sketch", "Floor plan", "Elevation", "Section", "Technical drawing", "3D model", "Material study", "Construction detail", "Final render"];

export const NAV = [
  { id: "projects", label: "Projects" },
  { id: "philosophy", label: "Philosophy" },
  { id: "expertise", label: "Expertise" },
  { id: "process", label: "Process" },
  { id: "about", label: "About" },
  { id: "resume", label: "Resume" },
] as const;

export const ROLE = "Architect | Parametric Design | BIM & Technical Design";

export const pad = (n: number) => (n < 10 ? "0" + n : "" + n);
export const projectIndex = (slug: string) => PROJECTS.findIndex((p) => p.slug === slug);
