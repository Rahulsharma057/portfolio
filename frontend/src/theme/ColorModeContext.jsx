"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ColorModeContext = createContext({ mode: "dark", toggleMode: () => {} });

export const useColorMode = () => useContext(ColorModeContext);

export function ColorModeProvider({ children }) {
  const [mode, setMode] = useState("dark");
  const [mounted, setMounted] = useState(false);

  // Pehle render ke baad localStorage se purana choice uthate hain.
  // Isse server aur client ka HTML match rehta hai (hydration error nahi aata).
  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme-mode");
      if (saved === "light" || saved === "dark") {
        setMode(saved);
      } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        setMode("light");
      }
    } catch (err) {
      // private mode me localStorage block ho sakta hai - default dark chalega
    }
    setMounted(true);
  }, []);

  const value = useMemo(
    () => ({
      mode,
      toggleMode: () =>
        setMode((prev) => {
          const next = prev === "dark" ? "light" : "dark";
          try {
            localStorage.setItem("theme-mode", next);
          } catch (err) {}
          return next;
        }),
    }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={value}>
      <div style={{ visibility: mounted ? "visible" : "hidden" }}>{children}</div>
    </ColorModeContext.Provider>
  );
}
