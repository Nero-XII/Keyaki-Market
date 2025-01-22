const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Import routes
const productRoutes = require('./routes/products');
const customerRoutes = require('./routes/customers');
const orderRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:8000',
  credentials: true
}));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use(session({
  secret: '1b8e724aa8f8d5671234e6a91c0c8b41f7ab456cdef89012abc123456789abcd', // This is not secure, to deploy this project 'secret' must be saved apart and kept secret
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'Lax',
  },
}));

// MongoDB connexion
mongoose.connect('mongodb://localhost:27017/keyaki')
  .then(() => console.log('Connection with MongoDB successful'))
  .catch(err => console.error('Error trying to connect with MongoDB:', err));

// Routing
app.use('/products', productRoutes);
app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);
app.use('/auth', authRoutes);

module.exports = app;
