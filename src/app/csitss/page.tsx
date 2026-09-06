import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MediaFrame } from "@/components/ui/media-frame";
import { ActionLink } from "@/components/ui/action-link";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { csitss, branch } from "@/content/site";

export const metadata: Metadata = {
  title: "CSITSS 2026",
  description: `${csitss.longName} — ${csitss.datesLabel}.`,
};

export default function CsitssPage() {
  return (
    <main>
      {/* hero — dominant IEEE blue */}
      <section className="relative overflow-hidden bg-ieee-blue pt-32 pb-20 text-white md:pt-40 md:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-[-8%] h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--ieee-cyan)" }}
        />
        <div className="relative mx-auto w-full max-w-[1320px] px-[clamp(1.5rem,4vw,4.5rem)]">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            IEEE RVCE
          </Link>

          <p className="mt-8 text-sm font-medium text-white/70">
            Flagship conference · {csitss.edition}
          </p>
          <h1 className="mt-4 max-w-4xl text-display font-semibold tracking-tight">
            <MaskReveal immediate lines={["CSITSS"]} />
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-white/85 text-pretty">
            {csitss.longName}
          </p>

          <div className="mt-12 flex flex-col gap-8 border-t border-white/20 pt-8 sm:flex-row sm:items-end sm:justify-between">
            <p className="font-mono text-3xl font-medium tracking-tight md:text-5xl">
              {csitss.datesLabel}
            </p>
            <ActionLink href={csitss.href} target="_blank" rel="noreferrer" variant="inverse">
              Visit the conference site
            </ActionLink>
          </div>
        </div>
      </section>

      {/* detail */}
      <section className="bg-bg py-20 md:py-28">
        <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-14 px-[clamp(1.5rem,4vw,4.5rem)] lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-6">
            <h2 className="text-h2 font-semibold text-balance">
              <MaskReveal lines={["A decade of research at RVCE."]} />
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-text-muted text-pretty">
              {csitss.blurb}
            </p>
            <p className="mt-4 max-w-lg leading-relaxed text-text-muted text-pretty">
              Hosted by IEEE RVCE in {branch.location}, CSITSS reaches its{" "}
              {csitss.edition.toLowerCase()} in 2026. Full programme, tracks and
              registration live on the dedicated conference site.
            </p>
            <div className="mt-10">
              <ActionLink href={csitss.href} target="_blank" rel="noreferrer">
                Explore CSITSS 2026
              </ActionLink>
            </div>
          </div>
          <div className="lg:col-span-6">
            <MediaFrame tone="blue" aspect="16 / 11" caption="CSITSS · Bengaluru" />
          </div>
        </div>
      </section>
    </main>
  );
}
