const route = require('express').Router();
const testeController = require('../controllers/teste.controller');

route.get("/", testeController.teste)

module.exports = route;