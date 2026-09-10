import type { ReactNode } from "react";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  kicker?: string;
  title?: ReactNode;
  /** each entry is one masked headline line; overrides `title` when provided */
  titleLines?: ReactNode[];
  lead?: ReactNode;
  aside?: ReactNode;
  className?: string;
};

/**
 * Dark inner-page hero band. Keeps every route visually part of one product:
 * clears the fixed header, materialises the title per line, and holds an
 * optional lead + aside stat.
 */
export function PageHeader({
  kicker,
  title,
  titleLines,
  lead,
  aside,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "relative overflow-hidden bg-dark-bg text-dark-text",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(120% 100% at 85% -10%, color-mix(in oklab, var(--ieee-blue) 55%, transparent), transparent 60%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-[1320px] px-[clamp(1.5rem,4vw,4.5rem)] pt-36 pb-16 md:pt-44 md:pb-24">
        {kicker ? (
          <div className="mb-6 flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-[2px] bg-ieee-cyan" aria-hidden />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-dark-muted">
              {kicker}
            </span>
          </div>
        ) : null}

        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <h1 className="text-display max-w-4xl font-semibold tracking-tight text-balance">
            <MaskReveal immediate lines={titleLines ?? [title]} />
          </h1>
          {aside ? <div className="shrink-0 md:pb-3">{aside}</div> : null}
        </div>

        {lead ? (
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-dark-muted text-pretty">
            {lead}
          </p>
        ) : null}
      </div>
    </header>
  );
}
