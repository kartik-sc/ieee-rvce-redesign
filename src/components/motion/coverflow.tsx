"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type CoverflowItem = {
  key: string;
  cover: React.ReactNode;
  caption?: React.ReactNode;
};

/**
 * Coverflow wheel — an elevated centre card with neighbours scaled, rotated and
 * pushed back in 3D to form a curved wheel. Arrows (or clicking a neighbour, or
 * a swipe) rotate a new item into focus. Degrades to instant transitions under
 * reduced motion.
 */
export function Coverflow({
  items,
  ariaLabel,
  tone = "dark",
  className,
}: {
  items: CoverflowItem[];
  ariaLabel?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [itemW, setItemW] = useState(300);
  const n = items.length;
  const dragX = useRef<number | null>(null);

  useEffect(() => {
    const measure = () =>
      setItemW(window.innerWidth < 640 ? 230 : window.innerWidth < 1024 ? 270 : 300);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const coverH = Math.round(itemW * 1.4);
  const go = (dir: number) => setActive((a) => (a + dir + n) % n);

  const rel = (i: number) => {
    let r = i - active;
    if (r > n / 2) r -= n;
    if (r < -n / 2) r += n;
    return r;
  };

  const arrow = cn(
    "absolute top-1/2 z-[200] hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur transition md:inline-flex",
    tone === "dark"
      ? "border-white/25 bg-white/10 text-white hover:bg-white/20"
      : "border-line bg-surface text-brand-deep shadow-sm hover:border-ieee-blue",
  );

  return (
    <div className={cn("relative", className)}>
      <div
        role="group"
        aria-label={ariaLabel}
        className="relative flex touch-pan-y select-none items-center justify-center"
        style={{ height: coverH + 56, perspective: 1600 }}
        onPointerDown={(e) => (dragX.current = e.clientX)}
        onPointerUp={(e) => {
          if (dragX.current == null) return;
          const d = e.clientX - dragX.current;
          if (d > 45) go(-1);
          else if (d < -45) go(1);
          dragX.current = null;
        }}
      >
        {items.map((item, i) => {
          const r = rel(i);
          const abs = Math.abs(r);
          const hidden = abs > 2.5;
          return (
            <motion.div
              key={item.key}
              className="absolute left-1/2 top-1/2 cursor-pointer"
              style={{
                width: itemW,
                height: coverH,
                marginLeft: -itemW / 2,
                marginTop: -coverH / 2,
                zIndex: 100 - Math.round(abs * 10),
              }}
              initial={false}
              animate={{
                x: r * itemW * 0.6,
                rotateY: r * -28,
                scale: Math.max(0.62, 1 - abs * 0.16),
                z: -abs * 160,
                opacity: hidden ? 0 : 1 - Math.min(abs, 2) * 0.16,
              }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 260, damping: 32 }
              }
              onClick={() => (r === 0 ? undefined : setActive(i))}
              aria-hidden={hidden}
            >
              {item.cover}
            </motion.div>
          );
        })}

        <button
          type="button"
          aria-label="Previous"
          onClick={() => go(-1)}
          className={cn(arrow, "left-2 lg:left-8")}
        >
          <ArrowLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => go(1)}
          className={cn(arrow, "right-2 lg:right-8")}
        >
          <ArrowRight className="size-5" />
        </button>
      </div>

      {/* caption for the active item */}
      <div className="relative mx-auto mt-8 min-h-16 max-w-md text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={items[active]?.key}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {items[active]?.caption}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* progress dots */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {items.map((item, i) => (
          <button
            key={item.key}
            type="button"
            aria-label={`Go to item ${i + 1}`}
            onClick={() => setActive(i)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === active
                ? tone === "dark"
                  ? "w-6 bg-ieee-cyan"
                  : "w-6 bg-ieee-blue"
                : tone === "dark"
                  ? "w-1.5 bg-white/30"
                  : "w-1.5 bg-line",
            )}
          />
        ))}
      </div>
    </div>
  );
}
