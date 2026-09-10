import { Reveal } from "@/components/ui/reveal";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { whatWeDo } from "@/content/about";

const pillars = [
  {
    title: "Talks & webinars",
    detail:
      "Stay updated with today's research through talks by eminent professors and industry professionals.",
  },
  {
    title: "Workshops & visits",
    detail:
      "Hands-on workshops and industrial visits that turn coursework into applied, market-ready skill.",
  },
  {
    title: "Projects & research",
    detail:
      "Take up projects that develop a research mindset and build genuine practical experience.",
  },
];

export function WhatWeDo() {
  return (
    <section className="bg-surface py-[var(--section-y)]">
      <div className="mx-auto w-full max-w-[1320px] px-[var(--gutter)]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-[2px] bg-ieee-blue" aria-hidden />
              <span className="text-sm font-medium text-text-muted">What we do</span>
            </div>
            <h2 className="text-h1 font-semibold tracking-tight text-brand-deep text-balance">
              <MaskReveal
                lines={[
                  "Connecting future engineers",
                  <span key="l">
                    with the people shaping <span className="text-ieee-blue">what&rsquo;s next.</span>
                  </span>,
                ]}
              />
            </h2>
          </div>

          <Reveal className="lg:col-span-5 lg:pt-4" delay={0.1}>
            <p className="text-lg leading-relaxed text-text-muted text-pretty">
              {whatWeDo}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-none border border-line bg-line md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 0.08}
              className="bg-surface p-8"
            >
              <span className="block h-1 w-8 rounded-full bg-ieee-cyan" aria-hidden />
              <h3 className="mt-5 text-h3 font-semibold tracking-tight text-brand-deep">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {p.detail}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
