const bcrypt = require("bcrypt");
const authService = require("../services/auth.service");

const userService = require('../services/user.service');


// const authService = require('../services/authService');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await authService.login(username, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
