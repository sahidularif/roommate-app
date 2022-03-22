const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newUser = new Schema({
    name: String,
    email: String
}, {timestamps: true});

module.exports  = mongoose.model('Users', newUser)
