import type { Transition, Variants } from "motion/react";

/**
 * Centralised motion language. Timings follow the DESIGN.md hierarchy:
 * micro 120–180ms · component 220–360ms · reveal 450–700ms · hero ≤900ms.
 * Curves are controlled, not bouncy by default.
 */

export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const duration = {
  micro: 0.16,
  component: 0.3,
  reveal: 0.6,
} as const;

export const componentTransition: Transition = {
  duration: duration.component,
  ease: ease.out,
};

/** Section intro reveal — used sparingly on section headers, not every card. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.reveal, ease: ease.out },
  },
};

/** Hero entrance — one orchestrated, staggered moment. */
export const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: ease.out },
  },
};
