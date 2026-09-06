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
  /** css color for a controlled accent seam */
  accent?: string;
};

const toneMap: Record<NonNullable<MediaFrameProps["tone"]>, string> = {
  blue: "bg-ieee-blue text-white",
  deep: "bg-brand-deep text-white",
  muted: "bg-surface-muted text-text-muted",
};

/**
 * A single media surface used across the page. Real photography drops into
 * `src` later without any layout change; until then it renders a deliberate
 * placeholder plate — never stock or AI imagery.
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
          className={cn(
            "flex h-full w-full flex-col justify-between p-6",
            toneMap[tone],
          )}
        >
          <div
            className="h-px w-16"
            style={{ background: accent ?? "var(--ieee-cyan)" }}
            aria-hidden
          />
          <PlaceholderMark tone={tone} />
          <div className="flex items-end justify-between gap-4">
            <span className="max-w-[16ch] text-sm leading-snug opacity-80">
              {caption ?? label}
            </span>
            <span className="font-mono text-[0.6875rem] uppercase tracking-widest opacity-55">
              slot
            </span>
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
      className="h-20 w-20 opacity-30"
      fill="none"
      aria-hidden
    >
      <path d="M60 8 106 34v52L60 112 14 86V34z" stroke={stroke} strokeWidth="2" />
      <circle cx="60" cy="60" r="18" stroke={stroke} strokeWidth="2" />
      <path d="M60 4v20M60 96v20M8 34l18 10M112 34l-18 10" stroke={stroke} strokeWidth="2" />
    </svg>
  );
}
