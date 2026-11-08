"use client";

import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

/**
 * Objects ki list edit karne ka generic editor.
 * Demo credentials aur about highlights dono isi se bante hain.
 *
 * subFields: [{ name, label, type?, options?, rows?, help? }]
 */
export default function RepeaterField({
  label,
  help,
  value = [],
  onChange,
  subFields = [],
  addLabel = "Add",
  emptyRow = {},
  max = 10,
}) {
  const rows = Array.isArray(value) ? value : [];

  const setRow = (i, name, v) =>
    onChange(rows.map((r, idx) => (idx === i ? { ...r, [name]: v } : r)));

  const add = () => onChange([...rows, { ...emptyRow }]);
  const remove = (i) => onChange(rows.filter((_, idx) => idx !== i));

  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= rows.length) return;
    const next = [...rows];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {label}
        </Typography>
        <Button size="small" startIcon={<AddIcon />} onClick={add} disabled={rows.length >= max}>
          {addLabel}
        </Button>
      </Stack>

      {help && (
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1.5 }}>
          {help}
        </Typography>
      )}

      {rows.length === 0 && (
        <Paper
          variant="outlined"
          sx={{ p: 2, textAlign: "center", borderStyle: "dashed", bgcolor: "background.default" }}
        >
          <Typography variant="caption" color="text.secondary">
            Nothing here yet. Use &quot;{addLabel}&quot; to add one.
          </Typography>
        </Paper>
      )}

      <Stack spacing={2}>
        {rows.map((row, i) => (
          <Paper key={i} variant="outlined" sx={{ p: 2, bgcolor: "background.default" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
              <Typography variant="caption" color="text.secondary">
                #{i + 1}
              </Typography>

              <Stack direction="row" spacing={0.5}>
                <Tooltip title="Move up">
                  <span>
                    <IconButton size="small" onClick={() => move(i, -1)} disabled={i === 0}>
                      <ArrowUpwardIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="Move down">
                  <span>
                    <IconButton
                      size="small"
                      onClick={() => move(i, 1)}
                      disabled={i === rows.length - 1}
                    >
                      <ArrowDownwardIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="Remove">
                  <IconButton size="small" color="error" onClick={() => remove(i)}>
                    <DeleteIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>

            <Stack spacing={2}>
              {subFields.map((f) =>
                f.type === "select" ? (
                  <TextField
                    key={f.name}
                    select
                    size="small"
                    label={f.label}
                    value={row[f.name] ?? ""}
                    onChange={(e) => setRow(i, f.name, e.target.value)}
                    helperText={f.help}
                    fullWidth
                  >
                    {(f.options || []).map((o) => (
                      <MenuItem key={o} value={o}>
                        {o}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <TextField
                    key={f.name}
                    size="small"
                    label={f.label}
                    value={row[f.name] ?? ""}
                    onChange={(e) => setRow(i, f.name, e.target.value)}
                    multiline={f.type === "textarea"}
                    rows={f.type === "textarea" ? f.rows || 3 : undefined}
                    helperText={f.help}
                    fullWidth
                  />
                )
              )}
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
