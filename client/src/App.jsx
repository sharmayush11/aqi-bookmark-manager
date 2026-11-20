import { useCallback, useEffect, useState } from "react";
import BookmarkForm from "./components/BookmarkForm";
import BookmarkCard from "./components/BookmarkCard";
import {
  getBookmarks,
  addBookmark,
  toggleFavorite,
  removeBookmark
} from "./services/bookmarkService";

const filters = ["All", "Favorites", "Work", "Learning", "Tools", "Entertainment"];

export default function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadBookmarks = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getBookmarks({ category, search });
      setBookmarks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [category, search]);

  useEffect(() => {
    const timer = setTimeout(loadBookmarks, 250);
    return () => clearTimeout(timer);
  }, [loadBookmarks]);

  async function handleAdd(bookmark) {
    setSaving(true);
    try {
      await addBookmark(bookmark);
      await loadBookmarks();
    } finally {
      setSaving(false);
    }
  }

  async function handleFavorite(id) {
    try {
      const updated = await toggleFavorite(id);
      setBookmarks((current) => {
        if (category === "Favorites" && !updated.isFavorite) {
          return current.filter((item) => item._id !== id);
        }
        return current.map((item) => item._id === id ? updated : item);
      });
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm("Delete this bookmark?");
    if (!confirmed) return;

    try {
      await removeBookmark(id);
      setBookmarks((current) => current.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  const favoriteCount = bookmarks.filter((item) => item.isFavorite).length;

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/">
          <span className="brand-mark">L</span>
          <span>link<span className="brand-light">vault</span></span>
        </a>
        <span className="topbar-note">YOUR PERSONAL LINK LIBRARY</span>
      </header>

      <section className="hero">
        <div>
          <span className="eyebrow">A BETTER WAY TO SAVE THE WEB</span>
          <h1>All your useful links.<br /><span>One tidy place.</span></h1>
          <p>Save the pages you love, keep them organized, and find them whenever you need.</p>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-card art-card-back">↗</div>
          <div className="art-card art-card-front">🔖</div>
          <span className="art-spark">✦</span>
        </div>
      </section>

      <section className="stats-row">
        <div className="stat-box">
          <span className="stat-number">{bookmarks.length}</span>
          <span className="stat-label">Links shown</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">{favoriteCount}</span>
          <span className="stat-label">Favorites shown</span>
        </div>
        <div className="stat-caption">A little organization goes a long way.</div>
      </section>

      <section className="workspace">
        <aside className="sidebar">
          <BookmarkForm onAdd={handleAdd} saving={saving} />
        </aside>

        <section className="library">
          <div className="library-heading">
            <div>
              <span className="eyebrow">YOUR COLLECTION</span>
              <h2>Saved bookmarks</h2>
            </div>
            <span className="result-count">{bookmarks.length} links</span>
          </div>

          <div className="search-wrap">
            <span>⌕</span>
            <input
              type="search"
              placeholder="Search by title..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="filter-row">
            {filters.map((item) => (
              <button
                key={item}
                className={`filter-button ${category === item ? "selected" : ""}`}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {error && <div className="error-banner">{error}</div>}

          {loading ? (
            <div className="state-box"><span className="loader" />Loading your bookmarks...</div>
          ) : bookmarks.length === 0 ? (
            <div className="state-box empty-state">
              <span className="empty-icon">🔖</span>
              <h3>No bookmarks found</h3>
              <p>Try another filter or add a new link using the form.</p>
            </div>
          ) : (
            <div className="bookmark-grid">
              {bookmarks.map((bookmark) => (
                <BookmarkCard
                  key={bookmark._id}
                  bookmark={bookmark}
                  onFavorite={handleFavorite}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>
      </section>

      <footer>Made to keep your internet a little more organized.</footer>
    </main>
  );
}
