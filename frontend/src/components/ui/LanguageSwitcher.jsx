"use client";

import { useState } from "react";
import { Box, ListItemText, Menu, MenuItem, Tooltip, Button } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from "@/i18n/LanguageContext";
import { LANGUAGES } from "@/i18n/translations";

export default function LanguageSwitcher({ compact = false }) {
  const { lang, setLang, t } = useTranslation();
  const [anchor, setAnchor] = useState(null);

  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  const choose = (code) => {
    setLang(code);
    setAnchor(null);
  };

  return (
    <>
      <Tooltip title={t("nav.language")}>
        <Button
          color="inherit"
          size="small"
          onClick={(e) => setAnchor(e.currentTarget)}
          startIcon={<TranslateIcon />}
          aria-label={t("nav.language")}
          aria-haspopup="true"
          sx={{ minWidth: 0, px: compact ? 1 : 1.5 }}
        >
          {!compact && current.short}
        </Button>
      </Tooltip>

      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {LANGUAGES.map((l) => (
          <MenuItem key={l.code} selected={l.code === lang} onClick={() => choose(l.code)}>
            <Box sx={{ width: 26, display: "flex", alignItems: "center" }}>
              {l.code === lang && <CheckIcon fontSize="small" color="primary" />}
            </Box>
            <ListItemText primary={l.label} secondary={l.code === "en" ? "Default" : null} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
