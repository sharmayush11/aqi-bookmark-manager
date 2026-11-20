import { useState } from "react";

const categories = ["Work", "Learning", "Tools", "Entertainment"];

function isValidHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function BookmarkForm({ onAdd, saving }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("Learning");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Please enter a title.");
      return;
    }

    if (!isValidHttpUrl(url.trim())) {
      setError("Enter a valid link starting with http:// or https://");
      return;
    }

    setError("");

    try {
      await onAdd({ title: title.trim(), url: url.trim(), category });
      setTitle("");
      setUrl("");
      setCategory("Learning");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <span className="eyebrow">SAVE A NEW LINK</span>
          <h2>Add bookmark</h2>
        </div>
        <span className="plus-icon">＋</span>
      </div>

      <label htmlFor="title">Title</label>
      <input
        id="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="e.g. React documentation"
        maxLength="100"
      />

      <label htmlFor="url">Website URL</label>
      <input
        id="url"
        type="text"
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        placeholder="https://example.com"
      />

      <label htmlFor="category">Category</label>
      <select
        id="category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        {categories.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>

      {error && <p className="form-error">{error}</p>}

      <button className="primary-button" type="submit" disabled={saving}>
        {saving ? "Saving..." : "＋  Save bookmark"}
      </button>
    </form>
  );
}
