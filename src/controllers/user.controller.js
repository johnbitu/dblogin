const create = (req, res) => {
    const {name, username, email, password, avatar, background} = req.body;
    
    if (!name || !username || !email || !password || !avatar || !background){
        res.status(400).send({ message: "Preencha todos os campos para cadastro"});
    }
    res.status(201).send({
        user: {
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