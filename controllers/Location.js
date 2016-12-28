'use strict';

var url = require('url');


var Location = require('./LocationService');


module.exports.addressAdrUUIDDELETE = function addressAdrUUIDDELETE (req, res, next) {
  Location.addressAdrUUIDDELETE(req.swagger.params, res, next);
};

module.exports.addressAdrUUIDGET = function addressAdrUUIDGET (req, res, next) {
  Location.addressAdrUUIDGET(req.swagger.params, res, next);
};

module.exports.addressAdrUUIDPUT = function addressAdrUUIDPUT (req, res, next) {
  Location.addressAdrUUIDPUT(req.swagger.params, res, next);
};

module.exports.addressPOST = function addressPOST (req, res, next) {
  Location.addressPOST(req.swagger.params, res, next);
};
