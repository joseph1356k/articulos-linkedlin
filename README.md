# Gestor de publicaciones LinkedIn · Miracle AI

App Next.js para gestionar la serie de artículos de opinión "Radar de Opinión" antes de
publicarlos en LinkedIn: crear, editar, eliminar, programar fecha/hora y reordenar cada
publicación. No auto-publica en LinkedIn (eso requiere una App de LinkedIn Developers y
autorización OAuth del usuario) — el flujo es programar → copiar el texto cuando toca →
pegarlo en LinkedIn → marcar como publicado.

## Stack

- Next.js 14 (App Router), React 18.
- **Vercel Blob** como almacenamiento — un único archivo `posts.json` con todas las
  publicaciones, leído y escrito desde `app/api/posts/route.js`. Sin Supabase, sin cuenta
  externa: todo vive dentro del mismo proyecto de Vercel.
- La primera vez que corre en un proyecto sin datos, `lib/blobStore.js` siembra
  automáticamente los 11 artículos originales (`lib/seedPosts.js`).

## Desarrollo local

```bash
npm install
npm run dev
```

Requiere la variable de entorno `BLOB_READ_WRITE_TOKEN` (Vercel la inyecta sola una vez
que el proyecto tiene un Blob Store conectado — ver más abajo).

## Estructura

- `app/page.js` — el dashboard completo (listar, crear, editar, borrar, programar, reordenar).
- `app/layout.js`, `app/globals.css` — layout y estilos.
- `app/api/posts/route.js` — API: `GET` devuelve la lista, `PUT` la reemplaza completa.
- `lib/blobStore.js` — lectura/escritura de `posts.json` en Vercel Blob.
- `lib/seedPosts.js` — los 11 artículos originales, usados solo para el primer arranque.

## Modelo de datos (cada publicación en `posts.json`)

`id`, `title`, `category`, `series` (`medicina` | `politica`), `news_headline`,
`news_summary`, `facts` (array), `sources` (array `{label, url}`), `angle`, `content`,
`status` (`draft` | `scheduled` | `published`), `scheduled_at`, `published_at`,
`position`, `created_at`, `updated_at`.

## Despliegue

Desplegado en Vercel. Para que la API funcione, el proyecto necesita un **Blob Store**
conectado (una sola vez, desde el dashboard de Vercel):

1. Panel del proyecto → pestaña **Storage** → **Create Database** → **Blob**.
2. Conéctalo a este proyecto (`articulos-linkedlin`). Vercel inyecta automáticamente
   `BLOB_READ_WRITE_TOKEN` — no hay que copiar ni pegar ningún secreto a mano.
3. Vuelve a visitar el sitio: la primera llamada a `/api/posts` crea `posts.json` con los
   11 artículos iniciales.
