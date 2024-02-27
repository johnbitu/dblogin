const create = (req, res) => {
    const user = req.body;
    
    res.json(user)
    
    console.log(user);
}

module.exports = { create };

//quando for usar o json no insomnia, usar ""
// exemplo:{
//     "name:" "joão"
// }