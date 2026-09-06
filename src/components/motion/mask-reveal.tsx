"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type MaskRevealProps = {
  /** each entry becomes one masked line */
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /** animate on mount instead of on scroll into view */
  immediate?: boolean;
};

const container: Variants = {
  hidden: {},
  visible: (custom: { delay: number; stagger: number }) => ({
    transition: {
      staggerChildren: custom.stagger,
      delayChildren: custom.delay,
    },
  }),
};

const line: Variants = {
  hidden: { y: "115%" },
  visible: { y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Per-line mask reveal — each line rises out of an overflow-clipped track.
 * The classic "materialising headline" without touching layout properties.
 */
export function MaskReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  immediate = false,
}: MaskRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <span className={className}>
        {lines.map((l, i) => (
          <span key={i} className={lineClassName} style={{ display: "block" }}>
            {l}
          </span>
        ))}
      </span>
    );
  }

  return (
    <motion.span
      className={className}
      variants={container}
      custom={{ delay, stagger }}
      initial="hidden"
      {...(immediate
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: { once: true, margin: "-12%" } })}
    >
      {lines.map((l, i) => (
        <span key={i} style={{ display: "block", overflow: "hidden" }}>
          <motion.span
            className={lineClassName}
            style={{ display: "block", willChange: "transform" }}
            variants={line}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
