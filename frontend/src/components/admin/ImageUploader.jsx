"use client";

import { useState } from "react";
import { Box, Button, CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import api, { errorMessage } from "@/lib/axios";
import ImageCropDialog from "./ImageCropDialog";

// value: { url, public_id } | null
export default function ImageUploader({ value, onChange, label = "Image" }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(null); // { src, fileType, fileName }

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // same file dobara chun sako
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("The file must be smaller than 5MB");
      return;
    }

    setError("");
    setPending({
      src: URL.createObjectURL(file),
      fileType: file.type || "image/jpeg",
      fileName: file.name || "image.jpg",
    });
  };

  const uploadBlob = async (blob, fileName) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", blob, fileName);

    try {
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onChange(res.data.data);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleCropConfirm = (blob) => {
    const src = pending?.src;
    const fileName = pending?.fileName;
    setPending(null);
    if (src) URL.revokeObjectURL(src);
    uploadBlob(blob, fileName);
  };

  const handleCropCancel = () => {
    if (pending?.src) URL.revokeObjectURL(pending.src);
    setPending(null);
  };

  const handleRemove = async () => {
    if (value?.public_id) {
      try {
        // Cloudinary public_id me "/" hota hai - URL me "---" bhejte hain
        await api.delete(`/upload/${value.public_id.replace(/\//g, "---")}`);
      } catch (err) {
        // image pehle hi hat chuki ho sakti hai - form clear kar dete hain
      }
    }
    onChange(null);
  };

  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
        {label}
      </Typography>

      {value?.url && (
        <Box sx={{ position: "relative", display: "inline-block", mb: 1.5 }}>
          <Box
            component="img"
            src={value.url}
            alt=""
            sx={{
              maxWidth: 280,
              width: "100%",
              borderRadius: 2,
              border: 1,
              borderColor: "divider",
              display: "block",
            }}
          />
          <IconButton
            size="small"
            onClick={handleRemove}
            aria-label="Remove image"
            sx={{
              position: "absolute",
              top: 6,
              right: 6,
              bgcolor: "background.paper",
              "&:hover": { bgcolor: "error.main", color: "#fff" },
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      <Stack direction="row" spacing={1} alignItems="center">
        <Button component="label" variant="outlined" size="small" disabled={loading}>
          {loading ? <CircularProgress size={18} /> : value?.url ? "Change image" : "Choose image"}
          <input hidden type="file" accept="image/*" onChange={handleFile} />
        </Button>
        <Typography variant="caption" color="text.secondary">
          JPG, PNG, WEBP - max 5MB
        </Typography>
      </Stack>

      {error && (
        <Typography color="error" variant="caption" display="block" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}

      <ImageCropDialog
        open={!!pending}
        imageSrc={pending?.src}
        fileType={pending?.fileType}
        onCancel={handleCropCancel}
        onConfirm={handleCropConfirm}
      />
    </Box>
  );
}
