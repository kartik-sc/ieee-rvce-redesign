"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Search } from "lucide-react";
import { EventCard, categoryAccent } from "@/components/cards/event-card";
import { events, eventCategories, eventsByDate } from "@/content/events";
import { cn } from "@/lib/utils";

const filters = ["All", ...eventCategories] as const;
const featured = eventsByDate[0];

export function EventsExplorer() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events.filter((e) => {
      const inCategory = active === "All" || e.category === active;
      const inQuery =
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.keywords.some((k) => k.toLowerCase().includes(q));
      return inCategory && inQuery;
    });
  }, [active, query]);

  return (
    <>
      {/* featured event */}
      <section className="bg-bg pt-[var(--section-y)]">
        <div className="mx-auto w-full max-w-[1320px] px-[var(--gutter)]">
          <div
            style={{ "--accent": categoryAccent[featured.category] } as React.CSSProperties}
            className="relative overflow-hidden rounded-none bg-dark-bg p-8 text-dark-text md:p-14"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-30 blur-3xl"
              style={{ background: "var(--accent)" }}
            />
            <div className="relative">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)]" aria-hidden />
                Latest · {featured.category}
              </span>
              <h2 className="mt-5 max-w-3xl text-h1 font-semibold tracking-tight text-balance">
                {featured.title}
              </h2>
              <p className="mt-4 font-mono text-sm text-dark-muted">
                {featured.dateLabel}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {featured.keywords.map((k) => (
                  <span
                    key={k}
                    className="rounded-none border border-white/20 px-3 py-1 text-xs text-dark-muted"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* controls + grid */}
      <section className="bg-bg py-[var(--section-y)]">
        <div className="mx-auto w-full max-w-[1320px] px-[var(--gutter)]">
          <div className="flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  role="tab"
                  aria-selected={active === f}
                  onClick={() => setActive(f)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    active === f
                      ? "border-ieee-blue bg-ieee-blue text-white"
                      : "border-line text-text-muted hover:border-ieee-blue hover:text-ieee-blue",
                  )}
                >
                  {f}
                </button>
              ))}
            </div>

            <label className="relative flex items-center">
              <Search className="pointer-events-none absolute left-3 size-4 text-text-muted" aria-hidden />
              <span className="sr-only">Search events</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search events"
                className="h-11 w-full rounded-full border border-line bg-surface pl-10 pr-4 text-sm text-text outline-none transition-colors placeholder:text-text-muted focus-visible:border-ieee-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ieee-cyan lg:w-72"
              />
            </label>
          </div>

          <p className="mt-6 font-mono text-xs text-text-muted">
            {results.length} {results.length === 1 ? "event" : "events"}
          </p>

          <motion.div
            layout={!reduced}
            className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {results.map((event) => (
                <motion.div
                  key={event.title}
                  layout={!reduced}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <EventCard event={event} className="h-full" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {results.length === 0 ? (
            <p className="mt-16 text-center text-text-muted">
              No events match that search. Try another keyword or category.
            </p>
          ) : null}
        </div>
      </section>
    </>
  );
}
