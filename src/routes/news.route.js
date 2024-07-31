const route = require('express').Router();

const { getAll, create } = require('../controllers/news.controller')

route.post("/", newsController.create);
route.get("/", newsController.getall);