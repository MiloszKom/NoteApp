const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

require("dotenv").config();

const validateName = (name) => {
  if (!/^[\p{L}0-9\s-]+$/u.test(name)) {
    return false;
  }

  const RESERVED_NAMES = ["admin", "root", "system", "null", "undefined"];
  if (RESERVED_NAMES.includes(name.toLowerCase())) {
    return false;
  }

  return true;
};

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "A user must have a username"],
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [20, "Username cannot exceed 20 characters"],
    unique: true,
    validate: {
      validator: validateName,
      message: "Username can only contain letters, spaces, numbers and hyphens",
    },
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minlength: [8, "Password must be at least 8 characters long."],
    select: false,
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords do not match",
    },
  },
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
