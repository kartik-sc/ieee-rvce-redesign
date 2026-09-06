/**
 * Single source of truth for IEEE RVCE content.
 * Only verified facts live here — no invented statistics, awards, or quotes.
 */

export const branch = {
  name: "IEEE RVCE",
  longName: "IEEE Student Branch, RV College of Engineering",
  motto: "Advancing Technology for Humanity",
  foundedYear: 2017,
  members: "200+",
  branchCode: "STB11651",
  email: "ieeervce@rvce.edu.in",
  location: "RV College of Engineering, Bengaluru",
} as const;

export type NavLink = { label: string; href: string };

export const nav: NavLink[] = [
  { label: "Societies", href: "/#societies" },
  { label: "CSITSS", href: "/csitss" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

export const societyHref = (id: string) => `/societies/${id}`;

export type Proof = { value: string; label: string; mono?: boolean };

export const proof: Proof[] = [
  { value: "2017", label: "Founded", mono: true },
  { value: "200+", label: "Active members" },
  { value: "STB11651", label: "IEEE Student Branch", mono: true },
];

export type Society = {
  id: string;
  abbr: string;
  name: string;
  /** one-line positioning */
  focus: string;
  /** longer descriptive paragraph — factual domain, no invented metrics */
  blurb: string;
  /** genuine technical domains this society works across */
  themes: string[];
  /** CSS custom property used as the controlled state accent */
  accent: string;
  accentName: string;
  /** longer copy for the society detail page */
  detail: string;
};

export const societies: Society[] = [
  {
    id: "ras",
    abbr: "RAS",
    name: "Robotics & Automation Society",
    focus: "Building machines that sense, decide, and move.",
    blurb:
      "The Robotics & Automation Society brings together students working across autonomous systems, control, perception, and mechatronics — turning theory in kinematics and embedded control into hardware that operates in the real world.",
    themes: ["Autonomous systems", "Control & perception", "Mechatronics", "Embedded robotics"],
    accent: "var(--accent-teal)",
    accentName: "teal",
    detail:
      "Members prototype and program robots, work through the control and perception problems that make autonomy hard, and get hands-on with the mechatronics that connect code to motion. It is a place for anyone who wants to build systems that act in the physical world.",
  },
  {
    id: "sps",
    abbr: "SPS",
    name: "Signal Processing Society",
    focus: "Extracting meaning from signals, images, and audio.",
    blurb:
      "The Signal Processing Society explores how information is represented, filtered, and interpreted — spanning digital signal processing, computer vision, speech and audio, and the machine learning methods that increasingly sit alongside them.",
    themes: ["Digital signal processing", "Computer vision", "Speech & audio", "ML for signals"],
    accent: "var(--accent-purple)",
    accentName: "purple",
    detail:
      "From filtering and transforms to computer vision and audio, members study how signals carry information and how to make sense of them. Increasingly that means pairing classical signal processing with machine learning — a strong foundation for research and industry alike.",
  },
  {
    id: "comsoc",
    abbr: "ComSoc",
    name: "Communications Society",
    focus: "The networks that connect everything.",
    blurb:
      "The Communications Society focuses on how data moves — wireless systems, networking, and communication protocols — giving members grounding in the technologies behind modern connectivity from the physical layer upward.",
    themes: ["Wireless systems", "Networking", "Communication protocols", "5G & beyond"],
    accent: "var(--brand-deep)",
    accentName: "blue",
    detail:
      "Members explore the systems that move data across the world — wireless links, networks, and the protocols that hold modern connectivity together. It is the discipline behind everything from mobile networks to the next generation of communication standards.",
  },
  {
    id: "wie",
    abbr: "WIE",
    name: "Women in Engineering",
    focus: "A community advancing women in technology.",
    blurb:
      "Women in Engineering builds a supportive, technical community — mentorship, collaboration, and leadership opportunities that help women in engineering grow their skills and their voice within IEEE RVCE and beyond.",
    themes: ["Mentorship", "Leadership", "Technical community", "Outreach"],
    accent: "var(--accent-red)",
    accentName: "red",
    detail:
      "Women in Engineering is a community and a platform — mentorship, technical collaboration, and leadership opportunities that help women in engineering grow and lead. It works across the branch to make sure talent has the support and visibility it deserves.",
  },
  {
    id: "sensors",
    abbr: "Sensors",
    name: "Sensors Council",
    focus: "Instrumenting the physical world.",
    blurb:
      "The Sensors Council works at the intersection of hardware and data — sensing, instrumentation, and the connected devices that measure and respond to their environment, from IoT nodes to precision measurement systems.",
    themes: ["Sensing & instrumentation", "IoT", "Measurement systems", "Connected devices"],
    accent: "var(--accent-green)",
    accentName: "green",
    detail:
      "The Sensors Council sits where hardware meets data — sensing, instrumentation, and the connected devices that measure and respond to the world. Members work across IoT nodes, measurement systems, and the electronics that turn physical phenomena into usable signals.",
  },
];

export const csitss = {
  name: "CSITSS",
  longName:
    "International Conference on Computational Systems and Information Technology for Sustainable Solutions",
  edition: "10th International Edition",
  datesLabel: "November 20–22, 2026",
  dateStart: "2026-11-20",
  dateEnd: "2026-11-22",
  href: "https://csitss.ieee-rvce.org",
  blurb:
    "IEEE RVCE's flagship international conference returns for its tenth edition — three days bringing together researchers, industry, and students around computational systems and technology for sustainable solutions.",
} as const;

export type Milestone = { year: string; title: string; detail: string };

export const milestones: Milestone[] = [
  {
    year: "2017",
    title: "The branch is founded",
    detail:
      "IEEE RVCE is established at RV College of Engineering under IEEE Student Branch STB11651.",
  },
  {
    year: "Societies",
    title: "Five chapters take shape",
    detail:
      "RAS, SPS, ComSoc, WIE, and the Sensors Council give members focused technical homes across robotics, signals, communications, and sensing.",
  },
  {
    year: "CSITSS",
    title: "A flagship conference",
    detail:
      "CSITSS grows into an international conference, reaching its 10th edition in November 2026.",
  },
  {
    year: "200+",
    title: "A growing community",
    detail:
      "Today IEEE RVCE brings together 200+ members under a single motto — advancing technology for humanity.",
  },
];

export type Pillar = {
  id: string;
  title: string;
  description: string;
};

export const participation: Pillar[] = [
  {
    id: "societies",
    title: "Join a society chapter",
    description:
      "Find a technical home in RAS, SPS, ComSoc, WIE, or the Sensors Council and work alongside peers in your field.",
  },
  {
    id: "conference",
    title: "Take part in CSITSS",
    description:
      "Volunteer, attend, and engage with a live international IEEE conference hosted by your own branch.",
  },
  {
    id: "workshops",
    title: "Technical workshops & talks",
    description:
      "Hands-on sessions and talks that turn coursework into applied engineering across the branch's domains.",
  },
  {
    id: "leadership",
    title: "Lead and organise",
    description:
      "Step into organising and leadership roles across chapters and events as part of the IEEE student community.",
  },
];
