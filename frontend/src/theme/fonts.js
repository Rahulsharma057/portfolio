/**
 * Fonts self-hosted hain (npm package se), Google ke server se nahi.
 *
 * Do wajah:
 * 1. next/font/google build ke time Google se font download karta hai. Agar network
 *    slow ho, firewall block kare, ya CI me internet na ho - to poora build fail
 *    ho jata hai. Self-hosted font ke saath aisa kabhi nahi hota.
 * 2. Inter me Devanagari glyphs NAHI hain. Hindi text Inter me render hi nahi ho
 *    sakta - browser kisi bhi fallback font pe chala jata hai, isliye Hindi page
 *    pe font alag aur bhadda lagta hai. Isliye Noto Sans Devanagari alag se.
 *
 * Browser apne aap sahi font chunta hai: Latin letters Inter se, Devanagari
 * Noto Sans Devanagari se - kyunki font stack me dono hain.
 */

// Latin (English aur Hinglish)
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

// Devanagari (Hindi)
import "@fontsource/noto-sans-devanagari/400.css";
import "@fontsource/noto-sans-devanagari/500.css";
import "@fontsource/noto-sans-devanagari/600.css";
import "@fontsource/noto-sans-devanagari/700.css";

export const FONT_STACK =
  '"Inter", "Noto Sans Devanagari", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
