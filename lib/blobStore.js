import { put, list } from "@vercel/blob";
import { SEED_POSTS } from "./seedPosts";

const POSTS_PATH = "posts.json";

function withDefaults(post) {
  const now = new Date().toISOString();
  return {
    id: post.id || crypto.randomUUID(),
    title: post.title || "",
    category: post.category || "",
    series: post.series === "politica" ? "politica" : "medicina",
    news_headline: post.news_headline || "",
    news_summary: post.news_summary || "",
    angle: post.angle || "",
    facts: Array.isArray(post.facts) ? post.facts : [],
    sources: Array.isArray(post.sources) ? post.sources : [],
    content: post.content || "",
    status: post.status || "draft",
    scheduled_at: post.scheduled_at || null,
    published_at: post.published_at || null,
    position: typeof post.position === "number" ? post.position : 0,
    created_at: post.created_at || now,
    updated_at: post.updated_at || now,
  };
}

export async function getPosts() {
  const { blobs } = await list({ prefix: POSTS_PATH, limit: 1 });
  const existing = blobs.find((b) => b.pathname === POSTS_PATH);

  if (!existing) {
    const seeded = SEED_POSTS.map(withDefaults);
    await savePosts(seeded);
    return seeded;
  }

  const res = await fetch(existing.url, { cache: "no-store" });
  if (!res.ok) throw new Error(`No se pudo leer ${POSTS_PATH}`);
  return res.json();
}

export async function savePosts(posts) {
  await put(POSTS_PATH, JSON.stringify(posts, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  return posts;
}
