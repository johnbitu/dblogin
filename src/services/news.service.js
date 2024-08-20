const News = require('../models/News');

const createService = (body) => News.create(body);

const findAllNewsService = (offset, limit) => News.find()
.sort({_id: -1})
.skip(offset)
.limit(limit)
.populate("user");

const countNews = () => News.countDocuments();

const topNewsService = () => News.findOne().sort({_id: -1}).populate("user");

const findByIdService = (id) => News.findById(id).populate("user");

const searchTitleService = (title) => News.find({
    title: {$regex: `${title || ""}`, $options: "i" },// comando regex do proprio MongoDB, o $options é para especificar o case-sensitive
})
.sort({_id: -1})
.populate("user");

module.exports = { createService, findAllNewsService, countNews, topNewsService, findByIdService,searchTitleService };