// /src/app/collaborations/page.jsx
"use client";

import { useEffect, useState } from "react";
import QeswachakaBackground from "@/components/effects/QeswachakaBackground";

const OPPORTUNITIES = [
  {
    title: "YACHAY",
    tagline: "Calibrated differential diagnosis of opportunistic meningitis in HIV",
    accent: "#3a8a86",
    blurb:
      "A multiclass model that predicts the etiologic agent of meningitis in patients with HIV and decides when a case should be deferred to a specialist, with conformal prediction and selective abstention. The clinical arm is forming now, and I am looking to expand it.",
    seeking: [
      "Clinical sites in provincial Peru, especially non-research hospitals, to validate the tool where diagnostic expertise is scarce.",
      "Physicians in infectious disease or neurology working with meningitis in people living with HIV.",
      "PIs in clinical machine learning, conformal prediction, or selective abstention under distribution shift.",
    ],
  },
  {
    title: "SALUD",
    tagline: "Do large language models stay calibrated in Wanka Quechua?",
    accent: "#7a5a9a",
    blurb:
      "The first study of whether large language models remain calibrated when a clinical case is written in Wanka Quechua rather than in Spanish, measuring calibration and selective abstention across frontier and low-resource models. Data collection is underway, and the work depends on native expertise.",
    seeking: [
      "Native Wanka Quechua speakers to validate translations and annotations.",
      "Rural Andean health facilities with de-identified clinical records.",
      "Linguists and PIs in multilingual clinical NLP or low-resource-language modeling.",
    ],
  },
];

export default function CollaborationsPage() {
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
        <QeswachakaBackground className="absolute inset-0 h-full w-full" isDark={isDark} />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-2 pb-16 md:pt-3 space-y-8">
        {/* HERO: same typography as the About template */}
        <section className="pt-4 md:pt-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-[#f5f1e6] dark:drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
            Collaborations
          </h1>
          <p className="mt-2 max-w-2xl italic text-neutral-800 dark:text-[#ece7d8] dark:drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]">
            Where I&apos;m looking for collaborators.
          </p>
        </section>

        {/* Intro */}
        <section className="rounded-2xl border bg-white/80 dark:bg-neutral-950/60 backdrop-blur-sm p-6">
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            I&apos;m applying to PhD programs, and the two research projects below are actively
            looking for collaborators. My work centers on calibrated, abstention-aware clinical
            machine learning for underserved and multilingual populations.
          </p>
        </section>

        {/* The two research projects seeking collaboration */}
        <section className="grid gap-6 md:grid-cols-2" aria-label="Projects seeking collaboration">
          {OPPORTUNITIES.map((o) => (
            <article
              key={o.title}
              className="overflow-hidden rounded-2xl border bg-white/80 dark:bg-neutral-950/60 backdrop-blur-sm"
            >
              <div className="h-1 w-full" style={{ backgroundColor: o.accent }} aria-hidden="true" />
              <div className="p-6">
                <h2 className="text-xl font-semibold tracking-tight">{o.title}</h2>
                <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">
                  {o.tagline}
                </p>
                <p className="mt-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {o.blurb}
                </p>
                <h3 className="mt-5 text-xs font-bold uppercase tracking-[0.15em] text-[#b0623a] dark:text-[#d9a441]">
                  What I&apos;m looking for
                </h3>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {o.seeking.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </section>

        {/* Contact */}
        <section className="rounded-2xl border bg-white/80 dark:bg-neutral-950/60 backdrop-blur-sm p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-neutral-700 dark:text-neutral-300">
              If this overlaps with your work, write to me.
            </p>
            <a
              href="mailto:jordanmontenegroc.99@gmail.com"
              className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
            >
              jordanmontenegroc.99@gmail.com
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
