import { MaskReveal } from "@/components/motion/mask-reveal";
import { Counter } from "@/components/motion/counter";
import { branchAwards, memberAwards } from "@/content/about";

const awardCount = branchAwards.length + memberAwards.length;

const shortAwards: string[] = [
  "CAS — Outstanding Chapter, 2024",
  "PES — Outstanding Chapter, 2024",
  "Bangalore Section — Digital Presence, 2023",
  "IEEE R10 — Exemplary Branch, 2022",
  "Website Contest — Winner, 2021",
  "R10 Website Contest — Runner-up, 2021",
  "SPS — Chapter Growth Award × 3",
  "Bangalore Section — MDC Award, 2021",
  "Bangalore Section — Outstanding Branch, 2020",
  "CS — Outstanding Chapter, 2020",
  "MDC Awards — Third Place, 2020",
  "Nisarga V — Outstanding Volunteer, 2023",
  "Ruthvik — Outstanding Volunteer, 2021",
  "Dassi — Outstanding Volunteer, 2021",
  "Mahesh Appajappa — Best Teacher, 2020",
  "Dr. Shylashree N — Best Researcher, 2020",
  "Raghavendra Prasad — Top Performer, 2020",
  "Dr. Ashok Kumar — Branch Counsellor, 2020",
  "Ruthvik — Best SAC Volunteer, 2020",
  "Ruthvik — Outstanding Volunteer, 2020",
];

export function ImpactSection() {
  return (
    <section className="relative overflow-hidden bg-dark-bg py-[var(--section-y)] text-dark-text">
      <div className="relative mx-auto w-full max-w-[1320px] px-[var(--gutter)]">
        {/* Kicker */}
        <div className="mb-10">
          <span
            className="section-rule mb-5 block"
            style={{ background: "var(--dark-line)" }}
          />
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-dark-muted">
            Recognition &amp; awards
          </span>
        </div>

        {/* Headline */}
        <h2 className="mb-14 max-w-3xl text-h1 font-semibold tracking-tight text-balance">
          <MaskReveal
            lines={[
              "Recognised nationally,",
              <span key="l">
                year after <span className="text-ieee-cyan">year.</span>
              </span>,
            ]}
          />
        </h2>

        {/* Main content */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left: oversized award count */}
          <div className="lg:col-span-4">
            <div
              className="font-display font-[900] leading-none tracking-[-0.04em] text-white"
              style={{ fontSize: "clamp(7rem, 18vw, 16rem)" }}
            >
              <Counter to={awardCount} />
            </div>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.22em] text-dark-muted">
              Awards &amp; honours
            </p>

            <div className="mt-8">
              <p
                className="font-display font-[900] leading-none tracking-[-0.03em] text-white/20"
                style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}
              >
                100+
              </p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.22em] text-dark-muted">
                Events since {2017}
              </p>
            </div>
          </div>

          {/* Right: compact award pills */}
          <div className="lg:col-span-8">
            <div
              className="border-t pt-6"
              style={{ borderColor: "var(--dark-line)" }}
            >
              <div className="flex flex-wrap gap-2">
                {shortAwards.map((award) => (
                  <span
                    key={award}
                    className="rounded-none border border-dark-line px-3 py-1.5 text-xs leading-snug text-dark-muted"
                  >
                    {award}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
