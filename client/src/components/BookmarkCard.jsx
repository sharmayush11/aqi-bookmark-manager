export default function BookmarkCard({ bookmark, onFavorite, onDelete }) {
  let hostname = bookmark.url;
  try {
    hostname = new URL(bookmark.url).hostname.replace(/^www\./, "");
  } catch {
    // The API validates URLs, so this is only a display fallback.
  }

  return (
    <article className="bookmark-card">
      <div className="card-top">
        <span className={`category-tag ${bookmark.category.toLowerCase()}`}>
          {bookmark.category}
        </span>
        <button
          className={`icon-button favorite-button ${bookmark.isFavorite ? "active" : ""}`}
          onClick={() => onFavorite(bookmark._id)}
          aria-label={bookmark.isFavorite ? "Remove from favorites" : "Add to favorites"}
          title="Toggle favorite"
        >
          {bookmark.isFavorite ? "★" : "☆"}
        </button>
      </div>

      <h3>{bookmark.title}</h3>
      <p className="hostname">{hostname}</p>

      <div className="card-bottom">
        <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
          Visit link <span>↗</span>
        </a>
        <button
          className="delete-button"
          onClick={() => onDelete(bookmark._id)}
          aria-label={`Delete ${bookmark.title}`}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
