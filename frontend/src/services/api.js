const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

/**
 * Backend integration boundary. The UI runs in demo mode while no API URL is
 * configured. When the Python API is ready, implement POST /api/audits here.
 */
export async function scanWebsite(url) {
  if (!API_BASE_URL) {
    await new Promise(resolve => setTimeout(resolve, 900));
    return { mode: "demo" };
  }

  const response = await fetch(`${API_BASE_URL}/api/audits`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body.detail || body.error || `Audit request failed (${response.status}).`);
  }
  return body;
}
