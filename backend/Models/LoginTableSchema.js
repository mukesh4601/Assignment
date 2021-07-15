const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoginTableSchema = new Schema({
    emailID: {
        type: String,
    },
    userid: {
        type: String,
    },
    token: {
        type: String,
    }
});

var login = mongoose.model('Login', LoginTableSchema)
module.exports = login;