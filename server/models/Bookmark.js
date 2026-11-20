const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true
  },
  url: {
    type: String,
    required: [true, "URL is required"],
    trim: true,
    validate: {
      validator: function (value) {
        try {
          const parsedUrl = new URL(value);
          return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
        } catch {
          return false;
        }
      },
      message: "Enter a valid HTTP or HTTPS URL"
    }
  },
  category: {
    type: String,
    enum: ["Work", "Learning", "Tools", "Entertainment"],
    default: "Tools"
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Bookmark", bookmarkSchema);
