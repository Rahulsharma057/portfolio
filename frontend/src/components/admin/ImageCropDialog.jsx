"use client";

import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { getCroppedImageBlob } from "./cropImage";

const ASPECT_OPTIONS = [
  { label: "Free", value: null },
  { label: "1:1", value: 1 },
  { label: "4:3", value: 4 / 3 },
  { label: "16:9", value: 16 / 9 },
];

export default function ImageCropDialog({ open, imageSrc, fileType, onCancel, onConfirm }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleCropComplete = useCallback((_, areaPixels) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const reset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setAspect(null);
    setCroppedAreaPixels(null);
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return;
    setSaving(true);
    try {
      const blob = await getCroppedImageBlob(imageSrc, croppedAreaPixels, rotation, fileType);
      reset();
      onConfirm(blob);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
      <DialogTitle>Crop image</DialogTitle>
      <DialogContent>
        <Box sx={{ position: "relative", width: "100%", height: 320, bgcolor: "#333", borderRadius: 1 }}>
          {imageSrc && (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={aspect || undefined}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropComplete={handleCropComplete}
            />
          )}
        </Box>

        <Stack spacing={2} sx={{ mt: 2.5 }}>
          <ToggleButtonGroup
            size="small"
            value={aspect}
            exclusive
            onChange={(_, val) => setAspect(val)}
          >
            {ASPECT_OPTIONS.map((opt) => (
              <ToggleButton key={opt.label} value={opt.value}>
                {opt.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <Box>
            <Typography variant="caption" color="text.secondary">
              Zoom
            </Typography>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.01}
              onChange={(_, val) => setZoom(val)}
              size="small"
            />
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">
              Straighten / Rotate
            </Typography>
            <Slider
              value={rotation}
              min={-180}
              max={180}
              step={0.5}
              onChange={(_, val) => setRotation(val)}
              size="small"
              marks={[{ value: 0 }]}
            />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} disabled={saving}>
          Cancel
        </Button>
        <Button onClick={handleConfirm} variant="contained" disabled={saving}>
          {saving ? "Saving..." : "Crop & Use"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
