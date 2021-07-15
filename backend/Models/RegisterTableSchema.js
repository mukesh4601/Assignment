const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegisterTableSchema = new Schema({
    emailID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

var register = mongoose.model('Register', RegisterTableSchema)
module.exports = register;