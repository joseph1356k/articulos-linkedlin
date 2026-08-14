"use client";

import { useEffect, useMemo, useState } from "react";

const EMPTY_FORM = {
  title: "",
  category: "",
  series: "medicina",
  news_headline: "",
  news_summary: "",
  angle: "",
  facts: "",
  sources: "",
  content: "",
};

const SERIES_LABEL = {
  medicina: "🩺 Noticias médicas",
  politica: "🏛️ Política y sistemas",
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
    series: post.series || "medicina",
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
    series: values.series === "politica" ? "politica" : "medicina",
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

function postHaystack(post) {
  return [
    post.title,
    post.content,
    post.category,
    post.news_headline,
    post.news_summary,
    SERIES_LABEL[post.series] || "",
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
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
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  async function fetchPosts() {
    setLoading(true);
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al cargar");
      setError("");
      setPosts(data.posts || []);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  async function persist(nextPosts) {
    const res = await fetch("/api/posts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ posts: nextPosts }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error al guardar");
    setPosts(data.posts || []);
    return data.posts;
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const now = Date.now();
  const sortedPosts = [...posts].sort((a, b) => a.position - b.position);

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

  const counts = useMemo(
    () => ({
      all: sortedPosts.length,
      medicina: sortedPosts.filter((p) => p.series === "medicina").length,
      politica: sortedPosts.filter((p) => p.series === "politica").length,
      pending: sortedPosts.filter((p) => p.status !== "published").length,
      published: sortedPosts.filter((p) => p.status === "published").length,
    }),
    [sortedPosts]
  );

  const query = searchQuery.trim().toLowerCase();

  function matchesFilter(post) {
    if (activeFilter === "medicina") return post.series === "medicina";
    if (activeFilter === "politica") return post.series === "politica";
    if (activeFilter === "pending") return post.status !== "published";
    if (activeFilter === "published") return post.status === "published";
    return true;
  }

  function matchesSearch(post) {
    return query === "" || postHaystack(post).includes(query);
  }

  const visibleCount = sortedPosts.filter(
    (p) => matchesFilter(p) && matchesSearch(p)
  ).length;

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
    const now = new Date().toISOString();
    try {
      let nextPosts;
      if (editingId) {
        nextPosts = posts.map((p) =>
          p.id === editingId ? { ...p, ...payload, updated_at: now } : p
        );
      } else {
        const nextPosition =
          posts.length > 0 ? Math.max(...posts.map((p) => p.position)) + 1 : 1;
        const newPost = {
          ...payload,
          id: crypto.randomUUID(),
          position: nextPosition,
          status: "draft",
          scheduled_at: null,
          published_at: null,
          created_at: now,
          updated_at: now,
        };
        nextPosts = [...posts, newPost];
      }
      await persist(nextPosts);
    } catch (err) {
      setError(err.message);
    }
    setSavingForm(false);
    closeForm();
  }

  async function deletePost(post) {
    if (!window.confirm(`¿Eliminar "${post.title}"? Esta acción no se puede deshacer.`))
      return;
    setBusyId(post.id);
    try {
      await persist(posts.filter((p) => p.id !== post.id));
    } catch (err) {
      setError(err.message);
    }
    setBusyId(null);
  }

  async function moveBy(post, direction) {
    const idx = sortedPosts.findIndex((p) => p.id === post.id);
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= sortedPosts.length) return;
    const other = sortedPosts[targetIdx];
    setBusyId(post.id);
    try {
      const nextPosts = posts.map((p) => {
        if (p.id === post.id) return { ...p, position: other.position };
        if (p.id === other.id) return { ...p, position: post.position };
        return p;
      });
      await persist(nextPosts);
    } catch (err) {
      setError(err.message);
    }
    setBusyId(null);
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
    try {
      const nextPosts = posts.map((p) =>
        p.id === post.id ? { ...p, status: "scheduled", scheduled_at: iso } : p
      );
      await persist(nextPosts);
      setScheduleOpenId(null);
    } catch (err) {
      setError(err.message);
    }
    setBusyId(null);
  }

  async function togglePublished(post) {
    setBusyId(post.id);
    const goingLive = post.status !== "published";
    const patch = goingLive
      ? { status: "published", published_at: new Date().toISOString() }
      : { status: "draft", scheduled_at: null, published_at: null };
    try {
      const nextPosts = posts.map((p) => (p.id === post.id ? { ...p, ...patch } : p));
      await persist(nextPosts);
    } catch (err) {
      setError(err.message);
    }
    setBusyId(null);
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
        <div className="meta-row">
          <span className="meta-chip">🗂️ {counts.all} artículos en 2 series</span>
          <span className="meta-chip">
            ✍️ Voz: primera persona, fundador construyendo en salud + IA
          </span>
          <span className="meta-chip">📊 Todas las cifras con fuente enlazada</span>
        </div>
      </header>

      <div className="toolbar">
        <div className="toolbar-row">
          <div className="search-box">
            <span>🔎</span>
            <input
              type="text"
              placeholder="Buscar por palabra clave, tema o cifra…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="progress-wrap">
            <span>
              {counts.published} / {counts.all} publicados
            </span>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${counts.all ? Math.round((counts.published / counts.all) * 100) : 0}%`,
                }}
              />
            </div>
          </div>
        </div>
        <div className="filters">
          <button
            className={`filter-chip${activeFilter === "all" ? " active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            Todos ({counts.all})
          </button>
          <button
            className={`filter-chip${activeFilter === "medicina" ? " active" : ""}`}
            onClick={() => setActiveFilter("medicina")}
          >
            🩺 Noticias médicas ({counts.medicina})
          </button>
          <button
            className={`filter-chip${activeFilter === "politica" ? " active" : ""}`}
            onClick={() => setActiveFilter("politica")}
          >
            🏛️ Política y sistemas ({counts.politica})
          </button>
          <button
            className={`filter-chip${activeFilter === "pending" ? " active" : ""}`}
            onClick={() => setActiveFilter("pending")}
          >
            ⬜ Pendientes ({counts.pending})
          </button>
          <button
            className={`filter-chip${activeFilter === "published" ? " active" : ""}`}
            onClick={() => setActiveFilter("published")}
          >
            ✅ Publicados ({counts.published})
          </button>
        </div>
      </div>

      <div className="howto">
        <div>
          <b>1 · Lee la noticia</b>Columna izquierda: el hecho, las cifras clave y
          los enlaces a la fuente original.
        </div>
        <div>
          <b>2 · Copia el artículo</b>Columna derecha: el post completo, listo
          para pegar en LinkedIn.
        </div>
        <div>
          <b>3 · Programa y marca</b>Prográmalo para una fecha, o márcalo
          publicado cuando lo pegues — el progreso queda guardado en la base de
          datos, no solo en tu navegador.
        </div>
      </div>

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

      <div className="list-toolbar">
        <span className="meta-line">
          {loading ? "Cargando…" : `${sortedPosts.length} publicación(es)`}
        </span>
        <button className="btn btn-primary new-post-btn" onClick={openCreateForm}>
          + Nueva publicación
        </button>
      </div>

      {!loading && sortedPosts.length === 0 && (
        <div className="empty">
          Todavía no hay publicaciones. Crea la primera con «+ Nueva publicación».
        </div>
      )}

      {!loading && sortedPosts.length > 0 && visibleCount === 0 && (
        <div className="no-results">
          No hay artículos que coincidan con tu búsqueda o filtro. Prueba con otra
          palabra o quita el filtro.
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
          const isPublished = post.status === "published";
          const hidden = !(matchesFilter(post) && matchesSearch(post));

          return (
            <div
              className={`post-card${isPublished ? " is-published" : ""}${hidden ? " is-hidden" : ""}`}
              key={post.id}
              id={`card-${idx + 1}`}
            >
              <div className="post-card-top">
                <div className="post-card-title-row">
                  <span className="pos-num">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="post-title">{post.title}</span>
                </div>
                <div className="badges">
                  <span
                    className={`badge ${post.series === "politica" ? "badge-politica" : "badge-medicina"}`}
                  >
                    {SERIES_LABEL[post.series] || SERIES_LABEL.medicina}
                  </span>
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
                  <button
                    className={`pub-btn${isPublished ? " is-on" : ""}`}
                    disabled={busy}
                    onClick={() => togglePublished(post)}
                  >
                    {isPublished ? "✅ Publicado" : "☐ Marcar publicado"}
                  </button>
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
                <label>Serie</label>
                <select
                  value={formValues.series}
                  onChange={(e) =>
                    setFormValues((v) => ({ ...v, series: e.target.value }))
                  }
                  style={{
                    width: "100%",
                    fontFamily: "inherit",
                    fontSize: "14px",
                    padding: "9px 12px",
                    border: "1px solid var(--line)",
                    borderRadius: "8px",
                  }}
                >
                  <option value="medicina">🩺 Noticias médicas</option>
                  <option value="politica">🏛️ Política y sistemas</option>
                </select>
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
