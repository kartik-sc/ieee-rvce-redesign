import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { ArticlesExplorer } from "@/components/sections/articles-explorer";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Research notes, features and first-hand experiences written by IEEE RVCE members.",
};

export default function ArticlesPage() {
  return (
    <main>
      <PageHeader
        kicker="Written by members"
        titleLines={["Ideas worth", "writing down."]}
        lead="Research notes, features and first-hand experiences — from characterising materials to protein logic gates and life inside the branch."
      />
      <ArticlesExplorer />
    </main>
  );
}
