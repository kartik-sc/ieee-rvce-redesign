import Image from "next/image";
import { cn } from "@/lib/utils";

type WordmarkProps = {
  variant?: "blue" | "white";
  className?: string;
};

/**
 * Site identity: the official IEEE master-brand mark locked up with the RVCE
 * student-branch name. Uses the real IEEE logo asset.
 */
export function Wordmark({ variant = "blue", className }: WordmarkProps) {
  const isWhite = variant === "white";
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <Image
        src={isWhite ? "/media/logos/ieee_white.png" : "/media/logos/ieee_blue.png"}
        alt="IEEE"
        width={287}
        height={84}
        priority
        className="h-6 w-auto"
      />
      <span
        className={cn(
          "h-6 w-px",
          isWhite ? "bg-white/25" : "bg-line",
        )}
        aria-hidden
      />
      <span
        className={cn(
          "text-lg font-semibold tracking-tight",
          isWhite ? "text-white" : "text-brand-deep",
        )}
      >
        RVCE
      </span>
    </span>
  );
}
