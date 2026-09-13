import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Society } from "@/content/societies";
import { societyHref } from "@/content/site";
import { cn } from "@/lib/utils";

const faceGradient =
  "linear-gradient(135deg, var(--accent), color-mix(in oklab, var(--accent) 62%, #000))";

/**
 * Society tile — squared "wallet card": an accent face with the society's
 * abbreviation, then a light body with its name, focus and domains. Lifts off
 * its accent shadow on hover. Used on /societies and the home ecosystem grid.
 */
export function SocietyTile({
  society,
  className,
}: {
  society: Society;
  className?: string;
}) {
  return (
    <Link
      href={societyHref(society.id)}
      style={{ "--accent": society.accent } as React.CSSProperties}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-none border border-line bg-surface transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[8px_8px_0_-1px_var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ieee-cyan",
        className,
      )}
    >
      {/* card face */}
      <div
        className="flex items-center justify-between px-6 py-4 text-white"
        style={{ background: faceGradient }}
      >
        <span className="font-mono text-sm uppercase tracking-[0.14em]">
          {society.abbr}
        </span>
        <ArrowUpRight className="size-5 text-white/80 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-h3 font-semibold tracking-tight text-brand-deep">
          {society.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          {society.focus}
        </p>
        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {society.themes.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-none border border-line px-2.5 py-1 text-xs text-text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
