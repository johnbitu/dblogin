const News = require('../models/News');

const createService = (body) => News.create(body);

const findAllNewsService = (offset, limit) => News.find()
.sort({_id: -1})
.skip(offset)
.limit(limit)
.populate("user");

const countNews = () => News.countDocuments();

module.exports = { createService, findAllNewsService, countNews };