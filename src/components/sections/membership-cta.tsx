import { Reveal } from "@/components/ui/reveal";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { ActionLink } from "@/components/ui/action-link";
import { Magnetic } from "@/components/motion/magnetic";
import { journey } from "@/content/membership";

export function MembershipCta() {
  return (
    <section className="bg-ieee-blue py-[var(--section-y)] text-white">
      <div className="mx-auto w-full max-w-[1320px] px-[var(--gutter)]">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-2xl text-display font-semibold tracking-tight text-balance">
            <MaskReveal lines={["Your place", "in IEEE RVCE."]} />
          </h2>
          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <ActionLink href="/membership" variant="inverse" size="lg" arrow>
                Become a member
              </ActionLink>
            </Magnetic>
            <ActionLink
              href="/membership"
              size="lg"
              className="border border-white/40 text-white hover:bg-white/10"
            >
              See benefits
            </ActionLink>
          </div>
        </div>

        <ol className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {journey.map((stage, i) => (
            <Reveal as="li" key={stage.step} delay={i * 0.08}>
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-white/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-white/25" aria-hidden />
              </div>
              <h3 className="mt-4 text-h3 font-semibold tracking-tight">
                {stage.step}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75 text-pretty">
                {stage.detail}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
