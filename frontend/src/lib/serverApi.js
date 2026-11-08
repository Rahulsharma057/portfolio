// Server components ke liye - plain fetch, koi localStorage nahi.
// Backend band ho to bhi page crash nahi hoga, fallback chala jayega.

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export async function getJSON(path, fallback = null) {
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
    if (!res.ok) return fallback;

    const json = await res.json();
    return json?.data ?? fallback;
  } catch (err) {
    console.warn(`[api] ${path} is not reachable:`, err.message);
    return fallback;
  }
}
