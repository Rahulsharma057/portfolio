"use client";

import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useTranslation } from "@/i18n/LanguageContext";

export default function MobileDrawer({ open, onClose, links, resumeUrl }) {
  const { t } = useTranslation();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: 278 } }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2 }}>
        <Typography variant="h6">{t("nav.menu")}</Typography>
        <IconButton onClick={onClose} aria-label={t("nav.closeMenu")}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      <List>
        {links.map((link) => (
          <ListItemButton key={link.href} component="a" href={link.href} onClick={onClose}>
            <ListItemText primary={link.label} />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ p: 2, mt: "auto" }}>
        {/* Mobile pe language aur theme yahin se badalte hain */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <LanguageSwitcher />
          <ThemeToggle />
        </Stack>

        <Button
          fullWidth
          variant="contained"
          startIcon={<DownloadIcon />}
          href={resumeUrl || "/resume.pdf"}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
        >
          {t("nav.resume")}
        </Button>
      </Box>
    </Drawer>
  );
}
