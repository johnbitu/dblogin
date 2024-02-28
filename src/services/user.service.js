const User = require("../models/User");


const create = (body) => User.create(body);

module.exports = { // exportando como um objeto
    create,
}