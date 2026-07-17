import VicunaBackground from "@/components/effects/VicunaBackground";

export const metadata = {
  title: "ER Stress and Mitochondrial Targeting - Research",
  description:
    "Targeting ER stress and mitochondrial pathways in Naegleria fowleri. Manuscript in preparation.",
  alternates: { canonical: "/research/organelle-targets" },
};

export default function OrganelleTargetsPage() {
  return (
    <>
      {/* Backdrop fixed to the viewport, the same pattern the rest of the site
          uses, so the artwork always fills the screen with no white band. */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <VicunaBackground className="absolute inset-0 h-full w-full" />
      </div>

      {/* Content card centered over the backdrop */}
      <div className="relative z-10 flex min-h-[calc(100vh-11rem)] items-center justify-center px-4 py-6">
        <div className="w-full max-w-2xl rounded-2xl bg-white/90 p-6 shadow-xl backdrop-blur-sm dark:bg-neutral-950/85 sm:p-8">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-[#f5f1e6] sm:text-3xl">
            ER Stress and Mitochondrial Targeting
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Naegleria fowleri · ER stress · Wet lab
          </p>
          <p className="mt-4 leading-relaxed text-neutral-700 dark:text-neutral-200">
            <span className="italic">Naegleria fowleri</span> causes a rare but almost
            universally fatal infection, and the search for vulnerabilities in the amoeba
            remains urgent. This study examines endoplasmic reticulum stress and mitochondrial
            function as potential pressure points, using tunicamycin and thapsigargin to induce
            ER stress and metformin to perturb mitochondrial activity, with readouts by Western
            blot and JC-1 staining. The work is grant funded and the manuscript is in
            preparation.
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
