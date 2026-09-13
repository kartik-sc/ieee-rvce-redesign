import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ActionLink } from "@/components/ui/action-link";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { societies, societyById } from "@/content/societies";
import { societyHref, branch } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return societies.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const society = societyById(slug);
  if (!society) return {};
  return { title: society.name, description: society.focus };
}

export default async function SocietyPage({ params }: Params) {
  const { slug } = await params;
  const society = societyById(slug);
  if (!society) notFound();

  const others = societies.filter((s) => s.id !== society.id).slice(0, 8);
  const accent = society.accent;

  return (
    <main style={{ "--accent": accent } as React.CSSProperties}>
      {/* hero */}
      <section className="relative overflow-hidden bg-dark-bg pt-36 pb-20 text-dark-text md:pt-44 md:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-[-6%] h-[420px] w-[420px] rounded-full opacity-40 blur-3xl"
          style={{ background: accent }}
        />
        <div className="relative mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-14 px-[var(--gutter)] lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">
            <Link
              href="/societies"
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
              <span className="font-mono text-sm text-dark-muted">{society.abbr}</span>
            </div>

            <h1 className="mt-5 text-display font-semibold tracking-tight">
              <MaskReveal immediate lines={[society.name]} />
            </h1>
            <p className="mt-6 max-w-xl text-xl text-dark-muted text-pretty">
              {society.focus}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <ActionLink href="/membership" variant="cyan" arrow>
                Join {society.abbr}
              </ActionLink>
              <ActionLink
                href="/societies"
                className="border border-white/25 text-white hover:border-white hover:bg-white/5"
              >
                Compare societies
              </ActionLink>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div
              className="ml-auto flex aspect-[4/5] w-full max-w-md flex-col justify-between rounded-none border border-dark-line p-8"
              style={{
                background:
                  "linear-gradient(160deg, color-mix(in oklab, var(--accent) 22%, var(--dark-surface)), var(--dark-bg))",
              }}
            >
              <div className="flex justify-between">
                <span
                  className="h-10 w-1.5 rounded-full"
                  style={{ background: accent }}
                  aria-hidden
                />
                {society.logo ? (
                  <span className="flex h-14 w-14 items-center justify-center rounded-none bg-white/95 p-2">
                    <Image
                      src={society.logo}
                      alt={`${society.abbr} logo`}
                      width={48}
                      height={48}
                      className="h-full w-auto object-contain"
                    />
                  </span>
                ) : null}
              </div>
              <div>
                <p className="font-mono text-sm text-dark-muted">{society.abbr}</p>
                <p className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-white text-pretty">
                  {society.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* vision + mission */}
      <section className="bg-surface py-[var(--section-y)]">
        <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-14 px-[var(--gutter)] lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <span
              className="text-sm font-medium"
              style={{ color: accent }}
            >
              Vision
            </span>
            <p className="mt-4 text-h3 font-medium leading-snug text-brand-deep text-pretty">
              {society.vision}
            </p>
          </div>
          <div className="lg:col-span-7">
            <span className="text-sm font-medium text-text-muted">Mission</span>
            <ul className="mt-4 space-y-4">
              {society.mission.map((m) => (
                <li key={m} className="flex gap-4 border-b border-line pb-4 text-lg leading-relaxed text-text-muted text-pretty">
                  <span
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: accent }}
                    aria-hidden
                  />
                  {m}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2">
              {society.themes.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line px-3 py-1.5 text-sm text-brand-deep"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* other societies */}
      <section className="bg-bg py-[var(--section-y)]">
        <div className="mx-auto w-full max-w-[1320px] px-[var(--gutter)]">
          <div className="flex items-center justify-between">
            <h2 className="text-h3 font-semibold text-brand-deep">Other societies</h2>
            <Link
              href="/societies"
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
                  className="group flex h-full flex-col justify-between rounded-none border border-line bg-surface p-6 transition-colors hover:border-ieee-blue/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm" style={{ color: s.accent }}>
                      {s.abbr}
                    </span>
                    <ArrowUpRight className="size-4 text-text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
