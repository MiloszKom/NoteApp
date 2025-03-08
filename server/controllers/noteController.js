const User = require("../models/userModel");
const Note = require("../models/noteModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getUserNotes = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id).populate("notes");
  const notes = user.notes;

  res.status(200).json({
    status: "success",
    data: notes,
  });
});

exports.getNote = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const note = await Note.findById(req.params.noteId);

  if (!note) {
    return next(new AppError("This note doesn't exist", 404));
  }

  if (!note.userId.equals(user._id)) {
    return next(new AppError("You are not authorized to view this note", 404));
  }

  res.status(200).json({
    status: "success",
    data: note,
  });
});

exports.createNote = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);

  const { title, content } = req.body;

  const newNote = await Note.create({
    title,
    content,
    userId: user._id,
  });

  user.notes.push(newNote._id);
  await user.save();

  res.status(201).json({
    status: "success",
    message: "New note has been created",
    data: {
      note: newNote,
    },
  });
});

exports.updateNote = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const note = await Note.findById(req.params.noteId);

  if (!note) {
    return next(new AppError("This note doesn't exist", 404));
  }

  if (!note.userId.equals(user._id)) {
    return next(new AppError("Not authorized to edit this note", 404));
  }

  const { title, content } = req.body;

  if (title) note.title = title;
  if (content) note.content = content;

  await note.save();

  res.status(200).json({
    status: "success",
    message: "Note updated",
    data: note,
  });
});

exports.deleteNote = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const note = await Note.findById(req.params.noteId);

  if (!note) {
    return next(new AppError("This note doesn't exist", 404));
  }

  if (!note.userId.equals(user._id)) {
    return next(new AppError("Not authorized to edit this note", 404));
  }

  await Note.deleteOne({ _id: req.params.noteId });

  await User.findByIdAndUpdate(req.user._id, {
    $pull: { notes: note._id },
  });

  res.status(200).json({
    status: "success",
    message: "Note deleted",
  });
});
