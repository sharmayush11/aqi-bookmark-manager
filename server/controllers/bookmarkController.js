const mongoose = require("mongoose");
const Bookmark = require("../models/Bookmark");

function isValidHttpUrl(value) {
  try {
    const parsedUrl = new URL(value);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
}

// GET /api/bookmarks?category=Work&search=react&favorite=true
async function getBookmarks(req, res, next) {
  try {
    const filter = {};
    const { category, search, favorite } = req.query;

    if (category && category !== "All" && category !== "Favorites") {
      filter.category = category;
    }

    if (favorite === "true" || category === "Favorites") {
      filter.isFavorite = true;
    }

    if (search && search.trim()) {
      filter.title = { $regex: search.trim(), $options: "i" };
    }

    const bookmarks = await Bookmark.find(filter).sort({ createdAt: -1 });
    res.status(200).json(bookmarks);
  } catch (error) {
    next(error);
  }
}

// POST /api/bookmarks
async function createBookmark(req, res, next) {
  try {
    const { title, url, category } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!url || !isValidHttpUrl(url.trim())) {
      return res.status(400).json({
        message: "Enter a valid HTTP or HTTPS URL"
      });
    }

    const bookmark = await Bookmark.create({
      title: title.trim(),
      url: url.trim(),
      category: category || "Tools"
    });

    res.status(201).json(bookmark);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
}

// PATCH /api/bookmarks/:id/favorite
async function toggleFavorite(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    const bookmark = await Bookmark.findById(id);

    if (!bookmark) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    bookmark.isFavorite = !bookmark.isFavorite;
    await bookmark.save();

    res.status(200).json(bookmark);
  } catch (error) {
    next(error);
  }
}

// DELETE /api/bookmarks/:id
async function deleteBookmark(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    const bookmark = await Bookmark.findByIdAndDelete(id);

    if (!bookmark) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    res.status(200).json({ message: "Bookmark deleted successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getBookmarks,
  createBookmark,
  toggleFavorite,
  deleteBookmark
};
