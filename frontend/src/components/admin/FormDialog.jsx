"use client";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import ImageUploader from "./ImageUploader";
import TranslationFields from "./TranslationFields";
import RepeaterField from "./RepeaterField";
import { toInputDate } from "@/lib/format";
import { useTranslation } from "@/i18n/LanguageContext";

/**
 * fields: [{ name, label, type, options?, rows?, help?, subFields? }]
 * types: text | textarea | number | select | switch | date | lines | csv | image
 *        | translations | repeater
 */
export default function FormDialog({
  open,
  title,
  fields,
  values,
  onChange,
  onSubmit,
  onClose,
  saving = false,
  error = "",
}) {
  const { t } = useTranslation();
  const set = (name, value) => onChange({ ...values, [name]: value });

  const renderField = (field) => {
    const value = values[field.name];

    switch (field.type) {
      case "switch":
        return (
          <FormControlLabel
            key={field.name}
            control={
              <Switch
                checked={Boolean(value)}
                onChange={(e) => set(field.name, e.target.checked)}
              />
            }
            label={field.label}
          />
        );

      case "select":
        return (
          <TextField
            key={field.name}
            select
            label={field.label}
            value={value ?? ""}
            onChange={(e) => set(field.name, e.target.value)}
            fullWidth
          >
            {(field.options || []).map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>
        );

      case "number":
        return (
          <TextField
            key={field.name}
            type="number"
            label={field.label}
            value={value ?? ""}
            onChange={(e) =>
              set(field.name, e.target.value === "" ? "" : Number(e.target.value))
            }
            fullWidth
          />
        );

      case "date":
        return (
          <TextField
            key={field.name}
            type="date"
            label={field.label}
            value={toInputDate(value)}
            onChange={(e) => set(field.name, e.target.value || null)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        );

      case "textarea":
        return (
          <TextField
            key={field.name}
            label={field.label}
            value={value ?? ""}
            onChange={(e) => set(field.name, e.target.value)}
            multiline
            rows={field.rows || 4}
            helperText={field.help}
            fullWidth
          />
        );

      case "lines":
        return (
          <TextField
            key={field.name}
            label={field.label}
            value={Array.isArray(value) ? value.join("\n") : ""}
            onChange={(e) =>
              set(field.name, e.target.value.split("\n").map((v) => v.trimStart()))
            }
            onBlur={(e) =>
              set(
                field.name,
                e.target.value.split("\n").map((v) => v.trim()).filter(Boolean)
              )
            }
            multiline
            rows={field.rows || 5}
            helperText={field.help || "One point per line"}
            fullWidth
          />
        );

      case "csv":
        return (
          <TextField
            key={field.name}
            label={field.label}
            value={Array.isArray(value) ? value.join(", ") : ""}
            onChange={(e) => set(field.name, e.target.value.split(","))}
            onBlur={(e) =>
              set(
                field.name,
                e.target.value.split(",").map((v) => v.trim()).filter(Boolean)
              )
            }
            helperText={field.help || "Separate with commas, e.g. React, Node.js, MongoDB"}
            fullWidth
          />
        );

      case "image":
        return (
          <ImageUploader
            key={field.name}
            label={field.label}
            value={value}
            onChange={(img) => set(field.name, img)}
          />
        );

      case "repeater":
        return (
          <RepeaterField
            key={field.name}
            label={field.label}
            help={field.help}
            value={value || []}
            onChange={(v) => set(field.name, v)}
            subFields={field.subFields || []}
            addLabel={field.addLabel || "Add"}
            emptyRow={field.emptyRow || {}}
            max={field.max || 10}
          />
        );

      case "translations":
        return (
          <TranslationFields
            key={field.name}
            value={value || {}}
            onChange={(v) => set(field.name, v)}
            fields={field.subFields || []}
          />
        );

      default:
        return (
          <TextField
            key={field.name}
            label={field.label}
            value={value ?? ""}
            onChange={(e) => set(field.name, e.target.value)}
            helperText={field.help}
            fullWidth
          />
        );
    }
  };

  return (
    <Dialog open={open} onClose={saving ? undefined : onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent dividers>
        <Box component="form" onSubmit={(e) => e.preventDefault()} noValidate>
          <Stack spacing={2.5} sx={{ pt: 1 }}>
            {error && <Alert severity="error">{error}</Alert>}
            {fields.map(renderField)}
          </Stack>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} disabled={saving}>
          {t("admin.cancel")}
        </Button>
        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={saving}
          startIcon={saving ? <CircularProgress size={16} /> : null}
        >
          {t("admin.save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
