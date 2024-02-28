const userService =  require('../services/user.service')

const create = async (req, res) => {
    try {
        const { name, username, email, password, avatar, background } = req.body;

        if (!name || !username || !email || !password || !avatar || !background) {
            return res.status(400).send({ message: "Preencha todos os campos para cadastro" });
        }

        const user = await userService.create(req.body);

        if (!user) {
            return res.status(400).send({ message: "Erro na criação de usuário" });
        }

        res.status(201).send({
            user: {
                id: user._id,
                name,
                username,
                email,
                password,
                avatar,
                background,
            },
            message: "Usuario criado com sucesso!"
        });
    } catch (error) {
        // Caso ocorra algum erro durante o processo
        console.error("Erro ao criar usuário:", error);
        res.status(500).send({ message: "Erro interno ao criar usuário" });
    }
};

const findAll = async (req, res) => {
    const users = await userService.findAllService();

    if (users.length === 0) {
        return res.status(400).send({ message: "não há usuários registrados" });
    }

    res.send(users)
}

const findById = async (req, res) => {
    const id = req.params.id

    const user = await userService.findByIdService(id)

    if(!user){
        return res.status(400).send({ message: "Usuário não encontrado"})
    }

    res.send(user)
}

module.exports = { create, findAll, findById };

//quando for usar o json no insomnia, usar ""
// exemplo:{
//     "name:" "joão"
// }