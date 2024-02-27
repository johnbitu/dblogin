const mongoose = require('mongoose');

const connectDatabase = () => {
    console.log("esperando conexão com o banco...");

    mongoose.connect(
        "mongodb+srv://root:root123@logindb.viingmv.mongodb.net/?retryWrites=true&w=majority&appName=logindb"
    )
    .then(() => console.log("MongoDB Atlas conectado"))
    .catch((error) => console.log(error))
};

module.exports = connectDatabase;