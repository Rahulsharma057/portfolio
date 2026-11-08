"use client";

import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import api, { errorMessage } from "@/lib/axios";
import toast from "@/lib/toast";
import Loader from "@/components/ui/Loader";
import ImageUploader from "@/components/admin/ImageUploader";
import HeroImageAdjuster from "@/components/admin/HeroImageAdjuster";
import TranslationFields from "@/components/admin/TranslationFields";
import RepeaterField from "@/components/admin/RepeaterField";
import { useTranslation } from "@/i18n/LanguageContext";

export default function AdminProfilePage() {
  const { t } = useTranslation();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/profile")
      .then((res) => {
        const d = res.data.data || {};
        setForm({
          fullName: d.fullName || "",
          title: d.title || "",
          tagline: d.tagline || "",
          shortBio: d.shortBio || "",
          longBio: d.longBio || "",
          heroBgImage: d.heroBgImage?.url ? d.heroBgImage : null,
          profileImage: d.profileImage?.url ? d.profileImage : null,
          heroFocus: d.heroFocus || { x: 50, y: 50 },
          heroFocusMobile: d.heroFocusMobile || { x: 50, y: 40 },
          heroOverlay: d.heroOverlay ?? 82,
          heroBlur: d.heroBlur ?? 0,
          resumeUrl: d.resumeUrl || "/resume.pdf",
          email: d.email || "",
          phone: d.phone || "",
          location: d.location || "",
          socials: {
            linkedin: d.socials?.linkedin || "",
            github: d.socials?.github || "",
            instagram: d.socials?.instagram || "",
            twitter: d.socials?.twitter || "",
          },
          stats: d.stats?.length ? d.stats : [],
          aboutHighlights: d.aboutHighlights?.length ? d.aboutHighlights : [],
          translations: d.translations || {},
        });
      })
      .catch((err) => setError(errorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  const set = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }));
  const patch = (obj) => setForm((p) => ({ ...p, ...obj }));

  const setSocial = (field) => (e) =>
    setForm((p) => ({ ...p, socials: { ...p.socials, [field]: e.target.value } }));

  const setStat = (index, key) => (e) =>
    setForm((p) => {
      const stats = [...p.stats];
      stats[index] = { ...stats[index], [key]: e.target.value };
      return { ...p, stats };
    });

  const addStat = () => setForm((p) => ({ ...p, stats: [...p.stats, { label: "", value: "" }] }));
  const removeStat = (i) => setForm((p) => ({ ...p, stats: p.stats.filter((_, x) => x !== i) }));

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      await api.put("/profile", {
        ...form,
        heroBgImage: form.heroBgImage || {},
        profileImage: form.profileImage || {},
        stats: form.stats.filter((s) => s.label && s.value),
        aboutHighlights: form.aboutHighlights.filter((h) => h.title),
      });
      toast.success(t("admin.savedProfile"));
    } catch (err) {
      const msg = errorMessage(err);
      setError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;
  if (!form) return <Alert severity="error">{error || "Could not load the profile"}</Alert>;

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        {t("admin.profile")}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        This controls the home page hero and the &quot;Who is Rahul Sharma&quot; section.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Stack spacing={3} sx={{ maxWidth: 800 }}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 2.5 }}>
            Basic info (English)
          </Typography>

          <Stack spacing={2.5}>
            <TextField label="Full name" value={form.fullName} onChange={set("fullName")} fullWidth />
            <TextField label="Title" value={form.title} onChange={set("title")} fullWidth
              helperText="For example: Frontend Developer | MERN Stack" />
            <TextField label="Tagline" value={form.tagline} onChange={set("tagline")} fullWidth multiline rows={2}
              helperText="One line under your name in the hero" />
            <TextField label="Short bio" value={form.shortBio} onChange={set("shortBio")} fullWidth multiline rows={4}
              helperText="First paragraph of the About section" />
            <TextField label="Long bio" value={form.longBio} onChange={set("longBio")} fullWidth multiline rows={5}
              helperText="Second paragraph, hidden behind Read more (optional)" />
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 0.5 }}>
            About ke expandable points
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
            These appear as small buttons in the About section. They stay closed and open
            on click, which keeps the section short.
          </Typography>

          <RepeaterField
            label="Points"
            addLabel="Add point"
            max={6}
            value={form.aboutHighlights}
            onChange={(v) => patch({ aboutHighlights: v })}
            emptyRow={{ title: "", body: "" }}
            subFields={[
              { name: "title", label: "Button label", type: "text", help: "Keep it short - for example 'Why law and tech together'" },
              { name: "body", label: "Text shown when opened", type: "textarea", rows: 4 },
            ]}
          />
        </Paper>

        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 0.5 }}>
            Hindi / Hinglish translation
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
            This is what visitors see when they switch language.
          </Typography>

          <TranslationFields
            value={form.translations}
            onChange={(v) => patch({ translations: v })}
            fields={[
              { name: "fullName", label: "Full name", type: "text" },
              { name: "title", label: "Title", type: "text" },
              { name: "tagline", label: "Tagline", type: "textarea", rows: 2 },
              { name: "shortBio", label: "Short bio", type: "textarea", rows: 4 },
              { name: "longBio", label: "Long bio", type: "textarea", rows: 5 },
            ]}
          />
        </Paper>

        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 2.5 }}>
            Home page background image
          </Typography>

          <Stack spacing={3}>
            <ImageUploader
              label="Hero background image"
              value={form.heroBgImage}
              onChange={(img) => patch({ heroBgImage: img })}
            />

            <Divider />

            {/* Yahi woh tool hai jo image ko mobile pe theek se baithata hai */}
            <HeroImageAdjuster
              image={form.heroBgImage}
              focus={form.heroFocus}
              focusMobile={form.heroFocusMobile}
              overlay={form.heroOverlay}
              blur={form.heroBlur}
              onChange={patch}
            />
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 2.5 }}>
            Profile photo
          </Typography>
          <ImageUploader
            label="Profile photo"
            value={form.profileImage}
            onChange={(img) => patch({ profileImage: img })}
          />
        </Paper>

        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 2.5 }}>
            Contact
          </Typography>

          <Stack spacing={2.5}>
            <TextField label="Email" value={form.email} onChange={set("email")} fullWidth />
            <TextField label="Phone" value={form.phone} onChange={set("phone")} fullWidth />
            <TextField label="Location" value={form.location} onChange={set("location")} fullWidth />
            <TextField label="Resume URL" value={form.resumeUrl} onChange={set("resumeUrl")} fullWidth
              helperText="Put resume.pdf in the public folder and enter /resume.pdf" />
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 2.5 }}>
            Social links
          </Typography>

          <Stack spacing={2.5}>
            <TextField label="LinkedIn" value={form.socials.linkedin} onChange={setSocial("linkedin")} fullWidth />
            <TextField label="GitHub" value={form.socials.github} onChange={setSocial("github")} fullWidth />
            <TextField label="Instagram" value={form.socials.instagram} onChange={setSocial("instagram")} fullWidth />
            <TextField label="Twitter" value={form.socials.twitter} onChange={setSocial("twitter")} fullWidth />
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ p: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
            <Typography variant="h5">Stats</Typography>
            <Button size="small" startIcon={<AddIcon />} onClick={addStat}>
              Add stat
            </Button>
          </Stack>

          <Stack spacing={2}>
            {form.stats.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                For example: &quot;1.5+&quot; / &quot;Years of experience&quot;
              </Typography>
            )}

            {form.stats.map((stat, i) => (
              <Stack key={i} direction="row" spacing={1.5} alignItems="center">
                <TextField label="Value" value={stat.value || ""} onChange={setStat(i, "value")}
                  sx={{ width: 120 }} size="small" />
                <TextField label="Label" value={stat.label || ""} onChange={setStat(i, "label")}
                  fullWidth size="small" />
                <Button color="error" onClick={() => removeStat(i)} aria-label="Remove stat" sx={{ minWidth: 0 }}>
                  <DeleteIcon fontSize="small" />
                </Button>
              </Stack>
            ))}
          </Stack>
        </Paper>

        <Box>
          <Button
            variant="contained"
            size="large"
            onClick={handleSave}
            disabled={saving}
            startIcon={saving ? <CircularProgress size={18} /> : null}
          >
            {saving ? t("admin.saving") : t("admin.saveChanges")}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
