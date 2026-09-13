"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

const VERT = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

// Interference-pattern warp grid:
//  - Two orbital wave sources create shifting moiré-like interference
//  - Periodic pulse rings emanate from center (heartbeat)
//  - Chromatic aberration on grid lines (holographic RGB split)
//  - Per-node animated intersection dots (circuit-board nodes)
//  - Mouse/touch-driven localized distortion
//  - Subtle grid breathing (organic scale oscillation)
//  - Deep violet edge coloring for visual depth
const FRAG = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uMouse;
  uniform float uMouseActive;

  float hash21(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float gridLine(vec2 uv, float scale, float thickness) {
    vec2 cell = abs(fract(uv * scale) - 0.5);
    return max(
      smoothstep(thickness, 0.0, cell.x),
      smoothstep(thickness, 0.0, cell.y)
    );
  }

  float gridNode(vec2 uv, float scale, float radius) {
    vec2 cell   = fract(uv * scale);
    vec2 corner = floor(cell + 0.5);
    float d     = length(cell - corner);
    return smoothstep(radius, 0.0, d);
  }

  void main() {
    vec2  uv     = vUv;
    float aspect = uResolution.x / uResolution.y;

    // ── Two orbital wave sources ───────────────────────────────
    float t1  = uTime * 0.22;
    float t2  = uTime * 0.17 + 2.094; // 120° phase offset
    vec2 src1 = vec2(0.5 + 0.20 * cos(t1), 0.5 + 0.13 * sin(t1));
    vec2 src2 = vec2(0.5 + 0.20 * cos(t2), 0.5 + 0.13 * sin(t2));

    vec2  dc    = (uv - 0.5) * vec2(aspect, 1.0);
    vec2  d1    = (uv - src1) * vec2(aspect, 1.0);
    vec2  d2    = (uv - src2) * vec2(aspect, 1.0);
    float dist  = length(dc);
    float dist1 = length(d1);
    float dist2 = length(d2);

    // Interference from both sources
    float w1 = sin(dist1 * 14.0 - uTime * 1.8) * 0.018 / (dist1 * 3.5 + 0.7);
    float w2 = sin(dist2 * 14.0 - uTime * 1.8) * 0.018 / (dist2 * 3.5 + 0.7);
    // Fine harmonic from center
    float w3 = sin(dist  * 30.0 - uTime * 3.0) * 0.006 / (dist  * 8.0 + 1.0);

    // ── Periodic pulse ring ────────────────────────────────────
    // Fires every ~2.6 s, expands outward from center
    float pulseAge  = fract(uTime * 0.38);
    float pulseRad  = pulseAge * 1.3;
    float pulseWave = exp(-pow((dist - pulseRad) * 32.0, 2.0)) * 0.030 * (1.0 - pulseAge);

    // ── Mouse / touch ripple ───────────────────────────────────
    vec2  mp    = vec2(uMouse.x, 1.0 - uMouse.y);
    vec2  md    = (uv - mp) * vec2(aspect, 1.0);
    float mdist = length(md);
    float mr    = sin(mdist * 28.0 - uTime * 5.5) * 0.018;
    mr         *= smoothstep(0.40, 0.0, mdist) * uMouseActive;

    // ── Distort sample coordinates ─────────────────────────────
    // Subtle breathing: grid scale oscillates slowly
    float breathe = 1.0 + sin(uTime * 0.55) * 0.006;
    vec2  distUV  = uv * breathe + vec2(w1 + w2 + w3 + pulseWave + mr);

    // ── Grid layers with chromatic aberration ──────────────────
    float ca  = 0.0013; // RGB channel separation
    float g1r = gridLine(distUV + vec2(ca,  0.0), 7.0, 0.018);
    float g1g = gridLine(distUV,                   7.0, 0.018);
    float g1b = gridLine(distUV - vec2(ca,  0.0), 7.0, 0.018);

    float g2   = gridLine(distUV, 21.0, 0.010) * 0.30;
    float glow = gridLine(distUV,  7.0, 0.062) * 0.12;

    // ── Animated intersection nodes ────────────────────────────
    vec2  nodeId    = floor(distUV * 7.0);
    float nodePhase = hash21(nodeId);
    float nodeFlash = 0.30 + 0.70 * abs(sin(uTime * (1.2 + nodePhase * 2.5) + nodePhase * 6.2832));
    float dots      = gridNode(distUV, 7.0, 0.058) * nodeFlash * 0.85;

    // ── Radial fade + edge vignette ────────────────────────────
    float fade = 1.0 - smoothstep(0.10, 0.92, dist);
    float vign = smoothstep(1.05, 0.30, dist * 1.5);
    float mask = fade * vign;

    // ── Color ──────────────────────────────────────────────────
    // IEEE cyan #00B5E2 → (0.0, 0.710, 0.886)
    // IEEE blue #00629B → (0.0, 0.384, 0.608)
    vec3 cyan   = vec3(0.0,  0.710, 0.886);
    vec3 blue   = vec3(0.0,  0.384, 0.608);
    vec3 violet = vec3(0.22, 0.08,  0.62);  // depth at edges

    vec3 col       = mix(blue, cyan, clamp(g1g * 2.8, 0.0, 1.0));
    float edgeGlow = smoothstep(0.50, 0.95, dist);
    col            = mix(col, violet, edgeGlow * 0.32);

    // Chromatic RGB channels
    float iR = (g1r + g2 + glow + dots) * mask;
    float iG = (g1g + g2 + glow + dots) * mask;
    float iB = (g1b + g2 + glow + dots) * mask;

    vec3 color;
    color.r = col.r * iR * 1.08;
    color.g = col.g * iG;
    color.b = col.b * iB * 1.12;

    // Pulse ring bright overlay
    float pulseOverlay = pulseWave * mask * 9.0;
    color += vec3(0.0, 0.65, 0.95) * pulseOverlay;

    float alpha = max(max(iR, iG), iB) + pulseOverlay * 0.7;
    gl_FragColor = vec4(color, clamp(alpha, 0.0, 1.0));
  }
`;

function compileShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  return shader;
}

export function WarpField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
    });
    if (!gl) return;

    const vert = compileShader(gl, gl.VERTEX_SHADER, VERT);
    const frag = compileShader(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vert);
    gl.attachShader(prog, frag);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime        = gl.getUniformLocation(prog, "uTime");
    const uResolution  = gl.getUniformLocation(prog, "uResolution");
    const uMouse       = gl.getUniformLocation(prog, "uMouse");
    const uMouseActive = gl.getUniformLocation(prog, "uMouseActive");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const startTime = performance.now();
    const mouse = { x: 0.5, y: 0.5, active: 0 };
    let mouseTimer: ReturnType<typeof setTimeout>;
    let raf: number;

    const setPointer = (x: number, y: number) => {
      mouse.x = x / window.innerWidth;
      mouse.y = y / window.innerHeight;
      mouse.active = 1;
      clearTimeout(mouseTimer);
      mouseTimer = setTimeout(() => { mouse.active = 0; }, 2200);
    };

    const onMouseMove = (e: MouseEvent) => setPointer(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) setPointer(t.clientX, t.clientY);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const render = (once = false) => {
      const t = (performance.now() - startTime) / 1000;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTime,        t);
      gl.uniform2f(uResolution,  canvas.width, canvas.height);
      gl.uniform2f(uMouse,       mouse.x, mouse.y);
      gl.uniform1f(uMouseActive, mouse.active);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!once) raf = requestAnimationFrame(() => render());
    };

    resize();
    window.addEventListener("resize",    resize,      { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    if (reduced) {
      render(true);
    } else {
      render();
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(mouseTimer);
      window.removeEventListener("resize",    resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
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
