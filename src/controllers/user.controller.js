const userService =  require('../services/users')

const create = async (req, res) => {
    const {name, username, email, password, avatar, background} = req.body;
    
    if (!name || !username || !email || !password || !avatar || !background){
        res.status(400).send({ message: "Preencha todos os campos para cadastro"});
    }

    const user = await userService.create(req.body);

    if(!user){
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
};

module.exports = { create };

//quando for usar o json no insomnia, usar ""
// exemplo:{
//     "name:" "joão"
// }