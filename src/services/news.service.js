const News = require('../models/News');

const createService = (body) => News.create(body);

const findAllNewsService = () => News.find();

module.exports = { createService, findAllNewsService };