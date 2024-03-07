const userService = require('../services/user.service')

const create = async (req, res) => {
    try {
        const { name, username, email, password, avatar, background } = req.body;

        if (!name || !username || !email || !password || !avatar || !background) {
            return res.status(400).send({ message: "Preencha todos os campos para cadastro" });
        }

        const user = await userService.createService(req.body);

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

    const user = req.user;

    res.send(user)
};

const update = async (req, res) => {
    try {
        const { name, username, email, password, avatar, background } = req.body;

        if (!name && !username && !email && !password && !avatar && !background) {
            return res.status(400).send({ message: "Reescreva algum campo para ser atualizado" });
        }

        const id = req.id;

        const user = await userService.findByIdService(id);

        await userService.updateService(
            id,
            name,
            username,
            email,
            password,
            avatar,
            background
        );

        res.send({ message: "Usuário atualizado com sucesso!" });

    } catch (error) {
        // Caso ocorra algum erro durante o processo
        console.error("Erro ao atualizar o usuário:", error);
        res.status(500).send({ message: "Erro interno ao criar usuário" });
    }
};

const delet = async (req, res) => {
    try {
        const { name, username, email, password, avatar, background } = req.body;

        if (!name && !username && !email && !password && !avatar && !background) {
            return res.status(400).send({ message: "Delete algum campo para ser atualizado" });
        }

        const id = req.id;

        await userService.deleteService(
            id,
            name,
            username,
            email,
            password,
            avatar,
            background
        );

        res.send({ message: "Usuário deletado com sucesso!" });
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        res.status(500).send({ message: "Erro interno ao deletar usuário" });
    }
};

module.exports = { create, findAll, findById, update, delet };

//quando for usar o json no insomnia, usar ""
// exemplo:{
//     "name:" "joão"
// }