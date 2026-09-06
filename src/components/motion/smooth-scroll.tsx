"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Global smooth-scroll layer. Deliberately opt-out under reduced motion so the
 * page keeps native scrolling semantics for users who ask for it.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;
  return (
    <ReactLenis
      root
      options={{ lerp: 0.09, duration: 1.15, smoothWheel: true }}
    >
      {children}
    </ReactLenis>
  );
}
