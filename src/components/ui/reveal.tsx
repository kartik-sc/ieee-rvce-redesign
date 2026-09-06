"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { revealVariants } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** stagger delay in seconds */
  delay?: number;
  as?: "div" | "li" | "section";
};

/**
 * Single, restrained scroll reveal used for section intros — never on every
 * card. Collapses to an instant appearance under prefers-reduced-motion.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
