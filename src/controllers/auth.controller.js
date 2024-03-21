const login = async (req, res) => {

    const {username, email, password} = req.body;
    
    try {
        if ( !username || !password ) {
            return res.status(400).send({ message: "Preencha o usuário e a senha" });
        }
    } catch (error) {
        
    }
}

module.exports = login;