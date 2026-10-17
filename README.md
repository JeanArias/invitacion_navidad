# Invitación · Fiesta de Navidad 2026

Sitio estático (HTML/CSS/JS) para GitHub Pages. RSVP se guardan como JSON en un repo **privado** mediante un Cloudflare Worker.

## Estructura
- `index.html`, `css/`, `js/`, `assets/` — sitio publicado (`assets/its-time.mp3` inicia en el segundo 13).
- `worker/` — API serverless (`/rsvp`).
- `.github/workflows/pages.yml` — despliegue automático a Pages al hacer push a `main`.
- `elementos/`, `design-craft/` — material de trabajo; no se publican.

## Despliegue
1. Sube este proyecto a `JeanArias/invitacion_navidad` (rama `main`). En *Settings → Pages* elige **Source: GitHub Actions**.
2. Crea un repo **privado** `JeanArias/invitacion_navidad_datos` con una rama `main` inicializada (README).
3. Crea un token *fine-grained* limitado a ese repo con permiso **Contents: Read and write**.
4. Despliega el Worker:
   ```
   cd worker
   npx wrangler secret put GITHUB_TOKEN
   npx wrangler deploy
   ```
5. Copia la URL del Worker en `js/config.js` (`apiUrl`) y haz push.

## Datos
Cada confirmación crea `rsvp/<fecha>-<id>.json` en el repo privado. La carta a Santa se escribe durante la fiesta (la invitación solo la anuncia).

## Nota sobre la música
Los navegadores exigen un gesto del usuario: el audio arranca al tocar el sobre y el botón ON/OFF permite silenciarlo. Verifica que tengas derecho a usar la canción si publicas el sitio.

## Vista previa en WhatsApp
`assets/og-image.jpg` (1200×630). WhatsApp cachea las vistas previas; si cambias la imagen, prueba con un parámetro nuevo en la URL (`?v=2`).
