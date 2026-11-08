const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const MONTHS_HI = [
  "जन", "फ़र", "मार्च", "अप्रैल", "मई", "जून",
  "जुल", "अग", "सित", "अक्ट", "नव", "दिस",
];

export const formatMonthYear = (value, lang = "en") => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const names = lang === "hi" ? MONTHS_HI : MONTHS;
  return `${names[d.getMonth()]} ${d.getFullYear()}`;
};

export const formatDate = (value, lang = "en") => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const names = lang === "hi" ? MONTHS_HI : MONTHS;
  return `${d.getDate()} ${names[d.getMonth()]} ${d.getFullYear()}`;
};

// "Jun 2025 - Present"  |  presentLabel language ke hisaab se aata hai
export const dateRange = (start, end, isCurrent, presentLabel = "Present", lang = "en") => {
  const from = formatMonthYear(start, lang);
  const to = isCurrent || !end ? presentLabel : formatMonthYear(end, lang);
  if (!from) return to;
  return `${from} - ${to}`;
};

/**
 * "1 yr 6 mos" - labels bahar se aate hain taaki Hindi/Hinglish me bhi chale.
 * labels: { years, yearsPlural, months, monthsPlural }
 */
export const duration = (start, end, isCurrent, labels = {}) => {
  const {
    years: yr = "yr",
    yearsPlural: yrs = "yrs",
    months: mo = "mo",
    monthsPlural: mos = "mos",
  } = labels;

  if (!start) return "";
  const s = new Date(start);
  const e = isCurrent || !end ? new Date() : new Date(end);
  if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) return "";

  let months = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
  if (months < 0) months = 0;

  const y = Math.floor(months / 12);
  const m = months % 12;

  const parts = [];
  if (y) parts.push(`${y} ${y > 1 ? yrs : yr}`);
  if (m) parts.push(`${m} ${m > 1 ? mos : mo}`);

  return parts.join(" ") || `1 ${mo}`;
};

// Date input (yyyy-mm-dd) ke liye
export const toInputDate = (value) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
};
