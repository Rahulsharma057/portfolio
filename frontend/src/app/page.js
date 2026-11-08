import { getJSON } from "@/lib/serverApi";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";

import Hero from "@/components/sections/Hero";
import WhoIsRahul from "@/components/sections/WhoIsRahul";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import CertificatesSection from "@/components/sections/CertificatesSection";
import ContactSection from "@/components/sections/ContactSection";

// Har request pe fresh data - admin panel se change karte hi site update
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [profile, skills, experience, education, projects, certificates] =
    await Promise.all([
      getJSON("/profile", {}),
      getJSON("/skills", []),
      getJSON("/experience", []),
      getJSON("/education", []),
      getJSON("/projects/featured", []),
      getJSON("/certificates", []),
    ]);

  return (
    <>
      <Navbar profile={profile} />
      <main>
        <Hero profile={profile} />
        <WhoIsRahul profile={profile} education={education} />
        <SkillsSection skills={skills} />
        <ExperienceSection experience={experience} />
        <ProjectsSection projects={projects} showViewAll />
        <CertificatesSection certificates={certificates} />
        <ContactSection profile={profile} />
      </main>
      <Footer profile={profile} />
      <ScrollToTop />
    </>
  );
}
