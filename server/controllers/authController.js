const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
require("dotenv").config();

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res, message) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() +
        (process.env.JWT_COOKIE_EXPIRES_IN || 30) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    path: "/",
  };

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    message,
    token,
    data: {
      user,
    },
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new AppError("Please provide username and password", 400));
  }

  const user = await User.findOne({ username }).select(
    "+password _id username"
  );

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  createSendToken(user, 200, res, "Successfully logged in.");
});

exports.signup = catchAsync(async (req, res, next) => {
  const { username, password, passwordConfirm } = req.body;

  const trimmedUsername = username.trim();

  const newUser = await User.create({
    username: trimmedUsername,
    password,
    passwordConfirm,
  });

  createSendToken(newUser, 201, res, "Account created.");
});

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  });
  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

const getUserFromToken = async (token) => {
  if (!token) return null;
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id).select(
    "+password _id username"
  );

  if (!currentUser) return null;

  return currentUser;
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  const currentUser = await getUserFromToken(token);

  if (!currentUser) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );
  }
  req.user = currentUser;

  next();
});

exports.checkCookies = catchAsync(async (req, res, next) => {
  if (!req.cookies.jwt || req.cookies.jwt === "loggedout") {
    return res.status(204).json({
      status: "no-content",
      message: "No authentication cookie found",
    });
  }

  const token = req.cookies.jwt;

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id).select(" _id username");

    if (!currentUser) {
      return next(
        new AppError("The user belonging to this token no longer exists", 401)
      );
    }

    return res.status(200).json({
      status: "success",
      user: currentUser,
      token,
    });
  } catch (err) {
    return next(
      new AppError("Invalid token or token verification failed.", 401)
    );
  }
});
