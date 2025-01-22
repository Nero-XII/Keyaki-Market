'use strict';

var utils = require('../utils/writer.js');
var Customers = require('../service/CustomersService');

module.exports.createCustomer = function createCustomer (req, res, next, body) {
  Customers.createCustomer(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAllCustomers = function getAllCustomers (req, res, next) {
  Customers.getAllCustomers()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getCustomerById = function getCustomerById (req, res, next, id) {
  Customers.getCustomerById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
