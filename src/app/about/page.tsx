import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { Counter } from "@/components/motion/counter";
import { ContactCTA } from "@/components/sections/contact-cta";
import { branch, milestones, societies, societyHref } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `About the IEEE Student Branch at RV College of Engineering (${branch.branchCode}).`,
};

export default function AboutPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-bg pt-32 pb-16 md:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-[-8%] h-[440px] w-[440px] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--ieee-cyan) 40%, transparent), transparent 70%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-[1320px] px-[clamp(1.5rem,4vw,4.5rem)]">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-text-muted transition-colors hover:text-ieee-blue"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            Home
          </Link>
          <p className="mt-8 text-sm font-medium text-text-muted">Since 2017</p>
          <h1 className="mt-4 max-w-4xl text-h1 font-semibold tracking-tight text-text">
            <MaskReveal
              immediate
              lines={["Technology in the", <>service of <span className="text-ieee-blue">people.</span></>]}
            />
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-text-muted text-pretty">
            IEEE RVCE is the IEEE Student Branch at RV College of Engineering,
            {" "}{branch.branchCode}. Since {branch.foundedYear} it has grown into a
            community of {branch.members} student engineers organised around five
            active societies — held together by one motto, {branch.motto.toLowerCase()}.
          </p>

          <dl className="mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-line pt-8">
            <Stat value={<>{branch.foundedYear}</>} label="Founded" mono />
            <Stat value={<Counter to={200} suffix="+" />} label="Members" />
            <Stat value={<>{societies.length}</>} label="Societies" />
          </dl>
        </div>
      </section>

      {/* timeline */}
      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1320px] px-[clamp(1.5rem,4vw,4.5rem)]">
          <h2 className="max-w-2xl text-h2 font-semibold text-balance">
            <MaskReveal lines={["How the branch took shape."]} />
          </h2>
          <ol className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((m) => (
              <li key={m.title} className="flex flex-col bg-surface p-7">
                <span className="font-mono text-lg font-semibold text-ieee-blue">
                  {m.year}
                </span>
                <span className="mt-5 text-base font-semibold text-brand-deep">
                  {m.title}
                </span>
                <span className="mt-2 text-sm leading-relaxed text-text-muted text-pretty">
                  {m.detail}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* societies quick links */}
      <section className="bg-bg py-20 md:py-24">
        <div className="mx-auto w-full max-w-[1320px] px-[clamp(1.5rem,4vw,4.5rem)]">
          <h2 className="text-h3 font-semibold text-brand-deep">The five societies</h2>
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {societies.map((s) => (
              <li key={s.id}>
                <Link
                  href={societyHref(s.id)}
                  className="group flex h-full flex-col justify-between rounded-lg border border-line bg-surface p-6 transition-colors hover:border-ieee-blue/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm" style={{ color: s.accent }}>
                      {s.abbr}
                    </span>
                    <ArrowUpRight className="size-4 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <span className="mt-6 block text-sm font-medium text-brand-deep">
                    {s.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
}

function Stat({
  value,
  label,
  mono,
}: {
  value: React.ReactNode;
  label: string;
  mono?: boolean;
}) {
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd
        className={
          "text-2xl font-semibold text-brand-deep md:text-3xl" +
          (mono ? " font-mono tracking-tight" : "")
        }
      >
        {value}
      </dd>
      <span className="mt-1 block text-sm text-text-muted">{label}</span>
    </div>
  );
}
