"use client";

import { Box, Chip, Stack, Typography } from "@mui/material";
import { dateRange, duration } from "@/lib/format";
import { useTranslation } from "@/i18n/LanguageContext";
import { localized, localizedList } from "@/i18n/localize";

export default function TimelineItem({ item, isLast }) {
  const { t, lang } = useTranslation();

  const range = dateRange(item.startDate, item.endDate, item.isCurrent, t("experience.present"), lang);
  const dur = duration(item.startDate, item.endDate, item.isCurrent, {
    years: t("experience.years"),
    yearsPlural: t("experience.yearsPlural"),
    months: t("experience.months"),
    monthsPlural: t("experience.monthsPlural"),
  });

  const points = localizedList(item, "points", lang);

  return (
    <Box sx={{ display: "flex", gap: { xs: 2, md: 3 } }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", pt: 0.8 }}>
        <Box
          sx={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            bgcolor: item.isCurrent ? "primary.main" : "transparent",
            border: 2,
            borderColor: "primary.main",
            flexShrink: 0,
          }}
        />
        {!isLast && (
          <Box sx={{ width: "2px", flexGrow: 1, bgcolor: "divider", mt: 1, minHeight: 40 }} />
        )}
      </Box>

      <Box sx={{ pb: isLast ? 0 : 5, flexGrow: 1 }}>
        <Typography variant="h4">{localized(item, "role", lang)}</Typography>

        <Typography color="primary.main" sx={{ fontWeight: 600 }}>
          {item.company}
          {item.employmentType ? ` - ${item.employmentType}` : ""}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          {range}
          {dur ? ` - ${dur}` : ""}
        </Typography>

        {localized(item, "location", lang) && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {localized(item, "location", lang)}
          </Typography>
        )}

        {points.length > 0 && (
          <Box component="ul" sx={{ pl: 2.5, m: 0, mb: 2 }}>
            {points.map((point, i) => (
              <Box
                component="li"
                key={i}
                sx={{ color: "text.secondary", mb: 0.75, lineHeight: 1.65 }}
              >
                {point}
              </Box>
            ))}
          </Box>
        )}

        {(item.skills || []).length > 0 && (
          <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
            {item.skills.map((s) => (
              <Chip key={s} label={s} size="small" variant="outlined" />
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}
