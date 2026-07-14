// /src/app/publications/page.jsx
"use client";

import { useEffect, useState } from "react";
import HoverLift from "@/components/effects/HoverLift";
import MachuPicchuBackground from "@/components/effects/MachuPicchuBackground";
import pubs from "./pubs.json";

/* Research pages that back a publication */
const DATA_ROUTES = {
  "montenegro-medium-jem": "/research/montenegro-medium",
};

const PRESENTATIONS = [
  {
    id: "ncur-2026",
    venue: "National Conference on Undergraduate Research (NCUR)",
    year: 2026,
    kind: "Oral presentation",
    note: "Full travel funding awarded",
    accent: "#b6472e",
  },
  {
    id: "ucur-2026",
    venue: "Utah Conference on Undergraduate Research (UCUR)",
    year: 2026,
    kind: "Oral presentation",
    accent: "#d9a441",
  },
  {
    id: "ucur-2024",
    venue: "Utah Conference on Undergraduate Research (UCUR)",
    year: 2024,
    kind: "Poster presentation",
    accent: "#7a5a9a",
  },
];

const SOFTWARE = [
  {
    id: "amoebanator",
    name: "Amoebanator",
    summary: "Binary triage signal for primary amoebic meningoencephalitis (PAM) risk.",
    detail:
      "Compact tabular PyTorch MLP (914 parameters) with temperature scaling, split conformal prediction with abstention, dual energy-based and Mahalanobis out-of-distribution detection, and decision curve analysis. Proof-of-concept trained on 30 simulated rows; not a diagnostic, research and educational use only.",
    links: [
      { label: "Live demo", href: "https://huggingface.co/spaces/luisjordanmontenegro/amoebanator-25" },
      { label: "Source", href: "https://github.com/ljm234/amoebanator-25" },
    ],
    accent: "#8a94c9",
  },
];

export default function PublicationsPage() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <MachuPicchuBackground className="absolute inset-0 h-full w-full" isDark={isDark} />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-2 pb-16 md:pt-3 space-y-8">
        {/* HERO: same typography as the About template */}
        <section className="pt-4 md:pt-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-[#f5f1e6] dark:drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
            Publications
          </h1>
          <p className="mt-2 max-w-2xl italic text-neutral-800 dark:text-[#ece7d8] dark:drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]">
            A manuscript under review, conference talks, and released software.
          </p>
        </section>

        <div className="space-y-6">
        {/* MANUSCRIPTS */}
        <section className="rounded-2xl border bg-white/80 dark:bg-neutral-950/60 backdrop-blur-sm p-6">
          <h2 className="text-sm font-bold tracking-[0.15em] text-[#b0623a] dark:text-[#d9a441]">
            MANUSCRIPTS
          </h2>

          <div className="mt-4 space-y-4">
            {pubs.map((p) => (
              <HoverLift key={p.id}>
                <PubCard p={p} />
              </HoverLift>
            ))}
          </div>

          <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
            Two additional manuscripts are in preparation.
          </p>
        </section>

        {/* CONFERENCE PRESENTATIONS */}
        <section className="rounded-2xl border bg-white/80 dark:bg-neutral-950/60 backdrop-blur-sm p-6">
          <h2 className="text-sm font-bold tracking-[0.15em] text-[#b0623a] dark:text-[#d9a441]">
            CONFERENCE PRESENTATIONS
          </h2>

          <div className="mt-4 space-y-3">
            {PRESENTATIONS.map((t) => (
              <article
                key={t.id}
                className="flex items-start gap-3 rounded-xl border bg-white/60 dark:bg-neutral-900/50 p-4"
              >
                <span
                  className="mt-1 h-8 w-1 shrink-0 rounded-full"
                  style={{ backgroundColor: t.accent }}
                  aria-hidden="true"
                />
                <div className="min-w-0 grow">
                  <div className="font-semibold leading-snug break-words">{t.venue}</div>
                  <div className="mt-0.5 text-sm text-neutral-600 dark:text-neutral-400 break-words">
                    {t.kind}
                    {t.note ? ` - ${t.note}` : ""}
                  </div>
                </div>
                <span className="shrink-0 rounded-md border px-2 py-1 text-xs">{t.year}</span>
              </article>
            ))}
          </div>
        </section>

        {/* SOFTWARE AND DATA */}
        <section className="rounded-2xl border bg-white/80 dark:bg-neutral-950/60 backdrop-blur-sm p-6">
          <h2 className="text-sm font-bold tracking-[0.15em] text-[#b0623a] dark:text-[#d9a441]">
            SOFTWARE AND DATA
          </h2>

          <div className="mt-4 space-y-3">
            {SOFTWARE.map((s) => (
              <article
                key={s.id}
                className="overflow-hidden rounded-xl border bg-white/60 dark:bg-neutral-900/50"
              >
                <div className="h-1 w-full" style={{ backgroundColor: s.accent }} aria-hidden="true" />
                <div className="min-w-0 p-4">
                  <div className="font-semibold leading-snug break-words">{s.name}</div>
                  <div className="mt-0.5 text-sm text-neutral-600 dark:text-neutral-400">{s.summary}</div>
                  <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {s.detail}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {s.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded border px-2 py-0.5 text-[11px] hover:bg-neutral-50 dark:hover:bg-neutral-900"
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        </div>
      </div>
    </>
  );
}

/* ─── Components ───────────────────────── */

function PubCard({ p }) {
  const [open, setOpen] = useState(false);
  const researchHref = DATA_ROUTES[p.id] || null;

  return (
    <article className="rounded-xl border bg-white/60 dark:bg-neutral-900/50 p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
        <div className="self-start shrink-0 rounded-md border px-2 py-1 text-xs">
          {p.venue} • {p.year}
        </div>
        <div className="min-w-0 grow">
          <div className="font-semibold leading-snug break-words">{p.title}</div>
          <div className="mt-0.5 text-xs text-neutral-500 break-words">{p.authors?.join(", ")}</div>
        </div>
      </div>

      {p.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="rounded-full border px-2 py-0.5 text-[11px]">
              {t}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {researchHref && (
          <a
            href={researchHref}
            className="rounded border px-2 py-0.5 text-[11px] hover:bg-neutral-50 dark:hover:bg-neutral-900"
          >
            Research page
          </a>
        )}
        {p.links?.doi && (
          <a
            href={p.links.doi}
            target="_blank"
            rel="noreferrer"
            className="rounded border px-2 py-0.5 text-[11px] hover:bg-neutral-50 dark:hover:bg-neutral-900"
          >
            DOI
          </a>
        )}
        {p.links?.status && !p.links?.doi && (
          <span className="rounded border border-amber-300 bg-amber-50 px-2 py-0.5 text-[11px] text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
            {p.links.status}
          </span>
        )}

        <span className="ml-auto" />
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-md border px-2 py-1 text-xs hover:bg-neutral-50 dark:hover:bg-neutral-900"
        >
          {open ? "Hide" : "Quick Read"}
        </button>
      </div>

      <div
        className={
          "grid transition-all duration-300 ease-out " +
          (open ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")
        }
      >
        <div className="overflow-hidden">
          <div className="rounded-md border bg-white/70 dark:bg-neutral-950/50 p-3 text-sm">
            <div className="text-xs font-medium text-neutral-500">Abstract</div>
            <p className="mt-1">{p.abstract}</p>

            {p.contributions?.length ? (
              <>
                <div className="mt-3 text-xs font-medium text-neutral-500">Key contributions</div>
                <ul className="mt-1 list-disc pl-5">
                  {p.contributions.map((c, i) => (
                    <li key={i} className="mt-1">
                      {c}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
