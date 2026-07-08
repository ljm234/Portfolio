import Reveal from "@/components/effects/Reveal";

export const metadata = {
  title: "Kallpa",
  description:
    "Bilingual Spanish/English primary care decision support, in active development. V1.0 targeted for October 2026.",
  alternates: { canonical: "/kallpa" },
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
          Kallpa is a bilingual Spanish/English clinical decision support engine
          for primary care, in active development. It is built for clinicians in
          bilingual settings and aimed at underserved populations in Latin
          America, starting with Peru.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">Stack</h2>
        <ul className="list-disc space-y-1 pl-5 text-neutral-700 dark:text-neutral-300">
          <li>TypeScript across the front end and the backend, with Vitest for unit tests.</li>
          <li>Multi-tenant architecture using Auth.js for authentication.</li>
          <li>LLM-based clinical reasoning engine.</li>
          <li>Bilingual content layer with English and Spanish parity at the symptom, condition, and patient-instructions level.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">Status</h2>
        <p className="text-neutral-700 dark:text-neutral-300">
          In active development at{" "}
          <a
            className="underline"
            href="https://kallpahealthcare.com"
            target="_blank"
            rel="noreferrer"
          >
            kallpahealthcare.com
          </a>
          , with V1.0 targeted for October 2026.
        </p>
      </section>
    </div>
  );
}
