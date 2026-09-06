"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

/**
 * Pulls its child toward the cursor with a spring, releasing on leave. Purely
 * an affordance on primary CTAs — disabled entirely under reduced motion and on
 * touch (no hover) devices via pointer events only.
 */
export function Magnetic({ children, className, strength = 0.4 }: MagneticProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 220, damping: 16, mass: 0.4 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  if (reduced) return <span className={className}>{children}</span>;

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy, display: "inline-block" }}
      className={className}
    >
      {children}
    </motion.span>
  );
}
