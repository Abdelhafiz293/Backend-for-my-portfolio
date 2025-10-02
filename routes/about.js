const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const upload = require("../middlewares/cloudinary-upload"); // Use Cloudinary upload
const {
  getAbout,
  createOrUpdateAbout,
  updateAboutImage,
  deleteAbout,
} = require("../controllers/aboutController");

// Get about information (public route)
router.get("/", getAbout);

// Create or update about information (protected route)
router.post("/", auth, createOrUpdateAbout);

// Update about information (protected route)
router.put("/", auth, createOrUpdateAbout);

// Upload profile image for about (protected route) - Temporarily disabled
// router.post("/upload-image", auth, upload.single("image"), updateAboutImage);

// Delete about information (protected route)
router.delete("/", auth, deleteAbout);

module.exports = router;
