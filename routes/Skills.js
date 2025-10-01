const express = require("express");
const router = express.Router();
const {
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
} = require("../controllers/skillsController");

const auth = require("../middlewares/auth");

// Public routes (no auth needed)
router.get("/", getAllSkills);
router.get("/:id", getSkillById);

// Protected routes (admin only)
router.post("/", auth, createSkill);
router.put("/:id", auth, updateSkill);
router.delete("/:id", auth, deleteSkill);

module.exports = router;
