import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "inverse" | "cyan";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[background,color,border-color,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ieee-cyan active:scale-[0.98]";

const sizes: Record<Size, string> = {
  sm: "min-h-9 px-4 text-sm",
  md: "min-h-11 px-6 text-[0.95rem]",
  lg: "min-h-13 px-7 text-base",
};

const variants: Record<Variant, string> = {
  primary: "bg-ieee-blue text-white hover:bg-brand-deep",
  outline:
    "border border-line bg-transparent text-brand-deep hover:border-ieee-blue hover:text-ieee-blue",
  ghost: "text-brand-deep hover:bg-surface-muted",
  inverse: "bg-white text-ieee-blue hover:bg-white/90",
  cyan: "bg-ieee-cyan text-brand-deep hover:brightness-105",
};

type ActionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  size?: Size;
  /** show a trailing arrow that nudges on hover */
  arrow?: boolean;
  children: ReactNode;
};

export function ActionLink({
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  children,
  ...props
}: ActionLinkProps) {
  const classes = cn(base, sizes[size], variants[variant], className);
  const content = (
    <>
      {children}
      {arrow ? (
        <ArrowRight
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden
        />
      ) : null}
    </>
  );

  const isInternal = href.startsWith("/") && !href.startsWith("//");

  if (isInternal) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      {...(href.startsWith("http")
        ? { target: "_blank", rel: "noreferrer" }
        : {})}
      {...props}
    >
      {content}
    </a>
  );
}
