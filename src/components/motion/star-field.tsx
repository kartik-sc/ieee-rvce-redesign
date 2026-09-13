"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

const COUNT       = 320;
const FOCAL_RATIO = 0.42;   // focal length as fraction of viewport height
const BASE_SPEED  = 3e-4;   // z units per ms at cruise (~2.5s to traverse)
const WARP_MULT   = 22;     // peak speed multiplier at t=0
const WARP_MS     = 1500;   // warp-to-cruise transition in ms
const PARALLAX    = 36;     // max pixel shift for closest stars
const Z_MAX       = 1.0;

type Star = {
  x:   number;  // position in [-aspect, aspect]
  y:   number;  // position in [-1, 1]
  z:   number;  // depth: near 0 = far (clustered at center), Z_MAX = close (at edge)
  px:  number;  // projected screen x from previous frame
  py:  number;
  hue: number;  // 0 = white, 1 = blue-white, 2 = ieee cyan
};

function easeOutExpo(t: number): number {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced   = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, aspect = 1, focal = 0;
    const stars: Star[] = [];
    let raf: number;
    const startMs  = performance.now();
    let   prevTime = startMs;
    const mouse    = { x: 0.5, y: 0.5 };

    const project = (s: Star): [number, number] => [
      (s.x / s.z) * focal + W / 2,
      (s.y / s.z) * focal + H / 2,
    ];

    const initStar = (s: Star, spread = false) => {
      s.x   = (Math.random() - 0.5) * 2 * aspect;
      s.y   = (Math.random() - 0.5) * 2;
      // spread=true pre-populates the field; otherwise respawn from far away
      s.z   = spread ? 0.05 + Math.random() * Z_MAX * 0.88 : 0.01 + Math.random() * 0.04;
      const r = Math.random();
      s.hue = r < 0.7 ? 0 : r < 0.9 ? 1 : 2;
      const [px, py] = project(s);
      s.px = px;
      s.py = py;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      W      = window.innerWidth;
      H      = window.innerHeight;
      aspect = W / H;
      focal  = H * FOCAL_RATIO;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
      stars.length = 0;
      for (let i = 0; i < COUNT; i++) {
        const s: Star = { x: 0, y: 0, z: 0.01, px: 0, py: 0, hue: 0 };
        initStar(s, true);
        stars.push(s);
      }
    };

    const onMouseMove = (e: MouseEvent) => { mouse.x = e.clientX / W; mouse.y = e.clientY / H; };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) { mouse.x = t.clientX / W; mouse.y = t.clientY / H; }
    };

    const starColor = (hue: number, alpha: number) => {
      const a = alpha.toFixed(2);
      if (hue === 2) return `rgba(0,181,226,${a})`;
      if (hue === 1) return `rgba(196,236,255,${a})`;
      return `rgba(255,255,255,${a})`;
    };

    const render = (now: number, oneShot = false) => {
      const dt       = oneShot ? 0 : Math.min(now - prevTime, 50);
      prevTime       = now;
      const elapsed  = now - startMs;
      const warpProg = Math.min(1, elapsed / WARP_MS);
      const warpFact = 1 + (WARP_MULT - 1) * (1 - easeOutExpo(warpProg));

      ctx.clearRect(0, 0, W, H);

      const mx = (mouse.x - 0.5) * PARALLAX;
      const my = (mouse.y - 0.5) * PARALLAX;

      for (const s of stars) {
        const prevPx = s.px;
        const prevPy = s.py;

        if (!oneShot) s.z += BASE_SPEED * warpFact * dt;

        const [sx, sy] = project(s);

        // Off-screen → respawn near center
        if (s.z >= Z_MAX || sx < -80 || sx > W + 80 || sy < -80 || sy > H + 80) {
          initStar(s);
          [s.px, s.py] = project(s);
          continue;
        }

        // Apply depth-proportional parallax
        const cx  = sx    + mx * s.z;
        const cy  = sy    + my * s.z;
        const pcx = prevPx + mx * s.z;
        const pcy = prevPy + my * s.z;

        const alpha = Math.min(0.95, 0.18 + s.z * 0.82 + (1 - warpProg) * 0.22);
        const lw    = Math.max(0.5, s.z * (1.8 + (1 - warpProg) * 1.6));

        const dx = cx - pcx;
        const dy = cy - pcy;
        const streakLen = Math.sqrt(dx * dx + dy * dy);

        ctx.beginPath();
        if (streakLen < 0.8) {
          // Static / very-slow star → draw as a dot
          ctx.arc(cx, cy, Math.max(0.8, s.z * 2.2), 0, Math.PI * 2);
          ctx.fillStyle = starColor(s.hue, alpha);
          ctx.fill();
        } else {
          // Moving star → streak line
          ctx.moveTo(pcx, pcy);
          ctx.lineTo(cx,  cy);
          ctx.strokeStyle = starColor(s.hue, alpha);
          ctx.lineWidth   = lw;
          ctx.stroke();
        }

        s.px = sx;
        s.py = sy;
      }

      if (!oneShot) raf = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize",    resize,      { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    if (reduced) {
      // Render a single static cruise-speed frame (no warp, no RAF)
      render(startMs + WARP_MS + 200, true);
    } else {
      raf = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize",    resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
