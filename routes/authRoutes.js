const express = require("express");
const router = express.Router();
const { login, register, logOut } = require("../controllers/authController");

router.route("/login").post(login);

router.route("/register").post(register);

router.route("/logOut").post(logOut);

module.exports = router;
