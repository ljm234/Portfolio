export const projects = [
  {
    slug: "amoebanator",
    title: "Amoebanator: Calibrated Triage for Severe CNS Infections",
    tags: ["Clinical ML", "Conformal", "OOD"],
    summary:
      "Nine-class differential diagnosis with calibrated abstention for primary amoebic meningoencephalitis.",
    sections: {
      abstract:
        "Amoebanator is a 9-class differential diagnosis system for severe central nervous system infections, with primary amoebic meningoencephalitis (PAM) caused by Naegleria fowleri as the highest-stakes target class. The system pairs a calibrated probability over the 9 conditions with explicit abstention when the input falls outside the validated population.",
      methods:
        "PyTorch implementation built on the RigoBERTa Clinical encoder. A 5-model deep ensemble produces the predictive distribution. Out-of-distribution detection is dual-gated, combining Mahalanobis distance in feature space with a logit-energy criterion. Abstention is governed by Mondrian per-class conformal prediction so coverage is controlled within each diagnostic class instead of pooled across the 9.",
      results:
        "Results will be reported in the medRxiv preprint targeted for May 28, 2026. The current development build evaluates calibration, ensemble disagreement, and OOD detection on held-out splits.",
      limits:
        "PAM is rare. The ensemble is trained on a limited number of confirmed cases and a substantially larger set of differential diagnoses, which means OOD performance under true deployment shift is the primary unknown. External prospective validation is the next milestone.",
      ethics:
        "Decision support, not autonomous diagnosis. The abstention gate is the safety control. The model is intended to flag suspected PAM early enough that confirmatory CSF testing can be ordered, not to replace it."
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
