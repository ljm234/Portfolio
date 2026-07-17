"use client";

import { useEffect, useState } from "react";
import TumiBackground from "@/components/effects/TumiBackground";
import CantutaBackground from "@/components/effects/CantutaBackground";
import CalibrationChart from "@/components/charts/CalibrationChart";
import calib from "@/content/data/calibration.json";
import DecisionCurve from "@/components/charts/DecisionCurve";
import dca from "@/content/data/decision_curve.json";
import PRCurve from "@/components/charts/PRCurve";
import PR from "@/content/data/pr.json";

// The two PhD projects get a single-box, backdropped, scaled-down layout.
const FEATURED = {
  yachay: { Background: TumiBackground },
  salud: { Background: CantutaBackground },
};

export default function ResearchDetail({ proj }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const featured = FEATURED[proj.slug];

  // ---- Featured layout: one box, Peruvian backdrop, 80% scale ----
  if (featured && proj.brief) {
    const { Background } = featured;
    return (
      <>
        {/* Backdrop fixed to the viewport, the same pattern the rest of the
            site uses (Collaborations, Publications), so the artwork always
            fills the whole screen with no white band. */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <Background className="absolute inset-0 h-full w-full" isDark={isDark} />
        </div>

        {/* Content card centered over the backdrop */}
        <div className="relative z-10 flex min-h-[calc(100vh-11rem)] items-center justify-center px-4 py-6">
          <div className="w-full max-w-2xl rounded-2xl bg-white/90 p-6 shadow-xl backdrop-blur-sm dark:bg-neutral-950/85 sm:p-8">
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-[#f5f1e6] sm:text-3xl">
              {proj.title}
            </h1>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              {proj.tags.join(" • ")}
            </p>
            <p className="mt-4 leading-relaxed text-neutral-700 dark:text-neutral-200">
              {proj.brief}
            </p>
            <p className="mt-5 text-sm text-neutral-500 dark:text-neutral-400">
              For methods, data, and current status, see my{" "}
              <a href="/downloads/Jordan-Montenegro-CV.pdf" className="underline" target="_blank" rel="noreferrer">CV</a> or{" "}
              <a href="mailto:jordanmontenegroc.99@gmail.com" className="underline">get in touch</a>.
            </p>
          </div>
        </div>
      </>
    );
  }

  // ---- Default layout: full sections (+ charts for amoebanator) ----
  const S = proj.sections;
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1 className="mb-2">{proj.title}</h1>
      <p className="-mt-3 text-sm text-neutral-500">{proj.tags.join(" • ")}</p>

      <h2>Abstract</h2>
      <p>{S.abstract}</p>

      <h2>Methods</h2>
      <p>{S.methods}</p>

      {proj.slug === "amoebanator" && (
        <>
          <h2>Calibration</h2>
          <div className="not-prose">
            <CalibrationChart data={calib} />
          </div>

          <h2>Precision-Recall</h2>
          <div className="not-prose">
            <PRCurve data={PR} />
          </div>

          <h2>Decision Curve (Net Benefit)</h2>
          <div className="not-prose">
            <DecisionCurve data={dca} />
          </div>
        </>
      )}

      <h2>Results</h2>
      <p>{S.results}</p>

      <h2>Limitations</h2>
      <p>{S.limits}</p>

      <h2>Ethics</h2>
      <p>{S.ethics}</p>

      <hr />
      <p className="text-sm text-neutral-500">Demo content for review. No clinical use.</p>
    </article>
  );
}
