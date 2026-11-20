const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const bookmarkRoutes = require("./routes/bookmarkRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();

// Allowed frontend URLs
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",").map((url) => url.trim())
  : ["http://localhost:5173"];

// Middleware
app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Bookmark Manager API is running",
  });
});

// Bookmark routes
app.use("/api/bookmarks", bookmarkRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect database and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Server startup failed:", error.message);
  });
