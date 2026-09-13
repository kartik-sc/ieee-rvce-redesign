"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { headerNav } from "@/content/site";
import { Wordmark } from "@/components/ui/wordmark";
import { ActionLink } from "@/components/ui/action-link";
import { cn } from "@/lib/utils";

const items = [{ label: "Home", href: "/" }, ...headerNav];

export function MobileMenu({ light = false }: { light?: boolean }) {
  const [open, setOpen] = useState(false);
  // Track client mount so createPortal is only called in the browser (not SSR).
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => { setMounted(true); }, []);

  // ESC key, scroll lock, and focus-back-to-trigger on close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      triggerRef.current?.focus();
    };
  }, [open]);

  // Focus first focusable item when panel opens
  useEffect(() => {
    if (!open) return;
    const el = panelRef.current?.querySelector<HTMLElement>(
      "a[href], button:not([disabled])",
    );
    el?.focus();
  }, [open]);

  // Focus trap: keep Tab within the panel while open
  const handlePanelKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable?.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  };

  // The panel is portalled to document.body so it's never a descendant of the
  // header. This prevents the header's backdrop-filter (applied on scroll) from
  // creating a new containing block for position:fixed, which would trap the
  // panel inside the header's bounding box and make it appear broken after
  // the user has scrolled.
  const panel = (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          id="mobile-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          onKeyDown={handlePanelKeyDown}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[200] flex flex-col bg-dark-bg text-dark-text"
          initial={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          animate={reduced ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
          exit={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div onClick={(e) => e.stopPropagation()} className="flex flex-1 flex-col">
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="relative md:hidden">
      {/* Hamburger trigger — animates Menu ↔ X */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Navigation menu"
        aria-expanded={open}
        aria-controls="mobile-panel"
        className={cn(
          "pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors",
          light ? "text-white hover:bg-white/10" : "text-brand-deep hover:bg-surface-muted",
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "x" : "menu"}
            initial={{ rotate: open ? -45 : 45, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: open ? 45 : -45, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeInOut" }}
            className="inline-flex"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </motion.span>
        </AnimatePresence>
      </button>

      {/* Portal to body — escapes the header's backdrop-filter stacking context */}
      {mounted && createPortal(panel, document.body)}
    </div>
  );
}
