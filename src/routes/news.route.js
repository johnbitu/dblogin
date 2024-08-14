const route = require('express').Router();

const News = require('../controllers/news.controller')
const authMid = require('../middlewares/auth.middlewares')

route.post("/", authMid.authMiddleware ,News.create);
route.get("/", News.findAll);
route.get("/top", News.topNews);
route.get("/:id", News.findById);

module.exports = route;