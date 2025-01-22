const Order = require('../models/Order');

exports.getAllorders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).send('Error trying to get orders');
    }
};

exports.getOrdersByCustomerId = async (req, res) => {
    try {
        const orders = await Order.find({
            customer_id: req.params.id,
            status: 'checked_out'
        }).sort({ date: -1 });
        if (orders.length === 0) return res.status(404).send('No orders found for this customer');
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).send('Error trying to get orders');
    }
};

exports.getCartByCustomerId = async (req, res) => {
    try {
        const orders = await Order.find({ customer_id: req.params.id, status: 'in_cart' });
        if (orders.length === 0) return res.status(404).send('Cart is empty');
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).send('Error trying to get cart');
    }
};

exports.createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(400).send('Error trying to create order');
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id,
            { $set: { status: 'checked_out', date: new Date() } }, { new: true });
        if (!order) return res.status(404).send('Order not found');
        res.status(200).json(order);
    } catch (err) {
        res.status(400).send('Error trying to update order');
    }
};

exports.updateOrderDetails = async (req, res) => {
    try {
        const { product_id, price, action } = req.body;
        const increment = action === 'add' ? 1 : -1;

        const order = await Order.findOneAndUpdate(
            { _id: req.params.id, "details.product_id": product_id },
            { $inc: { "details.$.quantity": increment } },
            { new: true }
        );

        if (!order) return res.status(404).send('Order or product not found');

        const updatedDetail = order.details.find(detail => detail.product_id === product_id);
        if (updatedDetail.quantity <= 0) {
            await Order.findByIdAndUpdate(req.params.id, {
                $pull: { details: { product_id } }
            });
        } else {
            const newSubtotal = updatedDetail.quantity * price;
            await Order.updateOne(
                { _id: req.params.id, "details.product_id": product_id },
                { $set: { "details.$.subtotal": newSubtotal } }
            );
        }

        const updatedOrder = await Order.findById(req.params.id);
        if (updatedOrder.details.length === 0) {
            await Order.findByIdAndDelete(req.params.id);
            return res.status(201).json(updatedOrder);
        }

        const newTotal = updatedOrder.details.reduce((sum, detail) => sum + detail.subtotal, 0);
        await Order.findByIdAndUpdate(req.params.id, { total: newTotal });

        const finalOrder = await Order.findById(req.params.id);
        res.status(200).json(finalOrder);
    } catch (err) {
        console.error(err);
        res.status(400).send('Error updating order details');
    }
};

exports.addOrderDetails = async (req, res) => {
    try {
        const { product_id } = req.body;
        const order = await Order.findOne({ _id: req.params.id, "details.product_id": product_id });
        if (order) {
            return res.status(400).send('Product already exists in the cart');
        }
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id,
            { $push: { details: { product_id, quantity: 0, subtotal: 0, } } }, { new: true });

        if (!updatedOrder) {
            return res.status(404).send('Order not found');
        }
        res.status(200).json(updatedOrder);
    } catch (err) {
        console.error(err);
        res.status(400).send('Error adding new product detail');
    }
};

