"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DownloadIcon from "@mui/icons-material/Download";

import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import MobileDrawer from "./MobileDrawer";
import { useTranslation } from "@/i18n/LanguageContext";
import { localized } from "@/i18n/localize";

const LINKS = [
  { key: "about", href: "/#about" },
  { key: "skills", href: "/#skills" },
  { key: "experience", href: "/#experience" },
  { key: "projects", href: "/#projects" },
  { key: "certificates", href: "/#certificates" },
  { key: "contact", href: "/#contact" },
];

export default function Navbar({ profile = {} }) {
  const { t, lang } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const displayName = localized(profile, "fullName", lang) || profile.fullName || "Rahul Sharma";

  // Initials hamesha English naam se, taaki logo har language me same rahe
  const initials = (profile.fullName || "Rahul Sharma")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const links = LINKS.map((l) => ({ ...l, label: t(`nav.${l.key}`) }));

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: scrolled ? "background.paper" : "transparent",
          borderBottom: 1,
          borderColor: scrolled ? "divider" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          transition: "background-color .3s ease, border-color .3s ease",
          color: "text.primary",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ gap: 1, minHeight: { xs: 64, md: 72 } }}>
            <Box
              component={Link}
              href="/"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: 2,
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                {initials}
              </Box>
              <Typography sx={{ fontWeight: 700, display: { xs: "none", sm: "block" } }}>
                {displayName}
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <Stack direction="row" spacing={0.25} sx={{ display: { xs: "none", lg: "flex" } }}>
              {links.map((link) => (
                <Button key={link.href} href={link.href} color="inherit" size="small">
                  {link.label}
                </Button>
              ))}
            </Stack>

            <LanguageSwitcher />
            <ThemeToggle />

            <Button
              variant="contained"
              size="small"
              startIcon={<DownloadIcon />}
              href={profile.resumeUrl || "/resume.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ display: { xs: "none", sm: "inline-flex" }, flexShrink: 0 }}
            >
              {t("nav.resume")}
            </Button>

            <IconButton
              onClick={() => setDrawerOpen(true)}
              color="inherit"
              aria-label={t("nav.openMenu")}
              sx={{ display: { xs: "inline-flex", lg: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        links={links}
        resumeUrl={profile.resumeUrl}
      />
    </>
  );
}
