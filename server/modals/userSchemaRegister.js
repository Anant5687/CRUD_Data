const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    isAdmin: {
        type: Boolean
    },
    mobile: {
        type: Number
    },
    password: {
        type: String
    }
})


const authusers = new mongoose.model('loginUser', schema)

module.exports = authusers;