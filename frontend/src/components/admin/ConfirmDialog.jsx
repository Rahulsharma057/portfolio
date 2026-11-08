"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useTranslation } from "@/i18n/LanguageContext";

export default function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onClose,
  loading = false,
}) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title || t("admin.confirmTitle")}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message || t("admin.confirmBody")}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={loading}>
          {t("admin.cancel")}
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained" disabled={loading}>
          {t("admin.delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
