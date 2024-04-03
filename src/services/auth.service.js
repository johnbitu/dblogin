const User = require("../models/User");

const loginService = (email) => User.findOne({email: email})

module.exports = loginService;