import { cn } from "@/lib/utils";

/**
 * Atmospheric backdrop: slow-drifting IEEE blue/cyan light fields behind hero
 * content. GPU-only (transform/opacity), and the global reduced-motion rule
 * freezes it. Purely decorative — marked aria-hidden.
 */
export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <span className="aurora-blob aurora-blob--1" />
      <span className="aurora-blob aurora-blob--2" />
      <span className="aurora-blob aurora-blob--3" />
      <span className="aurora-grain" />
    </div>
  );
}
