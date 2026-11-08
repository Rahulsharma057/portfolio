"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { dictionaries, DEFAULT_LANG, LANGUAGES } from "./translations";

const LanguageContext = createContext({
  lang: DEFAULT_LANG,
  setLang: () => {},
  t: (k) => k,
});

export const useTranslation = () => useContext(LanguageContext);

// "nav.about" jaisi key se nested object me se value nikalta hai
const dig = (obj, path) =>
  path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);

export function LanguageProvider({ children }) {
  // Default hamesha English. localStorage se baad me badalta hai,
  // isse server aur client ka pehla render match rehta hai.
  const [lang, setLangState] = useState(DEFAULT_LANG);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang");
      if (saved && dictionaries[saved]) setLangState(saved);
    } catch (err) {}
  }, []);

  useEffect(() => {
    // <html lang="..."> update karo - screen readers aur SEO ke liye
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", lang === "hi" ? "hi" : "en");
    }
  }, [lang]);

  const setLang = useCallback((next) => {
    if (!dictionaries[next]) return;
    try {
      localStorage.setItem("lang", next);
    } catch (err) {}
    setLangState(next);
  }, []);

  const t = useCallback(
    (key, vars) => {
      // Pehle chuni hui language, na mile to English, na mile to key hi
      let value = dig(dictionaries[lang], key);
      if (value === undefined) value = dig(dictionaries[DEFAULT_LANG], key);
      if (value === undefined) return key;

      if (vars) {
        return Object.keys(vars).reduce(
          (str, k) => str.replace(new RegExp(`\\{${k}\\}`, "g"), vars[k]),
          value
        );
      }
      return value;
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t, languages: LANGUAGES }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
