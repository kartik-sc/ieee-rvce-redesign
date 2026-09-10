"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { SignalField } from "@/components/motion/signal-field";
import { ActionLink } from "@/components/ui/action-link";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { Counter } from "@/components/motion/counter";
import { Magnetic } from "@/components/motion/magnetic";
import { branch } from "@/content/site";
import { societies } from "@/content/societies";
import { branchAwards, memberAwards } from "@/content/about";
import { ease } from "@/lib/motion";

const awardCount = branchAwards.length + memberAwards.length;

export function HeroSection() {
  const reduced = useReducedMotion();
  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 18, filter: "blur(6px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.7, ease: ease.out, delay },
        };

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-dark-bg text-dark-text">
      <SignalField />
      {/* depth vignette so text stays legible over the field */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 90% at 20% 0%, transparent 40%, rgba(7,26,40,0.6) 100%), linear-gradient(180deg, rgba(7,26,40,0.4), transparent 30%, rgba(7,26,40,0.85))",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1320px] px-[clamp(1.5rem,4vw,4.5rem)] pt-32 pb-16">
        <motion.p
          className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.24em] text-dark-muted"
          {...rise(0.05)}
        >
          <span className="h-2 w-2 rounded-full bg-ieee-cyan" aria-hidden />
          IEEE · RV College of Engineering
        </motion.p>

        <h1 className="text-mega font-semibold tracking-tight">
          <MaskReveal
            immediate
            delay={0.12}
            lines={[
              "Advancing",
              "technology",
              <span key="l">
                for <span className="text-ieee-cyan">humanity.</span>
              </span>,
            ]}
          />
        </h1>

        <motion.p
          className="mt-8 max-w-xl text-lg leading-relaxed text-dark-muted text-pretty"
          {...rise(0.7)}
        >
          A community of {branch.members} student engineers building across
          computing, communications, power, signals, robotics and sensing —
          {" "}one branch, one purpose, since {branch.foundedYear}.
        </motion.p>

        <motion.div className="mt-10 flex flex-wrap items-center gap-3" {...rise(0.8)}>
          <Magnetic>
            <ActionLink href="/membership" variant="cyan" size="lg" arrow>
              Become a member
            </ActionLink>
          </Magnetic>
          <ActionLink
            href="/societies"
            size="lg"
            className="border border-white/25 text-white hover:border-white hover:bg-white/5"
          >
            Explore societies
          </ActionLink>
        </motion.div>

        <motion.dl
          className="mt-16 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-8 border-t border-dark-line pt-8 sm:grid-cols-4"
          {...rise(0.95)}
        >
          <ProofStat value={<>{branch.foundedYear}</>} label="Founded" mono />
          <ProofStat value={<Counter to={200} suffix="+" />} label="Members" />
          <ProofStat value={<Counter to={societies.length} />} label="Societies" />
          <ProofStat value={<Counter to={awardCount} />} label="Awards & honours" />
        </motion.dl>
      </div>

      <div className="relative mx-auto w-full max-w-[1320px] px-[clamp(1.5rem,4vw,4.5rem)] pb-10">
        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-dark-muted">
          <ArrowDown className="size-4 animate-bounce" aria-hidden />
          Scroll
        </span>
      </div>
    </section>
  );
}

function ProofStat({
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
          "text-3xl font-semibold text-white md:text-4xl" +
          (mono ? " font-mono tracking-tight" : "")
        }
      >
        {value}
      </dd>
      <span className="mt-1 block text-sm text-dark-muted">{label}</span>
    </div>
  );
}
