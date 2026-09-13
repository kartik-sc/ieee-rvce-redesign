"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Masked media reveal — the frame wipes open (clip-path) with a slight settle
 * of the content inside. Used for hero/section imagery, never for every card.
 */
export function ImageReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={cn("overflow-hidden", className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, ease: ease.out, delay }}
    >
      <motion.div
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, ease: ease.out, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
