"use client";

import { motion, useReducedMotion } from "motion/react";
import { eventsByYear } from "@/content/events";
import { ease } from "@/lib/motion";

/**
 * Small SVG column chart of selected events per year — driven entirely by the
 * real events dataset (no invented figures). Columns grow on scroll into view;
 * static under reduced motion.
 */
export function EventsBarChart({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const max = Math.max(...eventsByYear.map((d) => d.count));
  const barW = 40;
  const gap = 28;
  const chartH = 180;
  const width = eventsByYear.length * (barW + gap);

  return (
    <figure className={className}>
      <svg
        viewBox={`0 0 ${width} ${chartH + 42}`}
        className="h-auto w-full"
        role="img"
        aria-label="Selected IEEE RVCE events per year"
      >
        {eventsByYear.map((d, i) => {
          const h = Math.max(6, (d.count / max) * chartH);
          const x = i * (barW + gap) + gap / 2;
          const y = chartH - h;
          return (
            <g key={d.year}>
              {reduced ? (
                <rect x={x} y={y} width={barW} height={h} rx={5} fill="var(--ieee-blue)" />
              ) : (
                <motion.rect
                  x={x}
                  width={barW}
                  rx={5}
                  fill="var(--ieee-blue)"
                  initial={{ height: 0, y: chartH }}
                  whileInView={{ height: h, y }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, ease: ease.out, delay: i * 0.08 }}
                />
              )}
              <text
                x={x + barW / 2}
                y={y - 8}
                textAnchor="middle"
                className="fill-brand-deep font-mono text-[13px] font-medium"
              >
                {d.count}
              </text>
              <text
                x={x + barW / 2}
                y={chartH + 26}
                textAnchor="middle"
                className="fill-text-muted font-mono text-[13px]"
              >
                {d.year}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-4 text-sm text-text-muted">
        Selected events per year — a snapshot of a consistently active branch.
      </figcaption>
    </figure>
  );
}
