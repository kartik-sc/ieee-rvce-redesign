import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

type Background = "bg" | "surface" | "deep" | "blue";

const backgrounds: Record<Background, string> = {
  bg: "bg-bg text-text",
  surface: "bg-surface text-text",
  deep: "bg-dark-bg text-dark-text",
  blue: "bg-ieee-blue text-white",
};

type SectionShellProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  background?: Background;
  /** vertical padding density */
  size?: "md" | "lg";
};

export function SectionShell({
  id,
  children,
  className,
  background = "bg",
  size = "lg",
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24",
        backgrounds[background],
        size === "lg" ? "py-24 md:py-32" : "py-16 md:py-24",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1320px] px-[clamp(1.5rem,4vw,4.5rem)]">
        {children}
      </div>
    </section>
  );
}

type SectionIntroProps = {
  label?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "between";
  accent?: string;
  className?: string;
  /** rendered to the right on wide screens when align="between" */
  aside?: ReactNode;
};

/**
 * Section header. Sentence-case label (not an all-caps eyebrow), a large
 * disciplined h2, and an optional lead. No fake numbering.
 */
export function SectionIntro({
  label,
  title,
  lead,
  align = "left",
  accent = "var(--ieee-blue)",
  className,
  aside,
}: SectionIntroProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-6",
        align === "between" &&
          "md:flex-row md:items-end md:justify-between md:gap-16",
        className,
      )}
    >
      <div className="max-w-2xl">
        {label ? (
          <div className="mb-4 flex items-center gap-3">
            <span
              className="h-2.5 w-2.5 rounded-[2px]"
              style={{ background: accent }}
              aria-hidden
            />
            <span className="text-sm font-medium text-text-muted">{label}</span>
          </div>
        ) : null}
        <h2 className="text-h2 font-semibold text-balance">{title}</h2>
        {lead ? (
          <p className="mt-5 text-lg leading-relaxed text-text-muted text-pretty">
            {lead}
          </p>
        ) : null}
      </div>
      {aside ? <div className="shrink-0">{aside}</div> : null}
    </Reveal>
  );
}
