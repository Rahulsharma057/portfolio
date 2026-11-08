"use client";

import { useRef, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Slider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

/**
 * Hero image ko mobile aur desktop dono pe theek se baithane ke liye.
 *
 * Problem: background-size: cover image ko crop karta hai. Desktop frame chaura
 * hota hai, mobile frame tall - isliye ek hi position dono pe sahi nahi baithti.
 * Aksar mobile pe image ka main subject (chehra, building) kat jata hai.
 *
 * Solution: dono ke liye alag focal point. Image pe click karo, wahi point
 * frame ke beech me aa jata hai. Neeche live preview me turant dikh jata hai.
 */
export default function HeroImageAdjuster({
  image,
  focus = { x: 50, y: 50 },
  focusMobile = { x: 50, y: 40 },
  overlay = 82,
  blur = 0,
  onChange,
}) {
  const [device, setDevice] = useState("mobile");
  const imgRef = useRef(null);

  if (!image?.url) {
    return (
      <Paper
        variant="outlined"
        sx={{ p: 4, textAlign: "center", borderStyle: "dashed", bgcolor: "background.default" }}
      >
        <Typography color="text.secondary" variant="body2">
          Upload a hero background image above first, then you can set its position
          here for desktop and mobile separately.
        </Typography>
      </Paper>
    );
  }

  const active = device === "mobile" ? focusMobile : focus;
  const key = device === "mobile" ? "heroFocusMobile" : "heroFocus";

  // Image pe click -> us point ka percentage nikaalo
  const handlePick = (e) => {
    const rect = imgRef.current.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    onChange({ [key]: { x: Math.min(Math.max(x, 0), 100), y: Math.min(Math.max(y, 0), 100) } });
  };

  const previewSx = (f, ratio) => ({
    position: "relative",
    width: "100%",
    aspectRatio: ratio,
    borderRadius: 2,
    overflow: "hidden",
    border: 1,
    borderColor: "divider",
    backgroundImage: `url(${image.url})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: `${f.x}% ${f.y}%`,
  });

  const overlaySx = {
    position: "absolute",
    inset: 0,
    bgcolor: (th) =>
      th.palette.mode === "dark"
        ? `rgba(11, 16, 32, ${overlay / 100})`
        : `rgba(247, 247, 251, ${Math.min(overlay / 100 + 0.06, 1)})`,
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          sx={{ mb: 1.5 }}
        >
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Click the image to set the focal point
          </Typography>

          <ToggleButtonGroup
            size="small"
            exclusive
            value={device}
            onChange={(e, v) => v && setDevice(v)}
          >
            <ToggleButton value="mobile">Mobile</ToggleButton>
            <ToggleButton value="desktop">Desktop</ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <Box
          ref={imgRef}
          onClick={handlePick}
          sx={{
            position: "relative",
            cursor: "crosshair",
            borderRadius: 2,
            overflow: "hidden",
            border: 1,
            borderColor: "divider",
            lineHeight: 0,
            maxWidth: 560,
          }}
        >
          <Box component="img" src={image.url} alt="" sx={{ width: "100%", display: "block" }} />

          {/* Crosshair - jahan click kiya wahan */}
          <Box
            sx={{
              position: "absolute",
              left: `${active.x}%`,
              top: `${active.y}%`,
              transform: "translate(-50%, -50%)",
              width: 26,
              height: 26,
              borderRadius: "50%",
              border: "2px solid #fff",
              boxShadow: "0 0 0 2px rgba(0,0,0,0.55)",
              bgcolor: "rgba(127, 119, 221, 0.55)",
              pointerEvents: "none",
            }}
          />
        </Box>

        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
          {device === "mobile" ? "Mobile" : "Desktop"} focal point: {active.x}% / {active.y}%
          &nbsp;&mdash;&nbsp; on mobile keep it a little higher so the face or main subject
          does not get cropped out.
        </Typography>
      </Box>

      {/* Live preview - dono device ek saath */}
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 500, mb: 1.5 }}>
          Live preview
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "2fr 1fr" },
            gap: 2,
            alignItems: "start",
          }}
        >
          <Box>
            <Box sx={previewSx(focus, "16 / 9")}>
              <Box sx={overlaySx} />
              <Box sx={{ position: "absolute", left: 16, bottom: 14, zIndex: 1 }}>
                <Typography sx={{ fontWeight: 700, fontSize: 20 }}>Hi, I am Rahul Sharma</Typography>
                <Typography variant="caption" color="text.secondary">
                  Frontend Developer | MERN Stack
                </Typography>
              </Box>
            </Box>
            <Typography variant="caption" color="text.secondary">
              Desktop (16:9)
            </Typography>
          </Box>

          <Box sx={{ maxWidth: 190 }}>
            <Box sx={previewSx(focusMobile, "9 / 19.5")}>
              <Box sx={overlaySx} />
              <Box sx={{ position: "absolute", left: 12, bottom: 16, right: 12, zIndex: 1 }}>
                <Typography sx={{ fontWeight: 700, fontSize: 14, lineHeight: 1.25 }}>
                  Hi, I am Rahul Sharma
                </Typography>
                <Typography sx={{ fontSize: 9 }} color="text.secondary">
                  Frontend Developer
                </Typography>
              </Box>
            </Box>
            <Typography variant="caption" color="text.secondary">
              Mobile (390px)
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Overlay aur blur */}
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
          Overlay &mdash; {overlay}%
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block" }}>
          A veil over the image. Higher means the text reads more clearly but the photo
          shows less. 80&ndash;85% works for most photos.
        </Typography>
        <Slider
          value={overlay}
          min={0}
          max={100}
          step={1}
          marks={[{ value: 50, label: "50" }, { value: 82, label: "82" }, { value: 95, label: "95" }]}
          valueLabelDisplay="auto"
          onChange={(e, v) => onChange({ heroOverlay: v })}
          sx={{ maxWidth: 420 }}
        />
      </Box>

      <Box>
        <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
          Blur &mdash; {blur}px
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block" }}>
          For a busy photo a light blur (2&ndash;4px) helps the text stand out. 0 means no blur.
        </Typography>
        <Slider
          value={blur}
          min={0}
          max={20}
          step={1}
          marks={[{ value: 0, label: "0" }, { value: 4, label: "4" }, { value: 12, label: "12" }]}
          valueLabelDisplay="auto"
          onChange={(e, v) => onChange({ heroBlur: v })}
          sx={{ maxWidth: 420 }}
        />
      </Box>

      <Box>
        <Button
          size="small"
          startIcon={<RestartAltIcon />}
          onClick={() =>
            onChange({
              heroFocus: { x: 50, y: 50 },
              heroFocusMobile: { x: 50, y: 40 },
              heroOverlay: 82,
              heroBlur: 0,
            })
          }
        >
          Reset to defaults
        </Button>
      </Box>
    </Stack>
  );
}
