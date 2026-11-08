import { Box, CircularProgress } from "@mui/material";

export default function Loader({ minHeight = "40vh" }) {
  return (
    <Box sx={{ display: "grid", placeItems: "center", minHeight }}>
      <CircularProgress />
    </Box>
  );
}
