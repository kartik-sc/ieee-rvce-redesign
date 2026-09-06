"use client";

import { motion, useReducedMotion } from "motion/react";
import { MediaFrame } from "@/components/ui/media-frame";
import { ActionLink } from "@/components/ui/action-link";
import { heroContainer, heroItem } from "@/lib/motion";
import { branch, proof } from "@/content/site";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const reduced = useReducedMotion();
  const animation = reduced
    ? {}
    : { variants: heroContainer, initial: "hidden", animate: "visible" };
  const item = reduced ? {} : { variants: heroItem };

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-bg pt-28 pb-20 md:pt-36 md:pb-28"
    >
      {/* atmospheric wash — not a schematic grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--ieee-cyan) 22%, transparent), transparent 70%)",
        }}
      />

      <motion.div
        className="relative mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-14 px-[clamp(1.5rem,4vw,4.5rem)] lg:grid-cols-12 lg:items-center lg:gap-10"
        {...animation}
      >
        <div className="lg:col-span-7">
          <motion.p
            className="mb-6 text-sm font-medium text-text-muted"
            {...item}
          >
            The IEEE Student Branch at RV College of Engineering
          </motion.p>

          <h1 className="text-display font-semibold tracking-tight text-text">
            <motion.span className="block" {...item}>
              Advancing technology
            </motion.span>
            <motion.span className="block" {...item}>
              for <span className="text-ieee-blue">humanity.</span>
            </motion.span>
          </h1>

          <motion.p
            className="mt-8 max-w-xl text-lg leading-relaxed text-text-muted text-pretty"
            {...item}
          >
            A community of {branch.members} student engineers building across
            robotics, signal processing, communications and sensing — one branch,
            one purpose, since {branch.foundedYear}.
          </motion.p>

          <motion.div className="mt-10 flex flex-wrap gap-3" {...item}>
            <ActionLink href="#societies">Explore societies</ActionLink>
            <ActionLink href="#about" variant="outline">
              About the branch
            </ActionLink>
          </motion.div>

          <motion.dl
            className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-line pt-8"
            {...item}
          >
            {proof.map((p) => (
              <div key={p.label}>
                <dt className="sr-only">{p.label}</dt>
                <dd
                  className={cn(
                    "text-2xl font-semibold text-brand-deep md:text-3xl",
                    p.mono && "font-mono tracking-tight",
                  )}
                >
                  {p.value}
                </dd>
                <span className="mt-1 block text-sm text-text-muted">
                  {p.label}
                </span>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* media composition — asymmetric overlap for depth, no drop shadows */}
        <motion.div className="relative lg:col-span-5" {...item}>
          <MediaFrame
            tone="blue"
            aspect="4 / 5"
            priority
            caption="IEEE RVCE members at work"
            className="ml-auto w-full max-w-md"
          />
          <div className="absolute -bottom-6 -left-2 w-52 rounded-lg border border-line bg-surface p-5 sm:-left-6">
            <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
              {branch.branchCode}
            </p>
            <p className="mt-2 text-sm font-medium leading-snug text-brand-deep">
              {branch.motto}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
