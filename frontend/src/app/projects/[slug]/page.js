import { notFound } from "next/navigation";

import { getJSON } from "@/lib/serverApi";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectDetail from "@/components/sections/ProjectDetail";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const project = await getJSON(`/projects/${params.slug}`, null);
  if (!project) return { title: "Project not found" };

  return {
    title: `${project.title} - Rahul Sharma`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }) {
  const [profile, project] = await Promise.all([
    getJSON("/profile", {}),
    getJSON(`/projects/${params.slug}`, null),
  ]);

  if (!project) notFound();

  return (
    <>
      <Navbar profile={profile} />
      <main>
        <ProjectDetail project={project} />
      </main>
      <Footer profile={profile} />
    </>
  );
}
