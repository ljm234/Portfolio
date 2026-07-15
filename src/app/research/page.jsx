// /src/app/research/page.jsx
"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import HoverLift from "@/components/effects/HoverLift";
import MorayBackground from "@/components/effects/MorayBackground";

const FILTERS = ["All", "ML", "Wet lab", "Clinical"];

const SYSTEMS = [
  {
    name: "Naylamp",
    tagline: "Distributed vector database, written from scratch in Go",
    desc: "Sharded architecture where each shard is a Raft replica group and a router performs scatter-gather across shards. Write-ahead logging with crash-safe recovery, a custom HNSW index, and mutual TLS where peer identity is the certificate rather than a self-declared hello. On SIFT1M against the official ground truth it reaches recall@10 of 0.9942 at 4,394 queries per second across ten threads.",
    links: [],
    accent: "#3a8a86",
  },
  {
    name: "Amoebanator",
    tagline: "Calibrated, abstention-aware PAM-risk triage",
    desc: "A binary triage signal for primary amoebic meningoencephalitis risk. Compact tabular PyTorch model with temperature scaling, split conformal prediction with abstention, dual energy-based and Mahalanobis out-of-distribution detection, and decision curve analysis. Proof of concept; not a diagnostic.",
    links: [
      { label: "Detail", href: "/research/amoebanator" },
      { label: "GitHub", href: "https://github.com/ljm234/amoebanator-25" },
      { label: "Hugging Face", href: "https://huggingface.co/spaces/luisjordanmontenegro/amoebanator-25" },
    ],
    accent: "#7a5a9a",
  },
  {
    name: "Kallpa",
    tagline: "Bilingual primary-care clinical decision-support engine",
    desc: "Turns the primary-care encounter into a structured clinical note and surfaces guideline-informed candidate orders for a clinician to review and sign, with retrieval-augmented generation over a curated knowledge base and an explicit emphasis on calibration, human oversight, and knowing when to defer. Built on React/TypeScript, FastAPI, PostgreSQL, Redis, and Neo4j.",
    links: [
      { label: "kallpahealthcare.com", href: "https://kallpahealthcare.com" },
    ],
    accent: "#b0623a",
  },
];

const PROJECTS = [
  {
    slug: "yachay",
    title: "YACHAY",
    desc: "Calibrated multiclass differential diagnosis of opportunistic meningitis in HIV, with conformal prediction and selective abstention. Cohort curated and frozen from MIMIC-IV; clinical collaboration forming with HIV referral hospitals in Lima.",
    tags: ["ML", "Clinical"],
    status: "Research in progress",
    anim: "conformal",
  },
  {
    slug: "salud",
    title: "SALUD",
    desc: "Do large language models stay calibrated when a clinical case is written in Wanka Quechua instead of Spanish? Expected calibration error, Brier score, risk-coverage curves, and conformal abstention across frontier and low-resource models.",
    tags: ["ML", "Clinical"],
    status: "Research in progress",
    anim: "quechua",
  },
  {
    slug: "montenegro-medium",
    title: "Montenegro-Calla\u2019s Medium",
    desc: "Serum-free, low-cost culture medium for axenic growth of Naegleria fowleri: over 70 percent cheaper than commercial alternatives, with roughly three times the cell yield.",
    tags: ["Wet lab"],
    status: "Under review",
    anim: "medium",
  },
  {
    slug: "organelle-targets",
    title: "ER Stress and Mitochondrial Targeting",
    desc: "Tunicamycin and thapsigargin-induced ER stress and metformin-driven mitochondrial dysfunction in Naegleria fowleri. Western blot (BiP/GRP78) and JC-1 staining. Grant funded.",
    tags: ["Wet lab"],
    status: "In preparation",
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
            Selected research across ML, wet lab, and clinical work, with the systems built alongside it.
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

        <SystemsSection />
      </div>

      </>
  );
}

/* ---------- Stacked list: three equal cards, kept to the left ---------- */

function SystemsSection() {
  return (
    <section className="mt-4" aria-label="Systems and software">
      <h2 className="text-sm font-bold tracking-[0.15em] text-[#b0623a] dark:text-[#d9a441]">
        SYSTEMS & SOFTWARE
      </h2>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        Engineering built alongside the research.
      </p>
      <div className="mt-4 flex flex-col gap-4">
        {SYSTEMS.map((s) => (
          <article
            key={s.name}
            className="rounded-2xl border bg-white/80 p-5 backdrop-blur-sm dark:bg-neutral-950/60"
            style={{ borderTopColor: s.accent, borderTopWidth: 3 }}
          >
            <h3 className="font-semibold tracking-tight">{s.name}</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{s.tagline}</p>
            <p className="mt-2 text-sm leading-snug text-neutral-700 dark:text-neutral-300">
              {s.desc}
            </p>
            {s.links.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {s.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                    className="rounded-md border px-3 py-1 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-900"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

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
          <div className="flex items-center gap-2">
            <span className="line-clamp-1 font-semibold">{proj.title}</span>
            <StatusBadge status={proj.status} />
          </div>
          <p className="mt-1 line-clamp-2 text-sm leading-snug text-neutral-500 dark:text-neutral-400">
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

      </div>
    </HoverLift>
  );
}

/* Small state badge next to each project title.
   Amber for active review, grey for in preparation, teal for a released
   proof of concept, and a neutral slate for research still in progress. */
function StatusBadge({ status }) {
  if (!status) return null;
  const tone =
    status === "Under review"
      ? "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200"
      : status === "In preparation"
      ? "border-neutral-300 bg-neutral-50 text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400"
      : status === "Proof of concept"
      ? "border-teal-300 bg-teal-50 text-teal-800 dark:border-teal-500/30 dark:bg-teal-500/10 dark:text-teal-200"
      : "border-sky-300 bg-sky-50 text-sky-800 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-200";
  return (
    <span
      className={
        "shrink-0 whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide " +
        tone
      }
    >
      {status}
    </span>
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
  const pad = 12;
  const x0 = pad;
  const x1 = w - pad;
  const mid = h / 2;

  // Keep every stroke inside a safe vertical envelope so the band never
  // touches the top or bottom edge of the panel, whatever the panel height.
  const envelope = Math.max(8, h / 2 - pad);
  const maxBand = envelope * 0.62;
  const wobble = envelope * 0.16;

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
      const width = maxBand * (0.4 + 0.6 * Math.abs(Math.sin(p * 3.1 + t * 0.6)));
      const y = mid + k * width + wobble * Math.sin(p * 4 + t * 0.4);
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
    const y = mid + wobble * Math.sin(p * 4 + t * 0.4);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  const pts = [0.14, 0.3, 0.46, 0.62, 0.78, 0.9];
  pts.forEach((p, i) => {
    const x = x0 + p * (x1 - x0);
    const y = mid + wobble * Math.sin(p * 4 + t * 0.4) + (i % 2 === 0 ? -maxBand * 0.5 : maxBand * 0.6);
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

