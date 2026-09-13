/**
 * Affinity groups — communities within IEEE RVCE, distinct from the technical
 * societies. Vision/mission taken from the live affinity pages.
 */

export type Affinity = {
  id: string;
  abbr: string;
  name: string;
  fullName: string;
  focus: string;
  vision: string;
  mission: string[];
  accent: string;
  accentName: string;
  logo?: string;
};

export const affinities: Affinity[] = [
  {
    id: "sight",
    abbr: "SIGHT",
    name: "SIGHT",
    fullName: "Special Interest Group on Humanitarian Technology",
    focus: "Engineering for sustainable development and underserved communities.",
    vision:
      "Positively impact society through engineering projects on sustainable development.",
    mission: [
      "Develop solutions for challenges faced by underserved communities.",
      "Encourage engineering students to apply technological skills on projects that support the community around us.",
      "Incorporate new humanitarian technologies and upskill ourselves as engineers.",
    ],
    accent: "var(--accent-green)",
    accentName: "green",
    logo: "/media/logos/ieee_sight.png",
  },
  {
    id: "wie",
    abbr: "WIE",
    name: "Women in Engineering",
    fullName: "Women in Engineering",
    focus: "Empowering women in technology through community and mentorship.",
    vision:
      "To be a key for empowering women through professional education integrated with values and character, in order to face global competition in the new era of technology.",
    mission: [
      "Diversity of thought, perspective and culture is needed as much in engineering as in any other field.",
      "Surround yourself with people who support you, and get involved in technology.",
    ],
    accent: "var(--accent-red)",
    accentName: "red",
    logo: "/media/logos/ieee_wie.png",
  },
];

export const affinityById = (id: string) =>
  affinities.find((a) => a.id === id);
