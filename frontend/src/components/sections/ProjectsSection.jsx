"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Box, Button, Container, Tab, Tabs } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import SectionTitle from "@/components/ui/SectionTitle";
import ProjectCard from "@/components/ui/ProjectCard";
import FadeIn from "@/components/ui/FadeIn";
import EmptyState from "@/components/ui/EmptyState";
import { useTranslation } from "@/i18n/LanguageContext";

export default function ProjectsSection({
  projects = [],
  showViewAll = false,
  hideHeading = false,
}) {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("All");

  const categories = useMemo(() => {
    const unique = [...new Set(projects.map((p) => p.category).filter(Boolean))];
    return ["All", ...unique];
  }, [projects]);

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [projects, filter]
  );

  return (
    <Box
      component="section"
      id="projects"
      sx={{
        py: { xs: 8, md: 14 },
        bgcolor: hideHeading ? "transparent" : "background.paper",
      }}
    >
      <Container maxWidth="lg">
        {!hideHeading && (
          <SectionTitle
            overline={t("projects.overline")}
            title={t("projects.title")}
            subtitle={t("projects.subtitle")}
          />
        )}

        {projects.length === 0 ? (
          <EmptyState message={t("projects.empty")} />
        ) : (
          <>
            {categories.length > 2 && (
              <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
                <Tabs
                  value={filter}
                  onChange={(e, value) => setFilter(value)}
                  variant="scrollable"
                  scrollButtons="auto"
                  allowScrollButtonsMobile
                >
                  {categories.map((cat) => (
                    <Tab key={cat} label={cat === "All" ? t("projects.all") : cat} value={cat} />
                  ))}
                </Tabs>
              </Box>
            )}

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                },
                gap: 3,
              }}
            >
              {visible.map((project, i) => (
                <FadeIn key={project._id} delay={(i % 3) * 80}>
                  <ProjectCard project={project} />
                </FadeIn>
              ))}
            </Box>

            {showViewAll && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <Button
                  component={Link}
                  href="/projects"
                  variant="outlined"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                >
                  {t("projects.viewAll")}
                </Button>
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}
