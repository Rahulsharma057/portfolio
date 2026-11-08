"use client";

import Link from "next/link";
import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DownloadIcon from "@mui/icons-material/Download";
import SocialLinks from "@/components/ui/SocialLinks";
import { useTranslation } from "@/i18n/LanguageContext";
import { localized } from "@/i18n/localize";

export default function Hero({ profile = {} }) {
  const { t, lang } = useTranslation();

  const bg = profile.heroBgImage?.url || "/images/hero-fallback.jpg";

  // Focal point: admin panel se set hota hai. Desktop aur mobile alag isliye
  // kyunki mobile frame tall hota hai - image ka zyada hissa crop ho jata hai,
  // aur bina focal point ke aksar chehra ya main subject kat jata hai.
  const fd = profile.heroFocus || { x: 50, y: 50 };
  const fm = profile.heroFocusMobile || { x: 50, y: 40 };

  const overlay = (profile.heroOverlay ?? 82) / 100;
  const blur = profile.heroBlur ?? 0;

  return (
    <Box
      component="section"
      id="home"
      sx={{
        position: "relative",
        minHeight: { xs: "92vh", md: "100vh" },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        bgcolor: "background.default",
      }}
    >
      {/* Image apni alag layer me hai taaki blur sirf image pe lage, text pe nahi */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: blur ? `-${blur * 2}px` : 0,
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          // Yahi line mobile pe image ko sahi jagah rakhti hai
          backgroundPosition: {
            xs: `${fm.x}% ${fm.y}%`,
            md: `${fd.x}% ${fd.y}%`,
          },
          // iOS Safari pe "fixed" kaam nahi karta
          backgroundAttachment: { xs: "scroll", md: "fixed" },
          filter: blur ? `blur(${blur}px)` : "none",
        }}
      />

      {/* Overlay - iske bina text kisi bhi photo pe padha nahi jayega */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: (th) =>
            th.palette.mode === "dark"
              ? `rgba(11, 16, 32, ${overlay})`
              : `rgba(247, 247, 251, ${Math.min(overlay + 0.06, 1)})`,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, py: 10 }}>
        <Chip
          label={t("hero.badge")}
          color="primary"
          variant="outlined"
          size="small"
          sx={{ mb: 3 }}
        />

        <Typography variant="h1" sx={{ mb: 1.5 }}>
          {t("hero.greeting")}{" "}
          <Box component="span" sx={{ color: "primary.main" }}>
            {localized(profile, "fullName", lang) || "Rahul Sharma"}
          </Box>
        </Typography>

        <Typography variant="h3" color="text.secondary" sx={{ mb: 2, fontWeight: 500 }}>
          {localized(profile, "title", lang) || "Frontend Developer | MERN Stack"}
        </Typography>

        {localized(profile, "tagline", lang) && (
          <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 620, fontSize: "1.05rem" }}>
            {localized(profile, "tagline", lang)}
          </Typography>
        )}

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 4 }}>
          <Button
            component={Link}
            href="/#projects"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
          >
            {t("hero.viewProjects")}
          </Button>

          <Button
            variant="outlined"
            size="large"
            startIcon={<DownloadIcon />}
            href={profile.resumeUrl || "/resume.pdf"}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("hero.downloadResume")}
          </Button>
        </Stack>

        <SocialLinks socials={profile.socials} />
      </Container>
    </Box>
  );
}
