/*
 * Site content.
 * Real architectural projects and assets of Savan Sunil.
 */

export const IMG = {
  heroSky: "/images/cinematic-golden-sunset-sky.png",
  heroVilla: "/images/modern-luxury-villa.png",
  cabin: "/images/bear-bourne-hero.jpg",
  cabinCut: "/images/bear-bourne-cutout.png",
  villa: "/images/lumina-hills-hero.jpg",
  facade: "/images/awaken-hero.jpg",
  bearBourne: {
    hero: "/images/bear-bourne-hero.jpg",
    cutout: "/images/bear-bourne-cutout.png",
    night: "/images/bear-bourne-night.jpg",
    waterfall: "/images/bear-bourne-waterfall.jpg",
    sections: "/images/bear-bourne-sections.jpg",
  },
  luminaHills: {
    hero: "/images/lumina-hills-hero.jpg",
    aerial: "/images/lumina-hills-aerial.jpg",
    plaza: "/images/lumina-hills-plaza.jpg",
    concepts: "/images/lumina-hills-concepts.jpg",
  },
  awaken: {
    hero: "/images/awaken-hero.jpg",
    colonnade: "/images/awaken-colonnade.jpg",
    axonometric: "/images/awaken-axonometric.jpg",
    plans: "/images/awaken-plans.jpg",
    masterplan: "/images/awaken-masterplan.jpg",
  },
  verdureValley: {
    hero: "/images/verdure-valley-hero.jpg",
    cabins: "/images/verdure-valley-cabins.jpg",
    plans: "/images/verdure-valley-plans.jpg",
    masterplan: "/images/verdure-valley-masterplan.jpg",
    concepts: "/images/verdure-valley-concepts.jpg",
  },
  baah: {
    hero: "/images/baah-hero.jpg",
    interior: "/images/baah-interior.jpg",
    axonometric: "/images/baah-axonometric.jpg",
  },
  enliven: {
    hero: "/images/enliven-hero.jpg",
    amphitheatre: "/images/enliven-amphitheatre.jpg",
    shells: "/images/enliven-shells.jpg",
    tensile: "/images/enliven-tensile.jpg",
    masterplan: "/images/enliven-masterplan.jpg",
  },
  housing: {
    hero: "/images/housing-hero.jpg",
    plaza: "/images/housing-plaza.jpg",
    units: "/images/housing-units.jpg",
    groundplan: "/images/housing-groundplan.jpg",
    concepts: "/images/housing-concepts.jpg",
  },
  sketchCover: "/images/sketch-cover.jpg",
  ronSketches: "/images/ron-sketches.jpg",
  portrait: "/images/savan-sunil-portrait.jpg",
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
    title: "Bear Bourne Manali",
    t2: "Bear Bourne\nKathkuni Resort",
    cat: "Architectural Design",
    tone: "light",
    year: "2023",
    img: IMG.bearBourne.cutout,
    png: true,
    hero: IMG.bearBourne.hero,
    alt: "Bear Bourne luxury boutique resort along the Beas River, Manali",
  },
  {
    slug: "parametric-project-01",
    title: "Lumina Hills",
    t2: "Lumina Hills\nIncubation Hub",
    cat: "Parametric Architecture",
    tone: "light",
    year: "2024",
    img: IMG.luminaHills.hero,
    hero: IMG.luminaHills.hero,
    alt: "Meghalaya Skill Incubation Hub, Shillong with sweeping parametric roof",
  },
  {
    slug: "bim-project-01",
    title: "Awaken Kerala",
    t2: "Awaken\nCultural Hub",
    cat: "BIM & Technical Design",
    tone: "dark",
    year: "2023",
    img: IMG.awaken.hero,
    hero: IMG.awaken.hero,
    alt: "Revival Centre for Lost Art Forms of Kerala with transparent studios and courtyard",
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

export const CASES: Record<string, CaseStudy> = {
  "architecture-project-01": {
    hero: "layered", heroImg: IMG.bearBourne.hero, heroCut: IMG.bearBourne.cutout,
    location: "Manali, Himachal Pradesh, India", year: "2023", type: "Kathkuni Village Resort",
    intro: "A luxury boutique resort situated along the Beas River, designed to merge seamlessly with the Himalayan landscape.",
    overview: "Bear Bourne Manali is inspired by local mountain architecture, combining stone, timber and expansive glazing to create immersive hospitality spaces with uninterrupted views of the river, forests, and surrounding Himalayan peaks.",
    items: [
      ["Design concept", "Follow natural site contours and minimize terrain modification through terraced platforms."],
      ["Architectural vision", "Merge local Kathkuni construction traditions with contemporary alpine hospitality."],
      ["Objectives", "Preserve native pine vegetation, maintain natural drainage flows, and maximize southern solar exposure."],
      ["Site context", "A forested riverside slope in Manali along the Beas River, subject to heavy snow and alpine weather."],
    ],
    gallery: [
      ["g-full", "21/9", IMG.bearBourne.hero, "50% 55%", 1, "Resort lodges along the Beas River at dusk"],
      ["note", "Inspired by local Kathkuni mountain architecture, the resort combines stone, timber and glazing to merge with the Himalayan terrain."],
      ["g-r5", "4/5", IMG.bearBourne.waterfall, "70% 65%", 1.2, "Stone chalets fronting the river waterfall cascades"],
      ["g-l6 g-up", "4/3", IMG.bearBourne.night, "65% 55%", 1.1, "Terraced hillside chalets with warm illuminated interiors"],
      ["g-r6 g-down", "16/10", IMG.bearBourne.sections, "50% 20%", 1.15, "Coordinated architectural sections and elevation levels"],
    ],
    devText: "The project was developed in close response to the terrain: mapping natural vegetation, rock terraces, and the river corridor before forming the building footprints.",
    dev: [
      ["Site study", "South-oriented sloping site with dense pine forest and natural contour terraces."],
      ["Form integration", "Tiered building platforms stepped down to the river to minimize earthwork."],
      ["Detailing", "Kathkuni stone base, warm timber upper floors, slate roofing, and triple glazing."],
    ],
    devImg: [IMG.bearBourne.night, "20% 25%", 1.2],
    spec: [
      ["Site area", "4,500 m²", 1], ["Built-up area", "1,850 m²", 1], ["Building type", "Luxury Boutique Resort"],
      ["Structure", "RC & Kathkuni timber-stone hybrid frame"], ["Materials", "Local stone masonry, cedar timber, slate tile, insulated glass"],
      ["Software", "SketchUp, Revit, Lumion, V-Ray"], ["Techniques", "Contour-responsive terracing, passive thermal mass, solar orientation"],
      ["Status", "Hitanshu Jishtu Architects"],
    ],
    highlights: [
      ["Terraced platforms", "Buildings follow natural slopes without massive excavation."],
      ["Uninterrupted views", "Floor-to-ceiling glass looks out to the Beas river and mountain ridge."],
      ["Local materials", "Durable mountain timber and quarried stone that age gracefully."],
      ["Climate responsive", "Glazed south facades capture winter daylight; heavy masonry retains warmth."],
    ],
    finImg: [IMG.bearBourne.sections, "50% 70%", 1.05],
    fin: "Architecture that grows from its mountain hillside, offering warmth and shelter against the wild Himalayan peaks.",
  },
  "parametric-project-01": {
    hero: "bleed", heroImg: IMG.luminaHills.hero, heroPos: "50% 55%",
    location: "Shillong, Meghalaya, India", year: "2024", type: "Meghalaya Skill Incubation Hub",
    intro: "An integrated educational campus where architecture becomes a catalyst for innovation, entrepreneurship and community engagement.",
    overview: "Rather than imposing on the steep terrain, the development emerges from the landscape, creating a learning environment deeply rooted within Meghalaya's hills. Sweeping undulating roof geometries echo the surrounding ridges and respond dynamically to heavy rainfall.",
    items: [
      ["Design concept", "Contour-driven architecture that steps with the hillside, connecting learning spaces with landscape."],
      ["Architectural vision", "An open, permeable campus celebrating Meghalaya's natural beauty and communal spirit."],
      ["Objectives", "Harmonious terracing, passive rainwater harvesting, and light-filled collaborative incubation pods."],
      ["Site context", "A dramatic hillside site in Shillong surrounded by pine forests, cloud mist, and natural ravines."],
    ],
    gallery: [
      ["g-full", "21/9", IMG.luminaHills.hero, "50% 60%", 1, "Campus entrance and sweeping roof in the mist"],
      ["g-l5", "4/5", IMG.luminaHills.plaza, "75% 65%", 1.15, "Ground plaza and transparent glass curtain walls"],
      ["g-r7 g-down", "4/3", IMG.luminaHills.aerial, "75% 60%", 1.1, "Aerial view of hillside campus and amphitheatre"],
      ["note", "Rather than imposing on the terrain, the development emerges from the landscape, deeply rooted within Meghalaya's hills."],
      ["g-r5 g-up", "3/4", IMG.luminaHills.concepts, "70% 30%", 1.2, "Contour analysis and functional platform iterations"],
    ],
    devText: "The form was generated directly from contour curves and rainfall patterns, creating an aerodynamic and fluid structural envelope that shelters central courtyards and open amphitheatre spaces.",
    dev: [
      ["Contour reading", "Natural terraces identified and converted into stepped functional programmatic zones."],
      ["Form finding", "Sweeping double-curved shell roof modeled parametrically to channel monsoonal rainfall."],
      ["BIM & Technical", "Structural grid coordinated with Revit for curved slab edges, facade panels and services."],
    ],
    devImg: [IMG.luminaHills.concepts, "30% 60%", 1.1],
    spec: [
      ["Site area", "12,800 m²", 1], ["Built-up area", "6,200 m²", 1], ["Building type", "Educational & Incubation Campus"],
      ["Structure", "Post-tensioned concrete slabs with sculpted steel roof canopy"], ["Materials", "Exposed concrete, structural glass, zinc cladding, local stone"],
      ["Software", "Rhino, Grasshopper, Revit, Enscape, D5 Render"], ["Techniques", "Parametric roof generation, solar shadow analysis, rainwater channeling"],
      ["Status", "Hitanshu Jishtu Architects"],
    ],
    highlights: [
      ["Undulating shell canopy", "One fluid roof structure connects incubation, learning, and gathering pods."],
      ["Central amphitheatre", "Carved into the natural contour bowl, hosting campus gatherings and public forums."],
      ["Permeable facades", "Double-height glazing connects indoor workshops to lush exterior pine forests."],
      ["Rainwater integration", "Sculpted roof forms guide seasonal monsoons into retention ponds."],
    ],
    finImg: [IMG.luminaHills.plaza, "50% 60%", 1.05],
    fin: "A campus where architecture rises softly from the mountainside, empowering community and innovation.",
  },
  "bim-project-01": {
    hero: "split", heroImg: IMG.awaken.hero, heroPos: "50% 50%",
    location: "Kerala, India", year: "2023", type: "Revival Centre for Lost Art Forms",
    intro: "A dedicated cultural hub preserving and revitalizing Kerala's traditional performing arts, craftsmanship and regional heritage.",
    overview: "Inspired by Theyyam and Kathakali, the design integrates exhibition galleries, craft workshops, and communal courtyards through a continuous circulation spine, connecting built spaces with landscape, water, and traditional artisanal workshops.",
    items: [
      ["Design concept", "Layered modular volumes transitioning from entrance promenade to water court."],
      ["Architectural vision", "A living platform for cultural expression, learning, and generational knowledge sharing."],
      ["Objectives", "Seamless indoor-outdoor permeability, natural ventilation, and daylighting for craft studios."],
      ["Site context", "A lush tropical site in Kerala bordered by water bodies, coconut palms, and traditional trails."],
    ],
    gallery: [
      ["g-l8", "16/10", IMG.awaken.hero, "50% 50%", 1, "Main facade, courtyard bridge, and artisan studios"],
      ["g-r4 g-down", "3/4", IMG.awaken.colonnade, "75% 60%", 1.1, "Colonnade corridor with traditional Kathakali and Theyyam performers"],
      ["g-l4", "1/1", IMG.awaken.axonometric, "75% 35%", 1.25, "3D axonometric model and massing articulation"],
      ["g-r6 g-down", "4/3", IMG.awaken.plans, "20% 50%", 1.1, "Ground and first floor technical drawing documentation"],
      ["g-full", "21/9", IMG.awaken.masterplan, "50% 50%", 1.05, "Masterplan and site integration"],
    ],
    devText: "Every workshop—weaving, coir, screw pine, and pottery—was systematically modeled in BIM with exact spatial requirements, service integrations, and natural daylight criteria.",
    dev: [
      ["Cultural research", "Traditional spatial typologies mapped into modular, interactive studio volumes."],
      ["Coordinated documentation", "Comprehensive architectural plans, sections, and structural grid modeling."],
      ["BIM detail schedules", "Door, window, louvre, and joinery schedules extracted directly from the federated model."],
    ],
    devImg: [IMG.awaken.masterplan, "20% 40%", 1.2],
    spec: [
      ["Site area", "8,400 m²", 1], ["Built-up area", "3,100 m²", 1], ["Building type", "Cultural Revival Centre"],
      ["Structure", "Exposed reinforced concrete frame with timber rafters and louvered screens"], ["Materials", "Cast-in-place concrete, teak timber, terracotta, local laterite"],
      ["Software", "Revit, AutoCAD, Lumion, Photoshop, InDesign"], ["Techniques", "LOD 350 BIM documentation, coordinated sections, solar analysis"],
      ["Deliverable", "Complete architectural drawing set & masterplan"],
    ],
    highlights: [
      ["Central circulation spine", "Smooth journey connecting exhibition, workshops, library and amphitheatre."],
      ["Artisan workshops", "Dedicated spaces for weaving, pottery, and traditional crafts with natural lighting."],
      ["Courtyard microclimate", "Open courtyards and water elements promote passive cross-ventilation."],
      ["Authentic materiality", "Exposed concrete paired with warm timber screens reflecting Kerala traditions."],
    ],
    finImg: [IMG.awaken.colonnade, "75% 50%", 1.05],
    fin: "Architecture that honors living heritage, turning memory into vibrant everyday space.",
  },
};

/** [title, text, image, object-position] */
export const THEMES: [string, string, string, string][] = [
  ["Design thinking", "Every project starts with questions: about the site, the people and the brief, before any form appears.", IMG.ronSketches, "50% 50%"],
  ["Spatial experience", "Architecture is felt by moving through it. Light, sequence and proportion shape how a space is lived.", IMG.baah.interior, "50% 50%"],
  ["Sustainable architecture", "Working with climate, orientation and context, so buildings ask less of the places they stand in.", IMG.verdureValley.hero, "50% 50%"],
  ["Material exploration", "Materials carry meaning. Their texture, weight and ageing are part of the design, not a finish applied after it.", IMG.bearBourne.waterfall, "50% 50%"],
  ["Innovation through technology", "Parametric and BIM tools turn complex ideas into geometry that can be tested, coordinated and built.", IMG.luminaHills.hero, "50% 50%"],
  ["Human-centred spaces", "In the end, architecture is for people: spaces that are clear, comfortable and generous to use.", IMG.housing.plaza, "50% 50%"],
];

/** [title, description, tags, image, object-position] */
export const EXPERTISE: [string, string, string[], string, string][] = [
  ["Parametric Architecture", "Exploring complex geometries, computational workflows and innovative architectural forms.", ["Form finding", "Parametric facades", "Geometry rationalisation", "Design iteration"], IMG.luminaHills.hero, "50% 50%"],
  ["BIM & Technical Design", "Transforming architectural concepts into detailed digital models, coordinated drawings and technical documentation.", ["Revit modelling", "Coordinated drawings", "Technical documentation", "Detailing"], IMG.awaken.plans, "50% 50%"],
  ["Architectural Design", "Developing meaningful architectural spaces through research, conceptual thinking, spatial planning and visual exploration.", ["Concept design", "Spatial planning", "Site response", "Visual storytelling"], IMG.verdureValley.hero, "50% 50%"],
  ["Computational Design", "Using algorithms and data to test options, analyse performance and inform design decisions.", ["Algorithmic design", "Design analysis", "Optimisation", "Workflow automation"], IMG.enliven.shells, "50% 50%"],
];

export const BEHIND_ITEMS: { title: string; img: string }[] = [
  { title: "Hand-drawn sketch", img: "/images/behind-01-sketch.jpg" },
  { title: "Floor plan", img: "/images/behind-02-floorplan.jpg" },
  { title: "Elevation", img: "/images/behind-03-elevation.jpg" },
  { title: "Section", img: "/images/behind-04-section.jpg" },
  { title: "Technical drawing", img: "/images/behind-05-technical.jpg" },
  { title: "3D model", img: "/images/behind-06-3dmodel.jpg" },
  { title: "Material study", img: "/images/behind-07-material.jpg" },
  { title: "Construction detail", img: "/images/behind-08-detail.jpg" },
  { title: "Final render", img: "/images/behind-09-render.jpg" },
];

export const BEHIND = BEHIND_ITEMS.map((b) => b.title);

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
