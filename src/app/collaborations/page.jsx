// /src/app/collaborations/page.jsx
"use client";

import { useEffect, useState } from "react";
import QeswachakaBackground from "@/components/effects/QeswachakaBackground";

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
            Where I&apos;m focused this year.
          </p>
        </section>

        {/* Intro */}
        <section className="rounded-2xl border bg-white/80 dark:bg-neutral-950/60 backdrop-blur-sm p-6">
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            I&apos;m building two systems and applying to PhD programs in computer science,
            biomedical informatics, and computational biology. If any of the work below
            overlaps with what you&apos;re doing, I&apos;d be glad to talk.
          </p>
        </section>

        {/* The two systems, side by side */}
        <section className="grid gap-6 md:grid-cols-2" aria-label="Systems in development">
          <article className="overflow-hidden rounded-2xl border bg-white/80 dark:bg-neutral-950/60 backdrop-blur-sm">
            <div className="h-1 w-full bg-[#8a94c9]" aria-hidden="true" />
            <div className="p-6">
              <h2 className="text-xl font-semibold tracking-tight">Amoebanator</h2>
              <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">
                Clinical ML safety
              </p>
              <p className="mt-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                A binary triage signal for primary amoebic meningoencephalitis (PAM) risk, the
                rare and near-uniformly fatal CNS infection caused by Naegleria fowleri. A
                compact tabular PyTorch MLP (914 parameters) with temperature scaling, split
                conformal prediction with abstention, dual energy-based and Mahalanobis OOD
                detection, and decision curve analysis. Proof-of-concept trained on 30
                simulated rows; not a diagnostic, research and educational use only.
              </p>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl border bg-white/80 dark:bg-neutral-950/60 backdrop-blur-sm">
            <div className="h-1 w-full bg-[#3a8a86]" aria-hidden="true" />
            <div className="p-6">
              <h2 className="text-xl font-semibold tracking-tight">Kallpa</h2>
              <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">
                Bilingual primary care decision support
              </p>
              <p className="mt-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                A bilingual Spanish/English clinical decision support engine for primary care,
                in active development at{" "}
                <a
                  className="underline"
                  href="https://kallpahealthcare.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  kallpahealthcare.com
                </a>
                , with V1.0 targeted for October 2026. Aimed at underserved populations in
                Latin America, starting with Peru.
              </p>
            </div>
          </article>
        </section>

        {/* What I am looking for, full width */}
        <section className="rounded-2xl border bg-white/80 dark:bg-neutral-950/60 backdrop-blur-sm p-6">
          <h2 className="text-sm font-bold tracking-[0.15em] text-[#b0623a] dark:text-[#d9a441]">
            WHAT I&apos;M LOOKING FOR
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <li>
              Collaborators interested in calibrated, abstention-aware clinical ML and
              uncertainty quantification.
            </li>
            <li>
              Pilot sites for Kallpa: primary care clinics in Peru, with priority on bilingual
              or rural settings.
            </li>
            <li>
              Conversations with PIs in computer science, biomedical informatics, clinical ML
              safety, conformal prediction, multilingual clinical NLP, or bilingual healthcare
              AI for underserved populations.
            </li>
          </ul>
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
