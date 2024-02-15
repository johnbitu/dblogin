export async function login(req, res) {
    const { name, senha } = req.body;

    // Rota de login
    app.post('/login', async (req, res) => {
        const { name, senha } = req.body;
        // name = "'" + name + "'"
        // console.log(name,senha);

        // Consultar o banco de dados para obter o hash da senha do usuário
        db.get(`SELECT * FROM users WHERE LOWER(name) = LOWER(?)`, [name], async (err, row) => {
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
}