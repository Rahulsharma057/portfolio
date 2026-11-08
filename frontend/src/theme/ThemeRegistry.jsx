"use client";

import { useMemo } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ColorModeProvider, useColorMode } from "./ColorModeContext";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Toaster from "@/components/ui/Toaster";
import { getTheme } from "./theme";

function Inner({ children }) {
  const { mode } = useColorMode();
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LanguageProvider>
        {children}
        {/* Toaster theme ke andar hai taaki dark/light ke saath match kare */}
        <Toaster />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default function ThemeRegistry({ children }) {
  return (
    <AppRouterCacheProvider options={{ key: "mui" }}>
      <ColorModeProvider>
        <Inner>{children}</Inner>
      </ColorModeProvider>
    </AppRouterCacheProvider>
  );
}
