const Customer = require('../models/Customer');

exports.getUser = (req, res) => {
    if (req.session.user) {
        res.status(200).json(req.session.user);
    } else {
        res.status(401).send('No user logged in.');
    }
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    Customer.findOne({ name: username, password })
        .then(customer => {
            if (!customer) {
                return res.status(401).send('Invalid credentials');
            }
            req.session.user = {id: customer._id, name: customer.name};
            res.status(200).send('Login successful');
        })
        .catch(err => res.status(500).send('Error during login'));
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error during logout');
        }
        res.status(200).send('Logout successful');
    });
};