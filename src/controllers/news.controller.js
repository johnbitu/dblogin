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
    let { limit, offset } = req.query;

    limit = Number(limit);
    offset = Number(offset);

    if(!limit){
        limit = 5;
    }

    if(!offset){
        offset = 0;
    }

    const news = await News.findAllNewsService(offset, limit);
    const total = await News.countNews();
    const currentUrl = req.baseUrl;


    const next = offset + limit;
    const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset${offset}` : null ; // if ternario 

    if (news.length === 0) {
        return res.status(400).send({ message: "there is no news recorded" });
    }
    res.send(news)
}

module.exports = { create, findAll };