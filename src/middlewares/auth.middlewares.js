const dotenv = require("dotenv");
const userServ =  require("../services/user.service")
const jwt = require("jsonwebtoken");

dotenv.config();

const authMiddleware = (req,res,next) => {
try {    

    const {authorization} = req.headers;

    if(!authorization){
        return res.send(401);
    }

    const parts = authorization.split(" ");// split() me retorna um ARRAY

    if(parts.length !== 2){
        return res.send(401);
    }

    const [schema, token] = parts


    if(schema !== "Bearer"){
        return res.send(401);// passando pra lembrar que o status 401 é de Unathorized
    }

    jwt.verify(token, process.env.JWT_TOKEN, async (error, decoded) => {
        if(error){
           return res.status(401).send({message: "Token invalid or Expired!"});
        }
        console.log(decoded);


        const user = await userServ.findByIdService(decoded.id);

        if(!user || !user.id){
            return res.status(401).send({message: "Token invalid!"})
        }
    
        req.userId =  user.id;

        return next();
    })

  
}catch (err) {
    res.status(500).send(err.message);
}

}

module.exports = { authMiddleware };