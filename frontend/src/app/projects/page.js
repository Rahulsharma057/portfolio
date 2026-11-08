import { getJSON } from "@/lib/serverApi";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ProjectsPageHeader from "@/components/sections/ProjectsPageHeader";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Projects - Rahul Sharma",
  description: "ERP systems, full stack applications and client websites.",
};

export default async function ProjectsPage() {
  const [profile, projects] = await Promise.all([
    getJSON("/profile", {}),
    getJSON("/projects", []),
  ]);

  return (
    <>
      <Navbar profile={profile} />
      <main>
        <ProjectsPageHeader />
        <ProjectsSection projects={projects} hideHeading />
      </main>
      <Footer profile={profile} />
    </>
  );
}
