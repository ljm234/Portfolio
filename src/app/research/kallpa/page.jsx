import Reveal from "@/components/effects/Reveal";

export const metadata = {
  title: "Kallpa — Research",
  description:
    "Bilingual Spanish/English primary care decision support for Latin America. V1.0 ship target October 2026.",
  alternates: { canonical: "/research/kallpa" },
};

export default function KallpaPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <Reveal effect="fade-up">
          <h1 className="text-4xl font-bold tracking-tight">Kallpa</h1>
        </Reveal>
        <p className="text-neutral-700 dark:text-neutral-300">
          Bilingual Spanish/English primary care decision support for Latin America.
        </p>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full border px-2 py-0.5">In active development</span>
          <span className="rounded-full border px-2 py-0.5">V1.0 target October 2026</span>
          <a
            href="https://kallpahealthcare.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border px-2 py-0.5 underline-offset-4 hover:underline"
          >
            kallpahealthcare.com
          </a>
        </div>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">What it is</h2>
        <p className="text-neutral-700 dark:text-neutral-300">
          Kallpa is a production-deployed clinical decision support engine scoped to
          200 conditions for V1.0. The system is built for primary care clinicians in
          bilingual Spanish/English settings and is targeted at underserved populations
          in Latin America, starting with Peru.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">Stack</h2>
        <ul className="list-disc space-y-1 pl-5 text-neutral-700 dark:text-neutral-300">
          <li>TypeScript across the front end and the backend, with Vitest for unit tests.</li>
          <li>Multi-tenant architecture using Auth.js for authentication.</li>
          <li>GPT engine for clinical reasoning across the 200-condition scope.</li>
          <li>Bilingual content layer with English and Spanish parity at the symptom, condition, and patient-instructions level.</li>
        </ul>
        {/* TODO: expand with deployment stack, data sources, evaluation, and clinical guardrails when scope is locked. */}
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">Status</h2>
        <p className="text-neutral-700 dark:text-neutral-300">
          The platform is production-deployed at{" "}
          <a
            className="underline"
            href="https://kallpahealthcare.com"
            target="_blank"
            rel="noreferrer"
          >
            kallpahealthcare.com
          </a>
          . V1.0 covers 200 conditions and is on track to ship in October 2026.
        </p>
      </section>
    </div>
  );
}
