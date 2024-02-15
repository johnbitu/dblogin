const express = require("express");
const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt');

const db = new sqlite3.Database('database.db');


app.post('/users', async (req, res) => {
    const { name, email, senha } = req.body;
  
    console.log('Received data:', name, email, senha);
  
    try {
      // Hash da senha usando bcrypt
      const hashedPassword = await bcrypt.hash(senha, 10); // 10 é o custo do hash, quanto maior, mais seguro, mas mais lento
      console.log(hashedPassword);
      // Inserir usuário no banco de dados com a senha hashada
      db.run('INSERT INTO users (name, email, senha) VALUES (?, ?, ?)', 
      [name, email, hashedPassword], function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
  
        res.redirect('/');
      });
    } catch (error) {
      console.error('Erro ao fazer hash da senha:', error);
      return res.status(500).send('Erro ao fazer hash da senha');
    }
  });