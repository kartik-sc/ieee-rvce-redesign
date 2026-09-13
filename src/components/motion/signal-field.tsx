"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Node = { x: number; y: number; vx: number; vy: number };

/**
 * A live "signal field" — drifting nodes wired to their neighbours, with the
 * pointer acting as a soft attractor. GPU-light 2D canvas; renders a single
 * static frame under reduced motion. Meant as the hero's technical backdrop,
 * not decoration you notice.
 */
export function SignalField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let raf = 0;
    let running = true;
    const pointer = { x: -999, y: -999, active: false };

    const LINK_DIST = 140;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // density scales with area, capped for perf
      const count = Math.min(90, Math.round((width * height) / 14000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
          if (pointer.active) {
            const dx = pointer.x - n.x;
            const dy = pointer.y - n.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 26000 && d2 > 1) {
              const f = 0.4 / Math.sqrt(d2);
              n.vx += dx * f * 0.02;
              n.vy += dy * f * 0.02;
            }
          }
          // gentle speed clamp
          n.vx = Math.max(-0.6, Math.min(0.6, n.vx));
          n.vy = Math.max(-0.6, Math.min(0.6, n.vy));
        }
      }

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.5;
            ctx.strokeStyle = `rgba(0, 181, 226, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // pointer links
      if (pointer.active && !reduced) {
        for (const n of nodes) {
          const dist = Math.hypot(pointer.x - n.x, pointer.y - n.y);
          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.6;
            ctx.strokeStyle = `rgba(122, 197, 232, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        ctx.fillStyle = "rgba(150, 205, 232, 0.85)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      if (running && !reduced) raf = requestAnimationFrame(draw);
    };

    build();
    draw();

    const onResize = () => {
      build();
      if (reduced) draw();
    };
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running && !reduced) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(draw);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
