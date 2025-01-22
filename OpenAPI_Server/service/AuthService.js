'use strict';


/**
 * Get the logged-in user
 *
 * returns inline_response_200
 **/
exports.getUser = function() {
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


/**
 * Login a user
 *
 * body Auth_login_body Login credentials (optional)
 * no response value expected for this operation
 **/
exports.login = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Logout the user
 *
 * no response value expected for this operation
 **/
exports.logout = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

