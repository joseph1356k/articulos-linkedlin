# Gestor de publicaciones LinkedIn · Miracle AI

App Next.js para gestionar la serie de artículos de opinión "Radar de Opinión" antes de
publicarlos en LinkedIn: crear, editar, eliminar, programar fecha/hora y reordenar cada
publicación. No auto-publica en LinkedIn (eso requiere una App de LinkedIn Developers y
autorización OAuth del usuario) — el flujo es programar → copiar el texto cuando toca →
pegarlo en LinkedIn → marcar como publicado.

## Stack

- Next.js 14 (App Router), React 18.
- Supabase (Postgres) como base de datos — tabla `posts` en un proyecto Supabase dedicado
  (`linkedin-posts-cms`), con RLS abierta vía la anon key (herramienta interna, sin login
  propio; la URL no es pública ni indexada).

## Desarrollo local

```bash
npm install
npm run dev
```

## Estructura

- `app/page.js` — el dashboard completo (listar, crear, editar, borrar, programar, reordenar).
- `app/layout.js`, `app/globals.css` — layout y estilos.
- `lib/supabaseClient.js` — cliente de Supabase (URL + anon key).

## Modelo de datos (`posts`)

`title`, `category`, `news_headline`, `news_summary`, `facts` (jsonb), `sources` (jsonb),
`angle`, `content`, `status` (`draft` | `scheduled` | `published`), `scheduled_at`,
`published_at`, `position`.

## Despliegue

Desplegado en Vercel. El framework Next.js se detecta automáticamente; no requiere
variables de entorno (la anon key de Supabase va embebida en `lib/supabaseClient.js`
porque está protegida por RLS, no por secreto).
