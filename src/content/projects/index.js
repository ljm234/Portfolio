export const projects = [
  {
    slug: "yachay",
    title: "YACHAY: Calibrated Multiclass Differential Diagnosis of Opportunistic Meningitis in HIV",
    tags: ["Clinical ML", "Conformal", "Abstention"],
    summary:
      "Multiclass model that predicts the etiologic agent of meningitis in HIV patients and decides when to defer to a specialist. Protocol stage; cohort frozen, model not yet trained.",
    sections: {
      abstract:
        "Meningitis in HIV patients has several etiologies that look alike at presentation, and the published systems are binary, single-center, without abstention, and answer every case. YACHAY builds a multiclass model that predicts the etiologic agent (tuberculous and cryptococcal, with syphilis and Listeria routed to abstention) and, crucially, decides when a case should be deferred to a specialist. The purpose is formative: helping clinicians outside referral centers recognize when a case exceeds what they can safely resolve locally, in a country where diagnosis is concentrated in the capital and incidence has never been formally characterized.",
      methods:
        "Supervised classification over laboratory values (cerebrospinal fluid and blood) and early clinical text. Split and Mondrian conformal prediction for guaranteed coverage. Selective abstention for rare classes and low-signal cases. SHAP explainability as a teaching component rather than a post-hoc justification.",
      results:
        "No results yet. The project is at protocol stage: the cohort is curated and frozen, etiologic labeling is complete and audited, and the model has not been trained. Methodological arm: a CNS-infection cohort curated from MIMIC-IV v3.1 (1,483 patients, 1,766 admissions; Hasbun 2017 phenotype with a CMS GEMs crosswalk; cerebrospinal fluid chemistry labels: 231 neutrophilic, 379 lymphocytic, 47 indeterminate), frozen under a signed commit. Clinical arm: a prospective multicenter network forming with HIV referral hospitals in Lima, with provincial hospitals planned.",
      limits:
        "The retrospective cohort is North American and single-source, so any model trained on it carries a distribution shift into Peruvian practice that the prospective arm is meant to measure rather than assume. Rare etiologies are rare by construction, which is precisely why they are routed to abstention instead of forced into a prediction. Clinician recruitment is underway and no prospective case has been collected yet.",
      ethics:
        "Retrospective data are de-identified and used under a credentialed PhysioNet agreement. The prospective arm will proceed under institutional approval at each participating site. The system is designed to defer rather than to replace: it is a teaching and triage aid, not a diagnostic device."
    }
  },
  {
    slug: "salud",
    title: "SALUD: Spanish-and-Quechua Assessment of LLM Uncertainty and Deferral",
    tags: ["Clinical ML", "Calibration", "Multilingual"],
    summary:
      "Do large language models stay calibrated when a clinical case is written in Wanka Quechua instead of Spanish? Data collection in progress; target preprint 15 November 2026.",
    sections: {
      abstract:
        "No frontier model documents official Quechua support, and no clinical benchmark exists for the language. SALUD asks whether large language models remain calibrated when a clinical case is presented in Wanka Quechua rather than in Spanish. The danger is not the error itself, but the error delivered with high stated confidence to a clinician who has no way to audit it.",
      methods:
        "Calibration is measured with expected calibration error, Brier score, and reliability diagrams. Selective abstention is measured with risk-coverage curves, the area under the risk-coverage curve, and conformal prediction. Frontier models (GPT, Gemini, Claude) are evaluated alongside open and low-resource-language models, including models trained on Quechua.",
      results:
        "No results yet. Data collection is in progress and the target preprint date is 15 November 2026. An informal exploratory probe suggested divergence between models and overconfidence on Quechua translations, but it has not been validated by a native speaker and is not presented as a result.",
      limits:
        "Wanka is one of several Quechua varieties, and findings will not transfer uncritically to the others. Cases are recorded in Spanish and translated, so translation quality is itself a variable in the design rather than a solved preprocessing step. The target of 200 to 250 cases bounds how finely calibration can be estimated per condition.",
      ethics:
        "Clinical records are real, retrospective, and de-identified, drawn from a rural Andean health facility in Peru and translated into Wanka Quechua by a language specialist. The team is interdisciplinary by design, including medical students, a Wanka Quechua PhD specialist, and a physician, so that the language is represented by the people who speak it rather than approximated from the outside."
    }
  },
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
    title: "Montenegro-Calla’s Medium",
    tags: ["Wet Lab", "Optimization"],
    summary: "Low-cost medium achieving 3 to 5 times the growth of standard formulations.",
    sections: {
      abstract:
        "We developed a serum-free, low-cost axenic medium (Montenegro-Calla’s Medium, MM) that supports robust Naegleria fowleri growth at a fraction of the per-liter cost of standard formulations.",
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
