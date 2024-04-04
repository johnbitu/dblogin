const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { unique } = require('next/dist/build/utils');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    avatar: {
        type: String,
        require: true,
    },
    background: {
        type: String,
        require: true,
    }
});

async function hashpassword(next){
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
};

UserSchema.pre("save", hashpassword);

const User = mongoose.model("User",UserSchema);

module.exports = User;