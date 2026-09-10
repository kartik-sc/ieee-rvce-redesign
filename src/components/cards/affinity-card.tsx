import Image from "next/image";
import type { Affinity } from "@/content/affinities";
import { cn } from "@/lib/utils";

const faceGradient =
  "linear-gradient(135deg, var(--accent), color-mix(in oklab, var(--accent) 62%, #000))";

/**
 * Affinity card — the softer, community-led counterpart to the society tile.
 * A larger squared card with an accent face (logo + name) over the group's
 * vision and mission in full.
 */
export function AffinityCard({
  affinity,
  className,
}: {
  affinity: Affinity;
  className?: string;
}) {
  return (
    <article
      style={{ "--accent": affinity.accent } as React.CSSProperties}
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-none border border-line bg-surface",
        className,
      )}
    >
      {/* card face */}
      <div
        className="flex items-center gap-4 px-8 py-6 text-white"
        style={{ background: faceGradient }}
      >
        {affinity.logo ? (
          <span className="flex h-12 w-12 items-center justify-center rounded-none bg-white p-2">
            <Image
              src={affinity.logo}
              alt={`${affinity.abbr} logo`}
              width={40}
              height={40}
              className="h-full w-auto object-contain"
            />
          </span>
        ) : null}
        <div>
          <h3 className="text-h3 font-semibold tracking-tight">{affinity.name}</h3>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/75">
            {affinity.abbr}
          </p>
        </div>
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col p-8 md:p-10">
        <p className="text-lg leading-relaxed text-brand-deep text-pretty">
          {affinity.vision}
        </p>
        <ul className="mt-6 space-y-2 border-t border-line pt-6">
          {affinity.mission.map((m) => (
            <li key={m} className="flex gap-3 text-sm text-text-muted">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                aria-hidden
              />
              {m}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
