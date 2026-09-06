"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { MediaFrame } from "@/components/ui/media-frame";
import { ActionLink } from "@/components/ui/action-link";
import { csitss } from "@/content/site";

export function ConferenceFeature() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // the single scroll-linked relationship on the page
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [40, -40]);

  return (
    <section
      id="csitss"
      ref={ref}
      className="scroll-mt-24 overflow-hidden bg-bg py-24 md:py-32"
    >
      <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-14 px-[clamp(1.5rem,4vw,4.5rem)] lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-6">
          <div className="mb-5 flex items-center gap-3">
            <span
              className="h-2.5 w-2.5 rounded-[2px] bg-ieee-blue"
              aria-hidden
            />
            <span className="text-sm font-medium text-text-muted">
              Flagship conference · {csitss.edition}
            </span>
          </div>

          <h2 className="text-h1 font-semibold tracking-tight text-text">
            {csitss.name}
          </h2>
          <p className="mt-4 max-w-lg text-lg text-text-muted">
            {csitss.longName}
          </p>

          <p className="mt-10 font-mono text-2xl font-medium tracking-tight text-ieee-blue md:text-3xl">
            {csitss.datesLabel}
          </p>
          <p className="mt-6 max-w-lg leading-relaxed text-text-muted text-pretty">
            {csitss.blurb}
          </p>

          <div className="mt-10">
            <ActionLink
              href={csitss.href}
              target="_blank"
              rel="noreferrer"
            >
              Visit the conference site
            </ActionLink>
          </div>
        </div>

        <div className="lg:col-span-6">
          <motion.div style={{ y }} className="relative">
            <MediaFrame
              tone="blue"
              aspect="16 / 11"
              caption="CSITSS · Bengaluru"
              className="w-full"
            />
            <div className="absolute right-5 top-5 rounded-lg bg-white/95 px-4 py-3 text-right backdrop-blur">
              <p className="font-mono text-3xl font-semibold leading-none text-ieee-blue">
                10
              </p>
              <p className="mt-1 text-xs text-text-muted">th edition</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
