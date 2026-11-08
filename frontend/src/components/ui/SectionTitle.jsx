import { Box, Typography } from "@mui/material";

export default function SectionTitle({ overline, title, subtitle, align = "center" }) {
  return (
    <Box
      sx={{
        textAlign: align,
        maxWidth: align === "center" ? 700 : "none",
        mx: align === "center" ? "auto" : 0,
        mb: { xs: 5, md: 7 },
      }}
    >
      {overline && (
        <Typography
          variant="overline"
          sx={{ color: "primary.main", letterSpacing: 2, fontWeight: 600 }}
        >
          {overline}
        </Typography>
      )}

      <Typography variant="h2" sx={{ mt: overline ? 1 : 0 }}>
        {title}
      </Typography>

      {subtitle && (
        <Typography color="text.secondary" sx={{ mt: 1.5 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
