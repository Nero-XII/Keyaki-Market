const mongoose = require('mongoose');

const Order = mongoose.model('Order', new mongoose.Schema({
    _id: String,
    customer_id: String,
    total: Number,
    date: Date,
    status: {
        type: String,
        enum: ['in_cart', 'checked_out']
    },
    details: [
        {
            product_id: String,
            quantity: Number,
            subtotal: Number,
            _id: false
        },
    ],
}, {
    versionKey: false
},));

module.exports = Order;
