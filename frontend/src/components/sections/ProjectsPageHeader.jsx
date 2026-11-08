"use client";

import { Box, Container, Typography } from "@mui/material";
import { useTranslation } from "@/i18n/LanguageContext";

export default function ProjectsPageHeader() {
  const { t } = useTranslation();

  return (
    <Box sx={{ pt: { xs: 12, md: 16 }, pb: 2 }}>
      <Container maxWidth="lg">
        <Typography variant="h1" gutterBottom>
          {t("projects.pageTitle")}
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 640 }}>
          {t("projects.pageSubtitle")}
        </Typography>
      </Container>
    </Box>
  );
}
