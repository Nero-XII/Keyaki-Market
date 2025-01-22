const Customer = require('../models/Customer');

exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (err) {
        res.status(500).send('Error trying to get customers');
    }
};

exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).send('customer not found');
        res.status(200).json(customer);
    } catch (err) {
        res.status(500).send('Error trying to get customer');
    }
};

exports.createCustomer = async (req, res) => {
    try {
        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).json(customer);
    } catch (err) {
        res.status(400).send('Error trying to create customer');
    }
};
