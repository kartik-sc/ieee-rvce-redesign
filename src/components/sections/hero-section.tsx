"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useMotionValue, useSpring } from "motion/react";
import { ActionLink } from "@/components/ui/action-link";
import { Magnetic } from "@/components/motion/magnetic";
import { branch } from "@/content/site";

/* ─── Types ──────────────────────────────────────────────────────────────── */

type Variant = "dark" | "metal" | "blue" | "chrome";

type BlockDef = {
  id: string;
  x: number; y: number; z: number;   // 3D offset from center (px)
  w: number; h: number; d: number;   // dimensions (px)
  rx: number; ry: number; rz: number; // initial rotation (deg)
  variant: Variant;
  delay: number;
  floatAmp: number;   // float amplitude (px)
  floatDur: number;   // float period (s)
};

/* ─── Block layout ───────────────────────────────────────────────────────── */

const BLOCKS: BlockDef[] = [
  // Left panel cluster
  { id:"L1", x:-330, y: -25, z: -80, w:110, h:200, d:18,  rx:  7, ry: 18, rz: -3, variant:"dark",   delay:0.55, floatAmp:14, floatDur: 8.2 },
  { id:"L2", x:-240, y:  60, z:  20, w: 76, h: 76, d:76,  rx: 14, ry: 22, rz: -6, variant:"metal",  delay:0.85, floatAmp:18, floatDur: 7.0 },
  { id:"L3", x:-370, y:  55, z: -15, w: 40, h:105, d:14,  rx: -8, ry: 12, rz:  4, variant:"dark",   delay:1.05, floatAmp:10, floatDur: 9.5 },
  { id:"L4", x:-185, y: -75, z:  45, w: 58, h: 38, d:58,  rx: 20, ry:-15, rz:  8, variant:"blue",   delay:1.25, floatAmp:20, floatDur: 6.5 },
  { id:"L5", x:-410, y: -35, z:  70, w: 32, h: 32, d:32,  rx: 35, ry: 40, rz: 12, variant:"chrome", delay:1.45, floatAmp:22, floatDur: 5.5 },
  // Right panel cluster
  { id:"R1", x: 330, y: -18, z: -80, w:105, h:185, d:16,  rx: -6, ry:-20, rz:  4, variant:"dark",   delay:0.65, floatAmp:12, floatDur: 8.5 },
  { id:"R2", x: 248, y:  52, z:  15, w: 84, h: 84, d:84,  rx:-12, ry:-18, rz:  7, variant:"metal",  delay:0.95, floatAmp:16, floatDur: 7.5 },
  { id:"R3", x: 378, y:  42, z: -10, w: 38, h: 96, d:12,  rx:  6, ry:-14, rz: -5, variant:"dark",   delay:1.15, floatAmp:11, floatDur: 9.0 },
  { id:"R4", x: 200, y: -68, z:  55, w: 54, h: 34, d:54,  rx:-22, ry: 18, rz: -9, variant:"blue",   delay:1.35, floatAmp:18, floatDur: 6.0 },
  { id:"R5", x: 425, y: -28, z:  60, w: 30, h: 40, d:30,  rx:-30, ry:-38, rz:-10, variant:"chrome", delay:1.55, floatAmp:24, floatDur: 5.0 },
  // Top/bottom accents
  { id:"T1", x: -35, y:-162, z:  10, w:190, h: 14, d:12,  rx: 28, ry:  4, rz: -2, variant:"metal",  delay:1.65, floatAmp: 8, floatDur:10.0 },
  { id:"T2", x:  78, y:-136, z:  36, w: 48, h: 48, d:48,  rx: 25, ry:-10, rz:  6, variant:"blue",   delay:1.85, floatAmp:12, floatDur: 7.0 },
  { id:"B1", x:  22, y: 162, z:   0, w:175, h: 13, d:11,  rx:-26, ry: -5, rz:  3, variant:"dark",   delay:1.75, floatAmp: 8, floatDur:10.5 },
  { id:"B2", x: -76, y: 136, z:  28, w: 46, h: 46, d:46,  rx:-22, ry: 14, rz: -7, variant:"chrome", delay:1.95, floatAmp:14, floatDur: 6.5 },
];

/* ─── Face materials ─────────────────────────────────────────────────────── */

type Face = "front" | "back" | "top" | "bottom" | "left" | "right";

const MAT: Record<Variant, Record<Face, string>> = {
  dark: {
    front:  "linear-gradient(160deg,#252528 0%,#16161a 55%,#1c1c20 100%)",
    back:   "#0c0c10",
    top:    "linear-gradient(180deg,#38383e 0%,#252528 100%)",
    bottom: "#0a0a0d",
    left:   "linear-gradient(90deg,#111114 0%,#0f0f12 100%)",
    right:  "linear-gradient(90deg,#1c1c20 0%,#141418 100%)",
  },
  metal: {
    front:  "linear-gradient(145deg,#3c3c42 0%,#28282e 40%,#38383e 70%,#222226 100%)",
    back:   "#0e0e12",
    top:    "linear-gradient(180deg,#5a5a62 0%,#3a3a42 50%,#2e2e34 100%)",
    bottom: "#10101a",
    left:   "linear-gradient(90deg,#141418 0%,#1c1c22 100%)",
    right:  "linear-gradient(90deg,#202026 0%,#18181e 100%)",
  },
  blue: {
    front:  "linear-gradient(150deg,#00629b 0%,#004a78 50%,#003b5c 100%)",
    back:   "#000e1c",
    top:    "linear-gradient(180deg,#0080c6 0%,#00629b 60%,#004f80 100%)",
    bottom: "#000e1c",
    left:   "linear-gradient(90deg,#002a50 0%,#001e3c 100%)",
    right:  "linear-gradient(90deg,#003260 0%,#002848 100%)",
  },
  chrome: {
    front:  "linear-gradient(135deg,#5a5a64 0%,#3e3e46 30%,#6e6e78 55%,#3a3a42 80%,#4e4e58 100%)",
    back:   "#0c0c10",
    top:    "linear-gradient(180deg,#8a8a96 0%,#5e5e6a 40%,#4a4a54 100%)",
    bottom: "#14141a",
    left:   "linear-gradient(90deg,#1a1a20 0%,#242430 100%)",
    right:  "linear-gradient(90deg,#2e2e36 0%,#222228 100%)",
  },
};

/* ─── Block3D ────────────────────────────────────────────────────────────── */

function Block3D({ b, entered }: { b: BlockDef; entered: boolean }) {
  const { w: W, h: H, d: D } = b;
  const m = MAT[b.variant];

  // Each face: same dimensions as container (W×H).
  // Using the classic cube-face technique — translateZ places each face
  // at the correct surface. For rectangular prisms the side faces are
  // stretched to W×H but with gradient materials this reads correctly.
  const face = (key: Face, transform: string) => (
    <div
      key={key}
      style={{
        position: "absolute",
        inset: 0,
        transform,
        background: m[key],
        backfaceVisibility: "hidden",
        boxShadow:
          b.variant === "blue" && key === "front"
            ? "inset 0 0 28px rgba(0,181,226,0.15), inset 0 0 2px rgba(0,181,226,0.4)"
            : key === "front"
            ? "inset 0 0 1px rgba(255,255,255,0.05)"
            : "none",
      }}
    />
  );

  const blueGlow = b.variant === "blue"
    ? "0 0 48px rgba(0,98,155,0.55), 0 0 100px rgba(0,98,155,0.2)"
    : "0 8px 40px rgba(0,0,0,0.65)";

  return (
    // Static 3D positioning — CSS transform only, no motion conflicts
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: W,
        height: H,
        marginLeft: -W / 2,
        marginTop: -H / 2,
        transformStyle: "preserve-3d",
        transform: `translate3d(${b.x}px,${b.y}px,${b.z}px) rotateX(${b.rx}deg) rotateY(${b.ry}deg) rotateZ(${b.rz}deg)`,
      }}
    >
      {/* Animated wrapper: entry fade + continuous float */}
      <motion.div
        style={{
          width: W,
          height: H,
          transformStyle: "preserve-3d",
          filter: `drop-shadow(${blueGlow})`,
        }}
        initial={{ opacity: 0, scale: 0.25 }}
        animate={
          entered
            ? { opacity: 1, scale: 1, y: [0, -b.floatAmp, 0, b.floatAmp, 0] }
            : { opacity: 0, scale: 0.25, y: 0 }
        }
        transition={
          entered
            ? {
                opacity: { duration: 0.65, delay: b.delay, ease: [0.22, 1, 0.36, 1] },
                scale:   { duration: 0.85, delay: b.delay, ease: [0.22, 1, 0.36, 1] },
                y: {
                  duration: b.floatDur,
                  delay: b.delay + 0.9,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }
            : { duration: 0.3 }
        }
      >
        {face("front",  `translateZ(${D / 2}px)`)}
        {face("back",   `rotateY(180deg) translateZ(${D / 2}px)`)}
        {face("left",   `rotateY(-90deg) translateZ(${W / 2}px)`)}
        {face("right",  `rotateY( 90deg) translateZ(${W / 2}px)`)}
        {face("top",    `rotateX( 90deg) translateZ(${H / 2}px)`)}
        {face("bottom", `rotateX(-90deg) translateZ(${H / 2}px)`)}
      </motion.div>
    </div>
  );
}

/* ─── Atmosphere canvas ──────────────────────────────────────────────────── */

function AtmosphereCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let raf: number;

    const resize = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    };
    resize();

    // Fine dust particles
    const pts = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.3 + Math.random() * 1.1,
      a: 0.025 + Math.random() * 0.07,
      vx: (Math.random() - 0.5) * 0.00005,
      vy: -0.00004 - Math.random() * 0.00007,
      ph: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    const draw = () => {
      const W = c.width, H = c.height;
      ctx.clearRect(0, 0, W, H);

      // Central volumetric glow — IEEE blue tint
      const cg = ctx.createRadialGradient(W / 2, H * 0.45, 0, W / 2, H * 0.45, W * 0.44);
      cg.addColorStop(0,    "rgba(0,98,155,0.11)");
      cg.addColorStop(0.38, "rgba(0,181,226,0.04)");
      cg.addColorStop(1,    "rgba(0,0,0,0)");
      ctx.fillStyle = cg;
      ctx.fillRect(0, 0, W, H);

      // Top-down studio key light
      const kl = ctx.createRadialGradient(W / 2, 0, 0, W / 2, 0, H * 0.65);
      kl.addColorStop(0,   "rgba(255,255,255,0.022)");
      kl.addColorStop(0.5, "rgba(200,220,255,0.008)");
      kl.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.fillStyle = kl;
      ctx.fillRect(0, 0, W, H);

      // Dust
      t += 0.016;
      for (const p of pts) {
        p.x += p.vx + Math.sin(t * 0.3 + p.ph) * 0.000025;
        p.y += p.vy;
        if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,210,240,${p.a * (0.55 + 0.45 * Math.sin(t + p.ph))})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resize, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden />
  );
}

/* ─── Accent edge strips ─────────────────────────────────────────────────── */

function AccentStrip({
  x, z, height, color, delay, entered,
}: {
  x: number; z: number; height: number; color: string; delay: number; entered: boolean;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%", top: "50%",
        marginLeft: -1, marginTop: -height / 2,
        transform: `translate3d(${x}px,0,${z}px)`,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        style={{
          width: 2,
          height,
          background: `linear-gradient(180deg,transparent,${color},transparent)`,
          boxShadow: `0 0 18px 4px ${color}88`,
          borderRadius: 2,
        }}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={entered ? { opacity: 0.7, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

/* ─── Keyword labels ─────────────────────────────────────────────────────── */

const KEYWORDS = [
  { label: "INNOVATION",   x: "7vw",  y: "20%", delay: 3.2 },
  { label: "TECHNOLOGY",   x: "77vw", y: "17%", delay: 3.5 },
  { label: "RESEARCH",     x: "5vw",  y: "74%", delay: 3.8 },
  { label: "ENGINEERING",  x: "71vw", y: "77%", delay: 4.1 },
  { label: "COMMUNITY",    x: "83vw", y: "47%", delay: 4.4 },
];

/* ─── HeroSection ────────────────────────────────────────────────────────── */

export function HeroSection() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<"logo" | "blocks" | "settled">("logo");

  // Subtle mouse-driven camera tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltY  = useSpring(mouseX, { stiffness: 35, damping: 28 });
  const tiltX  = useSpring(mouseY, { stiffness: 35, damping: 28 });

  useEffect(() => {
    if (reduced) { setPhase("settled"); return; }
    const t1 = setTimeout(() => setPhase("blocks"),  1800);
    const t2 = setTimeout(() => setPhase("settled"), 3400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [reduced]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(((e.clientX / window.innerWidth)  - 0.5) * 10);
      mouseY.set(((e.clientY / window.innerHeight) - 0.5) * -6);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  const entered = phase !== "logo";
  const settled = phase === "settled";

  return (
    <section
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden"
      style={{ background: "#07090E" }}
    >
      {/* Atmospheric background */}
      <AtmosphereCanvas />

      {/* Radial vignette — keeps center legible against blocks */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 58% at 50% 47%, transparent 18%, rgba(7,9,14,0.6) 100%)",
        }}
      />

      {/* 3D scene container */}
      <div
        aria-hidden
        style={{
          perspective: "1100px",
          perspectiveOrigin: "50% 47%",
          position: "absolute",
          inset: 0,
        }}
      >
        {/* Camera orbit — mouse-driven tilt + slow ambient rotation */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
            rotateX: tiltX,
            rotateY: tiltY,
          }}
          animate={settled ? { rotateY: [0, 4, 0, -4, 0] } : {}}
          transition={settled ? { duration: 24, repeat: Infinity, ease: "easeInOut" } : {}}
        >
          {BLOCKS.map(b => (
            <Block3D key={b.id} b={b} entered={entered} />
          ))}

          <AccentStrip x={-295} z={22} height={230} color="#00B5E2" delay={1.5} entered={entered} />
          <AccentStrip x={ 308} z={14} height={175} color="#00629B" delay={1.7} entered={entered} />
        </motion.div>
      </div>

      {/* ── Center content ── */}
      <div className="relative z-10 flex flex-col items-center gap-5 px-[var(--gutter)] text-center sm:gap-6">

        {/* Logo — materializes first */}
        <motion.div
          initial={reduced ? undefined : { opacity: 0, scale: 0.88, y: 18, filter: "blur(14px)" }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
        >
          <Image
            src="/media/logos/ieee_rvce_new_white.png"
            alt="IEEE RVCE — RV College of Engineering Student Branch"
            width={900}
            height={340}
            priority
            loading="eager"
            className="h-auto w-[min(460px,82vw)] sm:w-[min(510px,78vw)]"
            style={{
              filter:
                "drop-shadow(0 0 55px rgba(0,181,226,0.30)) drop-shadow(0 2px 22px rgba(0,98,155,0.45))",
            }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="font-mono text-[10px] uppercase tracking-[0.26em] text-white/28 sm:text-[11px] sm:tracking-[0.34em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 1.3 }}
        >
          Advancing Technology&nbsp;&nbsp;·&nbsp;&nbsp;Empowering Innovation
        </motion.p>

        {/* Branch meta */}
        <motion.p
          className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/16 sm:text-[9px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 1.65 }}
        >
          RV College of Engineering&nbsp;&nbsp;·&nbsp;&nbsp;Student Branch&nbsp;&nbsp;·&nbsp;&nbsp;{branch.foundedYear}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col items-center gap-3 pt-1 sm:flex-row sm:gap-4"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 3.9 }}
        >
          <Magnetic>
            <ActionLink href="/membership" variant="cyan" size="lg" arrow>
              Become a member
            </ActionLink>
          </Magnetic>
          <ActionLink
            href="/societies"
            size="lg"
            className="border border-white/18 text-white hover:border-white/40 hover:bg-white/5"
          >
            Explore societies
          </ActionLink>
        </motion.div>
      </div>

      {/* Scattered keyword labels */}
      {KEYWORDS.map(k => (
        <motion.span
          key={k.label}
          className="pointer-events-none absolute font-mono text-[8px] uppercase tracking-[0.22em] text-white/12 sm:text-[9px]"
          style={{ left: k.x, top: k.y }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: k.delay, ease: "easeOut" }}
          aria-hidden
        >
          {k.label}
        </motion.span>
      ))}

      {/* Bottom accent rule */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(0,181,226,0.22),transparent)" }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 2.0, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 4.6 }}
      >
        <span className="font-mono text-[7px] uppercase tracking-[0.22em] text-white/22">
          scroll
        </span>
        <motion.div
          className="h-7 w-px bg-gradient-to-b from-white/22 to-transparent"
          animate={{ scaleY: [1, 0.35, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
