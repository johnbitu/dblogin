const News = require("../services/news.service");
const { ObjectId } = require("mongoose");


const create = async (req, res) => {
    try{

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
            user: req.userId
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