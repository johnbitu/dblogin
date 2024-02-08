// routes.js
const express = require('express');
const router = express.Router();
const app = express();


router.get('/', (req, res) => {
    res.sendFile('login.html', { root: '../public' });
});

router.get('/cadastro', (req, res) => {
    res.sendFile('cadastro.html', { root: '../public' });
});

router.get('/main', (req, res) => {
    res.sendFile('main.html', { root: '../public' });
});


module.exports = router;
