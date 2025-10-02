const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/Auth");
const uploadRoutes = require("./routes/Upload");
const projectRoutes = require("./routes/Projects");
const skillsRoutes = require("./routes/Skills");
const contactRoutes = require("./routes/Contact");
const aboutRoutes = require("./routes/about");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Add response time header
app.use((req, res, next) => {
  req.startTime = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - req.startTime;
    console.log(`${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// Add cache headers for static content
app.use((req, res, next) => {
  if (req.url.includes('/api/')) {
    res.set('Cache-Control', 'public, max-age=300'); // 5 minute cache
  }
  next();
});

// Root route for health check
app.get("/", (req, res) => {
  res.json({
    message: "Backend API is running successfully!",
    status: "online",
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", uploadRoutes); // Re-enabled with Cloudinary storage
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/about", aboutRoutes);

module.exports = app;
