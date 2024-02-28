const User = require("../models/User");


const createService = (body) => User.create(body);

const findAllService = () => User.find();

const findByIdService = (id) => User.findById(id);

module.exports = { // exportando como um objeto
    createService,
    findAllService,
    findByIdService
};