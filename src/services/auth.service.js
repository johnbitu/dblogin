const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (username, password) => {
  const user = await User.findOne({ username }).select("+password");
  if (!user) {
    throw new Error('User not found');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Invalid credentials');
  }

  return 'Login successful';
};

module.exports = { login };