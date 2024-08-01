const News = require("../services/news.service");
const { ObjectId } = require("mongoose");


const create = async (req, res) => {
    try{

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

        console.log(parts);

        const {title, text, banner} = req.body;

        if (!title || !banner || !text) {
            res.status(408).send({
                message: "Submit all fields for registration"
            })
        }

        await News.createService({
            title,
            text,
            banner,
            user: { _id: "65e9c818c7331574622c6f04"}
        })

        res.send(201);
    }catch(err){
        res.status(500).send({ message: err.message });
    }
}

const findAll = async (req, res) => {
    const news = await News.findAllNewsService();
    if (news.length === 0) {
        return res.status(400).send({ message: "there is no news recorded" });
    }
    res.send(news)
}

module.exports = { create, findAll };