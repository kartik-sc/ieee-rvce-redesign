import { MaskReveal } from "@/components/motion/mask-reveal";
import { Counter } from "@/components/motion/counter";
import { branchAwards, memberAwards } from "@/content/about";

const awardCount = branchAwards.length + memberAwards.length;
const highlights = [...branchAwards, ...memberAwards].slice(0, 6);

export function ImpactSection() {
  return (
    <section className="relative overflow-hidden bg-dark-bg py-[var(--section-y)] text-dark-text">
      {/* Ghost section number — extra low opacity on dark bg */}
      <span
        className="ghost-num"
        style={{ top: "-1rem", left: "var(--gutter)", opacity: 0.03 }}
        aria-hidden
      >
        04
      </span>

      <div className="relative mx-auto w-full max-w-[1320px] px-[var(--gutter)]">
        {/* Kicker */}
        <div className="mb-10">
          <span
            className="section-rule mb-5 block"
            style={{ background: "var(--dark-line)" }}
          />
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-dark-muted">
            Recognition & impact
          </span>
        </div>

        {/* Headline */}
        <h2 className="mb-14 max-w-3xl text-h1 font-semibold tracking-tight text-balance">
          <MaskReveal
            lines={[
              "Consistent work,",
              <span key="l">
                recognised <span className="text-ieee-cyan">nationally.</span>
              </span>,
            ]}
          />
        </h2>

        {/* Main content: giant number + awards list */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left: oversized award count anchor */}
          <div className="lg:col-span-5">
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

          {/* Right: award list */}
          <div className="lg:col-span-7">
            <ul className="space-y-4 border-t pt-6" style={{ borderColor: "var(--dark-line)" }}>
              {highlights.map((award, i) => (
                <li key={award} className="flex items-baseline gap-4 text-sm">
                  <span className="shrink-0 font-mono text-xs text-dark-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-pretty text-dark-muted leading-relaxed">{award}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
