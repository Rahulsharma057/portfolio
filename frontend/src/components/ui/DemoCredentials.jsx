"use client";

import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LaunchIcon from "@mui/icons-material/Launch";

import toast from "@/lib/toast";
import { copyText } from "@/lib/clipboard";
import { useTranslation } from "@/i18n/LanguageContext";

/**
 * "Demo login" button. Click karne pe dialog khulta hai jisme har role
 * (Admin / User / Super Admin) ke test credentials hote hain, copy button ke saath.
 *
 * Yeh recruiter ke liye hai: woh live demo khol ke har role ka alag view
 * dekh sake, bina aapse puche. Bina iske zyadatar log login screen pe
 * aake wapas chale jate hain.
 */
export default function DemoCredentials({ credentials = [], liveUrl = "", note = "", size = "small" }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  if (!credentials || credentials.length === 0) return null;

  const copy = async (text, label) => {
    // copyText pehle modern API try karta hai, fail hone par purana fallback
    const ok = await copyText(text);
    if (ok) toast.success(t("projects.copied", { what: label }));
    else toast.error(t("projects.copyFailed"));
  };

  return (
    <>
      <Button
        size={size}
        variant="outlined"
        startIcon={<KeyIcon />}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
      >
        {t("projects.demoLogin")}
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>{t("projects.demoCredentials")}</DialogTitle>

        <DialogContent dividers>
          <Alert severity="info" sx={{ mb: 2.5 }}>
            {t("projects.demoCredentialsHelp")}
          </Alert>

          {note && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
              {note}
            </Typography>
          )}

          <Stack spacing={2}>
            {credentials.map((cred, i) => (
              <Paper key={i} variant="outlined" sx={{ p: 2, bgcolor: "background.default" }}>
                <Chip
                  label={cred.role}
                  size="small"
                  color="primary"
                  sx={{ mb: 1.5 }}
                />

                {[
                  { label: t("projects.emailLabel"), value: cred.email },
                  { label: t("projects.passwordLabel"), value: cred.password },
                ]
                  .filter((row) => row.value)
                  .map((row) => (
                    <Stack
                      key={row.label}
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ mb: 0.75 }}
                    >
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ width: 68, flexShrink: 0 }}
                      >
                        {row.label}
                      </Typography>

                      <Box
                        sx={{
                          flexGrow: 1,
                          minWidth: 0,
                          fontFamily: "monospace",
                          fontSize: "0.85rem",
                          bgcolor: "action.hover",
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {row.value}
                      </Box>

                      <Tooltip title={t("projects.copy")}>
                        <IconButton
                          size="small"
                          onClick={() => copy(row.value, row.label)}
                          aria-label={`${t("projects.copy")} ${row.label}`}
                        >
                          <ContentCopyIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  ))}

                {cred.note && (
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
                    {cred.note}
                  </Typography>
                )}
              </Paper>
            ))}
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setOpen(false)}>{t("common.close")}</Button>
          {liveUrl && (
            <Button
              variant="contained"
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<LaunchIcon />}
            >
              {t("projects.openDemo")}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
