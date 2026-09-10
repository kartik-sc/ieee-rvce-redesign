/**
 * About-page content. This is the one place "Student Branch" is used in copy.
 * History, awards and the executive committee are taken from the live site.
 * FAQ answers state general, factual information about IEEE membership.
 */

export const history = [
  "IEEE RVCE Student Branch was started in 2017, and since then — from having a few members initially to 200+ members now — has shown immense growth in both membership and the quality of its events.",
  "We have successfully conducted workshops and seminars, and shifted swiftly to webinars and online workshops during the pandemic, because no matter the circumstances, learning never stops.",
  "From encouraging our members to take up projects that develop a research mindset to even building this website, we have strived to help members gain practical skills and become better professionals.",
];

export const whatWeDo =
  "As members of a larger technical community, IEEE RVCE connects future engineers and researchers with industry experts and top academicians. We provide a platform to stay updated with today's research through webinars and technical talks by eminent professors and professionals, and we arrange workshops and industrial visits that help students upgrade their skills to stay relevant in the global market.";

export const branchAwards = [
  "Circuits and Systems Society — Outstanding Student Chapter Award 2024",
  "Power and Energy Society — Outstanding Student Chapter Award 2024",
  "IEEE Bangalore Section — Outstanding Student Branch Digital Presence Award 2023",
  "IEEE R10 — Exemplary Student Branch Award 2022",
  "Winner — Global Student Branch Website Contest 2021",
  "Second Runner Up — Student Branch Website Contest, IEEE R10 SAC 2021",
  "SPS Student Branch Chapter Growth Reward — received three times",
  "IEEE Bangalore Section MDC Award 2021",
  "Outstanding Medium Student Branch 2020 — IEEE Bangalore Section",
  "IEEE CS Bangalore Chapter — Outstanding CS Student Chapter Award 2020",
  "Third position — Membership Development Challenge Awards 2020",
];

export const memberAwards = [
  "IEEE Bangalore Section Outstanding Student Volunteer 2023 — Nisarga V",
  "IEEE India Council Outstanding Student Volunteer 2021 — S J Ruthvik",
  "IEEE Bangalore Section Outstanding Student Volunteer 2021 — Risha Dassi",
  "Best Teacher Award 2020 — Mahesh Appajappa",
  "Best Researcher Award 2020 — Dr. Shylashree N",
  "Top Performer Award (Jan–Jun 2020), IEEE Bangalore Section — Raghavendra Prasad",
  "Branch Counsellor of Nov–Dec 2020 — Dr. Ashok Kumar A R",
  "Outstanding Student Volunteer Award 2020 — S J Ruthvik",
  "Best SAC Volunteer Award 2020 — S J Ruthvik",
];

export type Officer = { name: string; role: string };

export const execCommittee: Officer[] = [
  { name: "Dr. Usha J", role: "Branch Counsellor" },
  { name: "Nishant V H", role: "Chair" },
  { name: "Pranav V Jambur", role: "Vice Chair" },
  { name: "Vijayalaxmi Ashok Patil", role: "Secretary" },
  { name: "Shreekara H", role: "Joint Secretary" },
  { name: "Manodnya Korishetty", role: "Treasurer" },
  { name: "Samanvitha L", role: "Joint Treasurer" },
  { name: "Sathish Dath D S", role: "Webmaster" },
  { name: "Hitarth Mehra", role: "Design Lead" },
  { name: "Yadamreddy Navaneeth", role: "Design Lead" },
  { name: "Kavin Krishnan C", role: "MDC Chair" },
  { name: "Pratham G Bhat", role: "MDC Secretary" },
  { name: "Suneesh Bare", role: "MDC Secretary" },
];

export type Faq = { q: string; a: string };

export const faq: Faq[] = [
  {
    q: "What is IEEE?",
    a: "IEEE is the world's largest technical professional organisation, advancing technology for the benefit of humanity through its publications, conferences, standards and professional and educational activities.",
  },
  {
    q: "What is an IEEE Student Branch?",
    a: "A Student Branch is a local IEEE group at a university that lets students engage with IEEE technical activities, societies and events — the campus home for everything IEEE.",
  },
  {
    q: "What are the member grades in IEEE?",
    a: "IEEE has several membership grades, including Student Member, Graduate Student Member, Member, Senior Member and Fellow, each with its own eligibility and benefits.",
  },
  {
    q: "Why is IEEE membership considered expensive?",
    a: "The fee reflects access to a vast body of technical resources, publications, conferences and a global professional network — value that is unlocked through active participation.",
  },
  {
    q: "Does the value of IEEE membership justify its cost?",
    a: "For students who make use of the resources, networking, conferences and volunteering opportunities, membership typically returns far more than its cost in skills and connections.",
  },
  {
    q: "I have no time to read the publications — is it still worth it?",
    a: "Publications are only one part of membership. Chapters, events, competitions, mentorship and leadership opportunities all add value independently.",
  },
  {
    q: "I can find this information on Google — what's the value of membership?",
    a: "Membership provides curated, peer-reviewed resources, a professional community and recognised experiences that a search engine cannot replace.",
  },
  {
    q: "What communities are present in IEEE?",
    a: "At RVCE, members can join ten technical societies and two affinity groups spanning computing, communications, power, signals, robotics, sensors and more.",
  },
  {
    q: "What does a member have access to?",
    a: "Members gain access to IEEE's technical library, society activities, discounts, career resources, and the events and projects run by the branch.",
  },
];
