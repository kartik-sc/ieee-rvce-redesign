"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/ui/wordmark";
import { ActionLink } from "@/components/ui/action-link";
import { Magnetic } from "@/components/motion/magnetic";
import { MobileMenu } from "@/components/ui/mobile-menu";
import { nav } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-100 transition-colors duration-300 border-b",
        scrolled
          ? "border-line bg-bg/90 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between px-[clamp(1.5rem,4vw,4.5rem)]">
        <Link href="/" aria-label="IEEE RVCE home" className="shrink-0">
          <Wordmark variant="blue" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-ieee-blue"
                    : "text-text-muted hover:text-ieee-blue",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute inset-x-3 -bottom-px h-px origin-left bg-ieee-blue transition-transform duration-300 ease-out",
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                  aria-hidden
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden md:inline-flex">
            <Magnetic>
              <ActionLink href="/membership" size="sm" variant="primary">
                Become a member
              </ActionLink>
            </Magnetic>
          </span>
          <MobileMenu light={false} />
        </div>
      </div>
    </header>
  );
}
