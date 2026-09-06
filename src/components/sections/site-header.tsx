"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "motion/react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Wordmark } from "@/components/ui/wordmark";
import { ActionLink } from "@/components/ui/action-link";
import { Magnetic } from "@/components/motion/magnetic";
import { nav, branch } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Only the home hero is light enough for a transparent header; every other
  // route opens on a dark/blue hero, so show the light chrome immediately.
  const solid = scrolled || pathname !== "/";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid
          ? "border-b border-line bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between px-[clamp(1.5rem,4vw,4.5rem)]">
        <Link href="/" aria-label={`${branch.name} home`} className="shrink-0">
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map((link) => {
            const active =
              link.href.startsWith("/") &&
              !link.href.includes("#") &&
              pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative px-3 py-2 text-sm font-medium transition-colors",
                  active ? "text-ieee-blue" : "text-text-muted hover:text-ieee-blue",
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
          <Magnetic className="hidden md:inline-flex">
            <ActionLink href="/#contact">Join IEEE</ActionLink>
          </Magnetic>

          <Sheet>
            <SheetTrigger
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-brand-deep hover:bg-surface-muted md:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm bg-bg p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex h-16 items-center border-b border-line px-6">
                <Wordmark />
              </div>
              <nav className="flex flex-col px-4 py-4" aria-label="Mobile">
                {nav.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="rounded-lg px-4 py-3.5 text-lg font-medium text-text hover:bg-surface-muted"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="px-6 pt-2">
                <SheetClose asChild>
                  <ActionLink href="/#contact" className="w-full">
                    Join IEEE
                  </ActionLink>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* scroll progress */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-ieee-cyan"
        style={{ scaleX: progress }}
        aria-hidden
      />
    </header>
  );
}
