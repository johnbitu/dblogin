const mongoose = require("mongoose");
const userService = require("../services/user.service");

const validId = (req, res, next) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: "Id inválido" });
        }

        next();
    } catch (error) {
        return res.status(500).send({ message: "Ocorreu um erro ao processar a solicitação." });
    }
};

const validUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await userService.findByIdService(id);

        if (!user) {
            return res.status(400).send({ message: "Usuário não encontrado!" });
        }


        req.id = id;
        req.user = user;

        next();
    } catch (error) {
        return res.status(500).send({ message: "Ocorreu um erro ao processar a solicitação." });
    }
};

module.exports = { validId, validUser }