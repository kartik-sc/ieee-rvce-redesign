"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { nav } from "@/content/site";
import { Wordmark } from "@/components/ui/wordmark";
import { ActionLink } from "@/components/ui/action-link";
import { cn } from "@/lib/utils";

const items = [{ label: "Home", href: "/" }, ...nav];

export function MobileMenu({ light = false }: { light?: boolean }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className={cn(
          "inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors",
          light ? "text-white hover:bg-white/10" : "text-brand-deep hover:bg-surface-muted",
        )}
      >
        <Menu className="size-5" />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[100] flex flex-col bg-dark-bg text-dark-text"
            initial={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduced ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-16 items-center justify-between px-6">
              <Wordmark variant="white" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-white/10"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-1 px-6" aria-label="Mobile">
              {items.map((item, i) => {
                const active = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={reduced ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduced ? 0 : 0.12 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block border-b border-dark-line py-4 text-4xl font-semibold tracking-tight transition-colors",
                        active ? "text-ieee-cyan" : "text-white hover:text-ieee-cyan",
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div className="px-6 pb-10">
              <ActionLink
                href="/membership"
                variant="cyan"
                size="lg"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Become a member
              </ActionLink>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
