import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import CalibrationChart from "@/components/charts/CalibrationChart";
import calib from "@/content/data/calibration.json";
import DecisionCurve from "@/components/charts/DecisionCurve";
import dca from "@/content/data/decision_curve.json";
import PRCurve from "@/components/charts/PRCurve";
import PR from "@/content/data/pr.json";

export async function generateMetadata({ params }) {
  const proj = projects.find((p) => p.slug === params.slug);
  return {
    title: proj ? `${proj.title} - Research` : "Research",
    description: proj?.summary,
    alternates: { canonical: `/research/${params.slug}` },
  };
}

export default function ProjectPage({ params }) {
  const proj = projects.find((p) => p.slug === params.slug);
  if (!proj) return notFound();

  const S = proj.sections;

  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1 className="mb-2">{proj.title}</h1>
      <p className="text-sm -mt-3 text-neutral-500">{proj.tags.join(" • ")}</p>

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

      {proj.links && (
        <>
          <h2>Links</h2>
          <ul>
            {proj.links.github && (
              <li>
                <a href={proj.links.github} target="_blank" rel="noopener noreferrer">
                  Source code on GitHub
                </a>
              </li>
            )}
            {proj.links.huggingface && (
              <li>
                <a href={proj.links.huggingface} target="_blank" rel="noopener noreferrer">
                  Live demo on Hugging Face
                </a>
              </li>
            )}
          </ul>
        </>
      )}

      <hr />
      <p className="text-sm text-neutral-500">
        Demo content for review. No clinical use.
      </p>
    </article>
  );
}
