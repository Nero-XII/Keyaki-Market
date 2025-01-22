'use strict';


/**
 * Create a new product
 *
 * body Products_body Product data (optional)
 * returns products_body
 **/
exports.createProduct = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "img" : "img",
  "price" : 0.8008281904610115,
  "name" : "name",
  "description" : "description",
  "_id" : "_id"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get all products
 *
 * returns List
 **/
exports.getAllProducts = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "img" : "img",
  "price" : 0.8008281904610115,
  "name" : "name",
  "description" : "description",
  "_id" : "_id"
}, {
  "img" : "img",
  "price" : 0.8008281904610115,
  "name" : "name",
  "description" : "description",
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
 * Get a product by ID
 *
 * id String 
 * returns products_body
 **/
exports.getProductById = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "img" : "img",
  "price" : 0.8008281904610115,
  "name" : "name",
  "description" : "description",
  "_id" : "_id"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

