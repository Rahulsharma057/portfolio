/**
 * Text copy karne ka reliable tareeka.
 *
 * navigator.clipboard sirf "secure context" me chalta hai - matlab HTTPS ya
 * localhost. Agar site plain HTTP pe deploy ho, ya browser ne permission na di ho,
 * ya document focused na ho, to woh silently fail ho jata hai.
 *
 * Isliye do step: pehle modern API, fail hone par purana execCommand wala
 * tareeka (jo har jagah chalta hai).
 *
 * @returns {Promise<boolean>} copy hua ya nahi
 */
export async function copyText(text) {
  if (!text) return false;

  // Step 1 - modern clipboard API
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) {
    // aage fallback try karenge
  }

  // Step 2 - fallback: ek chhupa hua textarea bana ke select + copy
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    // Screen se bahar rakho taaki page hile nahi aur mobile pe keyboard na khule
    ta.style.position = "fixed";
    ta.style.top = "0";
    ta.style.left = "0";
    ta.style.width = "1px";
    ta.style.height = "1px";
    ta.style.padding = "0";
    ta.style.border = "none";
    ta.style.outline = "none";
    ta.style.boxShadow = "none";
    ta.style.background = "transparent";
    ta.style.opacity = "0";

    document.body.appendChild(ta);

    ta.focus();
    ta.select();
    ta.setSelectionRange(0, text.length); // iOS ke liye zaroori

    const ok = document.execCommand("copy");
    document.body.removeChild(ta);

    return ok;
  } catch (err) {
    return false;
  }
}

export default copyText;
