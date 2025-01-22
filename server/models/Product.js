const mongoose = require('mongoose');

const Product = mongoose.model('Product', new mongoose.Schema({
    _id: String,
    name: String,
    description: String,
    price: Number,
    img: String
}, {
    versionKey: false
}));

module.exports = Product;
