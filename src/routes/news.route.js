const route = require('express').Router();

const News = require('../controllers/news.controller')

route.post("/", News.create);
route.get("/", News.findAll);

module.exports = route;