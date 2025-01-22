'use strict';


/**
 * Add product to an existing order
 * Adds a new product to an order, sets automatically the quantity and the price to 0. The purpose for this is to call inmediatelly after the details update in 'add' mode to set the quantity to 1 and calculate the order total and the detail subtotal.
 *
 * body Add_id_body Product details to add (optional)
 * id String 
 * returns inline_response_201
 **/
exports.addOrderDetails = function(body,id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "date" : "2000-01-23T04:56:07.000+00:00",
  "total" : 0.8008281904610115,
  "details" : [ {
    "quantity" : 6.027456183070403,
    "subtotal" : 1.4658129805029452,
    "product_id" : "product_id"
  }, {
    "quantity" : 6.027456183070403,
    "subtotal" : 1.4658129805029452,
    "product_id" : "product_id"
  } ],
  "_id" : "_id",
  "customer_id" : "customer_id",
  "status" : "in_cart"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Create a new order
 *
 * body Orders_body Order data (optional)
 * returns inline_response_201
 **/
exports.createOrder = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "date" : "2000-01-23T04:56:07.000+00:00",
  "total" : 0.8008281904610115,
  "details" : [ {
    "quantity" : 6.027456183070403,
    "subtotal" : 1.4658129805029452,
    "product_id" : "product_id"
  }, {
    "quantity" : 6.027456183070403,
    "subtotal" : 1.4658129805029452,
    "product_id" : "product_id"
  } ],
  "_id" : "_id",
  "customer_id" : "customer_id",
  "status" : "in_cart"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get all orders
 *
 * returns List
 **/
exports.getAllOrders = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "date" : "2000-01-23T04:56:07.000+00:00",
  "total" : 0.8008281904610115,
  "details" : [ {
    "quantity" : 6.027456183070403,
    "subtotal" : 1.4658129805029452,
    "product_id" : "product_id"
  }, {
    "quantity" : 6.027456183070403,
    "subtotal" : 1.4658129805029452,
    "product_id" : "product_id"
  } ],
  "_id" : "_id",
  "customer_id" : "customer_id",
  "status" : "in_cart"
}, {
  "date" : "2000-01-23T04:56:07.000+00:00",
  "total" : 0.8008281904610115,
  "details" : [ {
    "quantity" : 6.027456183070403,
    "subtotal" : 1.4658129805029452,
    "product_id" : "product_id"
  }, {
    "quantity" : 6.027456183070403,
    "subtotal" : 1.4658129805029452,
    "product_id" : "product_id"
  } ],
  "_id" : "_id",
  "customer_id" : "customer_id",
  "status" : "in_cart"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get cart by customer ID
 * Gets the order of the customer where the status is 'in_cart', there is only one order that  meets this requirement.
 *
 * id String 
 * returns inline_response_201
 **/
exports.getCartByCustomerId = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "date" : "2000-01-23T04:56:07.000+00:00",
  "total" : 0.8008281904610115,
  "details" : [ {
    "quantity" : 6.027456183070403,
    "subtotal" : 1.4658129805029452,
    "product_id" : "product_id"
  }, {
    "quantity" : 6.027456183070403,
    "subtotal" : 1.4658129805029452,
    "product_id" : "product_id"
  } ],
  "_id" : "_id",
  "customer_id" : "customer_id",
  "status" : "in_cart"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get history from customer by customerID
 * Gets all the orders that have been checked out, that's where the status is set to 'checkout', they all form the customer shopping history.
 *
 * id String 
 * returns List
 **/
exports.getOrdersByCustomerId = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "date" : "2000-01-23T04:56:07.000+00:00",
  "total" : 0.8008281904610115,
  "details" : [ {
    "quantity" : 6.027456183070403,
    "subtotal" : 1.4658129805029452,
    "product_id" : "product_id"
  }, {
    "quantity" : 6.027456183070403,
    "subtotal" : 1.4658129805029452,
    "product_id" : "product_id"
  } ],
  "_id" : "_id",
  "customer_id" : "customer_id",
  "status" : "in_cart"
}, {
  "date" : "2000-01-23T04:56:07.000+00:00",
  "total" : 0.8008281904610115,
  "details" : [ {
    "quantity" : 6.027456183070403,
    "subtotal" : 1.4658129805029452,
    "product_id" : "product_id"
  }, {
    "quantity" : 6.027456183070403,
    "subtotal" : 1.4658129805029452,
    "product_id" : "product_id"
  } ],
  "_id" : "_id",
  "customer_id" : "customer_id",
  "status" : "in_cart"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Checkout an order by ID
 * Checkout the order means to add a date to it and set its status to 'checkout'.
 *
 * id String 
 * returns inline_response_201
 **/
exports.updateOrder = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "date" : "2000-01-23T04:56:07.000+00:00",
  "total" : 0.8008281904610115,
  "details" : [ {
    "quantity" : 6.027456183070403,
    "subtotal" : 1.4658129805029452,
    "product_id" : "product_id"
  }, {
    "quantity" : 6.027456183070403,
    "subtotal" : 1.4658129805029452,
    "product_id" : "product_id"
  } ],
  "_id" : "_id",
  "customer_id" : "customer_id",
  "status" : "in_cart"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update order details by ID
 * Adds or substracts 1 to the order details.quantity, calculates new total and detail.subtotal, if details.quantity is set to 0, the detail (the product) is removed from the order, then if there are no details (no more products) left, removes de order.
 *
 * body Details_id_body Order detail update data (optional)
 * id String 
 * returns inline_response_201
 **/
exports.updateOrderDetails = function(body,id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "date" : "2000-01-23T04:56:07.000+00:00",
  "total" : 0.8008281904610115,
  "details" : [ {
    "quantity" : 6.027456183070403,
    "subtotal" : 1.4658129805029452,
    "product_id" : "product_id"
  }, {
    "quantity" : 6.027456183070403,
    "subtotal" : 1.4658129805029452,
    "product_id" : "product_id"
  } ],
  "_id" : "_id",
  "customer_id" : "customer_id",
  "status" : "in_cart"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

