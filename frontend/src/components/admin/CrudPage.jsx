"use client";

import { useState } from "react";
import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import useCrud from "@/hooks/useCrud";
import { errorMessage } from "@/lib/axios";
import toast from "@/lib/toast";
import DataTable from "./DataTable";
import FormDialog from "./FormDialog";
import ConfirmDialog from "./ConfirmDialog";
import Loader from "@/components/ui/Loader";
import { useTranslation } from "@/i18n/LanguageContext";

/**
 * Saare list + add/edit/delete pages isi component se bante hain.
 */
export default function CrudPage({
  title,
  subtitle,
  endpoint,
  columns,
  fields,
  emptyValues,
  singularName = "entry",
}) {
  const { t } = useTranslation();
  const { items, loading, error, create, update, remove } = useCrud(endpoint);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [values, setValues] = useState(emptyValues);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [deleting, setDeleting] = useState(null);
  const [removing, setRemoving] = useState(false);

  const openAdd = () => {
    setEditing(null);
    setValues(emptyValues);
    setFormError("");
    setFormOpen(true);
  };

  const openEdit = (row) => {
    setEditing(row);
    const next = {};
    Object.keys(emptyValues).forEach((key) => {
      next[key] = row[key] !== undefined ? row[key] : emptyValues[key];
    });
    setValues(next);
    setFormError("");
    setFormOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setFormError("");
    try {
      if (editing) {
        await update(editing._id, values);
        toast.success(t("admin.updated", { name: singularName }));
      } else {
        await create(values);
        toast.success(t("admin.created", { name: singularName }));
      }
      setFormOpen(false);
    } catch (err) {
      const msg = errorMessage(err);
      setFormError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setRemoving(true);
    try {
      await remove(deleting._id);
      toast.success(t("admin.deleted", { name: singularName }));
      setDeleting(null);
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setRemoving(false);
    }
  };

  const label =
    deleting?.title || deleting?.name || deleting?.role || deleting?.degree || "";

  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h3">{title}</Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>

        <Button variant="contained" startIcon={<AddIcon />} onClick={openAdd}>
          {t("admin.addNew")}
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Loader minHeight="30vh" />
      ) : (
        <DataTable
          columns={columns}
          rows={items}
          onEdit={openEdit}
          onDelete={(row) => setDeleting(row)}
        />
      )}

      <FormDialog
        open={formOpen}
        title={editing ? `${t("admin.edit")} ${singularName}` : `${t("admin.addNew")} - ${singularName}`}
        fields={fields}
        values={values}
        onChange={setValues}
        onSubmit={handleSave}
        onClose={() => setFormOpen(false)}
        saving={saving}
        error={formError}
      />

      <ConfirmDialog
        open={Boolean(deleting)}
        title={t("admin.confirmTitle")}
        message={label ? `"${label}" — ${t("admin.confirmBody")}` : t("admin.confirmBody")}
        onConfirm={handleDelete}
        onClose={() => setDeleting(null)}
        loading={removing}
      />
    </Box>
  );
}
