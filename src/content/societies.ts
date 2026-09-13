/**
 * The ten IEEE technical societies active at RVCE.
 * Vision + mission are taken verbatim (light typo cleanup only) from the
 * live society pages. `focus`/`themes` paraphrase their stated domains — no
 * invented metrics.
 */

export type Society = {
  id: string;
  abbr: string;
  name: string;
  /** short positioning line */
  focus: string;
  /** genuine technical domains, drawn from the society's own vision/mission */
  themes: string[];
  vision: string;
  mission: string[];
  /** controlled state accent — a CSS custom property from globals.css */
  accent: string;
  accentName: string;
  /** local logo under /media/logos when we have a real asset */
  logo?: string;
};

export const societies: Society[] = [
  {
    id: "cs",
    abbr: "CS",
    name: "Computer Society",
    focus: "Computing, software, and a culture of continuous learning.",
    themes: ["Software & systems", "Research", "Development", "Community projects"],
    vision:
      "To impart knowledge pertaining to Computer Science and create a culture of continuous learning and innovation through research, development and experimentation while persevering to develop technology for the betterment of humanity and ensuring harmony within the community.",
    mission: [
      "Enable students to gain the skills needed to become responsible professionals and stay aware of upcoming trends in computer science.",
      "Inculcate a mindset that makes students inquisitive.",
      "Imbibe a sense of responsibility towards the technical and global community by building a collaborative network of like-minded individuals.",
      "Apply observations and knowledge to community-driven, sustainable projects.",
    ],
    accent: "var(--ieee-blue)",
    accentName: "blue",
    logo: "/media/logos/ieee_computer_color.png",
  },
  {
    id: "comsoc",
    abbr: "ComSoc",
    name: "Communications Society",
    focus: "Communication and networking, from theory to implementation.",
    themes: ["Communication", "Networking", "Research", "Industry networking"],
    vision:
      "To get the student community interested in communication and networking, and help develop the society by conducting research, education, projects and the implementation of new ideas provided by its members.",
    mission: [
      "Help members understand the importance of communication and build a forum to share information related to it.",
      "Give members the opportunity to improve in technical, non-technical and professional aspects by building the right network.",
      "Provide a platform to exchange ideas amongst members and experts in both academia and industry.",
    ],
    accent: "var(--accent-teal)",
    accentName: "teal",
  },
  {
    id: "pes",
    abbr: "PES",
    name: "Power & Energy Society",
    focus: "Power generation, energy storage, and the grid.",
    themes: ["Power generation", "Energy storage", "R&D", "Professional development"],
    vision:
      "To inculcate scientific and engineering knowledge in the power and energy sector for the betterment of society, along with the professional development of its members.",
    mission: [
      "Embrace research and development in power generation and energy storage.",
      "Provide a platform for professionals in power and energy to interchange technological developments, ideas and experience.",
      "Help student members become professionals in the power and energy field and contribute to society.",
      "Ensure the overall professional development of members.",
    ],
    accent: "var(--accent-amber)",
    accentName: "amber",
  },
  {
    id: "sps",
    abbr: "SPS",
    name: "Signal Processing Society",
    focus: "Signal processing research, prototypes, and the latest developments.",
    themes: ["Digital signal processing", "Research", "Prototyping", "Workshops"],
    vision:
      "To aid student researchers in the field of signal processing by giving them a platform to stay aware of the latest developments through IEEE resources, and to provide arenas for developing projects and prototypes grounded in intensive research.",
    mission: [
      "Conduct workshops, webinars and conferences to spread awareness of recent developments in signal processing.",
      "Create a collaborative research environment in the field.",
    ],
    accent: "var(--accent-purple)",
    accentName: "purple",
    logo: "/media/logos/ieee_sps.jpg",
  },
  {
    id: "aps",
    abbr: "APS",
    name: "Antennas & Propagation Society",
    focus: "Antenna analysis, design, and propagation.",
    themes: ["Antenna design", "Propagation", "Distinguished lectures", "Workshops"],
    vision:
      "To instil excellent and broadly accessible concepts and ideals of the antennas and propagation domain, empowering the professional development of its members and of society.",
    mission: [
      "Nurture members with relevant technical knowledge of the antennas and propagation domain.",
      "Instil excellence in antenna analysis and design.",
      "Provide an active platform for members to exchange, challenge and encourage new ideas.",
      "Ensure members imbibe the skills required and contribute back through webinars, workshops and distinguished lectures.",
    ],
    accent: "var(--accent-sky)",
    accentName: "sky",
  },
  {
    id: "ras",
    abbr: "RAS",
    name: "Robotics & Automation Society",
    focus: "Robotics, automation, and hands-on prototyping.",
    themes: ["Robotics", "Automation", "Prototyping", "Leadership"],
    vision:
      "To inspire and encourage students to enrich their imagination and engineering abilities through robotics and automation — instilling technical skill, teamwork and leadership through mentor-based activities, and building real hardware and prototypes that lead to groundbreaking research.",
    mission: [
      "Conduct workshops, competitions, seminars and conferences to inspire and educate on the importance of robotics and automation.",
      "Imbibe technical skills suited to recent technological developments in the field of robotics.",
    ],
    accent: "var(--accent-red)",
    accentName: "red",
  },
  {
    id: "cas",
    abbr: "CAS",
    name: "Circuits & Systems Society",
    focus: "VLSI, embedded systems, and circuit design.",
    themes: ["Analog & digital VLSI", "Embedded systems", "Computer architecture", "Hackathons"],
    vision:
      "To get students interested in circuits and systems design and help them network with industry experts — instilling technical skill, teamwork and leadership, and the craft of design and creativity through mentor sessions and design hackathons.",
    mission: [
      "Nurture members with technical knowledge of analog and digital VLSI, embedded systems design, computer architecture and related fields.",
      "Provide an active platform for members to exchange and encourage new ideas.",
      "Conduct workshops, competitions and seminars to enhance industrial knowledge in these domains.",
    ],
    accent: "var(--accent-indigo)",
    accentName: "indigo",
  },
  {
    id: "sc",
    abbr: "Sensors",
    name: "Sensors Council",
    focus: "Sensing, transduction, and the electronics behind them.",
    themes: ["Sensors & actuators", "Instrumentation", "Fabrication", "Multi-disciplinary work"],
    vision:
      "To help members learn about the theory, design, fabrication and applications of devices for sensing and transducing physical and biological phenomena, with a focus on the electronics that create sensors and actuators.",
    mission: [
      "Teach members about the importance, working and design of sensors and actuators.",
      "Help students stay aware of the latest trends in sensors and related fields.",
      "Enable collaborative efforts across societies in multi-disciplinary technical areas of mutual interest.",
    ],
    accent: "var(--accent-green)",
    accentName: "green",
  },
  {
    id: "mtts",
    abbr: "MTT-S",
    name: "Microwave Theory & Technology Society",
    focus: "RF and microwaves — accessible, hands-on, sustainable.",
    themes: ["RF & microwaves", "Electromagnetics", "Publications", "Industry collaboration"],
    vision:
      "To make the study of RF and microwaves accessible, enjoyable and sustainable, while fostering a vibrant community of enthusiasts.",
    mission: [
      "Provide comprehensible resources for learning electromagnetics for a diverse audience.",
      "Foster a culture of excellence in research and publications relevant to RF and microwaves.",
      "Curate a community where members exchange ideas, collaborate on projects and gain hands-on experience.",
      "Collaborate with industry and academia on sustainable antenna designs and frontends.",
    ],
    accent: "var(--accent-magenta)",
    accentName: "magenta",
  },
  {
    id: "aess",
    abbr: "AESS",
    name: "Aerospace & Electronic Systems Society",
    focus: "Aerospace and electronic systems.",
    themes: ["Aerospace systems", "Electronic systems", "Publications", "Education"],
    vision:
      "To be essential to the worldwide technical community and be recognised for outstanding contributions in aerospace and electronic systems — through conferences, publications, education, technical operations, industry relations and member services.",
    mission: [
      "Provide a responsive and relevant professional society that attracts, engages, aids and retains a diverse set of members worldwide.",
      "Deliver value through technical, chapter and society activities across conferences, publications, education and industry relations.",
    ],
    accent: "var(--brand-deep)",
    accentName: "deep",
  },
];

export const societyById = (id: string) =>
  societies.find((s) => s.id === id);
