import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Oversized numeric stat. Value can be a plain node or a <Counter/> for a
 * count-up. Tone switches text colour for dark vs light bands.
 */
export function Stat({
  value,
  label,
  mono = false,
  tone = "light",
  className,
}: {
  value: ReactNode;
  label: string;
  mono?: boolean;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={className}>
      <div
        className={cn(
          "text-5xl font-semibold tracking-tight md:text-6xl",
          mono && "font-mono",
          tone === "dark" ? "text-white" : "text-brand-deep",
        )}
      >
        {value}
      </div>
      <div
        className={cn(
          "mt-2 text-sm",
          tone === "dark" ? "text-dark-muted" : "text-text-muted",
        )}
      >
        {label}
      </div>
    </div>
  );
}
