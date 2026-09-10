/**
 * Core branch facts + navigation. Single source of truth.
 * Only verified facts live here — no invented statistics, awards, or quotes.
 * Note: the phrase "Student Branch" is intentionally kept out of general copy
 * and surfaced only on the About page (see content/about.ts).
 */

export const branch = {
  name: "IEEE RVCE",
  /** used on About only */
  legalName: "IEEE RVCE Student Branch",
  motto: "Advancing Technology for Humanity",
  foundedYear: 2017,
  members: "200+",
  membersValue: 200,
  branchCode: "STB11651",
  email: "ieeervce@rvce.edu.in",
  college: "RV College of Engineering",
  city: "Bengaluru",
  address:
    "Mysore Road, RV Vidyanikethan Post, Bengaluru-560059, Karnataka, India",
} as const;

export const socials = {
  website: "https://www.ieee-rvce.org",
  csitss: "https://csitss.ieee-rvce.org",
} as const;

export type NavLink = { label: string; href: string };

export const nav: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Societies", href: "/societies" },
  { label: "Affinities", href: "/affinities" },
  { label: "Membership", href: "/membership" },
  { label: "Articles", href: "/articles" },
];

export const societyHref = (id: string) => `/societies/${id}`;
