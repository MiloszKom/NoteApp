const express = require("express");
const {
  signup,
  login,
  logout,
  checkCookies,
} = require("./../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/checkCookies", checkCookies);

module.exports = router;
