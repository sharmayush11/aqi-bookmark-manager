const API_URL = "https://aqi-bookmark-manager.onrender.com/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed. Please try again.");
  }

  return data;
}

export function getBookmarks({ category, search }) {
  const params = new URLSearchParams();

  if (category && category !== "All" && category !== "Favorites") {
    params.set("category", category);
  }

  if (category === "Favorites") {
    params.set("favorite", "true");
  }

  if (search) {
    params.set("search", search);
  }

  const query = params.toString();

  return request(`/bookmarks${query ? `?${query}` : ""}`);
}

export function addBookmark(bookmark) {
  return request("/bookmarks", {
    method: "POST",
    body: JSON.stringify(bookmark),
  });
}

export function toggleFavorite(id) {
  return request(`/bookmarks/${id}/favorite`, {
    method: "PATCH",
  });
}

export function removeBookmark(id) {
  return request(`/bookmarks/${id}`, {
    method: "DELETE",
  });
}