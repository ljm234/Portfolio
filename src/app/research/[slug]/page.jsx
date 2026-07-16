import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import ResearchDetail from "@/components/research/ResearchDetail";

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
  return <ResearchDetail proj={proj} />;
}
