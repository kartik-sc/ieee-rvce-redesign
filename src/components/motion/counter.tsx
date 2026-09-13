"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

type CounterProps = {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

/** Counts up from zero once, when scrolled into view. Snaps under reduced motion. */
export function Counter({
  to,
  prefix = "",
  suffix = "",
  duration = 1.4,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    // duration 0 under reduced motion snaps to the target via onUpdate,
    // avoiding a synchronous setState in the effect body.
    const controls = animate(0, to, {
      duration: reduced ? 0 : duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, reduced, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
