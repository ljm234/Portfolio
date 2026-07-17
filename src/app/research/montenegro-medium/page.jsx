import OsoBackground from "@/components/effects/OsoBackground";

export const metadata = {
  title: "Montenegro-Calla’s Medium (MM) - Research",
  description:
    "A serum-free, low-cost culture medium for the axenic growth of Naegleria fowleri. Manuscript under review.",
  alternates: { canonical: "/research/montenegro-medium" },
};

export default function Page() {
  return (
    <>
      {/* Backdrop fixed to the viewport, the same pattern the rest of the site
          uses, so the artwork always fills the screen with no white band. */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <OsoBackground className="absolute inset-0 h-full w-full" />
      </div>

      {/* Content card centered over the backdrop */}
      <div className="relative z-10 flex min-h-[calc(100vh-11rem)] items-center justify-center px-4 py-6">
        <div className="w-full max-w-2xl rounded-2xl bg-white/90 p-6 shadow-xl backdrop-blur-sm dark:bg-neutral-950/85 sm:p-8">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-[#f5f1e6] sm:text-3xl">
            Montenegro-Calla’s Medium
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Naegleria fowleri · Culture media · Wet lab
          </p>
          <p className="mt-4 leading-relaxed text-neutral-700 dark:text-neutral-200">
            Culturing <span className="italic">Naegleria fowleri</span> for research usually
            depends on commercial media that are costly and not always within reach of
            laboratories in low-resource settings. This work introduces a serum-free, low-cost
            culture medium formulated for the axenic growth of the amoeba, designed as a more
            accessible and reproducible alternative for the institutions that need it most. The
            full formulation, growth characterization, and comparisons are reported in the
            manuscript, currently under review at the Journal of Eukaryotic Microbiology.
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
