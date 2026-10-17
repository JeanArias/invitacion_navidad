// Cloudflare Worker: recibe RSVP y cartas y las guarda como JSON en un repo PRIVADO de GitHub.
// Secretos (wrangler secret put): GITHUB_TOKEN. Variables: ALLOWED_ORIGIN, DATA_REPO ("owner/repo"), DATA_BRANCH.

const LIMITS = { nombre: 80, nombres_acompanantes: 400 };

const json = (body, status, cors) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...cors },
  });

const clean = (v, max) => String(v ?? "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max);

function b64(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

async function saveFile(env, path, data) {
  const res = await fetch(`https://api.github.com/repos/${env.DATA_REPO}/contents/${path}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "invitacion-navidad-worker",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `Nuevo registro: ${path}`,
      content: b64(JSON.stringify(data, null, 2) + "\n"),
      branch: env.DATA_BRANCH || "main",
    }),
  });
  if (!res.ok) throw new Error(`GitHub ${res.status}`);
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowed = origin === env.ALLOWED_ORIGIN;
    const cors = allowed
      ? { "Access-Control-Allow-Origin": origin, "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", Vary: "Origin" }
      : { Vary: "Origin" };

    if (request.method === "OPTIONS") return new Response(null, { status: allowed ? 204 : 403, headers: cors });
    if (!allowed) return json({ error: "origen no permitido" }, 403, cors);
    if (request.method !== "POST") return json({ error: "método no permitido" }, 405, cors);

    const { pathname } = new URL(request.url);
    if (pathname !== "/rsvp") return json({ error: "no encontrado" }, 404, cors);

    let body;
    try {
      const raw = await request.text();
      if (raw.length > 8000) return json({ error: "demasiado grande" }, 413, cors);
      body = JSON.parse(raw);
    } catch {
      return json({ error: "JSON inválido" }, 400, cors);
    }

    // Honeypot: responde OK sin guardar
    if (body.website) return json({ ok: true }, 200, cors);

    const nombre = clean(body.nombre, LIMITS.nombre);
    if (!nombre) return json({ error: "nombre requerido" }, 400, cors);

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const acompanantes = Math.min(10, Math.max(0, parseInt(body.acompanantes, 10) || 0));
    const record = { id, createdAt, nombre, acompanantes, nombres_acompanantes: clean(body.nombres_acompanantes, LIMITS.nombres_acompanantes) };
    const path = `rsvp/${createdAt.replace(/[:.]/g, "-")}-${id.slice(0, 8)}.json`;
    try {
      await saveFile(env, path, record);
    } catch {
      return json({ error: "no se pudo guardar" }, 502, cors);
    }
    return json({ ok: true }, 200, cors);
  },
};
