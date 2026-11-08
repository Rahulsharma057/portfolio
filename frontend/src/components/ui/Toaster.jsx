"use client";

import { ToastContainer } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import "react-toastify/dist/ReactToastify.css";

// Toast ka look app ke theme ke saath match karta hai -
// dark mode me dark toast, light mode me light.
export default function Toaster() {
  const theme = useTheme();

  return (
    <ToastContainer
      position="bottom-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      theme={theme.palette.mode}
      toastStyle={{
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 12,
        fontFamily: theme.typography.fontFamily,
        fontSize: "0.9rem",
      }}
      progressStyle={{ background: theme.palette.primary.main }}
    />
  );
}
