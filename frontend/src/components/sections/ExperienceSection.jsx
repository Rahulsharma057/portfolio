"use client";

import { Box, Container } from "@mui/material";
import SectionTitle from "@/components/ui/SectionTitle";
import TimelineItem from "@/components/ui/TimelineItem";
import FadeIn from "@/components/ui/FadeIn";
import EmptyState from "@/components/ui/EmptyState";
import { useTranslation } from "@/i18n/LanguageContext";

export default function ExperienceSection({ experience = [] }) {
  const { t } = useTranslation();

  return (
    <Box component="section" id="experience" sx={{ py: { xs: 8, md: 14 } }}>
      <Container maxWidth="md">
        <SectionTitle
          overline={t("experience.overline")}
          title={t("experience.title")}
          subtitle={t("experience.subtitle")}
        />

        {experience.length === 0 ? (
          <EmptyState message={t("experience.empty")} />
        ) : (
          experience.map((item, i) => (
            <FadeIn key={item._id} delay={i * 80}>
              <TimelineItem item={item} isLast={i === experience.length - 1} />
            </FadeIn>
          ))
        )}
      </Container>
    </Box>
  );
}
