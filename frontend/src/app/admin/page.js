"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Alert, Box, Paper, Stack, Typography } from "@mui/material";

import api, { errorMessage } from "@/lib/axios";
import toast from "@/lib/toast";
import Loader from "@/components/ui/Loader";
import { useTranslation } from "@/i18n/LanguageContext";

const CARDS = [
  { key: "projects", tkey: "admin.projects", href: "/admin/projects" },
  { key: "skills", tkey: "admin.skills", href: "/admin/skills" },
  { key: "experience", tkey: "admin.experience", href: "/admin/experience" },
  { key: "certificates", tkey: "admin.certificates", href: "/admin/certificates" },
];

export default function AdminDashboard() {
  const { t } = useTranslation();

  const [counts, setCounts] = useState({});
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [projects, skills, experience, certificates, messages] = await Promise.all([
          api.get("/projects"),
          api.get("/skills"),
          api.get("/experience"),
          api.get("/certificates"),
          api.get("/messages"),
        ]);

        setCounts({
          projects: projects.data.count,
          skills: skills.data.count,
          experience: experience.data.count,
          certificates: certificates.data.count,
          messages: messages.data.count,
        });
        setUnread(messages.data.unread || 0);
      } catch (err) {
        const msg = errorMessage(err);
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <Loader />;

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        {t("admin.dashboard")}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Pick a section from the sidebar to update your content.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
          gap: 2,
          mb: 3,
        }}
      >
        {CARDS.map((card) => (
          <Paper
            key={card.key}
            component={Link}
            href={card.href}
            variant="outlined"
            sx={{
              p: 2.5,
              textDecoration: "none",
              transition: "border-color .2s ease",
              "&:hover": { borderColor: "primary.main" },
            }}
          >
            <Typography variant="h3" color="primary.main">
              {counts[card.key] ?? 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(card.tkey)}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Paper
        component={Link}
        href="/admin/messages"
        variant="outlined"
        sx={{
          p: 3,
          display: "block",
          textDecoration: "none",
          borderColor: unread > 0 ? "primary.main" : "divider",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h3" color={unread > 0 ? "primary.main" : "text.secondary"}>
            {unread}
          </Typography>
          <Box>
            <Typography variant="h6">
              {t("admin.unread")} {t("admin.messages").toLowerCase()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total {counts.messages ?? 0}
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
