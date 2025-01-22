const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/', orderController.getAllorders);
router.get('/:id', orderController.getOrdersByCustomerId);
router.get('/cart/:id', orderController.getCartByCustomerId);
router.post('/', orderController.createOrder);
router.patch('/:id', orderController.updateOrder);
router.patch('/details/:id', orderController.updateOrderDetails);
router.patch('/details/add/:id', orderController.addOrderDetails);

module.exports = router;