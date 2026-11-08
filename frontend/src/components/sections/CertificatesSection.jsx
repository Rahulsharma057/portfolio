"use client";

import { Box, Container } from "@mui/material";
import SectionTitle from "@/components/ui/SectionTitle";
import CertificateCard from "@/components/ui/CertificateCard";
import FadeIn from "@/components/ui/FadeIn";
import EmptyState from "@/components/ui/EmptyState";
import { useTranslation } from "@/i18n/LanguageContext";

export default function CertificatesSection({ certificates = [] }) {
  const { t } = useTranslation();

  return (
    <Box component="section" id="certificates" sx={{ py: { xs: 8, md: 14 } }}>
      <Container maxWidth="lg">
        <SectionTitle
          overline={t("certificates.overline")}
          title={t("certificates.title")}
          subtitle={t("certificates.subtitle")}
        />

        {certificates.length === 0 ? (
          <EmptyState message={t("certificates.empty")} />
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
            {certificates.map((cert, i) => (
              <FadeIn key={cert._id} delay={(i % 3) * 80}>
                <CertificateCard certificate={cert} />
              </FadeIn>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
