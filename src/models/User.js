const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    avatar: {
        type: String,
        require: true,
    },
    bsckground: {
        type: String,
        require: true,
    }
});

const User = mongoose.model("User",UserSchema);

module.exports = User;