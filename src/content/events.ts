/**
 * A curated selection of real IEEE RVCE events (2020–2024), taken from the live
 * events archive. Titles, dates and keywords are real; `category` is derived
 * from each event's keywords/format. Structured so it can later be swapped for
 * an API/CMS without touching the UI.
 */

export type EventCategory =
  | "Workshop"
  | "Talk"
  | "Competition"
  | "Community"
  | "Conference";

export type BranchEvent = {
  title: string;
  dateLabel: string;
  /** ISO start date, used for sorting + year grouping */
  start: string;
  year: number;
  category: EventCategory;
  keywords: string[];
};

export const events: BranchEvent[] = [
  { title: "Distinguished Lecture on Target Tracking and Data Fusion", dateLabel: "Apr 9 – May 15, 2024", start: "2024-04-09", year: 2024, category: "Talk", keywords: ["Target tracking", "Data fusion"] },
  { title: "VLSI RoadShow", dateLabel: "Mar 16–17, 2024", start: "2024-03-16", year: 2024, category: "Workshop", keywords: ["VLSI", "Semiconductors"] },
  { title: "3D Printing Workshop", dateLabel: "Mar 8–9, 2024", start: "2024-03-08", year: 2024, category: "Workshop", keywords: ["3D printing", "Fabrication"] },
  { title: "Crack the Career Code: LinkedIn and Beyond", dateLabel: "Mar 4, 2024", start: "2024-03-04", year: 2024, category: "Talk", keywords: ["Careers", "LinkedIn"] },
  { title: "From Logic to Layout: The RTL to GDSII Flow", dateLabel: "Feb 6, 2024", start: "2024-02-06", year: 2024, category: "Workshop", keywords: ["RTL", "GDSII", "VLSI"] },
  { title: "Hack4Soc 2.0", dateLabel: "Feb 3–4, 2024", start: "2024-02-03", year: 2024, category: "Competition", keywords: ["Hackathon", "Social impact"] },
  { title: "Talk on Quantum Communication", dateLabel: "Feb 2, 2024", start: "2024-02-02", year: 2024, category: "Talk", keywords: ["Quantum", "Communication"] },
  { title: "Exploring Large Language Models!", dateLabel: "Jan 11, 2024", start: "2024-01-11", year: 2024, category: "Talk", keywords: ["LLMs", "Machine learning"] },

  { title: "STEM IoT Workshop", dateLabel: "Nov 25–29, 2023", start: "2023-11-25", year: 2023, category: "Workshop", keywords: ["STEM", "IoT", "Outreach"] },
  { title: "Antenna and DSP Techniques for Physical Layer Security", dateLabel: "Jun 14, 2023", start: "2023-06-14", year: 2023, category: "Talk", keywords: ["Antennas", "DSP", "Security"] },
  { title: "Crack the Code: Google and Beyond", dateLabel: "Jun 9, 2023", start: "2023-06-09", year: 2023, category: "Talk", keywords: ["Careers", "SDE", "Google"] },
  { title: "Introduction to MMIC and Design Methodology", dateLabel: "Mar 13, 2023", start: "2023-03-13", year: 2023, category: "Workshop", keywords: ["MMIC", "RF design"] },
  { title: "H.E.R.A — Health. Empowerment. Reassurance. Acknowledge.", dateLabel: "Mar 9, 2023", start: "2023-03-09", year: 2023, category: "Community", keywords: ["Health", "Empowerment"] },
  { title: "Industry Conclave", dateLabel: "Feb 10–11, 2023", start: "2023-02-10", year: 2023, category: "Conference", keywords: ["Industry", "Panel", "New technologies"] },
  { title: "Control System Fundamentals using MATLAB", dateLabel: "Jan 23–25, 2023", start: "2023-01-23", year: 2023, category: "Workshop", keywords: ["MATLAB", "Control systems"] },

  { title: "MEMS: Past, Present and Future", dateLabel: "Dec 20, 2022", start: "2022-12-20", year: 2022, category: "Talk", keywords: ["MEMS", "Sensor fabrication"] },
  { title: "Signal Processing in Wearable Devices", dateLabel: "Sep 2, 2022", start: "2022-09-02", year: 2022, category: "Talk", keywords: ["Wearables", "Signal processing"] },
  { title: "Inauguration of Sensors Council", dateLabel: "Sep 29, 2022", start: "2022-09-29", year: 2022, category: "Community", keywords: ["Sensors", "Inauguration"] },
  { title: "Hack4Soc: Where Humanity Meets Technology", dateLabel: "Aug 28–29, 2022", start: "2022-08-28", year: 2022, category: "Competition", keywords: ["Hackathon", "NGO"] },
  { title: "Git Set Go — Git Workshop", dateLabel: "Jul 27–28, 2022", start: "2022-07-27", year: 2022, category: "Workshop", keywords: ["Git", "Version control"] },
  { title: "Not a Taboo, Period!", dateLabel: "Jul 21–22, 2022", start: "2022-07-21", year: 2022, category: "Community", keywords: ["Period education", "Awareness"] },
  { title: "Career Insights", dateLabel: "Jun 18 – Jul 2, 2022", start: "2022-06-18", year: 2022, category: "Community", keywords: ["Mentoring", "Guidance"] },
  { title: "Introduction to Bitcoin and Blockchain Technology", dateLabel: "May 31, 2022", start: "2022-05-31", year: 2022, category: "Talk", keywords: ["Blockchain", "Bitcoin"] },
  { title: "Making HERstory — Women's Day Celebrations", dateLabel: "Mar 8, 2022", start: "2022-03-08", year: 2022, category: "Community", keywords: ["Women in Engineering", "Women's Day"] },

  { title: "IEEEXtreme 15.0", dateLabel: "Oct 23–24, 2021", start: "2021-10-23", year: 2021, category: "Competition", keywords: ["Competitive coding"] },
  { title: "IEEE Day 2021 Celebrations", dateLabel: "Oct 7–10, 2021", start: "2021-10-07", year: 2021, category: "Community", keywords: ["IEEE Day", "Speaker session"] },
  { title: "VR / AR Workshop Series", dateLabel: "Sep 27 – Oct 1, 2021", start: "2021-09-27", year: 2021, category: "Workshop", keywords: ["Virtual reality", "Augmented reality"] },
  { title: "Deep Dive into UX Design", dateLabel: "Sep 25, 2021", start: "2021-09-25", year: 2021, category: "Workshop", keywords: ["UX", "UI", "Design"] },
  { title: "Fundamentals of Quantum Computing and Applications", dateLabel: "Mar 2–6, 2021", start: "2021-03-02", year: 2021, category: "Workshop", keywords: ["Quantum computing", "Cryptography"] },
  { title: "Webinar on “My Odyssey”", dateLabel: "May 13, 2021", start: "2021-05-13", year: 2021, category: "Talk", keywords: ["ISRO", "Aditya-L1"] },

  { title: "Hands-on Workshop on 5G New Radio", dateLabel: "Sep 15–20, 2020", start: "2020-09-15", year: 2020, category: "Workshop", keywords: ["5G", "New Radio"] },
  { title: "IBM Quantum Computing Webinar", dateLabel: "Jul 14, 2020", start: "2020-07-14", year: 2020, category: "Talk", keywords: ["Quantum computing"] },
  { title: "Blockchain Workshop", dateLabel: "Jul 7–12, 2020", start: "2020-07-07", year: 2020, category: "Workshop", keywords: ["Blockchain"] },
  { title: "Dhwani", dateLabel: "Mar 23 – Apr 26, 2020", start: "2020-03-23", year: 2020, category: "Community", keywords: ["Women empowerment", "Competition"] },
  { title: "Data Structures Workshop", dateLabel: "Feb 21, 2020", start: "2020-02-21", year: 2020, category: "Workshop", keywords: ["Data structures"] },
  { title: "Introduction to Aerospace Engineering and Avionics", dateLabel: "Apr 28, 2020", start: "2020-04-28", year: 2020, category: "Talk", keywords: ["Avionics", "Aerospace"] },
];

export const eventCategories: EventCategory[] = [
  "Workshop",
  "Talk",
  "Competition",
  "Community",
  "Conference",
];

/** Newest first — used for the featured + rail on the home page. */
export const eventsByDate = [...events].sort((a, b) =>
  b.start.localeCompare(a.start),
);

export const featuredEvents = eventsByDate.slice(0, 6);

/** Selected-events count per year, for the impact chart. */
export const eventsByYear = Object.entries(
  events.reduce<Record<number, number>>((acc, e) => {
    acc[e.year] = (acc[e.year] ?? 0) + 1;
    return acc;
  }, {}),
)
  .map(([year, count]) => ({ year: Number(year), count }))
  .sort((a, b) => a.year - b.year);
