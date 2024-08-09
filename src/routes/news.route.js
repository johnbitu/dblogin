const route = require('express').Router();

const News = require('../controllers/news.controller')
const authMid = require('../middlewares/auth.middlewares')

route.post("/", authMid.authMiddleware ,News.create);
route.get("/", News.findAll);

module.exports = route;