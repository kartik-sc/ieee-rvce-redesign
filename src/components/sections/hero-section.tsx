"use client";

import { motion, useReducedMotion } from "motion/react";
import { Aurora } from "@/components/ui/aurora";
import { MediaFrame } from "@/components/ui/media-frame";
import { ActionLink } from "@/components/ui/action-link";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { Counter } from "@/components/motion/counter";
import { Magnetic } from "@/components/motion/magnetic";
import { Marquee } from "@/components/motion/marquee";
import { branch } from "@/content/site";
import { ease } from "@/lib/motion";

const marqueeWords = [
  "Robotics",
  "Signal processing",
  "Communications",
  "Women in Engineering",
  "Sensors",
  "Automation",
  "Computer vision",
  "IoT",
  "Machine learning",
];

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
    <section id="top" className="relative overflow-hidden bg-bg">
      <Aurora className="opacity-90" />

      <div className="relative mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-14 px-[clamp(1.5rem,4vw,4.5rem)] pt-32 pb-16 md:pt-40 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-7">
          <motion.p className="mb-6 text-sm font-medium text-text-muted" {...rise(0.05)}>
            The IEEE Student Branch at RV College of Engineering
          </motion.p>

          <h1 className="text-display font-semibold tracking-tight text-text">
            <MaskReveal
              immediate
              delay={0.1}
              lines={[
                "Advancing technology",
                <>
                  for <span className="text-ieee-blue">humanity.</span>
                </>,
              ]}
            />
          </h1>

          <motion.p
            className="mt-8 max-w-xl text-lg leading-relaxed text-text-muted text-pretty"
            {...rise(0.5)}
          >
            A community of {branch.members} student engineers building across
            robotics, signal processing, communications and sensing — one branch,
            one purpose, since {branch.foundedYear}.
          </motion.p>

          <motion.div className="mt-10 flex flex-wrap gap-3" {...rise(0.6)}>
            <Magnetic>
              <ActionLink href="#societies">Explore societies</ActionLink>
            </Magnetic>
            <ActionLink href="/about" variant="outline">
              About the branch
            </ActionLink>
          </motion.div>

          <motion.dl
            className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-line pt-8"
            {...rise(0.7)}
          >
            <ProofStat value={<>{branch.foundedYear}</>} label="Founded" mono />
            <ProofStat value={<Counter to={200} suffix="+" />} label="Active members" />
            <ProofStat value={branch.branchCode} label="IEEE Student Branch" mono />
          </motion.dl>
        </div>

        {/* media composition */}
        <motion.div
          className="relative lg:col-span-5"
          initial={reduced ? undefined : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={reduced ? undefined : { opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.9, ease: ease.out, delay: 0.35 }}
        >
          <MediaFrame
            tone="blue"
            aspect="4 / 5"
            priority
            caption="IEEE RVCE members at work"
            className="ml-auto w-full max-w-md"
          />
          <motion.div
            className="absolute -bottom-6 -left-2 w-52 rounded-lg border border-line bg-surface p-5 shadow-[0_18px_40px_-24px_rgba(0,59,92,0.5)] sm:-left-6"
            {...rise(0.9)}
          >
            <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
              {branch.branchCode}
            </p>
            <p className="mt-2 text-sm font-medium leading-snug text-brand-deep">
              {branch.motto}
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* keyword marquee */}
      <div className="relative border-y border-line/70 bg-surface/60 py-5 backdrop-blur-sm">
        <Marquee
          speed={38}
          items={marqueeWords.map((w) => (
            <span key={w} className="flex items-center gap-10">
              <span className="text-lg font-medium text-brand-deep/70">{w}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-ieee-cyan" aria-hidden />
            </span>
          ))}
        />
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
