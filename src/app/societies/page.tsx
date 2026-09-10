import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { SocietyTile } from "@/components/cards/society-tile";
import { societies } from "@/content/societies";

export const metadata: Metadata = {
  title: "Societies",
  description:
    "Ten IEEE technical societies at RVCE — computing, communications, power, signals, antennas, robotics, circuits, sensors, microwaves and aerospace.",
};

export default function SocietiesPage() {
  return (
    <main>
      <PageHeader
        kicker="Ten technical societies"
        titleLines={["A society for every", "corner of engineering."]}
        lead="Each society is a focused technical home — with its own vision, community, events and projects. Explore where you fit."
      />

      <section className="bg-bg py-[var(--section-y)]">
        <div className="mx-auto w-full max-w-[1320px] px-[var(--gutter)]">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {societies.map((society, i) => (
              <Reveal key={society.id} delay={(i % 4) * 0.06}>
                <SocietyTile society={society} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
