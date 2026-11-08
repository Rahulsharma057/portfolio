"use client";

import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import GitHubIcon from "@mui/icons-material/GitHub";

import DemoCredentials from "./DemoCredentials";
import { useTranslation } from "@/i18n/LanguageContext";
import { localized } from "@/i18n/localize";

export default function ProjectCard({ project }) {
  const { t, lang } = useTranslation();

  const tech = (project.techStack || []).slice(0, 4);
  const extra = (project.techStack || []).length - tech.length;
  const title = localized(project, "title", lang);

  const hasActions =
    project.liveUrl || project.githubUrl || (project.demoCredentials || []).length > 0;

  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform .25s ease, border-color .25s ease",
        "&:hover": { transform: "translateY(-4px)", borderColor: "primary.main" },
      }}
    >
      {/* Sirf yeh hissa clickable link hai. Buttons neeche alag row me hain,
          kyunki <a> ke andar <a> nest karna HTML me invalid hai. */}
      <CardActionArea
        component={Link}
        href={`/projects/${project.slug}`}
        sx={{ display: "flex", flexDirection: "column", alignItems: "stretch", flexGrow: 1 }}
      >
        <Box
          sx={{
            height: 190,
            flexShrink: 0,
            bgcolor: "action.hover",
            backgroundImage: project.coverImage?.url ? `url(${project.coverImage.url})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "grid",
            placeItems: "center",
          }}
        >
          {!project.coverImage?.url && (
            <Typography variant="h3" color="text.secondary" sx={{ opacity: 0.4 }}>
              {title?.charAt(0) || "P"}
            </Typography>
          )}
        </Box>

        <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", width: "100%" }}>
          <Stack direction="row" spacing={1} sx={{ mb: 1.5 }} flexWrap="wrap" useFlexGap>
            <Chip label={project.category} size="small" color="primary" variant="outlined" />
            {project.isConfidential && (
              <Chip label={t("projects.underNda")} size="small" variant="outlined" />
            )}
            {project.liveUrl && (
              <Chip label={t("projects.liveBadge")} size="small" color="secondary" variant="outlined" />
            )}
          </Stack>

          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>

          {/* 3 line pe clamp - warna chhote aur bade description wale cards ki
              height alag ho jati hai aur grid tedha dikhta hai */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "4.95em",
            }}
          >
            {localized(project, "shortDescription", lang)}
          </Typography>

          <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ mt: "auto" }}>
            {tech.map((x) => (
              <Chip key={x} label={x} size="small" />
            ))}
            {extra > 0 && <Chip label={`+${extra}`} size="small" />}
          </Stack>
        </CardContent>
      </CardActionArea>

      {hasActions && (
        <CardActions sx={{ px: 2, pb: 2, pt: 0, gap: 1, flexWrap: "wrap" }}>
          {project.liveUrl && (
            <Button
              size="small"
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
              size="small"
              variant="outlined"
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<GitHubIcon />}
            >
              {t("projects.code")}
            </Button>
          )}

          <DemoCredentials
            credentials={project.demoCredentials}
            liveUrl={project.liveUrl}
            note={project.demoNote}
          />
        </CardActions>
      )}
    </Card>
  );
}
