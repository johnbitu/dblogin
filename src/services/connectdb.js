const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
const port = 5500;

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('database.db');



// Middleware para parsear o corpo das requisições como JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('public'));

app.get('/cadastro', (req, res) => {
  res.sendFile('cadastro.html', { root: '../public' });
});

app.get('/main', (req, res) => {
  res.sendFile('main.html', { root: '../public' });
});

app.get('/', (req, res) => {
  res.sendFile('login.html', { root: '../public' });
});


app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ users: rows });
  });
});

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

// Rota de login
app.post('/login', async (req, res) => {
  const { name, senha } = req.body;
  // name = "'" + name + "'"
  // console.log(name,senha);

  // Consultar o banco de dados para obter o hash da senha do usuário
  db.get(`SELECT * FROM users WHERE LOWER(name) = LOWER(?)`,[name] ,async (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Erro interno do servidor');
    }

    if (row) {
      // Comparar a senha fornecida com o hash no banco de dados
      




      console.log('Senha fornecida:', senha);
      console.log('Senha armazenada no banco de dados:', row.senha);
      const passwordMatch = await bcrypt.compare(senha, row.senha);
      console.log('Comparação de senhas:', passwordMatch); // Adicionando este log


      if (passwordMatch) {
        // Usuário autenticado com sucesso
        console.log(name, senha, "if 1");
        return res.redirect('/main');
        
        // return res.status(200).json({ message: 'Login efetuado com sucesso' });
      } else {
        // Senha incorreta
        console.log(name, senha, "else 1");
        return res.status(401).send('Credenciais inválidas');
      }
    } else {
      console.log(name, senha, "else 2");
      // Usuário não encontrado
      return res.status(401).send('Credenciais inválidas');

    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});