const express = require("express");
const router = express.Router();

const {
  createProject,
  getAllProjects,
  getProjectById,
  deleteProject,
  updateProject,
} = require("../controllers/projectsController");
const { uploadImage } = require("../controllers/uploadController");

const auth = require("../middlewares/auth");

// Public routes (no auth needed)
router.get("/", getAllProjects);
router.get("/:id", getProjectById);

// Protected routes (admin only)
router.post("/", auth, createProject);
router.put("/:id", auth, updateProject);
router.delete("/:id", auth, deleteProject);


module.exports = router;
