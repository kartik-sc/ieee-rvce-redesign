import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: ReactNode[];
  className?: string;
  /** seconds for one full loop */
  speed?: number;
  reverse?: boolean;
};

/**
 * Continuous horizontal ticker. Content is duplicated so the -50% translate
 * loops seamlessly. The animation is CSS-driven, so the global
 * prefers-reduced-motion rule stops it automatically.
 */
export function Marquee({ items, className, speed = 34, reverse }: MarqueeProps) {
  const track = (
    <ul className="marquee-track flex shrink-0 items-center gap-10 pr-10">
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-10 whitespace-nowrap">
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn("marquee group flex overflow-hidden", className)}
      style={
        {
          "--marquee-duration": `${speed}s`,
          "--marquee-direction": reverse ? "reverse" : "normal",
        } as React.CSSProperties
      }
    >
      {track}
      <div aria-hidden className="marquee-track flex shrink-0 items-center gap-10 pr-10">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
