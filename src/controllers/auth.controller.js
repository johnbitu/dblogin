const bcrypt = require("bcrypt");
const authService = require("../services/auth.service");

const userService = require('../services/user.service');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await authService.login(username, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}
// const authService = require('../services/authService');

module.exports = { login };
