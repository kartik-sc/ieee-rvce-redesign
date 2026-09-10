import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { Counter } from "@/components/motion/counter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { branch } from "@/content/site";
import { societies } from "@/content/societies";
import { affinities } from "@/content/affinities";
import {
  history,
  whatWeDo,
  branchAwards,
  memberAwards,
  execCommittee,
  faq,
} from "@/content/about";

export const metadata: Metadata = {
  title: "About",
  description: `The IEEE RVCE Student Branch (${branch.branchCode}) at RV College of Engineering — history, awards, the executive committee, and answers to common questions.`,
};

const timeline = [
  { year: "2017", label: "The Student Branch is founded at RV College of Engineering." },
  { year: "2020", label: "Recognised as an Outstanding Medium Student Branch; pivots to webinars." },
  { year: "2021", label: "Winner of the Global Student Branch Website Contest." },
  { year: "2022", label: "IEEE R10 Exemplary Student Branch Award." },
  { year: "2024", label: "CAS & PES win Outstanding Student Chapter Awards." },
];

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        kicker="About IEEE RVCE"
        titleLines={["Technology in the", "service of people."]}
        lead={`The IEEE RVCE Student Branch (${branch.branchCode}) at ${branch.college} — ${branch.members} members across ten technical societies and two affinity groups, since ${branch.foundedYear}.`}
      />

      {/* history */}
      <section className="bg-surface py-[var(--section-y)]">
        <div className="mx-auto grid w-full max-w-[1320px] gap-14 px-[var(--gutter)] lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="text-h2 font-semibold tracking-tight text-brand-deep text-balance">
              <MaskReveal lines={["Our history"]} />
            </h2>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-8">
              <div>
                <dd className="font-mono text-3xl font-semibold text-brand-deep">
                  {branch.foundedYear}
                </dd>
                <dt className="mt-1 text-sm text-text-muted">Founded</dt>
              </div>
              <div>
                <dd className="text-3xl font-semibold text-brand-deep">
                  <Counter to={200} suffix="+" />
                </dd>
                <dt className="mt-1 text-sm text-text-muted">Members</dt>
              </div>
              <div>
                <dd className="text-3xl font-semibold text-brand-deep">
                  {societies.length + affinities.length}
                </dd>
                <dt className="mt-1 text-sm text-text-muted">Chapters</dt>
              </div>
            </dl>
          </div>
          <div className="space-y-5 lg:col-span-7">
            {history.map((para) => (
              <p key={para} className="text-lg leading-relaxed text-text-muted text-pretty">
                {para}
              </p>
            ))}
            <p className="text-lg leading-relaxed text-text-muted text-pretty">
              {whatWeDo}
            </p>
          </div>
        </div>
      </section>

      {/* timeline */}
      <section className="bg-bg py-[var(--section-y)]">
        <div className="mx-auto w-full max-w-[1320px] px-[var(--gutter)]">
          <h2 className="text-h2 font-semibold tracking-tight text-brand-deep">
            <MaskReveal lines={["A short timeline"]} />
          </h2>
          <ol className="mt-12 border-l border-line">
            {timeline.map((item, i) => (
              <Reveal
                as="li"
                key={item.year}
                delay={i * 0.06}
                className="relative pb-10 pl-8 last:pb-0"
              >
                <span
                  className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-ieee-blue bg-bg"
                  aria-hidden
                />
                <span className="font-mono text-sm text-ieee-blue">{item.year}</span>
                <p className="mt-1 max-w-xl text-lg text-brand-deep text-pretty">
                  {item.label}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* awards */}
      <section className="bg-dark-bg py-[var(--section-y)] text-dark-text">
        <div className="mx-auto grid w-full max-w-[1320px] gap-14 px-[var(--gutter)] lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-h2 font-semibold tracking-tight text-balance">
              Awards received by the Student Branch
            </h2>
            <ul className="mt-8 space-y-4">
              {branchAwards.map((award) => (
                <li key={award} className="flex gap-3 border-b border-dark-line pb-4 text-dark-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ieee-cyan" aria-hidden />
                  <span className="text-pretty">{award}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-h2 font-semibold tracking-tight text-balance">
              Awards received by members
            </h2>
            <ul className="mt-8 space-y-4">
              {memberAwards.map((award) => (
                <li key={award} className="flex gap-3 border-b border-dark-line pb-4 text-dark-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ieee-cyan" aria-hidden />
                  <span className="text-pretty">{award}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* executive committee */}
      <section className="bg-surface py-[var(--section-y)]">
        <div className="mx-auto w-full max-w-[1320px] px-[var(--gutter)]">
          <h2 className="text-h2 font-semibold tracking-tight text-brand-deep">
            <MaskReveal lines={["Executive committee"]} />
          </h2>
          <p className="mt-3 text-text-muted">The team leading IEEE RVCE this year.</p>
          <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {execCommittee.map((officer) => (
              <li key={officer.name} className="border-t border-line pt-4">
                <p className="font-medium text-brand-deep text-pretty">{officer.name}</p>
                <p className="mt-1 text-sm text-text-muted">{officer.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* faq */}
      <section className="bg-bg py-[var(--section-y)]">
        <div className="mx-auto grid w-full max-w-[1320px] gap-14 px-[var(--gutter)] lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className="text-h2 font-semibold tracking-tight text-brand-deep text-balance">
              <MaskReveal lines={["Frequently", "asked questions"]} />
            </h2>
          </div>
          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="border-t border-line">
              {faq.map((item, i) => (
                <AccordionItem key={item.q} value={`faq-${i}`} className="border-b border-line">
                  <AccordionTrigger className="py-5 text-lg font-medium text-brand-deep">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-text-muted">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </main>
  );
}
