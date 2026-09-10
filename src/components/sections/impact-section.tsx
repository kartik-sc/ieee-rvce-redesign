import { Reveal } from "@/components/ui/reveal";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { Counter } from "@/components/motion/counter";
import { EventsBarChart } from "@/components/ui/events-bar-chart";
import { branchAwards, memberAwards } from "@/content/about";

const awardCount = branchAwards.length + memberAwards.length;
// Home stays free of the phrase "Student Branch"; the full official list
// (including award titles that contain it) lives on the About page.
const highlights = branchAwards
  .filter((a) => !a.includes("Student Branch"))
  .slice(0, 4);

export function ImpactSection() {
  return (
    <section className="bg-dark-bg py-[var(--section-y)] text-dark-text">
      <div className="mx-auto w-full max-w-[1320px] px-[var(--gutter)]">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-[2px] bg-ieee-cyan" aria-hidden />
          <span className="text-sm font-medium text-dark-muted">
            Recognition & impact
          </span>
        </div>
        <h2 className="max-w-3xl text-h1 font-semibold tracking-tight text-balance">
          <MaskReveal
            lines={[
              "Consistent work,",
              <span key="l">
                recognised <span className="text-ieee-cyan">nationally.</span>
              </span>,
            ]}
          />
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <dl className="grid grid-cols-2 gap-8">
              <div>
                <dd className="text-5xl font-semibold text-white md:text-6xl">
                  <Counter to={awardCount} />
                </dd>
                <dt className="mt-2 text-sm text-dark-muted">Awards &amp; honours</dt>
              </div>
              <div>
                <dd className="text-5xl font-semibold text-white md:text-6xl">100+</dd>
                <dt className="mt-2 text-sm text-dark-muted">Events since 2017</dt>
              </div>
            </dl>

            <ul className="mt-10 space-y-4 border-t border-dark-line pt-8">
              {highlights.map((award) => (
                <li key={award} className="flex gap-3 text-sm text-dark-muted">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ieee-cyan"
                    aria-hidden
                  />
                  <span className="text-pretty">{award}</span>
                </li>
              ))}
            </ul>
          </div>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="rounded-none border border-line bg-surface p-6 md:p-8">
              <EventsBarChart />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
