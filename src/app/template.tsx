"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Route-level enter transition. template.tsx remounts on every navigation, so
 * page content materialises (blur + lift) as you move between routes. Header
 * and footer live in layout.tsx — outside this wrapper — so the filter here
 * never disturbs the fixed header.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className="flex-1">{children}</div>;

  return (
    <motion.div
      className="flex-1"
      initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
