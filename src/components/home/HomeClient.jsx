// src/components/home/HomeClient.jsx
"use client";

import { useEffect, useState } from "react";
import HananPachaBackground from "@/components/effects/HananPachaBackground";

export default function HomeClient() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const Work = [
    {
      title: "Research",
      desc: "Bench assays paired with tidy analysis pipelines and clear figures.",
      href: "/research",
      tag: "Bench → bytes",
    },
    {
      title: "Publications",
      desc: "Preprints and method notes with code, data, and repeatable results.",
      href: "/publications",
      tag: "Open & reproducible",
    },
    {
      title: "Collaborations",
      desc: "Scope, guardrails, and weekly milestones with steady progress.",
      href: "/collaborations",
      tag: "Let’s build",
    },
  ];

  const Marquee = [
    "Calibrated risk",
    "Uncertainty quantification",
    "Selective abstention",
    "Conformal prediction",
    "Decision-curve analysis",
    "Reliability diagrams",
    "External validation",
    "Model & dataset cards",
    "Reproducible analysis",
  ];

  return (
    <>
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <HananPachaBackground className="absolute inset-0 h-full w-full" isDark={isDark} />
    </div>
    <div className="relative z-10 mx-auto max-w-7xl px-4 pt-2 md:pt-4 pb-8 md:pb-10 space-y-10">
      <StyleBlock />

      {/* HERO */}
      <header className="relative overflow-hidden rounded-3xl">
        {/* Readability scrim: a faint dark, blurred panel sitting behind the hero
            text so the copy stays legible when a light cloud from the Hanan Pacha
            sky drifts behind it. Kept subtle; barely visible at night, and just
            enough to hold contrast in the day scene. The backdrop itself is
            untouched. */}
        <div
          className="pointer-events-none absolute inset-0 z-0 rounded-3xl"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(135deg, rgba(18,24,42,0.34), rgba(18,24,42,0.22))",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
          }}
        />
        <div className="relative z-10 p-6 md:p-10">
          <h1
            data-testid="hero-title"
            className="text-balance text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-[#f5f1e6] drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
          >
            Calibrated, abstention-aware clinical machine learning for underserved care
          </h1>
          <p className="mt-4 max-w-3xl text-[#ece7d8] drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]">
            I work at the intersection of clinical machine learning and real-world systems.
            My research asks whether a model can be trusted: calibration, uncertainty, and
            knowing when to abstain and defer to a clinician, especially for underserved and
            low-resource-language populations. I also build the tools themselves, from
            decision-support classifiers to a bilingual clinical platform. My long-term goal
            is trustworthy AI for primary care, and I would rather ship fewer claims with
            stronger evidence than more claims without it.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/research" className="btn-primary">See work</a>
            <a href="/contact" className="btn-ghost">Contact</a>
            <a href="https://huggingface.co/spaces/luisjordanmontenegro/amoebanator-25" target="_blank" rel="noopener noreferrer" className="btn-ghost">Live demo</a>
          </div>

          {/* trust chips / marquee */}
          <div className="mt-8 overflow-hidden rounded-xl border bg-white/60 dark:bg-neutral-950/60">
            <div className="hpm-viewport">
              <div className="hpm-track">
                <div className="hpm-group" aria-hidden="false">
                  {Marquee.map((t, i) => (
                    <span key={i} className="hpm-item text-sm opacity-80">
                      {t} •
                    </span>
                  ))}
                </div>
                <div className="hpm-group" aria-hidden="true">
                  {Marquee.map((t, i) => (
                    <span key={`d-${i}`} className="hpm-item text-sm opacity-80">
                      {t} •
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* IDENTITY RAIL */}
      <section
        aria-label="Find me online"
        className="flex flex-wrap items-center gap-2 text-sm"
      >
        <a
          href="https://orcid.org/0009-0000-7851-7139"
          target="_blank"
          rel="noreferrer"
          className="rounded-md border bg-white/70 dark:bg-neutral-950/55 backdrop-blur-sm font-medium px-3 py-1 underline-offset-4 hover:underline"
        >
          ORCID 0009-0000-7851-7139
        </a>
        <a
          href="https://github.com/ljm234"
          target="_blank"
          rel="noreferrer"
          className="rounded-md border bg-white/70 dark:bg-neutral-950/55 backdrop-blur-sm font-medium px-3 py-1 underline-offset-4 hover:underline"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/jordan-montenegro-calla"
          target="_blank"
          rel="noreferrer"
          className="rounded-md border bg-white/70 dark:bg-neutral-950/55 backdrop-blur-sm font-medium px-3 py-1 underline-offset-4 hover:underline"
        >
          LinkedIn
        </a>
        <a
          href="mailto:jordanmontenegroc.99@gmail.com"
          className="rounded-md border bg-white/70 dark:bg-neutral-950/55 backdrop-blur-sm font-medium px-3 py-1 underline-offset-4 hover:underline"
        >
          jordanmontenegroc.99@gmail.com
        </a>
        <a
          href="/downloads/Jordan-Montenegro-CV.pdf"
          className="rounded-md border bg-white/70 dark:bg-neutral-950/55 backdrop-blur-sm font-medium px-3 py-1 underline-offset-4 hover:underline"
        >
          CV (PDF)
        </a>
      </section>

      {/* SELECTED WORK */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-[#f5f1e6] drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">Selected work</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Work.map((w) => (
            <a key={w.title} href={w.href} className="group relative block rounded-2xl border p-5 card hover:shadow-lg">
              <span className="chip">{w.tag}</span>
              <div className="mt-2 text-lg font-semibold">{w.title}</div>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{w.desc}</p>
              <div className="mt-4 inline-flex items-center text-sm opacity-80 group-hover:opacity-100">
                Open <Arrow />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden rounded-2xl border bg-white/70 dark:bg-neutral-950/55 backdrop-blur-sm p-6 md:p-8">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_20%_0%,rgba(16,185,129,.12),transparent),radial-gradient(80%_60%_at_80%_100%,rgba(56,189,248,.12),transparent)]" />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold">Open to research collaborations and PhD opportunities</h3>
            <p className="max-w-xl text-neutral-700 dark:text-neutral-300">
              Clinical machine learning, uncertainty, and trustworthy AI for underserved care.
              If your work connects, let’s talk.
            </p>
          </div>
          <div className="flex gap-3">
            <a href="/contact" className="btn-primary">Get in touch</a>
            <a href="/collaborations" className="btn-ghost">How I work</a>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

/* ---------------- UI bits ---------------- */

function Arrow() {
  return (
    <svg className="ml-2 h-4 w-4 transition -translate-x-[1px] group-hover:translate-x-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M5 12h14" strokeWidth="2" />
      <path d="M13 6l6 6-6 6" strokeWidth="2" />
    </svg>
  );
}

function StyleBlock() {
  // same CSS as before; rendered in a way that avoids hydration diffing
  const CSS = `
      /* Buttons */
      .btn-primary{
        position:relative; display:inline-flex; align-items:center; gap:.5rem;
        padding:.625rem 1rem; border-radius:.9rem; font-weight:600;
        color:white; background:#111;
      }
      .btn-primary:hover{ background:#000; transform:translateY(-1px); }
      .btn-ghost{
        display:inline-flex; align-items:center; gap:.5rem;
        padding:.625rem 1rem; border-radius:.9rem; font-weight:600;
        border:1px solid rgba(0,0,0,.12);
      }
      .btn-ghost:hover{ background:rgba(0,0,0,.035); transform:translateY(-1px); }
      .dark .btn-ghost{ border-color:rgba(255,255,255,.15) }
      .dark .btn-ghost:hover{ background:rgba(255,255,255,.06) }

      /* Cards (dark mode uses .dark class, not media query) */
      .card{
        transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
        background: rgba(255,255,255,.7);
        backdrop-filter: saturate(1.05) blur(6px);
      }
      .card:hover{ transform: translateY(-3px); }
      .chip{
        display:inline-block; font-size:.7rem; letter-spacing:.02em;
        padding:.35rem .55rem; border-radius:9999px; border:1px solid rgba(0,0,0,.12);
        background:rgba(255,255,255,.75);
      }

      /* Dark-mode overrides driven by html.dark */
      .dark .card{
        background: rgba(18,18,18,.35);
        border-color: rgba(255,255,255,.12);
        backdrop-filter: saturate(1.2) blur(8px);
      }
      .dark .chip{
        border-color:rgba(255,255,255,.12);
        background:rgba(18,18,18,.5);
      }

      /* Home marquee: two identical groups on a flex track; the track slides by
         exactly one group width (-100% of a group = -50% of the track) so the
         loop is seamless with no jump when it restarts. */
      .hpm-viewport{
        overflow:hidden;
        display:flex;
        height:40px;
      }
      .hpm-track{
        display:flex;
        flex:0 0 auto;
        min-width:100%;
        gap:0;
        animation: hpm-slide 26s linear infinite;
        will-change: transform;
      }
      .hpm-group{
        display:flex;
        align-items:center;
        flex:0 0 auto;
        white-space:nowrap;
      }
      .hpm-item{
        margin:0 .75rem;
        white-space:nowrap;
      }
      @keyframes hpm-slide{
        from{ transform:translate3d(0,0,0) }
        to{ transform:translate3d(-50%,0,0) }
      }
      .hpm-track:hover{ animation-play-state: paused }
      @media (prefers-reduced-motion: reduce){
        .hpm-track{ animation: none }
      }
  `;
  return (
    <style
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: CSS }}
    />
  );
}
