"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { ActionLink } from "@/components/ui/action-link";
import { ease } from "@/lib/motion";

export function MembershipCta() {
  const reduced = useReducedMotion();
  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 14, filter: "blur(4px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.65, ease: ease.out, delay },
        };

  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-brand-deep py-[var(--section-y)] text-white">
      {/* Logo watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <Image
          src="/media/logos/ieee_rvce_new_white.png"
          width={800}
          height={300}
          alt=""
          className="h-auto w-[min(640px,85vw)] opacity-[0.04]"
        />
      </div>

      {/* Centered content */}
      <div className="relative mx-auto w-full max-w-[1320px] px-[var(--gutter)] text-center">
        <h2 className="text-display font-semibold tracking-tight text-balance">
          <MaskReveal lines={["Your place", "in IEEE RVCE."]} />
        </h2>

        <motion.p
          className="mx-auto mt-4 max-w-md font-mono text-sm tracking-wider text-white/45"
          {...rise(0.5)}
        >
          Join 200+ student engineers shaping the future of technology at RV College of Engineering.
        </motion.p>

        <motion.div className="mt-8" {...rise(0.7)}>
          <ActionLink href="/membership" variant="inverse" size="lg" arrow>
            Become a member
          </ActionLink>
        </motion.div>

        <motion.p
          className="mt-12 font-mono text-xs tracking-[0.22em] text-white/20"
          {...rise(0.9)}
        >
          IEEE · RVCE · STB11651 · EST. 2017
        </motion.p>
      </div>
    </section>
  );
}
