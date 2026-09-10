import { Reveal } from "@/components/ui/reveal";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { SocietyTile } from "@/components/cards/society-tile";
import { ActionLink } from "@/components/ui/action-link";
import { societies } from "@/content/societies";

export function SocietiesEcosystem() {
  return (
    <section id="societies" className="scroll-mt-24 bg-bg py-[var(--section-y)]">
      <div className="mx-auto w-full max-w-[1320px] px-[var(--gutter)]">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-[2px] bg-ieee-blue" aria-hidden />
              <span className="text-sm font-medium text-text-muted">
                Ten technical societies
              </span>
            </div>
            <h2 className="text-h1 font-semibold tracking-tight text-brand-deep text-balance">
              <MaskReveal
                lines={[
                  "A society for every",
                  <span key="l">
                    corner of <span className="text-ieee-blue">engineering.</span>
                  </span>,
                ]}
              />
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-text-muted text-pretty">
              From computing and communications to robotics, sensors and
              microwaves — each society is a focused technical home with its own
              community, events and projects.
            </p>
          </div>
          <ActionLink href="/societies" variant="ghost" arrow className="shrink-0">
            All societies
          </ActionLink>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {societies.map((society, i) => (
            <Reveal key={society.id} delay={(i % 4) * 0.06}>
              <SocietyTile society={society} className="h-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
