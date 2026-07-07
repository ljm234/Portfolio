// /src/app/collaborations/page.jsx
import AndesParallax from "@/components/effects/AndesParallax";

export const metadata = {
  title: "Collaborations — Jordan Montenegro",
  description:
    "Where I am focused this year. Amoebanator, Kallpa, and the kind of conversations I am looking for.",
  alternates: { canonical: "/collaborations" },
};

export default function CollaborationsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-4 space-y-10">
      {/* HERO with the condor / mountains / sun animation behind the title */}
      <header className="relative isolate overflow-hidden rounded-3xl border min-h-[420px]">
        <AndesParallax className="absolute inset-0 z-0 block h-full w-full" />

        {/* Readability scrim. Light at the top of the sky in light mode,
            darker dim in dark mode. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-white/55 via-white/15 to-transparent dark:from-neutral-950/65 dark:via-neutral-950/25"
        />

        <div className="relative z-[2] px-6 py-20 md:px-10 md:py-24">
          <h1 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            Where I’m focused this year
          </h1>
          <p className="mt-4 max-w-3xl text-neutral-800 dark:text-neutral-100 leading-relaxed">
            I’m building two systems and applying to PhD programs in computer
            science, biomedical informatics, and computational biology. If any
            of the work below overlaps with what you’re doing, I’d be glad to
            talk.
          </p>
        </div>
      </header>

      {/* Section A — Amoebanator */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight">
          Amoebanator — clinical ML safety
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
          A 9-class differential diagnosis system for severe central nervous
          system infections, with primary amoebic meningoencephalitis as the
          highest-stakes target class. PyTorch on RigoBERTa Clinical, 5-model
          deep ensemble, dual-gate out-of-distribution detection (Mahalanobis
          plus logit-energy), Mondrian per-class conformal prediction, and a
          hardcoded safety rule for freshwater exposure. medRxiv preprint
          targeted for May 28, 2026.
        </p>
      </section>

      {/* Section B — Kallpa */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight">
          Kallpa — bilingual primary care decision support
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
          A bilingual Spanish/English clinical decision support engine for
          primary care, deployed at{" "}
          <a
            className="underline"
            href="https://kallpahealthcare.com"
            target="_blank"
            rel="noreferrer"
          >
            kallpahealthcare.com
          </a>
          . V1.0 is scoped to 200 conditions with a target ship of October
          2026. The longer-term roadmap covers Peru, Latin America, Europe,
          and the United States.
        </p>
      </section>

      {/* Section C — What I am looking for */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight">
          What I’m looking for
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <li>
            Co-authors and adjudicators on Amoebanator: clinicians with severe
            CNS infection experience, in Spanish or English.
          </li>
          <li>
            Pilot sites for Kallpa: primary care clinics in Peru, with priority
            on bilingual or rural settings.
          </li>
          <li>
            Conversations with PIs in computer science, biomedical informatics,
            clinical ML safety, conformal prediction, multilingual clinical
            NLP, or bilingual healthcare AI for underserved populations.
          </li>
        </ul>
      </section>

      {/* Email CTA */}
      <p className="text-neutral-700 dark:text-neutral-300">
        Reach me at{" "}
        <a className="underline" href="mailto:jordanmontenegroc.99@gmail.com">
          jordanmontenegroc.99@gmail.com
        </a>
        .
      </p>
    </div>
  );
}
