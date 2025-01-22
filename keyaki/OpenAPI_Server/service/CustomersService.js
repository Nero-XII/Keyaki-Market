'use strict';


/**
 * Create a new customer
 *
 * body Customers_body Customer data (optional)
 * no response value expected for this operation
 **/
exports.createCustomer = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get all customers
 *
 * returns List
 **/
exports.getAllCustomers = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "password" : "password",
  "name" : "name",
  "_id" : "_id"
}, {
  "password" : "password",
  "name" : "name",
  "_id" : "_id"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get a customer by ID
 *
 * id String 
 * returns inline_response_200
 **/
exports.getCustomerById = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "password" : "password",
  "name" : "name",
  "_id" : "_id"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

