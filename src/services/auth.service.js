const bcrypt = require('bcrypt');
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const loginService = async (username, password) => User.findOne({ username: username }).select("+password");

const generateToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_TOKEN, {expiresIn: 86400}); // 86400s dá 24 horas e precisa ser renovado no .env  para funcionar
};


// if (!passwordMatch) {
//   throw new Error('Invalid credentials');
// }

module.exports = { loginService, generateToken };