import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "inverse";

const base =
  "inline-flex min-h-11 items-center justify-center rounded-lg px-5 text-[0.95rem] font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ieee-cyan";

const variants: Record<Variant, string> = {
  primary: "bg-ieee-blue text-white hover:bg-brand-deep",
  outline:
    "border border-line bg-surface text-brand-deep hover:border-ieee-blue hover:text-ieee-blue",
  ghost: "text-brand-deep hover:bg-surface-muted",
  inverse: "bg-white text-ieee-blue hover:bg-white/90",
};

type ActionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
};

export function ActionLink({
  variant = "primary",
  className,
  children,
  ...props
}: ActionLinkProps) {
  return (
    <a className={cn(base, variants[variant], className)} {...props}>
      {children}
    </a>
  );
}
