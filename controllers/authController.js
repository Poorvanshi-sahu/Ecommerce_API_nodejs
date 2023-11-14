const User = require("../models/user");
const customError = require("../errors");
const { attachCookieToResponse } = require("../utils/index");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const emailAlreadyPresent = await User.findOne({ email });

  if (emailAlreadyPresent) {
    throw new customError.BadRequestErrors("Please provide unique email");
  }

  const isFirstUser = (await User.countDocuments({})) === 0;
  const role = isFirstUser ? "admin" : "user";

  const user = await User.create({ name, email, password, role });

  const jwtTokenUser = { name: user.name, userId: user._id, role: user.role };

  attachCookieToResponse({ res, user: jwtTokenUser });
};

const login = async (req, res) => {
  res.send("Login");
};

const logOut = async (req, res) => {
  res.send("LogOut");
};

module.exports = {
  login,
  register,
  logOut,
};
