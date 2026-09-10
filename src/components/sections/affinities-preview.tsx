import { Reveal } from "@/components/ui/reveal";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { AffinityCard } from "@/components/cards/affinity-card";
import { ActionLink } from "@/components/ui/action-link";
import { affinities } from "@/content/affinities";

export function AffinitiesPreview() {
  return (
    <section className="bg-surface py-[var(--section-y)]">
      <div className="mx-auto w-full max-w-[1320px] px-[var(--gutter)]">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-[2px] bg-ieee-green" aria-hidden />
              <span className="text-sm font-medium text-text-muted">
                Community & affinity groups
              </span>
            </div>
            <h2 className="text-h1 font-semibold tracking-tight text-brand-deep text-balance">
              <MaskReveal
                lines={["More than technical work —", "a community that includes everyone."]}
              />
            </h2>
          </div>
          <ActionLink href="/affinities" variant="ghost" arrow className="shrink-0">
            About affinities
          </ActionLink>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {affinities.map((affinity, i) => (
            <Reveal key={affinity.id} delay={i * 0.1}>
              <AffinityCard affinity={affinity} className="h-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
