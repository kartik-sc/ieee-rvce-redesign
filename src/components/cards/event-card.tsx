import type { BranchEvent, EventCategory } from "@/content/events";
import { cn } from "@/lib/utils";

export const categoryAccent: Record<EventCategory, string> = {
  Workshop: "var(--ieee-blue)",
  Talk: "var(--accent-teal)",
  Competition: "var(--accent-amber)",
  Community: "var(--accent-purple)",
  Conference: "var(--accent-indigo)",
};

const faceGradient =
  "linear-gradient(135deg, var(--accent), color-mix(in oklab, var(--accent) 62%, #000))";

/**
 * Event card — a squared "wallet card": a colour-coded face carrying the
 * category + year, then a light body with the title and metadata. Lifts off
 * its accent shadow on hover. Shared by /events and the home carousel.
 */
export function EventCard({
  event,
  className,
}: {
  event: BranchEvent;
  className?: string;
}) {
  const accent = categoryAccent[event.category];
  return (
    <article
      style={{ "--accent": accent } as React.CSSProperties}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-none border border-line bg-surface transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[8px_8px_0_-1px_var(--accent)]",
        className,
      )}
    >
      {/* card face */}
      <div
        className="flex items-center justify-between px-5 py-3.5 text-white"
        style={{ background: faceGradient }}
      >
        <span className="font-mono text-xs uppercase tracking-[0.14em]">
          {event.category}
        </span>
        <span className="font-mono text-xs text-white/75">{event.year}</span>
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold leading-snug tracking-tight text-brand-deep text-pretty transition-colors group-hover:text-[var(--accent)]">
          {event.title}
        </h3>
        <p className="mt-3 font-mono text-xs text-text-muted">{event.dateLabel}</p>

        {event.keywords.length ? (
          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            {event.keywords.slice(0, 3).map((k) => (
              <span
                key={k}
                className="rounded-none border border-line px-2.5 py-1 text-xs text-text-muted"
              >
                {k}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
