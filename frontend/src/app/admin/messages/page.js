"use client";

import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import ReplyIcon from "@mui/icons-material/Reply";

import api, { errorMessage } from "@/lib/axios";
import toast from "@/lib/toast";
import Loader from "@/components/ui/Loader";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { formatDate } from "@/lib/format";
import { useTranslation } from "@/i18n/LanguageContext";

export default function AdminMessagesPage() {
  const { t, lang } = useTranslation();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(null);
  const [removing, setRemoving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/messages");
      setMessages(res.data.data || []);
      setError("");
    } catch (err) {
      const msg = errorMessage(err);
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggleRead = async (msg) => {
    try {
      await api.put(`/messages/${msg._id}/read`, { isRead: !msg.isRead });
      setMessages((prev) =>
        prev.map((m) => (m._id === msg._id ? { ...m, isRead: !m.isRead } : m))
      );
    } catch (err) {
      toast.error(errorMessage(err));
    }
  };

  const handleDelete = async () => {
    setRemoving(true);
    try {
      await api.delete(`/messages/${deleting._id}`);
      setMessages((prev) => prev.filter((m) => m._id !== deleting._id));
      setDeleting(null);
      toast.success(t("admin.deleted", { name: "Message" }));
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setRemoving(false);
    }
  };

  if (loading) return <Loader />;

  const unread = messages.filter((m) => !m.isRead).length;

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        {t("admin.messages")}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {messages.length} total &mdash; {unread} {t("admin.unread")}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {messages.length === 0 ? (
        <Paper variant="outlined" sx={{ p: 5, textAlign: "center", borderStyle: "dashed" }}>
          <Typography color="text.secondary">{t("admin.noMessages")}</Typography>
        </Paper>
      ) : (
        <Stack spacing={2}>
          {messages.map((msg) => (
            <Paper
              key={msg._id}
              variant="outlined"
              sx={{ p: 2.5, borderColor: msg.isRead ? "divider" : "primary.main" }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center" }}
                sx={{ mb: 1.5 }}
              >
                <Box sx={{ minWidth: 0 }}>
                  <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
                    <Typography variant="h6">{msg.name}</Typography>
                    {!msg.isRead && <Chip size="small" color="primary" label="New" />}
                  </Stack>

                  <Typography variant="body2" color="text.secondary" sx={{ wordBreak: "break-word" }}>
                    {msg.email}
                    {msg.phone ? ` - ${msg.phone}` : ""}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                    {formatDate(msg.createdAt, lang)}
                  </Typography>

                  <IconButton
                    size="small"
                    onClick={() => toggleRead(msg)}
                    aria-label="Toggle read"
                    color={msg.isRead ? "default" : "primary"}
                  >
                    <MarkEmailReadIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => setDeleting(msg)}
                    aria-label={t("admin.delete")}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>

              {msg.subject && (
                <Typography sx={{ fontWeight: 600, mb: 0.5 }}>{msg.subject}</Typography>
              )}

              <Typography color="text.secondary" sx={{ whiteSpace: "pre-line", mb: 2 }}>
                {msg.message}
              </Typography>

              <Button
                size="small"
                variant="outlined"
                startIcon={<ReplyIcon />}
                href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || "Your message")}`}
              >
                {t("admin.reply")}
              </Button>
            </Paper>
          ))}
        </Stack>
      )}

      <ConfirmDialog
        open={Boolean(deleting)}
        message={`${deleting?.name || ""} — ${t("admin.confirmBody")}`}
        onConfirm={handleDelete}
        onClose={() => setDeleting(null)}
        loading={removing}
      />
    </Box>
  );
}
