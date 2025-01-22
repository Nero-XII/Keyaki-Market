const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    _id: String,
    name: String,
    password: String,
}, {
    versionKey: false
}));

module.exports = Customer;