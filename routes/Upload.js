const express = require("express");
const router = express.Router();
const upload = require("../middlewares/cloudinary-upload"); // Use Cloudinary upload
const auth = require("../middlewares/auth");
const { uploadImage } = require("../controllers/uploadController");

router.post("/upload", auth, upload.single("image"), uploadImage);

module.exports = router;
