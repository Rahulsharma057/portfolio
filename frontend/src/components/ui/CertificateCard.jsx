"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import { formatDate } from "@/lib/format";
import { useTranslation } from "@/i18n/LanguageContext";
import { localized } from "@/i18n/localize";

export default function CertificateCard({ certificate }) {
  const { t, lang } = useTranslation();
  const [open, setOpen] = useState(false);

  const hasImage = Boolean(certificate.image?.url);
  const title = localized(certificate, "title", lang);

  return (
    <>
      <Card variant="outlined" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            height: 160,
            bgcolor: "action.hover",
            backgroundImage: hasImage ? `url(${certificate.image.url})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </Typography>

          {localized(certificate, "issuer", lang) && (
            <Typography variant="body2" color="text.secondary">
              {localized(certificate, "issuer", lang)}
            </Typography>
          )}

          {certificate.issueDate && (
            <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
              {formatDate(certificate.issueDate, lang)}
            </Typography>
          )}

          <Stack direction="row" spacing={1} sx={{ mt: "auto", pt: 2 }}>
            {hasImage && (
              <Button
                size="small"
                variant="outlined"
                startIcon={<VisibilityIcon />}
                onClick={() => setOpen(true)}
              >
                {t("certificates.view")}
              </Button>
            )}
            {(certificate.fileUrl || certificate.image?.url) && (
              <Button
                size="small"
                variant="outlined"
                startIcon={<DownloadIcon />}
                href={certificate.fileUrl || certificate.image.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("certificates.download")}
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogContent sx={{ p: 1 }}>
          <Box
            component="img"
            src={certificate.image?.url}
            alt={title}
            sx={{ width: "100%", display: "block", borderRadius: 1 }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
