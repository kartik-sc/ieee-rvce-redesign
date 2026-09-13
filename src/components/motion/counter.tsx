"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

type CounterProps = {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

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
  // SSR: renders the final value so the fallback never shows 0.
  // useLayoutEffect resets to 0 client-side before first paint so the
  // count-up animation plays from zero.
  const [value, setValue] = useState(to);

  useLayoutEffect(() => {
    setValue(0);
  }, []);

  useEffect(() => {
    if (!inView) return;
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
