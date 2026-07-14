// /src/app/research/page.jsx
"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import HoverLift from "@/components/effects/HoverLift";
import MorayBackground from "@/components/effects/MorayBackground";

const FILTERS = ["All", "ML", "Wet lab", "Clinical"];

const PROJECTS = [
  {
    slug: "yachay",
    title: "YACHAY",
    desc: "Calibrated multiclass differential diagnosis of opportunistic meningitis in HIV, with conformal prediction and selective abstention. Cohort curated and frozen from MIMIC-IV; clinical collaboration forming with HIV referral hospitals in Lima.",
    tags: ["ML", "Clinical"],
    anim: "conformal",
  },
  {
    slug: "salud",
    title: "SALUD",
    desc: "Do large language models stay calibrated when a clinical case is written in Wanka Quechua instead of Spanish? Expected calibration error, Brier score, risk-coverage curves, and conformal abstention across frontier and low-resource models.",
    tags: ["ML", "Clinical"],
    anim: "quechua",
  },
  {
    slug: "amoebanator",
    title: "Amoebanator",
    desc: "Binary PAM-risk triage (Naegleria fowleri) with calibrated abstention. Compact tabular MLP, split conformal prediction, dual-gate OOD detection, decision curve analysis.",
    tags: ["ML", "Clinical"],
    anim: "amoebanator",
  },
  {
    slug: "montenegro-medium",
    title: "Montenegro-Calla\u2019s Medium",
    desc: "Serum-free, low-cost culture medium for axenic growth of Naegleria fowleri: over 70 percent cheaper than commercial alternatives, with roughly three times the cell yield.",
    tags: ["Wet lab"],
    anim: "medium",
  },
  {
    slug: "organelle-targets",
    title: "ER Stress and Mitochondrial Targeting",
    desc: "Tunicamycin and thapsigargin-induced ER stress and metformin-driven mitochondrial dysfunction in Naegleria fowleri. Western blot (BiP/GRP78) and JC-1 staining. Grant funded.",
    tags: ["Wet lab"],
    anim: "erstress",
  },
];

export default function ResearchPage() {
  const [filter, setFilter] = useState("All");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  const items = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(filter))),
    [filter]
  );

  return (
    <>
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <MorayBackground className="absolute inset-0 h-full w-full" isDark={isDark} />
      </div>

      <div className="relative z-10 max-w-2xl space-y-8 pt-2 pb-16 md:pt-3">
        <header className="pt-4 md:pt-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-[#f5f1e6] dark:drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
            Research
          </h1>
          <p className="mt-2 max-w-2xl italic text-neutral-800 dark:text-[#ece7d8] dark:drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]">
            Selected work across ML, wet lab, and clinical collaborations.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={
                  "rounded-full border px-3 py-1 text-sm backdrop-blur-sm transition " +
                  (filter === f
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-white/70 hover:bg-white dark:bg-neutral-950/60 dark:hover:bg-neutral-900")
                }
                aria-pressed={filter === f}
              >
                {f}
              </button>
            ))}
          </div>
        </header>

        <StackedList items={items} />
      </div>

      </>
  );
}

/* ---------- Stacked list: three equal cards, kept to the left ---------- */
function StackedList({ items }) {
  return (
    <section className="flex flex-col gap-6" aria-label="Research projects">
      {items.map((p) => (
        <ResearchCard key={p.slug} proj={p} variant="row" />
      ))}
    </section>
  );
}

/* ---------- Card with floating Quick preview ---------- */
function ResearchCard({ proj, variant = "grid" }) {
  const open = () => (window.location.href = `/research/${proj.slug}`);
  const onKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  };

  const isRow = variant === "row";

  return (
    <HoverLift>
      <div
        role="link"
        tabIndex={0}
        onKeyDown={onKey}
        onClick={open}
        className="group relative flex h-32 w-full items-stretch overflow-hidden rounded-xl border bg-white/85 backdrop-blur-sm dark:bg-neutral-950/80"
      >
        {/* Media/animation area (left, fixed square-ish) */}
        <div className="relative w-32 shrink-0 self-stretch overflow-hidden sm:w-40" style={{ minHeight: "7rem" }}>
          <AnimatedPanel kind={proj.anim} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent to-black/5 dark:to-black/20" />
        </div>

        {/* Text (right) */}
        <div className="flex min-w-0 flex-1 flex-col p-4">
          <div className="line-clamp-1 font-semibold">{proj.title}</div>
          <p className="mt-1 line-clamp-2 text-sm text-neutral-500 dark:text-neutral-400">
            {proj.desc}
          </p>
          <div className="mt-auto flex items-center justify-between pt-3">
            <div className="flex flex-wrap gap-1">
              {proj.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border px-2 py-0.5 text-xs text-neutral-600 dark:text-neutral-300"
                >
                  {t}
                </span>
              ))}
            </div>
            <span
              aria-hidden="true"
              className="text-sm text-neutral-500 transition-transform duration-200 group-hover:translate-x-0.5"
            >
              &rarr;
            </span>
          </div>
        </div>

        {/* Floating Quick preview */}
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
          <div className="pointer-events-auto rounded-xl border bg-white/90 p-3 text-sm shadow-xl dark:bg-neutral-900/90">
            <div className="font-medium">{proj.title}</div>
            <div className="mt-1 max-w-[36ch] text-neutral-600 dark:text-neutral-300">
              {proj.desc}
            </div>
            <div className="mt-3 flex gap-2">
              <a className="rounded-md border px-3 py-1" href={`/research/${proj.slug}`}>
                Open
              </a>
              <a className="rounded-md border px-3 py-1" href="/publications">
                Publications
              </a>
            </div>
          </div>
        </div>
      </div>
    </HoverLift>
  );
}

/* ---------- Canvas animations ---------- */
function AnimatedPanel({ kind }) {
  switch (kind) {
    case "conformal":
      return <CanvasAnim draw={drawConformal} />;
    case "quechua":
      return <CanvasAnim draw={drawQuechua} />;
    case "amoebanator":
      return <CanvasAnim draw={drawLogistic} />;
    case "medium":
      return <CanvasAnim draw={drawColonies} />;
    case "erstress":
      return <CanvasAnim draw={drawNetwork} />;
    default:
      return <div className="h-full w-full bg-accent-gradient opacity-30" />;
  }
}

function CanvasAnim({ draw }) {
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

    // Always paint at least one frame so users with reduced motion still see
    // the visual content. Loop with requestAnimationFrame only when motion is
    // allowed.
    draw(ctx, 0, canvas.clientWidth, canvas.clientHeight);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => ro.disconnect();
    }

    let raf = 0;
    const tick = (t) => {
      draw(ctx, t, canvas.clientWidth, canvas.clientHeight);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [draw]);

  return <canvas ref={ref} className="h-full w-full" aria-hidden="true" />;
}

/* draw funcs */
/* YACHAY: a prediction set that widens and narrows with the confidence of the model,
   with the points it declines to call greyed out. */
function drawConformal(ctx, t, w, h) {
  const pad = 10;
  const x0 = pad;
  const x1 = w - pad;
  const mid = h / 2;

  ctx.strokeStyle = "rgba(120,120,120,0.35)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x0, h - pad);
  ctx.lineTo(x1, h - pad);
  ctx.moveTo(x0, pad);
  ctx.lineTo(x0, h - pad);
  ctx.stroke();

  const band = (k) => {
    ctx.beginPath();
    for (let i = 0; i <= 40; i++) {
      const p = i / 40;
      const x = x0 + p * (x1 - x0);
      const width = 6 + 10 * Math.abs(Math.sin(p * 3.1 + t * 0.6));
      const y = mid + k * width + 6 * Math.sin(p * 4 + t * 0.4);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  };

  ctx.strokeStyle = "rgba(58,138,134,0.55)";
  ctx.lineWidth = 1.4;
  band(1);
  band(-1);

  ctx.strokeStyle = "rgba(58,138,134,0.9)";
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  for (let i = 0; i <= 40; i++) {
    const p = i / 40;
    const x = x0 + p * (x1 - x0);
    const y = mid + 6 * Math.sin(p * 4 + t * 0.4);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  const pts = [0.14, 0.3, 0.46, 0.62, 0.78, 0.9];
  pts.forEach((p, i) => {
    const x = x0 + p * (x1 - x0);
    const y = mid + 6 * Math.sin(p * 4 + t * 0.4) + (i % 2 === 0 ? -9 : 11);
    const abstain = i === 2 || i === 4;
    ctx.beginPath();
    ctx.arc(x, y, abstain ? 2.6 : 3.4, 0, Math.PI * 2);
    ctx.fillStyle = abstain ? "rgba(140,140,140,0.45)" : "rgba(182,71,46,0.85)";
    ctx.fill();
  });
}

/* SALUD: the same clinical question crossing from one language to another, and the
   confidence of the answer drifting as it crosses. */
function drawQuechua(ctx, t, w, h) {
  const leftX = w * 0.24;
  const rightX = w * 0.76;
  const mid = h / 2;

  ctx.strokeStyle = "rgba(120,120,120,0.3)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(leftX, mid - 26);
  ctx.lineTo(leftX, mid + 26);
  ctx.moveTo(rightX, mid - 26);
  ctx.lineTo(rightX, mid + 26);
  ctx.stroke();

  for (let k = 0; k < 3; k++) {
    const phase = t * 0.5 + k * 2.1;
    const p = (Math.sin(phase) + 1) / 2;
    const x = leftX + p * (rightX - leftX);
    const y = mid + (k - 1) * 13 + 3 * Math.sin(phase * 2);
    ctx.beginPath();
    ctx.moveTo(leftX, mid + (k - 1) * 13);
    ctx.bezierCurveTo(
      leftX + (rightX - leftX) * 0.35,
      mid + (k - 1) * 13 - 8,
      rightX - (rightX - leftX) * 0.35,
      mid + (k - 1) * 13 + 8,
      rightX,
      mid + (k - 1) * 13
    );
    ctx.strokeStyle = "rgba(122,90,154,0.35)";
    ctx.lineWidth = 1.2;
    ctx.stroke();

    const conf = 0.4 + 0.6 * (1 - p);
    ctx.beginPath();
    ctx.arc(x, y, 3 + 2 * conf, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(217,164,65,${0.35 + 0.5 * conf})`;
    ctx.fill();
  }

  ctx.fillStyle = "rgba(90,90,90,0.5)";
  ctx.font = "8px ui-sans-serif, system-ui";
  ctx.fillText("ES", leftX - 8, mid + 40);
  ctx.fillText("QU", rightX - 9, mid + 40);
}

function drawLogistic(ctx, t, w, h) {
  ctx.clearRect(0, 0, w, h);
  const pad = 18;
  ctx.strokeStyle = "rgba(120,120,120,.5)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad, h - pad);
  ctx.lineTo(w - pad, h - pad);
  ctx.moveTo(pad, h - pad);
  ctx.lineTo(pad, pad);
  ctx.stroke();

  ctx.strokeStyle = "rgba(99,102,241,.9)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i <= 100; i++) {
    const x = i / 100;
    const y = 1 / (1 + Math.exp(-10 * (x - 0.5)));
    const px = pad + x * (w - 2 * pad);
    const py = h - pad - y * (h - 2 * pad);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();

  const s = (Math.sin(t * 0.0015) + 1) / 2;
  const x = s,
    y = 1 / (1 + Math.exp(-10 * (x - 0.5)));
  const px = pad + x * (w - 2 * pad);
  const py = h - pad - y * (h - 2 * pad);
  ctx.fillStyle = "rgba(16,185,129,.95)";
  ctx.beginPath();
  ctx.arc(px, py, 5, 0, Math.PI * 2);
  ctx.fill();
}

function drawColonies(ctx, t, w, h) {
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2,
    cy = h / 2,
    R = Math.min(w, h) * 0.45;
  ctx.strokeStyle = "rgba(120,120,120,.4)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.stroke();

  const seeds = 7;
  for (let i = 0; i < seeds; i++) {
    const ang = (i / seeds) * Math.PI * 2 + 0.3;
    const ex = cx + Math.cos(ang) * (R * 0.4);
    const ey = cy + Math.sin(ang) * (R * 0.4);
    const pulse = 1 + 0.25 * Math.sin(t * 0.001 + i);
    const rad = 3 + 6 * pulse * (i % 3 ? 0.5 : 1);
    ctx.fillStyle = "rgba(99,102,241,.18)";
    ctx.beginPath();
    ctx.arc(ex, ey, rad, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(99,102,241,.45)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

function drawNetwork(ctx, t, w, h) {
  ctx.clearRect(0, 0, w, h);
  const nodes = [];
  const N = 18;
  for (let i = 0; i < N; i++) {
    const ang = (i / N) * Math.PI * 2;
    const r = Math.min(w, h) * 0.35;
    nodes.push({
      x: w / 2 + Math.cos(ang) * r * (0.6 + 0.2 * Math.sin(t / 1500 + i)),
      y: h / 2 + Math.sin(ang) * r * (0.6 + 0.2 * Math.cos(t / 1500 + i)),
    });
  }
  ctx.strokeStyle = "rgba(120,120,120,.35)";
  ctx.lineWidth = 1;
  for (let i = 0; i < N; i++) {
    const a = nodes[i],
      b = nodes[(i + 3) % N];
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }
  ctx.fillStyle = "rgba(16,185,129,.9)";
  const p = (Math.sin(t * 0.002) + 1) / 2;
  const k = Math.floor(p * N);
  for (let i = 0; i < N; i++) {
    const n = nodes[(i + k) % N];
    const r = 2 + 2 * (i === k ? 2 : 1);
    ctx.beginPath();
    ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

