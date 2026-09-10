"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "motion/react";
import { Wordmark } from "@/components/ui/wordmark";
import { ActionLink } from "@/components/ui/action-link";
import { Magnetic } from "@/components/motion/magnetic";
import { MobileMenu } from "@/components/ui/mobile-menu";
import { nav } from "@/content/site";
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

  // Only the home route opens on the dark hero — there the header floats
  // transparent with light chrome until you scroll.
  const overHero = pathname === "/" && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        overHero
          ? "border-b border-transparent"
          : "border-b border-line bg-bg/80 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between px-[clamp(1.5rem,4vw,4.5rem)]">
        <Link href="/" aria-label="IEEE RVCE home" className="shrink-0">
          <Wordmark variant={overHero ? "white" : "blue"} />
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
                  overHero
                    ? active
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                    : active
                      ? "text-ieee-blue"
                      : "text-text-muted hover:text-ieee-blue",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute inset-x-3 -bottom-px h-px origin-left transition-transform duration-300 ease-out",
                    overHero ? "bg-ieee-cyan" : "bg-ieee-blue",
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
              <ActionLink
                href="/membership"
                size="sm"
                variant={overHero ? "cyan" : "primary"}
              >
                Become a member
              </ActionLink>
            </Magnetic>
          </span>
          <MobileMenu light={overHero} />
        </div>
      </div>

      {!overHero ? (
        <motion.div
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-ieee-cyan"
          style={{ scaleX: progress }}
          aria-hidden
        />
      ) : null}
    </header>
  );
}
