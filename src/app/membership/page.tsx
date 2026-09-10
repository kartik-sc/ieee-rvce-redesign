import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { FeeTable } from "@/components/ui/fee-table";
import { ActionLink } from "@/components/ui/action-link";
import { Magnetic } from "@/components/motion/magnetic";
import { whyJoin, offerings, journey, joinUrl } from "@/content/membership";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Why join IEEE RVCE — benefits, what the branch offers, and real membership fees across every society and affinity group.",
};

export default function MembershipPage() {
  return (
    <main>
      <PageHeader
        kicker="Membership"
        titleLines={["Join the largest", "technical community."]}
        lead="Membership plugs you into IEEE's global network — and into a branch that turns it into workshops, projects, recognition and lifelong connections."
        aside={
          <Magnetic>
            <ActionLink href={joinUrl} variant="cyan" size="lg" arrow>
              Become a member
            </ActionLink>
          </Magnetic>
        }
      />

      {/* why join */}
      <section className="bg-bg py-[var(--section-y)]">
        <div className="mx-auto w-full max-w-[1320px] px-[var(--gutter)]">
          <h2 className="max-w-2xl text-h1 font-semibold tracking-tight text-brand-deep text-balance">
            <MaskReveal lines={["Why join IEEE?"]} />
          </h2>
          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {whyJoin.map((benefit, i) => (
              <Reveal key={benefit.title} delay={(i % 3) * 0.06}>
                <div className="border-t border-line pt-6">
                  <span className="block h-1 w-8 rounded-full bg-ieee-cyan" aria-hidden />
                  <h3 className="mt-5 text-h3 font-semibold tracking-tight text-brand-deep">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    {benefit.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* journey */}
      <section className="bg-dark-bg py-[var(--section-y)] text-dark-text">
        <div className="mx-auto w-full max-w-[1320px] px-[var(--gutter)]">
          <h2 className="max-w-2xl text-h1 font-semibold tracking-tight text-balance">
            <MaskReveal lines={["From member", "to leader."]} />
          </h2>
          <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((stage, i) => (
              <Reveal as="li" key={stage.step} delay={i * 0.08}>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-ieee-cyan">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-dark-line" aria-hidden />
                </div>
                <h3 className="mt-4 text-h3 font-semibold tracking-tight text-white">
                  {stage.step}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-dark-muted text-pretty">
                  {stage.detail}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* offerings + fees */}
      <section className="bg-bg py-[var(--section-y)]">
        <div className="mx-auto grid w-full max-w-[1320px] gap-14 px-[var(--gutter)] lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="text-h2 font-semibold tracking-tight text-brand-deep text-balance">
              What the branch offers
            </h2>
            <ul className="mt-8 space-y-4">
              {offerings.map((o) => (
                <li key={o} className="flex gap-3 text-text-muted">
                  <Check className="mt-0.5 size-5 shrink-0 text-ieee-blue" aria-hidden />
                  <span className="text-pretty">{o}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <h2 className="text-h2 font-semibold tracking-tight text-brand-deep">
              Membership fees
            </h2>
            <p className="mt-3 text-text-muted">
              Transparent, society-wise pricing. Affinity groups are free to join.
            </p>
            <FeeTable className="mt-8" />
            <div className="mt-10">
              <Magnetic>
                <ActionLink href={joinUrl} variant="primary" size="lg" arrow>
                  Become a member
                </ActionLink>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
