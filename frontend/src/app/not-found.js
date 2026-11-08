"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import { useTranslation } from "@/i18n/LanguageContext";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <Container>
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 2,
        }}
      >
        <Typography variant="h1" color="primary.main">
          404
        </Typography>
        <Typography variant="h3">{t("notFound.title")}</Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 420 }}>
          {t("notFound.subtitle")}
        </Typography>
        <Button component={Link} href="/" variant="contained" sx={{ mt: 1 }}>
          {t("notFound.back")}
        </Button>
      </Box>
    </Container>
  );
}
