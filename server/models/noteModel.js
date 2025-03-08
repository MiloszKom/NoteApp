const mongoose = require("mongoose");
const noteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: {
    type: String,
    required: [true, "A note must have a title"],
    maxlength: [50, "Note title is too long! Keep it under 50 characters"],
  },
  content: {
    type: String,
    required: [true, "A note cannont be empty"],
    maxlength: [500, "Note is too long! Keep it under 500 characters"],
  },
  createdAt: { type: Date, default: Date.now },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
