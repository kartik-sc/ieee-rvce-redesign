import { MaskReveal } from "@/components/motion/mask-reveal";
import { Coverflow, type CoverflowItem } from "@/components/motion/coverflow";
import { categoryAccent } from "@/components/cards/event-card";
import { ActionLink } from "@/components/ui/action-link";
import { featuredEvents } from "@/content/events";
import type { BranchEvent } from "@/content/events";

const faceGradient =
  "linear-gradient(150deg, var(--accent), color-mix(in oklab, var(--accent) 55%, #000))";

function EventCover({ event }: { event: BranchEvent }) {
  return (
    <div
      style={{ "--accent": categoryAccent[event.category] } as React.CSSProperties}
      className="h-full w-full bg-white p-2 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)]"
    >
      <div
        className="flex h-full flex-col justify-between p-6 text-white"
        style={{ background: faceGradient }}
      >
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.16em]">
          <span>{event.category}</span>
          <span className="text-white/70">{event.year}</span>
        </div>
        <div>
          <div className="mb-4 h-px w-10 bg-white/40" aria-hidden />
          <h3 className="text-2xl font-semibold leading-[1.1] tracking-tight text-pretty">
            {event.title}
          </h3>
        </div>
      </div>
    </div>
  );
}

function EventCaption({ event }: { event: BranchEvent }) {
  return (
    <>
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-ieee-cyan">
        {event.category} · {event.dateLabel}
      </p>
      {event.keywords.length ? (
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {event.keywords.map((k) => (
            <span
              key={k}
              className="rounded-none border border-white/20 px-2.5 py-1 text-xs text-dark-muted"
            >
              {k}
            </span>
          ))}
        </div>
      ) : null}
    </>
  );
}

const items: CoverflowItem[] = featuredEvents.map((event) => ({
  key: event.title,
  cover: <EventCover event={event} />,
  caption: <EventCaption event={event} />,
}));

export function FeaturedEvents() {
  return (
    <section className="overflow-hidden bg-dark-bg py-[var(--section-y)] text-dark-text">
      <div className="mx-auto w-full max-w-[1320px] px-[var(--gutter)]">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-[2px] bg-ieee-cyan" aria-hidden />
              <span className="text-sm font-medium text-dark-muted">
                Recent highlights
              </span>
            </div>
            <h2 className="text-h1 font-semibold tracking-tight text-balance">
              <MaskReveal
                lines={[
                  "Workshops, talks and",
                  <span key="l">
                    hackathons, all year <span className="text-ieee-cyan">round.</span>
                  </span>,
                ]}
              />
            </h2>
          </div>
          <ActionLink
            href="/events"
            arrow
            className="shrink-0 border border-white/25 text-white hover:border-white hover:bg-white/5"
          >
            All events
          </ActionLink>
        </div>
      </div>

      <div className="mt-12">
        <Coverflow items={items} ariaLabel="Recent events" tone="dark" />
      </div>
    </section>
  );
}
