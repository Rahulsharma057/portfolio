import { Box, Typography } from "@mui/material";

export default function EmptyState({ message = "Nothing here yet." }) {
  return (
    <Box
      sx={{
        py: 6,
        textAlign: "center",
        border: 1,
        borderColor: "divider",
        borderRadius: 3,
        borderStyle: "dashed",
      }}
    >
      <Typography color="text.secondary">{message}</Typography>
    </Box>
  );
}
