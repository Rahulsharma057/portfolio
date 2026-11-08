// Database ka content teen languages me ho sakta hai.
// Har document me optional "translations" object hota hai:
//   { hi: { shortBio: "..." }, hinglish: { shortBio: "..." } }
// English hamesha main field me rehti hai (shortBio).
// Translation na mile to English fallback chala jata hai.

export function localized(doc, field, lang) {
  if (!doc) return "";
  if (lang && lang !== "en") {
    const value = doc.translations?.[lang]?.[field];
    if (value !== undefined && value !== null && value !== "") return value;
  }
  return doc[field] ?? "";
}

// Array fields (jaise experience ke points) ke liye
export function localizedList(doc, field, lang) {
  if (!doc) return [];
  if (lang && lang !== "en") {
    const value = doc.translations?.[lang]?.[field];
    if (Array.isArray(value) && value.length > 0) return value;
  }
  return Array.isArray(doc[field]) ? doc[field] : [];
}
