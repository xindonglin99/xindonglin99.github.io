"use client";

import { useEffect, useRef } from "react";

const SPHERE_COUNT = 8;
const VERTICES_PER_SPHERE = 14;
const LINE_THRESHOLD = 1.05;
const MOUSE_RADIUS = 150;
const MOUSE_FORCE = 1.2;
const DAMPING = 0.985;
const MIN_SPEED = 0.12;
const RANDOM_KICK = 0.05;
const ROTATION_SPEED_BASE = 0.005;
const DOT_COLOR = [140, 195, 230] as const;
const DOT_BASE_ALPHA = 0.65;
const LINE_BASE_ALPHA = 0.32;

type Vec3 = [number, number, number];

interface Sphere {
  cx: number;
  cy: number;
  vx: number;
  vy: number;
  radius: number;
  vertices: Float32Array;
  edges: number[];
  axis: Vec3;
  angle: number;
  angularSpeed: number;
}

function fibonacciSphere(n: number): Float32Array {
  const out = new Float32Array(n * 3);
  const golden = Math.PI * (1 + Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (2 * i + 1) / n;
    const r = Math.sqrt(1 - y * y);
    const phi = i * golden;
    out[i * 3] = r * Math.cos(phi);
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = r * Math.sin(phi);
  }
  return out;
}

function buildEdges(vertices: Float32Array, threshold: number): number[] {
  const n = vertices.length / 3;
  const edges: number[] = [];
  for (let i = 0; i < n; i++) {
    const ix = vertices[i * 3];
    const iy = vertices[i * 3 + 1];
    const iz = vertices[i * 3 + 2];
    for (let j = i + 1; j < n; j++) {
      const dx = ix - vertices[j * 3];
      const dy = iy - vertices[j * 3 + 1];
      const dz = iz - vertices[j * 3 + 2];
      if (dx * dx + dy * dy + dz * dz < threshold * threshold) {
        edges.push(i, j);
      }
    }
  }
  return edges;
}

function randomUnitAxis(): Vec3 {
  const theta = Math.random() * Math.PI * 2;
  const z = Math.random() * 2 - 1;
  const r = Math.sqrt(1 - z * z);
  return [r * Math.cos(theta), r * Math.sin(theta), z];
}

export function WireframeSpheres() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const radii = [70, 80, 75, 90, 65, 85, 95, 78];
    const baseVerts = fibonacciSphere(VERTICES_PER_SPHERE);
    const edges = buildEdges(baseVerts, LINE_THRESHOLD);

    const spheres: Sphere[] = [];
    for (let i = 0; i < SPHERE_COUNT; i++) {
      spheres.push({
        cx: Math.random() * width,
        cy: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: radii[i % radii.length],
        vertices: baseVerts,
        edges,
        axis: randomUnitAxis(),
        angle: Math.random() * Math.PI * 2,
        angularSpeed: ROTATION_SPEED_BASE * (0.7 + Math.random() * 0.6),
      });
    }

    const mouse = { x: -9999, y: -9999 };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    let isHidden = false;
    let rafId = 0;
    const onVisibility = () => {
      if (document.hidden) {
        isHidden = true;
        if (rafId) cancelAnimationFrame(rafId);
      } else if (isHidden) {
        isHidden = false;
        rafId = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    const projected = new Float32Array(VERTICES_PER_SPHERE * 3);

    const frame = () => {
      if (isHidden) return;
      ctx.clearRect(0, 0, width, height);

      for (const s of spheres) {
        const dxm = s.cx - mouse.x;
        const dym = s.cy - mouse.y;
        const dm = Math.sqrt(dxm * dxm + dym * dym);
        const reach = MOUSE_RADIUS + s.radius;
        if (dm < reach && dm > 0) {
          const force = (1 - dm / reach) * MOUSE_FORCE;
          s.vx += (dxm / dm) * force;
          s.vy += (dym / dm) * force;
        }

        s.vx *= DAMPING;
        s.vy *= DAMPING;

        const speed = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
        if (speed < MIN_SPEED) {
          s.vx += (Math.random() - 0.5) * RANDOM_KICK * 2;
          s.vy += (Math.random() - 0.5) * RANDOM_KICK * 2;
        }

        s.cx += s.vx;
        s.cy += s.vy;

        if (s.cx < s.radius && s.vx < 0) s.vx = -s.vx;
        if (s.cx > width - s.radius && s.vx > 0) s.vx = -s.vx;
        if (s.cy < s.radius && s.vy < 0) s.vy = -s.vy;
        if (s.cy > height - s.radius && s.vy > 0) s.vy = -s.vy;

        s.angle += s.angularSpeed;
        const c = Math.cos(s.angle);
        const sn = Math.sin(s.angle);
        const t = 1 - c;
        const [ax, ay, az] = s.axis;
        const m00 = t * ax * ax + c;
        const m01 = t * ax * ay - sn * az;
        const m02 = t * ax * az + sn * ay;
        const m10 = t * ax * ay + sn * az;
        const m11 = t * ay * ay + c;
        const m12 = t * ay * az - sn * ax;
        const m20 = t * ax * az - sn * ay;
        const m21 = t * ay * az + sn * ax;
        const m22 = t * az * az + c;

        for (let i = 0; i < VERTICES_PER_SPHERE; i++) {
          const x = s.vertices[i * 3];
          const y = s.vertices[i * 3 + 1];
          const z = s.vertices[i * 3 + 2];
          projected[i * 3] = m00 * x + m01 * y + m02 * z;
          projected[i * 3 + 1] = m10 * x + m11 * y + m12 * z;
          projected[i * 3 + 2] = m20 * x + m21 * y + m22 * z;
        }

        ctx.lineWidth = 1;
        for (let e = 0; e < s.edges.length; e += 2) {
          const i = s.edges[e];
          const j = s.edges[e + 1];
          const zi = projected[i * 3 + 2];
          const zj = projected[j * 3 + 2];
          const depth = (zi + zj) * 0.5;
          const a = LINE_BASE_ALPHA * (0.5 + 0.5 * depth);
          if (a <= 0) continue;
          ctx.strokeStyle = `rgba(${DOT_COLOR[0]},${DOT_COLOR[1]},${DOT_COLOR[2]},${a.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(s.cx + projected[i * 3] * s.radius, s.cy + projected[i * 3 + 1] * s.radius);
          ctx.lineTo(s.cx + projected[j * 3] * s.radius, s.cy + projected[j * 3 + 1] * s.radius);
          ctx.stroke();
        }

        for (let i = 0; i < VERTICES_PER_SPHERE; i++) {
          const z = projected[i * 3 + 2];
          const a = DOT_BASE_ALPHA * (0.5 + 0.5 * z);
          if (a <= 0) continue;
          const r = 1.5 + 0.8 * (z + 1) * 0.5;
          ctx.fillStyle = `rgba(${DOT_COLOR[0]},${DOT_COLOR[1]},${DOT_COLOR[2]},${a.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(
            s.cx + projected[i * 3] * s.radius,
            s.cy + projected[i * 3 + 1] * s.radius,
            r,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
      }

      rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
