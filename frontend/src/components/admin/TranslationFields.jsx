"use client";

import { useState } from "react";
import { Alert, Box, Stack, Tab, Tabs, TextField } from "@mui/material";

/**
 * Hindi aur Hinglish translations ke liye editor.
 *
 * English hamesha main fields me rehti hai (title, shortBio...).
 * Yeh component sirf translations object bharta hai:
 *   { hi: { shortBio: "..." }, hinglish: { shortBio: "..." } }
 *
 * Koi field khali chhod do to website pe English wali value dikhegi.
 */
const LANGS = [
  { code: "hi", label: "हिन्दी (Hindi)" },
  { code: "hinglish", label: "Hinglish" },
];

export default function TranslationFields({ value = {}, onChange, fields = [] }) {
  const [tab, setTab] = useState("hi");

  const setField = (lang, name, v) =>
    onChange({
      ...value,
      [lang]: { ...(value[lang] || {}), [name]: v },
    });

  const get = (lang, name) => value?.[lang]?.[name];

  return (
    <Box>
      <Alert severity="info" sx={{ mb: 2 }}>
        English lives in the fields above. Only fill in Hindi and Hinglish here -
        anything left empty falls back to English on the website.
      </Alert>

      <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 2 }}>
        {LANGS.map((l) => (
          <Tab key={l.code} value={l.code} label={l.label} />
        ))}
      </Tabs>

      <Stack spacing={2.5}>
        {fields.map((f) => {
          const current = get(tab, f.name);

          if (f.type === "lines") {
            return (
              <TextField
                key={f.name}
                label={f.label}
                value={Array.isArray(current) ? current.join("\n") : ""}
                onChange={(e) =>
                  setField(tab, f.name, e.target.value.split("\n").map((x) => x.trimStart()))
                }
                onBlur={(e) =>
                  setField(
                    tab,
                    f.name,
                    e.target.value.split("\n").map((x) => x.trim()).filter(Boolean)
                  )
                }
                multiline
                rows={f.rows || 5}
                helperText="One point per line"
                fullWidth
              />
            );
          }

          return (
            <TextField
              key={f.name}
              label={f.label}
              value={current ?? ""}
              onChange={(e) => setField(tab, f.name, e.target.value)}
              multiline={f.type === "textarea"}
              rows={f.type === "textarea" ? f.rows || 4 : undefined}
              fullWidth
            />
          );
        })}
      </Stack>
    </Box>
  );
}
