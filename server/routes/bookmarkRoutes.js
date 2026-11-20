const express = require("express");
const {
  getBookmarks,
  createBookmark,
  toggleFavorite,
  deleteBookmark
} = require("../controllers/bookmarkController");

const router = express.Router();

router.route("/")
  .get(getBookmarks)
  .post(createBookmark);

router.patch("/:id/favorite", toggleFavorite);
router.delete("/:id", deleteBookmark);

module.exports = router;
