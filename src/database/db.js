const mongoose = require('mongoose');

const connectDatabase = () => {
    console.log("esperando conexão com o banco...");

    mongoose.connect(
        process.env.MONGODB_URI
    )
    .then(() => console.log("MongoDB Atlas conectado"))
    .catch((error) => console.log(error))
};

module.exports = connectDatabase;