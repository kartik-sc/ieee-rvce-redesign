import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { EventsExplorer } from "@/components/sections/events-explorer";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Workshops, talks, hackathons and competitions from IEEE RVCE — a consistently active branch since 2017.",
};

export default function EventsPage() {
  return (
    <main>
      <PageHeader
        kicker="Workshops · Talks · Competitions"
        titleLines={["Always something", "being built."]}
        lead="From VLSI and 5G to LLMs, robotics and humanitarian hackathons — a look at what the branch has run across the years."
        aside={
          <div className="text-right">
            <div className="font-mono text-4xl font-semibold text-white">
              100+
            </div>
            <div className="text-sm text-dark-muted">events since 2017</div>
          </div>
        }
      />
      <EventsExplorer />
    </main>
  );
}
