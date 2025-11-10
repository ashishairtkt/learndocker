const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL;

mongoose
  .connect(mongoUrl)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send(
    "🚀 Node.js + MongoDB + .env + init script running inside Docker Compose!"
  );
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
