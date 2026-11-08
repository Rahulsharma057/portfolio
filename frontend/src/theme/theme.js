import { createTheme } from "@mui/material/styles";
import { FONT_STACK } from "./fonts";

const common = {
  typography: {
    fontFamily: FONT_STACK,
    h1: {
      fontWeight: 700,
      fontSize: "clamp(2rem, 6vw, 3.6rem)",
      lineHeight: 1.15,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 700,
      fontSize: "clamp(1.6rem, 4vw, 2.5rem)",
      lineHeight: 1.2,
      letterSpacing: "-0.01em",
    },
    h3: { fontWeight: 600, fontSize: "clamp(1.2rem, 3vw, 1.6rem)", lineHeight: 1.3 },
    h4: { fontWeight: 600, fontSize: "1.15rem" },
    h5: { fontWeight: 600, fontSize: "1rem" },
    h6: { fontWeight: 600, fontSize: "0.95rem" },
    body1: { fontSize: "1rem", lineHeight: 1.7 },
    body2: { fontSize: "0.9rem", lineHeight: 1.65 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10, padding: "9px 20px" },
      },
    },
    MuiCard: {
      styleOverrides: { root: { backgroundImage: "none" } },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: "none" } },
    },
    MuiChip: {
      styleOverrides: { root: { fontWeight: 500 } },
    },
  },
};

const dark = {
  mode: "dark",
  primary: { main: "#7F77DD", contrastText: "#0B1020" },
  secondary: { main: "#5DCAA5", contrastText: "#04342C" },
  background: { default: "#0B1020", paper: "#1B2236" },
  text: { primary: "#FFFFFF", secondary: "#9CA0B0" },
  divider: "#2A3350",
};

const light = {
  mode: "light",
  primary: { main: "#5048C4", contrastText: "#FFFFFF" },
  secondary: { main: "#0F6E56", contrastText: "#FFFFFF" },
  background: { default: "#F7F7FB", paper: "#FFFFFF" },
  text: { primary: "#13162A", secondary: "#5A5F72" },
  divider: "#E3E4EE",
};

export const getTheme = (mode) =>
  createTheme({
    ...common,
    palette: mode === "light" ? light : dark,
  });
