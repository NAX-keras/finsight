/* ── BACKEND CONFIG ─────────────────────────────────────────── */
export const API_BASE = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || "";
export const HAS_BACKEND = API_BASE.length > 0;

export async function apiFetch(path, options = {}) {
  if (!HAS_BACKEND) return null;
  try {
    const r = await fetch(`${API_BASE}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}
