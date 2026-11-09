"use client";

import { useMemo, useState } from "react";
import { Box, Chip, Container, Stack, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeIn from "@/components/ui/FadeIn";
import EmptyState from "@/components/ui/EmptyState";
import { useTranslation } from "@/i18n/LanguageContext";

// Categories hamesha isi order me dikhti hain, chahe database se kisi bhi
// order me aayein. Jis category me koi skill nahi hogi woh apne aap chhup jayegi.
const ORDER = ["Frontend", "Backend", "Database", "Tools", "Other"];

const ALL = "All";

/**
 * Har category ka apna colour.
 *
 * Dono mode ke liye alag values hain kyunki ek hi colour dono pe nahi chalta -
 * dark mode me halka chahiye, light mode me gehra. Saare combinations section ke
 * background (dark #1B2236 / light #FFFFFF) pe 4.5:1 se zyada contrast dete hain,
 * jo 11px ke chhote label ke liye zaroori hai.
 */
const CATEGORY_COLORS = {
  Frontend: { dark: "#9D96F0", light: "#5048C4" }, // violet - brand accent
  Backend: { dark: "#5DCAA5", light: "#0F6E56" }, // teal
  Database: { dark: "#EFA94A", light: "#8A5208" }, // amber
  Tools: { dark: "#7FB6EE", light: "#185FA5" }, // blue
  Other: { dark: "#F09BB8", light: "#993556" }, // pink
};

export default function SkillsSection({ skills = [] }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const [active, setActive] = useState(ALL);

  const isDark = theme.palette.mode === "dark";

  // Category ka colour nikalta hai; "All" aur koi anjaan category primary pe
  const colorFor = (category) => {
    const c = CATEGORY_COLORS[category];
    if (!c) return theme.palette.primary.main;
    return isDark ? c.dark : c.light;
  };

  // Saari categories jinme kam se kam ek skill hai
  const groups = useMemo(
    () =>
      ORDER.map((category) => ({
        category,
        items: skills.filter((s) => s.category === category),
      })).filter((g) => g.items.length > 0),
    [skills]
  );

  // Filter active ho to sirf wahi category, warna sab.
  // Agar chuni hui category ka data hat jaye (admin se delete), to wapas All pe.
  const matched = active === ALL ? groups : groups.filter((g) => g.category === active);
  const safeActive = matched.length === 0 ? ALL : active;
  const rows = safeActive === ALL ? groups : matched;

  return (
    <Box
      component="section"
      id="skills"
      sx={{ py: { xs: 7, md: 11 }, bgcolor: "background.paper" }}
    >
      <Container maxWidth="md">
        <SectionTitle
          overline={t("skills.overline")}
          title={t("skills.title")}
          subtitle={t("skills.subtitle")}
        />

        {groups.length === 0 ? (
          <EmptyState message={t("skills.empty")} />
        ) : (
          <>
            {/* Filter. Tabs ki jagah chips isliye - mobile pe scroll ki zarurat
                nahi padti, ye apne aap agli line me wrap ho jate hain. */}
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              useFlexGap
              justifyContent="center"
              sx={{ mb: { xs: 3, md: 4 } }}
            >
              {[{ category: ALL, items: skills }, ...groups].map((g) => {
                const isActive = safeActive === g.category;
                const color = colorFor(g.category);

                return (
                  <Chip
                    key={g.category}
                    clickable
                    onClick={() => setActive(g.category)}
                    variant="outlined"
                    size="small"
                    aria-pressed={isActive}
                    label={
                      <Box component="span" sx={{ display: "inline-flex", gap: 0.75 }}>
                        {g.category === ALL ? t("skills.all") : t(`skills.${g.category}`)}
                        <Box component="span" sx={{ opacity: 0.6 }}>
                          {g.items.length}
                        </Box>
                      </Box>
                    }
                    sx={{
                      // Active chip: category ke colour ka halka tint + wahi border
                      // aur text. Solid fill nahi, kyunki uspe text ka contrast
                      // har colour ke liye alag se tune karna padta.
                      borderColor: isActive ? color : "divider",
                      color: isActive ? color : "text.secondary",
                      bgcolor: isActive ? alpha(color, isDark ? 0.16 : 0.1) : "transparent",
                      fontWeight: isActive ? 600 : 400,
                      "&:hover": {
                        bgcolor: alpha(color, isDark ? 0.22 : 0.14),
                        borderColor: color,
                      },
                    }}
                  />
                );
              })}
            </Stack>

            {rows.map((group, i) => (
              <FadeIn key={group.category} delay={i * 60}>
                <Box
                  sx={{
                    // Desktop pe label left column me - isse section lagbhag
                    // aadha chhota ho jata hai. Mobile pe label upar.
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "120px 1fr" },
                    gap: { xs: 0.5, md: 3 },
                    alignItems: "baseline",
                    py: { xs: 1.75, md: 2 },
                    borderBottom: i === rows.length - 1 ? 0 : 1,
                    borderColor: "divider",
                  }}
                >
                  <Typography
                    component="h3"
                    sx={{
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "1.4px",
                      textTransform: "uppercase",
                      color: colorFor(group.category),
                    }}
                  >
                    {t(`skills.${group.category}`)}
                  </Typography>

                  {/* Flex + wrap, plain text nahi.
                      Reason: har skill "naam + dot" ek nowrap unit hai, taaki
                      "Material UI" beech se na toote aur dot kabhi agli line ke
                      shuru me na latke. Plain inline text me in units ke beech
                      koi space character nahi hota, isliye browser unhe ek hi
                      lamba shabd samajh kar wrap hi nahi karta - mobile pe
                      aakhri skills kat jati hain. Flex gap break point deta hai. */}
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "baseline",
                      columnGap: 1.1,
                      rowGap: 0.4,
                      fontSize: { xs: "0.95rem", md: "1.05rem" },
                      lineHeight: 1.7,
                      color: "text.primary",
                    }}
                  >
                    {group.items.map((skill, idx) => (
                      <Box component="span" key={skill._id} sx={{ whiteSpace: "nowrap" }}>
                        {skill.name}
                        {idx < group.items.length - 1 && (
                          <Box
                            component="span"
                            aria-hidden="true"
                            sx={{
                              // Separator category ke colour ka halka version -
                              // rang dikhta hai lekin skill ke naam se dhyan nahi hatata
                              color: alpha(colorFor(group.category), 0.55),
                              ml: 1.1,
                            }}
                          >
                            &middot;
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </FadeIn>
            ))}
          </>
        )}
      </Container>
    </Box>
  );
}