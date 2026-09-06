"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { societies, societyHref } from "@/content/site";
import { MediaFrame } from "@/components/ui/media-frame";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function SocietyExplorer() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const society = societies[active];

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const dir = e.key === "ArrowDown" ? 1 : -1;
    const next = (active + dir + societies.length) % societies.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      id="societies"
      className="scroll-mt-24 bg-dark-bg py-24 text-dark-text md:py-32"
    >
      <div className="mx-auto w-full max-w-[1320px] px-[clamp(1.5rem,4vw,4.5rem)]">
        <div className="max-w-2xl">
          <div className="mb-4 flex items-center gap-3">
            <span
              className="h-2.5 w-2.5 rounded-[2px]"
              style={{ background: "var(--ieee-cyan)" }}
              aria-hidden
            />
            <span className="text-sm font-medium text-dark-muted">
              Five active societies
            </span>
          </div>
          <h2 className="text-h2 font-semibold text-balance">
            Find your technical home.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-dark-muted text-pretty">
            Every member belongs to a chapter built around a real engineering
            discipline. Select one to see what it works on.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* persistent rail */}
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="IEEE RVCE societies"
            onKeyDown={onKeyDown}
            className="lg:col-span-5"
          >
            {societies.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`society-tab-${s.id}`}
                  aria-selected={isActive}
                  aria-controls="society-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={cn(
                    "group relative flex w-full items-baseline gap-4 border-b border-dark-line px-2 py-5 text-left transition-colors",
                    isActive ? "text-dark-text" : "text-dark-muted hover:text-dark-text",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId={reduced ? undefined : "society-active"}
                      className="absolute left-0 top-1/2 h-8 w-[3px] -translate-y-1/2"
                      style={{ background: s.accent }}
                      transition={{ duration: 0.3, ease: ease.out }}
                      aria-hidden
                    />
                  )}
                  <span
                    className="font-mono text-sm font-medium"
                    style={{ color: isActive ? s.accent : undefined }}
                  >
                    {s.abbr}
                  </span>
                  <span className="flex-1">
                    <span className="block text-lg font-medium">{s.name}</span>
                    <span
                      className={cn(
                        "mt-0.5 block text-sm transition-opacity",
                        isActive ? "opacity-90" : "opacity-0 group-hover:opacity-70",
                      )}
                    >
                      {s.focus}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* shared active panel */}
          <div
            role="tabpanel"
            id="society-panel"
            aria-labelledby={`society-tab-${society.id}`}
            className="lg:col-span-7"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={society.id}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: ease.out }}
                className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:items-start"
              >
                <motion.div
                  initial={reduced ? false : { clipPath: "inset(0 0 100% 0)" }}
                  animate={{ clipPath: "inset(0 0 0% 0)" }}
                  transition={{ duration: 0.55, ease: ease.out }}
                >
                  <MediaFrame
                    tone="deep"
                    aspect="3 / 4"
                    accent={society.accent}
                    caption={`${society.abbr} activity`}
                    className="border-dark-line"
                  />
                </motion.div>
                <div>
                  <div className="flex items-center gap-3">
                    <span
                      className="h-6 w-1 rounded-[2px]"
                      style={{ background: society.accent }}
                      aria-hidden
                    />
                    <span className="font-mono text-sm text-dark-muted">
                      {society.abbr}
                    </span>
                  </div>
                  <h3 className="mt-4 text-h3 font-semibold">{society.name}</h3>
                  <p className="mt-4 leading-relaxed text-dark-muted text-pretty">
                    {society.blurb}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {society.themes.map((t) => (
                      <li
                        key={t}
                        className="inline-flex items-center gap-2 rounded-md border border-dark-line px-3 py-1.5 text-sm text-dark-text"
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: society.accent }}
                          aria-hidden
                        />
                        {t}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={societyHref(society.id)}
                    className="group mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-dark-text"
                  >
                    <span className="relative">
                      Learn more about {society.abbr}
                      <span
                        className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100"
                        aria-hidden
                      />
                    </span>
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
