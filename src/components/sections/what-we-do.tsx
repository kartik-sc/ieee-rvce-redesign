import { Reveal } from "@/components/ui/reveal";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { whatWeDo } from "@/content/about";

const pillars = [
  {
    num: "01",
    title: "Talks & Webinars",
    detail:
      "Stay updated with today's research through talks by eminent professors and industry professionals.",
  },
  {
    num: "02",
    title: "Workshops & Visits",
    detail:
      "Hands-on workshops and industrial visits that turn coursework into applied, market-ready skill.",
  },
  {
    num: "03",
    title: "Projects & Research",
    detail:
      "Take up projects that develop a research mindset and build genuine practical experience.",
  },
];

export function WhatWeDo() {
  return (
    <section className="relative overflow-hidden bg-surface py-[var(--section-y)]">
      {/* Ghost section number */}
      <span
        className="ghost-num"
        style={{ top: "-1rem", left: "var(--gutter)" }}
        aria-hidden
      >
        02
      </span>

      <div className="relative mx-auto w-full max-w-[1320px] px-[var(--gutter)]">
        {/* Kicker */}
        <div className="mb-10">
          <span className="section-rule mb-5 block" />
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-text-muted">
            What we do
          </span>
        </div>

        {/* Headline + lead in a 12-col asymmetric split */}
        <div className="mb-16 grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="text-h1 font-semibold tracking-tight text-text text-balance">
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
          <Reveal className="lg:col-span-5 lg:pt-3">
            <p className="text-base leading-relaxed text-text-muted text-pretty">
              {whatWeDo}
            </p>
          </Reveal>
        </div>

        {/* Editorial ruled list */}
        <div>
          {pillars.map((p, i) => (
            <Reveal key={p.num} delay={i * 0.08}>
              <span className="section-rule block" />
              <div className="grid grid-cols-12 items-baseline gap-x-4 gap-y-2 py-6 md:gap-x-8">
                {/* On mobile: num + title sit in a flex row. On sm+: sm:contents makes each a grid child */}
                <div className="col-span-12 flex items-baseline gap-3 sm:contents">
                  <span className="shrink-0 font-mono text-xs text-text-muted sm:col-span-1">
                    {p.num}
                  </span>
                  <h3 className="text-h3 font-semibold tracking-tight text-text sm:col-span-4 lg:col-span-3">
                    {p.title}
                  </h3>
                </div>
                <p className="col-span-12 text-sm leading-relaxed text-text-muted sm:col-span-7 sm:col-start-6 lg:col-span-8 lg:col-start-5">
                  {p.detail}
                </p>
              </div>
            </Reveal>
          ))}
          <span className="section-rule block" />
        </div>
      </div>
    </section>
  );
}
