"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Collapse,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import SectionTitle from "@/components/ui/SectionTitle";
import FadeIn from "@/components/ui/FadeIn";
import { useTranslation } from "@/i18n/LanguageContext";
import { localized } from "@/i18n/localize";

export default function WhoIsRahul({ profile = {}, education = [] }) {
  const { t, lang } = useTranslation();

  // Long bio by default chhupi rehti hai - section chhota rehta hai,
  // jisko padhna hai woh "Read more" se khol lega.
  const [showMore, setShowMore] = useState(false);
  const [openHighlight, setOpenHighlight] = useState(false);

  const name = localized(profile, "fullName", lang) || "Rahul Sharma";
  const stats = localized(profile, "stats", lang) || profile.stats || [];
  const longBio = localized(profile, "longBio", lang);
  const highlights = localized(profile, "aboutHighlights", lang) || profile.aboutHighlights || [];

  return (
    <Box component="section" id="about" sx={{ py: { xs: 8, md: 14 } }}>
      <Container maxWidth="lg">
        <SectionTitle
          overline={t("about.overline")}
          title={t("about.title", { name })}
          subtitle={t("about.subtitle")}
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.5fr 1fr" },
            gap: { xs: 4, md: 6 },
            alignItems: "start",
          }}
        >
          <FadeIn>
            <Box>
              {profile.profileImage?.url && (
                <Box
                  component="img"
                  src={profile.profileImage.url}
                  alt={name}
                  sx={{
                    width: { xs: 140, md: 170 },
                    height: { xs: 140, md: 170 },
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: 3,
                    borderColor: "primary.main",
                    mb: 3,
                  }}
                />
              )}

              {localized(profile, "shortBio", lang) && (
                <Typography color="text.secondary" sx={{ mb: 2, fontSize: "1.05rem" }}>
                  {localized(profile, "shortBio", lang)}
                </Typography>
              )}

              {longBio && (
                <>
                  <Collapse in={showMore} timeout="auto">
                    <Typography color="text.secondary" sx={{ mb: 2, whiteSpace: "pre-line" }}>
                      {longBio}
                    </Typography>
                  </Collapse>

                  <Button
                    size="small"
                    onClick={() => setShowMore((v) => !v)}
                    endIcon={showMore ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    sx={{ mb: 2, ml: -1 }}
                  >
                    {showMore ? t("about.readLess") : t("about.readMore")}
                  </Button>
                </>
              )}

              {/* Chhote expandable points - "Why law + tech", "How I work" waghairah */}
              {highlights.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" sx={{ mb: 1.5 }}>
                    {t("about.moreAbout")}
                  </Typography>

                  {highlights.map((h, i) => (
                    <Accordion
                      key={i}
                      disableGutters
                      elevation={0}
                      expanded={openHighlight === i}
                      onChange={() => setOpenHighlight(openHighlight === i ? false : i)}
                      // Band hone par content DOM se hat jata hai - page halka rehta hai
                      // aur chhupa hua text search/copy me nahi aata
                      TransitionProps={{ unmountOnExit: true }}
                      sx={{
                        bgcolor: "transparent",
                        border: 1,
                        borderColor: "divider",
                        borderRadius: 2,
                        mb: 1,
                        "&:before": { display: "none" },
                      }}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography sx={{ fontWeight: 500 }}>{h.title}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "pre-line" }}>
                          {h.body}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>
              )}

              {Array.isArray(stats) && stats.length > 0 && (
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "repeat(2, 1fr)",
                      sm: `repeat(${Math.min(stats.length, 4)}, 1fr)`,
                    },
                    gap: 2,
                    mt: 4,
                  }}
                >
                  {stats.map((stat, i) => (
                    <Box
                      key={i}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: "background.paper",
                        border: 1,
                        borderColor: "divider",
                      }}
                    >
                      <Typography variant="h3" color="primary.main">
                        {stat.value}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </FadeIn>

          <FadeIn delay={120}>
            <Stack spacing={2}>
              <Typography variant="h4" sx={{ mb: 0.5 }}>
                {t("about.education")}
              </Typography>

              {education.length === 0 && (
                <Typography color="text.secondary" variant="body2">
                  {t("about.empty")}
                </Typography>
              )}

              {education.map((edu) => (
                <Card key={edu._id} variant="outlined">
                  <CardContent>
                    <Stack direction="row" spacing={1.5} alignItems="flex-start">
                      <SchoolIcon color="primary" fontSize="small" sx={{ mt: 0.3 }} />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6">{localized(edu, "degree", lang)}</Typography>

                        {localized(edu, "field", lang) && (
                          <Typography variant="body2" color="text.secondary">
                            {localized(edu, "field", lang)}
                          </Typography>
                        )}

                        <Typography variant="body2" color="text.secondary">
                          {localized(edu, "institution", lang)}
                        </Typography>

                        <Stack direction="row" spacing={1} sx={{ mt: 1 }} flexWrap="wrap" useFlexGap>
                          {(edu.startYear || edu.endYear) && (
                            <Chip
                              size="small"
                              variant="outlined"
                              label={`${edu.startYear || ""} - ${edu.endYear || t("about.present")}`}
                            />
                          )}
                          {edu.grade && (
                            <Chip
                              size="small"
                              variant="outlined"
                              label={t("about.grade", { grade: edu.grade })}
                            />
                          )}
                        </Stack>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </FadeIn>
        </Box>
      </Container>
    </Box>
  );
}
