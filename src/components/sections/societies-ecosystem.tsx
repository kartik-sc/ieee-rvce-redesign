import { Reveal } from "@/components/ui/reveal";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { Marquee } from "@/components/motion/marquee";
import { SocietyTile } from "@/components/cards/society-tile";
import { ActionLink } from "@/components/ui/action-link";
import { societies } from "@/content/societies";

const marqueeItems = societies.map((s) => (
  <span
    key={s.id}
    className="font-display font-[900] uppercase tracking-[-0.02em] text-text/[0.12]"
    style={{ fontSize: "clamp(2.25rem, 4.5vw, 5rem)" }}
    aria-hidden
  >
    {s.abbr}
  </span>
));

const dot = (
  <span className="text-ieee-blue/20 font-display font-[900]" style={{ fontSize: "clamp(2.25rem, 4.5vw, 5rem)" }}>
    ·
  </span>
);

const marqueeItemsWithDots = marqueeItems.flatMap((item, i) =>
  i < marqueeItems.length - 1 ? [item, dot] : [item],
);

export function SocietiesEcosystem() {
  return (
    <section id="societies" className="relative scroll-mt-24 overflow-hidden bg-bg py-[var(--section-y)]">
      {/* Ghost section number */}
      <span
        className="ghost-num"
        style={{ top: "-1rem", right: "var(--gutter)" }}
        aria-hidden
      >
        03
      </span>

      <div className="relative mx-auto w-full max-w-[1320px] px-[var(--gutter)]">
        {/* Kicker */}
        <div className="mb-10">
          <span className="section-rule mb-5 block" />
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-text-muted">
            Ten technical societies
          </span>
        </div>

        {/* Headline + link */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="text-h1 font-semibold tracking-tight text-text text-balance">
            <MaskReveal
              lines={[
                "A society for every",
                <span key="l">
                  corner of <span className="text-ieee-blue">engineering.</span>
                </span>,
              ]}
            />
          </h2>
          <ActionLink href="/societies" variant="ghost" arrow className="shrink-0 text-text-muted">
            All societies
          </ActionLink>
        </div>
      </div>

      {/* Full-bleed abbreviation marquee */}
      <div className="mb-12 overflow-hidden border-y border-line py-4">
        <Marquee items={marqueeItemsWithDots} speed={55} />
      </div>

      {/* Asymmetric grid */}
      <div className="relative mx-auto w-full max-w-[1320px] px-[var(--gutter)]">
        <div className="grid grid-cols-12 gap-4">
          {societies.map((society, i) => {
            const span =
              i < 3
                ? "col-span-12 sm:col-span-6 lg:col-span-4"
                : i < 7
                  ? "col-span-12 sm:col-span-6 lg:col-span-3"
                  : "col-span-12 sm:col-span-6 lg:col-span-4";
            return (
              <Reveal key={society.id} delay={(i % 4) * 0.06} className={span}>
                <SocietyTile society={society} className="h-full" />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
