import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { AffinityCard } from "@/components/cards/affinity-card";
import { affinities } from "@/content/affinities";

export const metadata: Metadata = {
  title: "Affinities",
  description:
    "IEEE RVCE's affinity groups — SIGHT, working on humanitarian technology and sustainable development, and Women in Engineering.",
};

export default function AffinitiesPage() {
  return (
    <main>
      <PageHeader
        kicker="Community & inclusion"
        titleLines={["Communities built", "around people."]}
        lead="Beyond the technical societies, our affinity groups bring people together around shared purpose — humanitarian technology and the advancement of women in engineering."
      />

      <section className="bg-bg py-[var(--section-y)]">
        <div className="mx-auto grid w-full max-w-[1320px] gap-6 px-[var(--gutter)] md:grid-cols-2">
          {affinities.map((affinity, i) => (
            <Reveal key={affinity.id} delay={i * 0.1}>
              <AffinityCard affinity={affinity} className="h-full" />
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
