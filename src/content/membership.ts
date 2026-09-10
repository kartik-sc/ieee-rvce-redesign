/**
 * Membership content — benefits, what the branch offers, and the real fee
 * table. All figures are from the live membership page.
 */

export type Benefit = { title: string; detail: string };

export const whyJoin: Benefit[] = [
  {
    title: "Stay technically relevant",
    detail:
      "Keep up with new and changing technologies through access to recent journals, publications and conferences.",
  },
  {
    title: "Career resources & recognition",
    detail:
      "Keep your career moving in the right direction with IEEE's career benefits, resources and recognition.",
  },
  {
    title: "Professional networking",
    detail:
      "Build a network of IEEE members who share your interests, industry or projects.",
  },
  {
    title: "IEEE chapters",
    detail:
      "Engage with others through informative technical meetings across the branch's chapters.",
  },
  {
    title: "Member discounts",
    detail:
      "Save on IEEE books and eBooks, journals, conferences, standards and society memberships.",
  },
  {
    title: "Global benefits finder",
    detail:
      "Surface the IEEE member benefits most relevant to you and your career plans.",
  },
];

export const offerings: string[] = [
  "Opportunities to network on a local level",
  "Support for hosting professional awareness programs",
  "Funding for events, projects and activities",
  "Develop projects and obtain sponsorship based on your IEEE affiliation",
  "Connect with like-minded student groups to advance the IEEE mission",
];

export type Fee = {
  name: string;
  /** rendered strings so "Free!" is preserved exactly */
  joining: string;
  renewal: string;
  highlight?: boolean;
};

export const fees: Fee[] = [
  { name: "Student Membership", joining: "₹703", renewal: "₹1405", highlight: true },
  { name: "Aerospace & Electronic Systems (AESS)", joining: "₹120", renewal: "₹251" },
  { name: "Antennas & Propagation (APS)", joining: "₹49", renewal: "₹51" },
  { name: "Circuits & Systems (CAS)", joining: "Free!", renewal: "₹552" },
  { name: "Communications Society (ComSoc)", joining: "₹24", renewal: "₹51" },
  { name: "Computer Society (CompSoc)", joining: "₹201", renewal: "₹402" },
  { name: "Microwave Theory & Technology (MTT-S)", joining: "₹49", renewal: "₹51" },
  { name: "Power & Energy Society (PES)", joining: "₹24", renewal: "₹51" },
  { name: "Robotics & Automation (RAS)", joining: "₹239", renewal: "₹251" },
  { name: "Signal Processing Society (SPS)", joining: "₹24", renewal: "₹51" },
  { name: "Affinity Group — SIGHT", joining: "Free!", renewal: "Free!" },
  { name: "Affinity Group — Women in Engineering (WIE)", joining: "Free!", renewal: "Free!" },
];

export const feesNote =
  "To obtain any society membership, you must hold or maintain an active student membership.";

/** Canonical IEEE membership signup. */
export const joinUrl = "https://www.ieee.org/membership/join.html";

/** The membership journey used on the /membership and home CTA. */
export const journey = [
  { step: "Discover", detail: "Explore ten societies and two affinity groups across every engineering discipline." },
  { step: "Participate", detail: "Join workshops, talks, hackathons and competitions run by your peers." },
  { step: "Build", detail: "Take on projects that develop a research mindset and real, practical skill." },
  { step: "Lead", detail: "Step into organising and leadership roles across chapters and events." },
];
