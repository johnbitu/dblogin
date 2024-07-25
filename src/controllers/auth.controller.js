const bcrypt = require("bcrypt");
const authService = require("../services/auth.service");

const userService = require('../services/user.service');

const login = async (req, res) => {
  const { username, password } = req.body;
  try {

    const user = await authService.loginService(username);

    if(!user){
      return res.status(404).send({message: "Usuario não encontrado!"});
    }
  
    const passwordMatch = await bcrypt.compareSync(password, user.password);


    if(!passwordMatch){
      return res.status(400).send({message: "Senha Invalida!"});
    }
    
    const token = authService.generateToken(user.id, user.username);

    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}
// const authService = require('../services/authService');

module.exports = { login };
