const User = require("../models/User");


const createService = (body) => User.create(body);

const findAllService = () => User.find();

const findByIdService = (id) => User.findById(id);

const updateService = (id,
    name,
    username,
    email,
    password,
    avatar,
    background) => User.findByIdAndUpdate({ _id: id }, {
        id,
        name,
        username,
        email,
        password,
        avatar,
        background
    });

module.exports = { // exportando como um objeto
    createService,
    findAllService,
    findByIdService,
    updateService
};