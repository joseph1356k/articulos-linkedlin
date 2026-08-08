"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const STATUS_LABEL = {
  draft: "Borrador",
  scheduled: "Programado",
  published: "Publicado",
};

const EMPTY_FORM = {
  title: "",
  category: "",
  news_headline: "",
  news_summary: "",
  angle: "",
  facts: "",
  sources: "",
  content: "",
};

function toDatetimeLocalValue(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

function formatDateTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleString("es-CO", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function postToFormValues(post) {
  return {
    title: post.title || "",
    category: post.category || "",
    news_headline: post.news_headline || "",
    news_summary: post.news_summary || "",
    angle: post.angle || "",
    facts: (post.facts || []).join("\n"),
    sources: (post.sources || [])
      .map((s) => `${s.label}|${s.url}`)
      .join("\n"),
    content: post.content || "",
  };
}

function formValuesToPayload(values) {
  return {
    title: values.title.trim(),
    category: values.category.trim(),
    news_headline: values.news_headline.trim(),
    news_summary: values.news_summary.trim(),
    angle: values.angle.trim(),
    content: values.content,
    facts: values.facts
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean),
    sources: values.sources
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map((line) => {
        const [label, ...rest] = line.split("|");
        return { label: (label || "").trim(), url: rest.join("|").trim() };
      })
      .filter((s) => s.label && s.url),
  };
}

export default function Page() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formValues, setFormValues] = useState(EMPTY_FORM);
  const [savingForm, setSavingForm] = useState(false);
  const [expandedIds, setExpandedIds] = useState({});
  const [scheduleOpenId, setScheduleOpenId] = useState(null);
  const [scheduleValue, setScheduleValue] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [busyId, setBusyId] = useState(null);

  async function fetchPosts() {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("position", { ascending: true });
    if (error) {
      setError(error.message);
    } else {
      setError("");
      setPosts(data || []);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const now = Date.now();
  const duePosts = useMemo(
    () =>
      posts.filter(
        (p) =>
          p.status === "scheduled" &&
          p.scheduled_at &&
          new Date(p.scheduled_at).getTime() <= now
      ),
    [posts, now]
  );

  function openCreateForm() {
    setEditingId(null);
    setFormValues(EMPTY_FORM);
    setShowForm(true);
  }

  function openEditForm(post) {
    setEditingId(post.id);
    setFormValues(postToFormValues(post));
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setFormValues(EMPTY_FORM);
  }

  async function submitForm(e) {
    e.preventDefault();
    if (!formValues.title.trim() || !formValues.content.trim()) return;
    setSavingForm(true);
    const payload = formValuesToPayload(formValues);
    if (editingId) {
      const { error } = await supabase
        .from("posts")
        .update(payload)
        .eq("id", editingId);
      if (error) setError(error.message);
    } else {
      const nextPosition =
        posts.length > 0 ? Math.max(...posts.map((p) => p.position)) + 1 : 1;
      const { error } = await supabase
        .from("posts")
        .insert({ ...payload, position: nextPosition, status: "draft" });
      if (error) setError(error.message);
    }
    setSavingForm(false);
    closeForm();
    fetchPosts();
  }

  async function deletePost(post) {
    if (!window.confirm(`¿Eliminar "${post.title}"? Esta acción no se puede deshacer.`))
      return;
    setBusyId(post.id);
    const { error } = await supabase.from("posts").delete().eq("id", post.id);
    if (error) setError(error.message);
    setBusyId(null);
    fetchPosts();
  }

  async function moveBy(post, direction) {
    const sorted = [...posts].sort((a, b) => a.position - b.position);
    const idx = sorted.findIndex((p) => p.id === post.id);
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= sorted.length) return;
    const other = sorted[targetIdx];
    setBusyId(post.id);
    await Promise.all([
      supabase.from("posts").update({ position: other.position }).eq("id", post.id),
      supabase.from("posts").update({ position: post.position }).eq("id", other.id),
    ]);
    setBusyId(null);
    fetchPosts();
  }

  function toggleExpanded(id) {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function openSchedule(post) {
    setScheduleOpenId(post.id);
    setScheduleValue(toDatetimeLocalValue(post.scheduled_at) || "");
  }

  async function saveSchedule(post) {
    if (!scheduleValue) return;
    setBusyId(post.id);
    const iso = new Date(scheduleValue).toISOString();
    const { error } = await supabase
      .from("posts")
      .update({ status: "scheduled", scheduled_at: iso })
      .eq("id", post.id);
    if (error) setError(error.message);
    setBusyId(null);
    setScheduleOpenId(null);
    fetchPosts();
  }

  async function clearSchedule(post) {
    setBusyId(post.id);
    const { error } = await supabase
      .from("posts")
      .update({ status: "draft", scheduled_at: null })
      .eq("id", post.id);
    if (error) setError(error.message);
    setBusyId(null);
    fetchPosts();
  }

  async function markPublished(post) {
    setBusyId(post.id);
    const { error } = await supabase
      .from("posts")
      .update({ status: "published", published_at: new Date().toISOString() })
      .eq("id", post.id);
    if (error) setError(error.message);
    setBusyId(null);
    fetchPosts();
  }

  async function copyPost(post) {
    try {
      await navigator.clipboard.writeText(post.content);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = post.content;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {}
      document.body.removeChild(ta);
    }
    setCopiedId(post.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  const sortedPosts = [...posts].sort((a, b) => a.position - b.position);

  return (
    <div className="wrap">
      <header>
        <div className="kicker">
          <span className="dot" />
          MIRACLE AI · SERIE DE AUTORIDAD EN LINKEDIN
        </div>
        <h1>Gestor de publicaciones</h1>
        <p className="subtitle">
          Crea, edita, elimina, programa y ordena los artículos de opinión de la
          serie Radar de Opinión. Cuando llegue el momento de publicar, copia el
          texto y pégalo en LinkedIn — luego márcalo como publicado.
        </p>
      </header>

      {duePosts.length > 0 && (
        <div className="due-banner">
          <b>
            {duePosts.length === 1
              ? "1 publicación lista para publicar hoy:"
              : `${duePosts.length} publicaciones listas para publicar hoy:`}
          </b>{" "}
          {duePosts.map((p) => p.title).join(" · ")}
        </div>
      )}

      {error && <div className="due-banner">Error: {error}</div>}

      <div className="toolbar">
        <span className="meta-line">
          {loading ? "Cargando…" : `${posts.length} publicación(es)`}
        </span>
        <button className="btn btn-primary" onClick={openCreateForm}>
          + Nueva publicación
        </button>
      </div>

      {!loading && sortedPosts.length === 0 && (
        <div className="empty">
          Todavía no hay publicaciones. Crea la primera con «+ Nueva publicación».
        </div>
      )}

      <div className="post-list">
        {sortedPosts.map((post, idx) => {
          const isDue =
            post.status === "scheduled" &&
            post.scheduled_at &&
            new Date(post.scheduled_at).getTime() <= now;
          const expanded = !!expandedIds[post.id];
          const busy = busyId === post.id;

          return (
            <div className="post-card" key={post.id}>
              <div className="post-card-top">
                <div className="post-card-title-row">
                  <span className="pos-num">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="post-title">{post.title}</span>
                </div>
                <div className="badges">
                  {post.category && (
                    <span className="badge badge-category">{post.category}</span>
                  )}
                  {post.status === "draft" && (
                    <span className="badge badge-draft">Borrador</span>
                  )}
                  {post.status === "scheduled" && (
                    <span className={`badge badge-scheduled${isDue ? " due" : ""}`}>
                      {isDue ? "Listo para publicar" : "Programado"}
                    </span>
                  )}
                  {post.status === "published" && (
                    <span className="badge badge-published">Publicado</span>
                  )}
                </div>
              </div>

              <div className="post-card-body">
                {post.status === "scheduled" && post.scheduled_at && (
                  <div className="meta-line">
                    Programado para {formatDateTime(post.scheduled_at)}
                  </div>
                )}
                {post.status === "published" && post.published_at && (
                  <div className="meta-line">
                    Publicado el {formatDateTime(post.published_at)}
                  </div>
                )}

                <div
                  className={`post-content-preview${expanded ? " expanded" : " clamped"}`}
                >
                  {post.content}
                </div>
                <button className="link-toggle" onClick={() => toggleExpanded(post.id)}>
                  {expanded ? "Mostrar menos ▲" : "Mostrar todo ▼"}
                </button>

                <div className="actions-row">
                  <button
                    className="btn-icon"
                    disabled={busy || idx === 0}
                    onClick={() => moveBy(post, -1)}
                    title="Subir"
                  >
                    ↑
                  </button>
                  <button
                    className="btn-icon"
                    disabled={busy || idx === sortedPosts.length - 1}
                    onClick={() => moveBy(post, 1)}
                    title="Bajar"
                  >
                    ↓
                  </button>
                  <button
                    className={`btn btn-primary copy-btn${copiedId === post.id ? " copied" : ""}`}
                    onClick={() => copyPost(post)}
                  >
                    {copiedId === post.id ? "✓ Copiado" : "📋 Copiar"}
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => openSchedule(post)}
                  >
                    🗓️ Programar
                  </button>
                  {post.status !== "published" && (
                    <button
                      className="btn btn-secondary"
                      disabled={busy}
                      onClick={() => markPublished(post)}
                    >
                      ✅ Marcar publicado
                    </button>
                  )}
                  {post.status === "scheduled" && (
                    <button
                      className="btn btn-secondary"
                      disabled={busy}
                      onClick={() => clearSchedule(post)}
                    >
                      Volver a borrador
                    </button>
                  )}
                  <button className="btn btn-secondary" onClick={() => openEditForm(post)}>
                    ✏️ Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    disabled={busy}
                    onClick={() => deletePost(post)}
                  >
                    🗑️ Eliminar
                  </button>
                </div>

                {scheduleOpenId === post.id && (
                  <div className="schedule-box">
                    <input
                      type="datetime-local"
                      value={scheduleValue}
                      onChange={(e) => setScheduleValue(e.target.value)}
                    />
                    <button
                      className="btn btn-primary"
                      disabled={busy || !scheduleValue}
                      onClick={() => saveSchedule(post)}
                    >
                      Guardar fecha
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setScheduleOpenId(null)}
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showForm && (
        <div className="modal-backdrop" onClick={closeForm}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingId ? "Editar publicación" : "Nueva publicación"}</h2>
            <form onSubmit={submitForm}>
              <div className="field">
                <label>Título</label>
                <input
                  type="text"
                  value={formValues.title}
                  onChange={(e) =>
                    setFormValues((v) => ({ ...v, title: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="field">
                <label>Categoría / etiqueta</label>
                <input
                  type="text"
                  placeholder="Ej: Punto de dolor, Debate / futuro…"
                  value={formValues.category}
                  onChange={(e) =>
                    setFormValues((v) => ({ ...v, category: e.target.value }))
                  }
                />
              </div>
              <div className="field">
                <label>Titular de la noticia (opcional)</label>
                <input
                  type="text"
                  value={formValues.news_headline}
                  onChange={(e) =>
                    setFormValues((v) => ({ ...v, news_headline: e.target.value }))
                  }
                />
              </div>
              <div className="field">
                <label>Resumen de la noticia (opcional)</label>
                <textarea
                  rows={2}
                  value={formValues.news_summary}
                  onChange={(e) =>
                    setFormValues((v) => ({ ...v, news_summary: e.target.value }))
                  }
                />
              </div>
              <div className="field">
                <label>Datos clave (opcional, uno por línea)</label>
                <textarea
                  rows={3}
                  value={formValues.facts}
                  onChange={(e) =>
                    setFormValues((v) => ({ ...v, facts: e.target.value }))
                  }
                />
              </div>
              <div className="field">
                <label>Fuentes (opcional, formato: Etiqueta|https://url, una por línea)</label>
                <textarea
                  rows={2}
                  value={formValues.sources}
                  onChange={(e) =>
                    setFormValues((v) => ({ ...v, sources: e.target.value }))
                  }
                />
              </div>
              <div className="field">
                <label>Ángulo editorial (opcional)</label>
                <textarea
                  rows={2}
                  value={formValues.angle}
                  onChange={(e) =>
                    setFormValues((v) => ({ ...v, angle: e.target.value }))
                  }
                />
              </div>
              <div className="field">
                <label>Contenido del post</label>
                <textarea
                  rows={10}
                  required
                  value={formValues.content}
                  onChange={(e) =>
                    setFormValues((v) => ({ ...v, content: e.target.value }))
                  }
                />
                <div className="field-hint">
                  Este es el texto que se copia con el botón «Copiar».
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={closeForm}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary" disabled={savingForm}>
                  {savingForm ? "Guardando…" : editingId ? "Guardar cambios" : "Crear publicación"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer>
        Radar de Opinión · Miracle AI — gestor interno de publicaciones para
        LinkedIn.
      </footer>
    </div>
  );
}
