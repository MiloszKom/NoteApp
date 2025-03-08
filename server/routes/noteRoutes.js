const express = require("express");
const { protect } = require("./../controllers/authController");
const noteController = require("../controllers/noteController");

const router = express.Router();

router.get("/", protect, noteController.getUserNotes);
router.post("/", protect, noteController.createNote);

router.get("/:noteId", protect, noteController.getNote);
router.patch("/:noteId", protect, noteController.updateNote);
router.delete("/:noteId", protect, noteController.deleteNote);

module.exports = router;
