"use client";

import { Box, Chip, Container, Paper, Stack, Typography } from "@mui/material";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeIn from "@/components/ui/FadeIn";
import EmptyState from "@/components/ui/EmptyState";
import { useTranslation } from "@/i18n/LanguageContext";

const ORDER = ["Frontend", "Backend", "Database", "Tools", "Other"];

export default function SkillsSection({ skills = [] }) {
  const { t } = useTranslation();

  const grouped = ORDER.map((category) => ({
    category,
    items: skills.filter((s) => s.category === category),
  })).filter((g) => g.items.length > 0);

  return (
    <Box
      component="section"
      id="skills"
      sx={{ py: { xs: 8, md: 14 }, bgcolor: "background.paper" }}
    >
      <Container maxWidth="lg">
        <SectionTitle
          overline={t("skills.overline")}
          title={t("skills.title")}
          subtitle={t("skills.subtitle")}
        />

        {grouped.length === 0 ? (
          <EmptyState message={t("skills.empty")} />
        ) : (
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
            {grouped.map((group, i) => (
              <FadeIn key={group.category} delay={i * 80}>
                <Paper
                  variant="outlined"
                  sx={{ p: 3, height: "100%", bgcolor: "background.default" }}
                >
                  <Typography variant="h5" color="primary.main" sx={{ mb: 2 }}>
                    {t(`skills.${group.category}`)}
                  </Typography>

                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {group.items.map((skill) => (
                      <Chip
                        key={skill._id}
                        label={skill.name}
                        avatar={
                          skill.icon?.url ? (
                            <Box
                              component="img"
                              src={skill.icon.url}
                              alt=""
                              sx={{ width: 20, height: 20, borderRadius: "50%" }}
                            />
                          ) : undefined
                        }
                      />
                    ))}
                  </Stack>
                </Paper>
              </FadeIn>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
