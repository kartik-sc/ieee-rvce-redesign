"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { societies, type Society } from "@/content/societies";
import { societyHref } from "@/content/site";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { ActionLink } from "@/components/ui/action-link";
import { cn } from "@/lib/utils";

const FACE_GRADIENT = "linear-gradient(135deg, var(--accent), color-mix(in oklab, var(--accent) 62%, #000))";

function SocietyCarouselCard({ society }: { society: Society }) {
  return (
    <Link
      href={societyHref(society.id)}
      style={{ "--accent": society.accent } as CSSProperties}
      className={cn(
        "group flex flex-shrink-0 flex-col overflow-hidden rounded-none border border-line bg-surface",
        "w-[260px] sm:w-[280px] lg:w-[300px]",
        "[scroll-snap-align:start]",
        "transition-[border-color,box-shadow] duration-300",
        "hover:border-[var(--accent)] hover:shadow-[6px_6px_0_-1px_var(--accent)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ieee-cyan",
      )}
    >
      {/* Coloured face — serves as the society "logo" in carousel context */}
      <div
        className="flex h-32 items-center justify-center"
        style={{ background: FACE_GRADIENT }}
      >
        <span className="font-mono text-xl font-bold uppercase tracking-widest text-white/90">
          {society.abbr}
        </span>
      </div>

      {/* Name only — no taglines or themes */}
      <div className="p-5">
        <h3 className="text-sm font-semibold leading-snug tracking-tight text-brand-deep">
          {society.name}
        </h3>
      </div>
    </Link>
  );
}

function NavArrow({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  const label = direction === "prev" ? "Previous society" : "Next society";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        // 48px on mobile, 44px on desktop — both exceed WCAG 2.5.5 minimum
        "flex h-12 w-12 sm:h-11 sm:w-11 flex-shrink-0 items-center justify-center rounded-full",
        // Scrim chip: always visible over any card colour (solid bg + blur)
        "bg-bg/90 backdrop-blur-sm shadow-[0_2px_16px_rgba(0,0,0,0.14)] border border-line",
        "text-text-muted transition-opacity duration-200",
        "disabled:opacity-25 disabled:cursor-not-allowed",
        "focus-visible:outline-2 focus-visible:outline-ieee-cyan",
      )}
    >
      <Icon className="size-5" aria-hidden />
    </button>
  );
}

export function SocietiesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduced = useReducedMotion();

  const syncState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setAtStart(scrollLeft < 4);
    setAtEnd(scrollLeft + clientWidth >= scrollWidth - 4);

    // Determine which card is most centred in the viewport
    const cards = Array.from(el.children) as HTMLElement[];
    if (!cards.length) return;
    const center = scrollLeft + clientWidth / 2;
    let nearestIdx = 0;
    let minDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
      if (dist < minDist) { minDist = dist; nearestIdx = i; }
    });
    setActiveIndex(nearestIdx);
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = (el.children[index] as HTMLElement | undefined);
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft, behavior: reduced ? "auto" : "smooth" });
  }, [reduced]);

  const scrollStep = useCallback((dir: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[0] as HTMLElement | null;
    if (!card) return;
    // Step by one card width + the gap (gap-4 = 16px)
    const step = card.offsetWidth + 16;
    el.scrollBy({ left: dir === "next" ? step : -step, behavior: reduced ? "auto" : "smooth" });
  }, [reduced]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); scrollStep("prev"); }
    if (e.key === "ArrowRight") { e.preventDefault(); scrollStep("next"); }
  }, [scrollStep]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    syncState();
    el.addEventListener("scroll", syncState, { passive: true });
    const ro = new ResizeObserver(syncState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", syncState);
      ro.disconnect();
    };
  }, [syncState]);

  return (
    <section id="societies" className="relative scroll-mt-24 overflow-hidden bg-bg py-[var(--section-y)]">
      <div className="mx-auto w-full max-w-[1320px] px-[var(--gutter)]">
        {/* Kicker */}
        <div className="mb-10">
          <span className="section-rule mb-5 block" />
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-text-muted">
            Ten technical societies
          </span>
        </div>

        {/* Headline + link row */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="text-h1 font-semibold tracking-tight text-text text-balance">
            <MaskReveal
              lines={[
                "Ten societies.",
                <span key="l">
                  One <span className="text-ieee-blue">community.</span>
                </span>,
              ]}
            />
          </h2>
          <ActionLink href="/societies" variant="ghost" arrow className="shrink-0 text-text-muted">
            All societies
          </ActionLink>
        </div>
      </div>

      {/* Carousel row: arrows + scrollable track */}
      <div className="mx-auto w-full max-w-[1320px] px-[var(--gutter)]">
        <div className="flex items-center gap-3">
          <NavArrow direction="prev" onClick={() => scrollStep("prev")} disabled={atStart} />

          {/* Scroll track */}
          <div
            ref={trackRef}
            role="region"
            aria-label="Societies carousel — use arrow keys or swipe"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className={cn(
              "flex flex-1 gap-4 overflow-x-auto",
              "[scroll-snap-type:x_mandatory]",
              // Hide scrollbar across browsers
              "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              // Native momentum scrolling on iOS
              "[-webkit-overflow-scrolling:touch]",
              "focus:outline-none focus-visible:outline-2 focus-visible:outline-ieee-cyan focus-visible:outline-offset-2 focus-visible:rounded-sm",
            )}
          >
            {societies.map((s) => (
              <SocietyCarouselCard key={s.id} society={s} />
            ))}
          </div>

          <NavArrow direction="next" onClick={() => scrollStep("next")} disabled={atEnd} />
        </div>
      </div>

      {/* Pagination dots */}
      <div
        className="mx-auto mt-6 flex max-w-[1320px] items-center justify-center gap-1.5 px-[var(--gutter)]"
        role="group"
        aria-label="Carousel position"
      >
        {societies.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to ${s.name}`}
            aria-current={i === activeIndex ? "true" : undefined}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              "focus-visible:outline-2 focus-visible:outline-ieee-cyan focus-visible:outline-offset-2",
              i === activeIndex
                ? "w-6 bg-ieee-blue"
                : "w-1.5 bg-line hover:bg-text-muted",
            )}
          />
        ))}
      </div>
    </section>
  );
}
