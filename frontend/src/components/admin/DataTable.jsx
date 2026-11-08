"use client";

import {
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "@/i18n/LanguageContext";

export default function DataTable({ columns, rows, onEdit, onDelete }) {
  const { t } = useTranslation();

  if (!rows || rows.length === 0) {
    return (
      <Paper variant="outlined" sx={{ p: 5, textAlign: "center", borderStyle: "dashed" }}>
        <Typography color="text.secondary">{t("admin.noEntries")}</Typography>
      </Paper>
    );
  }

  return (
    <Paper variant="outlined">
      {/* Mobile pe table ko scroll karne dena zaroori hai */}
      <TableContainer sx={{ overflowX: "auto" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.key} sx={{ fontWeight: 600, whiteSpace: "nowrap" }}>
                  {col.label}
                </TableCell>
              ))}
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow key={row._id} hover>
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    {col.render ? col.render(row) : <Box>{row[col.key] ?? "-"}</Box>}
                  </TableCell>
                ))}

                <TableCell align="right">
                  <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                    <IconButton size="small" onClick={() => onEdit(row)} aria-label={t("admin.edit")}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => onDelete(row)}
                      aria-label={t("admin.delete")}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
