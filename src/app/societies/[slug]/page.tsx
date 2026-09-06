import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { MediaFrame } from "@/components/ui/media-frame";
import { ActionLink } from "@/components/ui/action-link";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { societies, societyHref, branch, csitss } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return societies.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const society = societies.find((s) => s.id === slug);
  if (!society) return {};
  return {
    title: society.name,
    description: society.focus,
  };
}

export default async function SocietyPage({ params }: Params) {
  const { slug } = await params;
  const society = societies.find((s) => s.id === slug);
  if (!society) notFound();

  const others = societies.filter((s) => s.id !== society.id);
  const accent = society.accent;

  return (
    <main style={{ "--society": accent } as React.CSSProperties}>
      {/* hero */}
      <section className="relative overflow-hidden bg-dark-bg pt-32 pb-20 text-dark-text md:pt-40 md:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-[-6%] h-[420px] w-[420px] rounded-full opacity-40 blur-3xl"
          style={{ background: accent }}
        />
        <div className="relative mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-14 px-[clamp(1.5rem,4vw,4.5rem)] lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">
            <Link
              href="/#societies"
              className="group inline-flex items-center gap-2 text-sm font-medium text-dark-muted transition-colors hover:text-dark-text"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
              All societies
            </Link>

            <div className="mt-8 flex items-center gap-3">
              <span
                className="h-7 w-1.5 rounded-[2px]"
                style={{ background: accent }}
                aria-hidden
              />
              <span className="font-mono text-sm text-dark-muted">
                {society.abbr}
              </span>
            </div>

            <h1 className="mt-5 text-h1 font-semibold tracking-tight">
              <MaskReveal immediate lines={[society.name]} />
            </h1>
            <p className="mt-5 max-w-xl text-xl text-dark-muted text-pretty">
              {society.focus}
            </p>
            <p className="mt-6 max-w-xl leading-relaxed text-dark-muted text-pretty">
              {society.blurb}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <ActionLink href="/#contact" variant="inverse">
                Join {society.abbr}
              </ActionLink>
              <ActionLink
                href="/#societies"
                variant="outline"
                className="border-dark-line bg-transparent text-dark-text hover:border-dark-text hover:text-dark-text"
              >
                Compare societies
              </ActionLink>
            </div>
          </div>

          <div className="lg:col-span-5">
            <MediaFrame
              tone="deep"
              aspect="4 / 5"
              accent={accent}
              priority
              caption={`${society.abbr} activity`}
              className="ml-auto w-full max-w-md border-dark-line"
            />
          </div>
        </div>
      </section>

      {/* what we work on */}
      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-14 px-[clamp(1.5rem,4vw,4.5rem)] lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h2 className="text-h2 font-semibold text-balance">
              <MaskReveal lines={["What members work on."]} />
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-text-muted text-pretty">
              {society.detail}
            </p>
            <ul className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
              {society.themes.map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-3 bg-surface px-5 py-4"
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: accent }}
                    aria-hidden
                  />
                  <span className="font-medium text-brand-deep">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* other societies */}
      <section className="bg-bg py-20 md:py-24">
        <div className="mx-auto w-full max-w-[1320px] px-[clamp(1.5rem,4vw,4.5rem)]">
          <div className="flex items-center justify-between">
            <h2 className="text-h3 font-semibold text-brand-deep">
              Other societies
            </h2>
            <Link
              href="/#societies"
              className="text-sm font-medium text-text-muted hover:text-ieee-blue"
            >
              View all
            </Link>
          </div>
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s) => (
              <li key={s.id}>
                <Link
                  href={societyHref(s.id)}
                  className="group flex h-full flex-col justify-between rounded-lg border border-line bg-surface p-6 transition-colors hover:border-ieee-blue/40"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="font-mono text-sm"
                      style={{ color: s.accent }}
                    >
                      {s.abbr}
                    </span>
                    <ArrowUpRight className="size-4 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <span className="mt-6 block font-medium text-brand-deep">
                    {s.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-16 max-w-xl text-text-muted">
            Not sure which fits? Reach the branch at{" "}
            <a
              href={`mailto:${branch.email}`}
              className="font-mono text-brand-deep underline decoration-line underline-offset-4 hover:decoration-ieee-blue"
            >
              {branch.email}
            </a>{" "}
            — or explore {csitss.name}, our flagship conference.
          </p>
        </div>
      </section>
    </main>
  );
}
