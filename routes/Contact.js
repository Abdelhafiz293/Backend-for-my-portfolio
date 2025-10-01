const express = require("express");
const router = express.Router();
const {
  submitContact,
  getAllContacts,
  getContactById,
  deleteContact,
} = require("../controllers/contactController");

const auth = require("../middlewares/auth");

// Public route (anyone can submit contact form)
router.post("/", submitContact);

// Protected routes (admin only)
router.get("/", auth, getAllContacts);
router.get("/:id", auth, getContactById);
router.delete("/:id", auth, deleteContact);

module.exports = router;
