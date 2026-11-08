"use client";

import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import SendIcon from "@mui/icons-material/Send";

import SectionTitle from "@/components/ui/SectionTitle";
import SocialLinks from "@/components/ui/SocialLinks";
import api, { errorMessage } from "@/lib/axios";
import toast from "@/lib/toast";
import { useTranslation } from "@/i18n/LanguageContext";

const EMPTY = { name: "", email: "", phone: "", subject: "", message: "" };

export default function ContactSection({ profile = {} }) {
  const { t } = useTranslation();

  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = t("contact.errName");
    if (!form.email.trim()) next.email = t("contact.errEmail");
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = t("contact.errEmailInvalid");
    if (!form.message.trim()) next.message = t("contact.errMessage");
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);
    try {
      await api.post("/messages", form);
      toast.success(t("contact.success"));
      setForm(EMPTY);
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setSending(false);
    }
  };

  const details = [
    { Icon: EmailIcon, label: t("contact.labelEmail"), value: profile.email, href: `mailto:${profile.email}` },
    { Icon: PhoneIcon, label: t("contact.labelPhone"), value: profile.phone, href: `tel:${profile.phone}` },
    { Icon: PlaceIcon, label: t("contact.labelLocation"), value: profile.location, href: null },
  ].filter((d) => d.value);

  return (
    <Box
      component="section"
      id="contact"
      sx={{ py: { xs: 8, md: 14 }, bgcolor: "background.paper" }}
    >
      <Container maxWidth="lg">
        <SectionTitle
          overline={t("contact.overline")}
          title={t("contact.title")}
          subtitle={t("contact.subtitle")}
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.2fr 1fr" },
            gap: { xs: 4, md: 6 },
          }}
        >
          <Paper
            component="form"
            onSubmit={handleSubmit}
            variant="outlined"
            sx={{ p: { xs: 2.5, md: 4 }, bgcolor: "background.default" }}
            noValidate
          >
            <Stack spacing={2.5}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 2.5,
                }}
              >
                <TextField
                  label={t("contact.name")}
                  value={form.name}
                  onChange={handleChange("name")}
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                  fullWidth
                  required
                />
                <TextField
                  label={t("contact.email")}
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  fullWidth
                  required
                />
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 2.5,
                }}
              >
                <TextField
                  label={t("contact.phone")}
                  value={form.phone}
                  onChange={handleChange("phone")}
                  fullWidth
                />
                <TextField
                  label={t("contact.subject")}
                  value={form.subject}
                  onChange={handleChange("subject")}
                  fullWidth
                />
              </Box>

              <TextField
                label={t("contact.message")}
                value={form.message}
                onChange={handleChange("message")}
                error={Boolean(errors.message)}
                helperText={errors.message}
                multiline
                rows={5}
                fullWidth
                required
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={sending}
                endIcon={sending ? <CircularProgress size={18} /> : <SendIcon />}
                sx={{ alignSelf: "flex-start" }}
              >
                {sending ? t("contact.sending") : t("contact.send")}
              </Button>
            </Stack>
          </Paper>

          <Stack spacing={3}>
            {details.map(({ Icon, label, value, href }) => (
              <Stack key={label} direction="row" spacing={2} alignItems="flex-start">
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: 2,
                    display: "grid",
                    placeItems: "center",
                    bgcolor: "action.hover",
                    color: "primary.main",
                    flexShrink: 0,
                  }}
                >
                  <Icon fontSize="small" />
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary">
                    {label}
                  </Typography>
                  <Typography
                    component={href ? "a" : "p"}
                    href={href || undefined}
                    sx={{
                      display: "block",
                      fontWeight: 500,
                      wordBreak: "break-word",
                      "&:hover": href ? { color: "primary.main" } : {},
                    }}
                  >
                    {value}
                  </Typography>
                </Box>
              </Stack>
            ))}

            <Box sx={{ pt: 1 }}>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
                {t("contact.labelSocial")}
              </Typography>
              <SocialLinks socials={profile.socials} />
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
