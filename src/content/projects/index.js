export const projects = [
  {
    slug: "amoebanator",
    title: "Amoebanator: Calibrated Abstention-Aware Triage for PAM Risk",
    tags: ["Clinical ML", "Conformal", "OOD"],
    summary:
      "Binary PAM-risk triage (Naegleria fowleri) with calibrated abstention. Compact tabular MLP with conformal prediction and dual OOD detection. Proof-of-concept on simulated data.",
    sections: {
      abstract:
        "Amoebanator is a binary triage signal for primary amoebic meningoencephalitis (PAM) risk, the rare and near-uniformly fatal CNS infection caused by Naegleria fowleri. It pairs a compact tabular multilayer perceptron (914 parameters) with calibration and conformal abstention, declining to predict when a valid coverage guarantee cannot be made on the input.",
      methods:
        "PyTorch tabular MLP with temperature scaling for calibration. Out-of-distribution detection is dual-gated, combining Mahalanobis distance with logit-energy and neg-energy criteria. Abstention is governed by split conformal prediction, and threshold selection uses decision curve analysis at clinically realistic prevalences.",
      results:
        "Proof-of-concept trained on 30 simulated rows with an 80/20 split. Headline metrics on the n=6 validation split are not clinically meaningful and are reported only for methodological completeness; the value of the project is the calibrated abstention machinery, not accuracy claims.",
      limits:
        "Every training row is simulated (source=simulated, physician=demo); none came from a clinical record. The calibration and OOD gates share a small validation set, so coverage should be read as empirical on a tiny held-out set, not a population-level guarantee. Not a diagnostic; it must not be used to rule PAM in or out of any real clinical workflow.",
      ethics:
        "Research and educational use only. Not a cleared medical device and not a substitute for clinical judgment. Any deployment would require prospective evaluation, site-level threshold tuning, and human oversight."
    },
    links: {
      github: "https://github.com/ljm234/amoebanator-25",
      huggingface: "https://huggingface.co/spaces/luisjordanmontenegro/amoebanator-25"
    }
  },
  {
    slug: "montenegro-medium",
    title: "Montenegro’s Medium",
    tags: ["Wet Lab", "Optimization"],
    summary: "Low-cost medium achieving 3 to 5 times the growth of standard formulations.",
    sections: {
      abstract:
        "We developed a serum-free, low-cost axenic medium (Montenegro’s Medium, MM) that supports robust Naegleria fowleri growth at a fraction of the per-liter cost of standard formulations.",
      methods:
        "Comparative growth assays across 0 to 168 h with matched seeding density, daily counts under hemocytometer, fixed passage cadence (TD3 to TD5), and a sterile single-tube workflow with documented sourcing for each component.",
      results:
        "MM produced a 3 to 5 times increase in trophozoite yield versus the baseline reference medium across the 48 h, 72 h, and 168 h timepoints, with stable morphology and reproducible passage timing across replicates.",
      limits:
        "Effective shelf-life is approximately two weeks for best growth; performance degrades on older batches and was not characterized beyond the 168 h window.",
      ethics:
        "Open, low-cost protocol with no antibiotics; biosafety guidelines were followed for all N. fowleri handling."
    }
  }
];
