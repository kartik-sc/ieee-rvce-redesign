/**
 * Member-written articles from the live IEEE RVCE articles page.
 * Titles, authors and categories are real. No article bodies are published on
 * the source, so this powers a list/preview experience (not full detail pages).
 */

export type Article = {
  title: string;
  author: string;
  category: string;
  /** short factual standfirst derived from the title/category — no invented claims */
  excerpt: string;
};

export const articles: Article[] = [
  {
    title: "Electrically Characterizing Antimony Triselenide",
    author: "Aditya Madhavan",
    category: "Research",
    excerpt:
      "A technical write-up on the electrical characterization of antimony triselenide, a material of interest for photovoltaics.",
  },
  {
    title: "Protein Logic Gates",
    author: "Lauhitya A",
    category: "Research",
    excerpt:
      "Where biology meets computation — building logic gates out of proteins and what that means for the future of computing.",
  },
  {
    title: "Induced Pluripotent Stem Cells: The New Solution",
    author: "Shravani S",
    category: "Research",
    excerpt:
      "An introduction to induced pluripotent stem cells and why they are such a promising direction in modern biology.",
  },
  {
    title: "Women Who Changed Technology",
    author: "Hrishikesh Bharadwaj",
    category: "Feature",
    excerpt:
      "Celebrating the women whose achievements shaped the technology we rely on today.",
  },
  {
    title: "Technical Opportunity at RVCE",
    author: "Adithya Thonse",
    category: "Technical",
    excerpt:
      "On the technical work and research opportunities available to students at RVCE.",
  },
  {
    title: "My Experience with IEEE WIE",
    author: "Akshatha Konakondula Vydula",
    category: "Experience",
    excerpt:
      "A member's reflection on finding motivation and community through IEEE Women in Engineering.",
  },
  {
    title: "My Experience with IEEE RVCE as Vice Chair 2018",
    author: "Aditya Madhavan",
    category: "Experience",
    excerpt:
      "A testimonial from a former Vice Chair on leading and growing with IEEE RVCE.",
  },
  {
    title: "My Experience with IEEE RVCE as Secretary 2018",
    author: "Adithya Thonse",
    category: "Experience",
    excerpt:
      "A former Secretary looks back on the people and the work behind the branch.",
  },
];

export const articleCategories = [
  "All",
  ...Array.from(new Set(articles.map((a) => a.category))),
];

export const featuredArticle = articles[0];
