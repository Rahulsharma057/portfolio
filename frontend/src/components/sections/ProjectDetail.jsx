"use client";

import Link from "next/link";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LaunchIcon from "@mui/icons-material/Launch";
import GitHubIcon from "@mui/icons-material/GitHub";

import DemoCredentials from "@/components/ui/DemoCredentials";
import { useTranslation } from "@/i18n/LanguageContext";
import { localized } from "@/i18n/localize";

export default function ProjectDetail({ project }) {
  const { t, lang } = useTranslation();

  const gallery = project.gallery || [];
  const title = localized(project, "title", lang);

  return (
    <Container maxWidth="md" sx={{ pt: { xs: 12, md: 16 }, pb: 10 }}>
      <Button component={Link} href="/projects" startIcon={<ArrowBackIcon />} sx={{ mb: 3 }}>
        {t("projects.back")}
      </Button>

      <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap" useFlexGap>
        <Chip label={project.category} color="primary" size="small" />
        {project.isConfidential && (
          <Chip label={t("projects.underNda")} variant="outlined" size="small" />
        )}
        {project.liveUrl && (
          <Chip label={t("projects.liveBadge")} color="secondary" variant="outlined" size="small" />
        )}
      </Stack>

      <Typography variant="h1" gutterBottom>
        {title}
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4, fontSize: "1.05rem" }}>
        {localized(project, "shortDescription", lang)}
      </Typography>

      {project.coverImage?.url && (
        <Box
          component="img"
          src={project.coverImage.url}
          alt={title}
          sx={{ width: "100%", borderRadius: 3, mb: 4, border: 1, borderColor: "divider" }}
        />
      )}

      <Stack direction="row" spacing={2} sx={{ mb: 4 }} flexWrap="wrap" useFlexGap>
        {project.liveUrl && (
          <Button
            variant="contained"
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<LaunchIcon />}
          >
            {t("projects.liveDemo")}
          </Button>
        )}

        {project.githubUrl && (
          <Button
            variant="outlined"
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<GitHubIcon />}
          >
            {t("projects.sourceCode")}
          </Button>
        )}

        <DemoCredentials
          credentials={project.demoCredentials}
          liveUrl={project.liveUrl}
          note={project.demoNote}
          size="medium"
        />
      </Stack>

      <Divider sx={{ mb: 4 }} />

      <Typography variant="h3" gutterBottom>
        {t("projects.aboutProject")}
      </Typography>
      <Typography color="text.secondary" sx={{ whiteSpace: "pre-line", mb: 4 }}>
        {localized(project, "longDescription", lang) ||
          localized(project, "shortDescription", lang)}
      </Typography>

      {(project.techStack || []).length > 0 && (
        <>
          <Typography variant="h3" gutterBottom>
            {t("projects.techStack")}
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 4 }}>
            {project.techStack.map((tech) => (
              <Chip key={tech} label={tech} variant="outlined" />
            ))}
          </Stack>
        </>
      )}

      {gallery.length > 0 && (
        <>
          <Typography variant="h3" gutterBottom>
            {t("projects.screenshots")}
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            {gallery.map((img, i) => (
              <Box
                key={img.public_id || i}
                component="img"
                src={img.url}
                alt={`${title} screenshot ${i + 1}`}
                sx={{ width: "100%", borderRadius: 2, border: 1, borderColor: "divider" }}
              />
            ))}
          </Box>
        </>
      )}
    </Container>
  );
}
