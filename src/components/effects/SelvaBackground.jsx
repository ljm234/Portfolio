// /src/components/effects/SelvaBackground.jsx
"use client";

import { useEffect, useRef } from "react";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Animated Peruvian-jungle background (canvas only, lightweight):
 * - Dawn sky over the Amazon basin, with a soft sun glow and halo
 * - Distant snow-capped Andean ranges (the sierra descending into the selva)
 * - A meandering river with a flowing shimmer
 * - Layered forest canopy ridges with a gentle parallax drift
 * - Foreground ferns and palms that sway
 * - Occasional macaw crossing the sky and fireflies near the floor
 * Colors adapt for light and dark mode via the isDark prop.
 */
export default function SelvaBackground({
  className = "",
  canopyLayers = 5,
  speed = 0.3,
  isDark = false,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const paint = (t = 0) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      // 1) sky gradient (dawn over the basin; deeper at night)
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      if (isDark) {
        sky.addColorStop(0, "rgba(30,58,90,0.55)");
        sky.addColorStop(0.5, "rgba(20,60,70,0.40)");
        sky.addColorStop(1, "rgba(12,45,30,0.55)");
      } else {
        sky.addColorStop(0, "rgba(160,214,232,0.55)");
        sky.addColorStop(0.45, "rgba(180,224,200,0.35)");
        sky.addColorStop(1, "rgba(95,148,40,0.45)");
      }
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      // 2) sun glow with halo (top-right)
      const sx = w * 0.82;
      const sy = h * 0.16;
      const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, h * 0.7);
      const sunA = isDark ? 0.25 : 0.5;
      glow.addColorStop(0, `rgba(255,224,160,${sunA})`);
      glow.addColorStop(1, "rgba(255,224,160,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // 3) distant snow-capped ranges
      drawRanges(ctx, w, h, isDark);

      // 4) river band with flowing shimmer
      drawRiver(ctx, t * speed, w, h, isDark);

      // 5) canopy ridges with parallax
      drawCanopy(ctx, t * speed, w, h, canopyLayers, isDark);

      // 6) foreground plants (ferns + palms) that sway
      drawPlants(ctx, t, w, h, isDark);

      // 7) fireflies / sparkles near the floor
      const sparkA = isDark ? 0.9 : 0.5;
      for (let i = 0; i < 18; i++) {
        const fx = (i * 137.5) % w;
        const fy = h * (0.72 + ((i * 53) % 100) / 380);
        const a = sparkA * (0.4 + 0.5 * Math.sin(t * 0.003 + i * 1.9));
        ctx.fillStyle = `rgba(255,243,176,${Math.max(0, a)})`;
        ctx.beginPath();
        ctx.arc(fx, fy, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // 8) a macaw crossing on a slow loop
      drawMacaw(ctx, t, w, h);
    };

    if (prefersReducedMotion()) {
      paint(0);
      return () => ro.disconnect();
    }

    let raf = 0;
    const tick = (now) => {
      paint(now);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [canopyLayers, speed, isDark]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

function drawRanges(ctx, w, h, isDark) {
  const ranges = [
    { y: 0.30, amp: 26, alpha: isDark ? 0.28 : 0.42, tone: isDark ? "120,145,175" : "166,189,216" },
    { y: 0.34, amp: 20, alpha: isDark ? 0.22 : 0.34, tone: isDark ? "100,125,155" : "147,174,206" },
  ];
  ranges.forEach((r, idx) => {
    const baseY = h * r.y;
    ctx.fillStyle = `rgba(${r.tone},${r.alpha})`;
    ctx.beginPath();
    ctx.moveTo(0, baseY);
    const peaks = 6;
    for (let p = 0; p <= peaks; p++) {
      const x = (w / peaks) * p;
      const up = p % 2 === 0 ? r.amp : -r.amp * 0.6;
      ctx.lineTo(x, baseY - up - (idx === 0 ? 18 : 0));
    }
    ctx.lineTo(w, baseY + 40);
    ctx.lineTo(0, baseY + 40);
    ctx.closePath();
    ctx.fill();

    // snow caps on the front range only
    if (idx === 0) {
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      for (let p = 0; p <= peaks; p += 2) {
        const x = (w / peaks) * p;
        const peakY = baseY - r.amp - 18;
        ctx.beginPath();
        ctx.moveTo(x, peakY);
        ctx.lineTo(x - 10, peakY + 12);
        ctx.lineTo(x - 4, peakY + 10);
        ctx.lineTo(x, peakY + 15);
        ctx.lineTo(x + 5, peakY + 10);
        ctx.lineTo(x + 10, peakY + 12);
        ctx.closePath();
        ctx.fill();
      }
    }
  });
}

function drawRiver(ctx, time, w, h, isDark) {
  const midY = h * 0.62;
  const amp = h * 0.05;
  const riverTone = isDark ? "80,120,150" : "111,176,228";
  const width = h * 0.06;

  // base water
  ctx.strokeStyle = `rgba(${riverTone},0.55)`;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.beginPath();
  for (let x = -20; x <= w + 20; x += 4) {
    const y = midY + Math.sin(x * 0.006 + time * 0.3) * amp;
    if (x === -20) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // flowing highlight (dashed, animated offset)
  ctx.strokeStyle = isDark ? "rgba(200,225,245,0.4)" : "rgba(220,240,255,0.6)";
  ctx.lineWidth = width * 0.3;
  ctx.setLineDash([18, 26]);
  ctx.lineDashOffset = -(time * 40) % 400;
  ctx.beginPath();
  for (let x = -20; x <= w + 20; x += 4) {
    const y = midY + Math.sin(x * 0.006 + time * 0.3) * amp;
    if (x === -20) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawCanopy(ctx, time, w, h, layers, isDark) {
  for (let i = 0; i < layers; i++) {
    const d = i / (layers - 1 || 1);
    const baseY = h * (0.66 + d * 0.30);
    const amp = 16 + 24 * (1 - d);
    const freq = 0.007 + d * 0.004;
    const phase = time * (0.7 + d * 0.5);

    // green canopy: lighter/back to darker/front
    const light = isDark ? 22 - d * 8 : 42 - d * 14;
    const sat = isDark ? 40 : 55;
    const alpha = 0.5 - d * 0.28;
    ctx.fillStyle = `hsla(95, ${sat}%, ${light}%, ${alpha})`;

    ctx.beginPath();
    ctx.moveTo(0, h);
    for (let x = 0; x <= w; x += 3) {
      const y =
        baseY +
        Math.sin(x * freq + phase) * amp +
        Math.sin(x * (freq * 0.5) - phase * 1.3) * amp * 0.35;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();
  }
}

function drawPlants(ctx, t, w, h, isDark) {
  const stroke = isDark ? "rgba(12,90,70,0.5)" : "rgba(15,110,86,0.35)";
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 2;

  // a set of fronds anchored along the bottom, each swaying at its own phase
  const fronds = [
    { x: 0.05, size: 90, dir: 1, ph: 0.0 },
    { x: 0.14, size: 62, dir: -1, ph: 1.1 },
    { x: 0.30, size: 74, dir: 1, ph: 2.0 },
    { x: 0.42, size: 54, dir: -1, ph: 0.6 },
    { x: 0.55, size: 80, dir: 1, ph: 1.5 },
    { x: 0.68, size: 60, dir: -1, ph: 2.6 },
    { x: 0.80, size: 88, dir: 1, ph: 0.9 },
    { x: 0.92, size: 66, dir: -1, ph: 1.8 },
  ];

  fronds.forEach((f) => {
    const bx = w * f.x;
    const by = h;
    const sway = Math.sin(t * 0.0011 + f.ph) * 0.12 * f.dir;
    ctx.save();
    ctx.translate(bx, by);
    ctx.rotate(sway);
    // central stem
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -f.size);
    ctx.stroke();
    // leaflets
    const pairs = 5;
    for (let k = 1; k <= pairs; k++) {
      const yy = -(f.size * k) / (pairs + 1);
      const ll = f.size * 0.28 * (1 - k / (pairs + 2));
      ctx.beginPath();
      ctx.moveTo(0, yy);
      ctx.quadraticCurveTo(-ll, yy - ll * 0.4, -ll * 1.3, yy - ll * 0.1);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, yy);
      ctx.quadraticCurveTo(ll, yy - ll * 0.4, ll * 1.3, yy - ll * 0.1);
      ctx.stroke();
    }
    ctx.restore();
  });
}

function drawMacaw(ctx, t, w, h) {
  // slow horizontal loop across the upper third
  const period = 17000;
  const p = (t % period) / period;
  const x = -60 + p * (w + 120);
  const y = h * 0.24 - Math.sin(p * Math.PI) * 20;
  const flap = Math.sin(t * 0.012) * 0.5 + 0.5;
  const wing = 8 + flap * 6;

  ctx.save();
  ctx.translate(x, y);
  // body
  ctx.fillStyle = "rgba(226,75,74,0.85)";
  ctx.beginPath();
  ctx.ellipse(0, 0, 5, 3, 0, 0, Math.PI * 2);
  ctx.fill();
  // wings (red/blue)
  ctx.strokeStyle = "rgba(226,75,74,0.85)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-11, -wing);
  ctx.stroke();
  ctx.strokeStyle = "rgba(55,138,221,0.85)";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(11, -wing);
  ctx.stroke();
  ctx.restore();
}
