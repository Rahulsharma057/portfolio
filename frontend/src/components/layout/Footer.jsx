"use client";

import Link from "next/link";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import SocialLinks from "@/components/ui/SocialLinks";
import { useTranslation } from "@/i18n/LanguageContext";
import { localized } from "@/i18n/localize";

export default function Footer({ profile = {} }) {
  const { t, lang } = useTranslation();
  const year = new Date().getFullYear();
  const displayName = localized(profile, "fullName", lang) || profile.fullName || "Rahul Sharma";

  return (
    <Box component="footer" sx={{ bgcolor: "background.paper", pt: 6, pb: 4 }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="h6">{displayName}</Typography>
            <Typography variant="body2" color="text.secondary">
              {localized(profile, "title", lang) || "Frontend Developer"}
            </Typography>
          </Box>

          <SocialLinks socials={profile.socials} size="small" />
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
        >
          <Typography variant="body2" color="text.secondary">
            {year} {displayName}. {t("footer.rights")}
          </Typography>

          <Stack direction="row" spacing={2}>
            <Typography
              component={Link}
              href="/projects"
              variant="body2"
              color="text.secondary"
              sx={{ "&:hover": { color: "primary.main" } }}
            >
              {t("footer.projects")}
            </Typography>
            <Typography
              component={Link}
              href="/login"
              variant="body2"
              color="text.secondary"
              sx={{ "&:hover": { color: "primary.main" } }}
            >
              {t("footer.admin")}
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
