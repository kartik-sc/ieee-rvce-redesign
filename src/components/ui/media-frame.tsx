import Image from "next/image";
import { cn } from "@/lib/utils";

type MediaFrameProps = {
  /** real image path under /public; when absent a designed placeholder shows */
  src?: string;
  alt?: string;
  /** short honest label describing what belongs in this slot */
  label?: string;
  caption?: string;
  tone?: "blue" | "deep" | "muted";
  className?: string;
  aspect?: string;
  priority?: boolean;
  /** css color for a controlled accent seam / glow */
  accent?: string;
};

const toneBg: Record<NonNullable<MediaFrameProps["tone"]>, string> = {
  blue: "linear-gradient(145deg, var(--ieee-blue), var(--brand-deep))",
  deep: "linear-gradient(145deg, var(--dark-surface), var(--dark-bg))",
  muted: "linear-gradient(145deg, #ffffff, var(--surface-muted))",
};

const toneText: Record<NonNullable<MediaFrameProps["tone"]>, string> = {
  blue: "text-white",
  deep: "text-dark-text",
  muted: "text-text-muted",
};

/**
 * A single media surface used across the page. Real photography drops into
 * `src` later without any layout change; until then it renders a deliberate,
 * living placeholder plate — gradient depth, an accent glow, and a slow glass
 * sheen — never stock or AI imagery.
 */
export function MediaFrame({
  src,
  alt = "",
  label = "Event photography",
  caption,
  tone = "blue",
  className,
  aspect = "4 / 3",
  priority,
  accent,
}: MediaFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-line/70",
        className,
      )}
      style={{ aspectRatio: aspect }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      ) : (
        <div
          className={cn("relative h-full w-full", toneText[tone])}
          style={{ background: toneBg[tone] }}
        >
          {/* accent glow for depth */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-1/4 -top-1/3 h-3/4 w-3/4 rounded-full opacity-45 blur-2xl"
            style={{ background: accent ?? "var(--ieee-cyan)" }}
          />
          {/* slow glass sheen */}
          <div
            aria-hidden
            className="media-sheen pointer-events-none absolute inset-y-0 -left-1/4 w-1/4"
          />
          {/* centered mark */}
          <div className="absolute inset-0 flex items-center justify-center">
            <PlaceholderMark tone={tone} />
          </div>
          {/* content */}
          <div className="relative flex h-full flex-col justify-between p-6">
            <div
              className="h-px w-16"
              style={{ background: accent ?? "var(--ieee-cyan)" }}
              aria-hidden
            />
            <div className="flex items-end justify-between gap-4">
              <span className="max-w-[16ch] text-sm leading-snug opacity-85">
                {caption ?? label}
              </span>
              <span className="font-mono text-[0.6875rem] uppercase tracking-widest opacity-55">
                slot
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PlaceholderMark({ tone }: { tone: MediaFrameProps["tone"] }) {
  const stroke = tone === "muted" ? "var(--ieee-blue)" : "currentColor";
  return (
    <svg
      viewBox="0 0 120 120"
      className="h-40 w-40 opacity-[0.14]"
      fill="none"
      aria-hidden
    >
      <path d="M60 8 106 34v52L60 112 14 86V34z" stroke={stroke} strokeWidth="1.5" />
      <path d="M60 22 93 41v38L60 98 27 79V41z" stroke={stroke} strokeWidth="1.5" />
      <circle cx="60" cy="60" r="16" stroke={stroke} strokeWidth="1.5" />
      <path d="M60 2v18M60 100v18M10 34l16 9M110 34l-16 9M10 86l16-9M110 86l-16-9" stroke={stroke} strokeWidth="1.5" />
    </svg>
  );
}
