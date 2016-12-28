'use strict';

var url = require('url');


var BusinessPartner = require('./BusinessPartnerService');


module.exports.bpAllPOST = function bpAllPOST (req, res, next) {
  BusinessPartner.bpAllPOST(req.swagger.params, res, next);
};

module.exports.bpBpUUIDDELETE = function bpBpUUIDDELETE (req, res, next) {
  BusinessPartner.bpBpUUIDDELETE(req.swagger.params, res, next);
};

module.exports.bpBpUUIDGET = function bpBpUUIDGET (req, res, next) {
  BusinessPartner.bpBpUUIDGET(req.swagger.params, res, next);
};

module.exports.bpBpUUIDPUT = function bpBpUUIDPUT (req, res, next) {
  BusinessPartner.bpBpUUIDPUT(req.swagger.params, res, next);
};

module.exports.bpCommBpUUIDDELETE = function bpCommBpUUIDDELETE (req, res, next) {
  BusinessPartner.bpCommBpUUIDDELETE(req.swagger.params, res, next);
};

module.exports.bpCommBpUUIDGET = function bpCommBpUUIDGET (req, res, next) {
  BusinessPartner.bpCommBpUUIDGET(req.swagger.params, res, next);
};

module.exports.bpCommBpUUIDPOST = function bpCommBpUUIDPOST (req, res, next) {
  BusinessPartner.bpCommBpUUIDPOST(req.swagger.params, res, next);
};

module.exports.bpCommBpUUIDPUT = function bpCommBpUUIDPUT (req, res, next) {
  BusinessPartner.bpCommBpUUIDPUT(req.swagger.params, res, next);
};

module.exports.bpPOST = function bpPOST (req, res, next) {
  BusinessPartner.bpPOST(req.swagger.params, res, next);
};

module.exports.bpRelBpUUIDDELETE = function bpRelBpUUIDDELETE (req, res, next) {
  BusinessPartner.bpRelBpUUIDDELETE(req.swagger.params, res, next);
};

module.exports.bpRelBpUUIDGET = function bpRelBpUUIDGET (req, res, next) {
  BusinessPartner.bpRelBpUUIDGET(req.swagger.params, res, next);
};

module.exports.bpRelBpUUIDPUT = function bpRelBpUUIDPUT (req, res, next) {
  BusinessPartner.bpRelBpUUIDPUT(req.swagger.params, res, next);
};

module.exports.bpRoleBpUUIDDELETE = function bpRoleBpUUIDDELETE (req, res, next) {
  BusinessPartner.bpRoleBpUUIDDELETE(req.swagger.params, res, next);
};

module.exports.bpRoleBpUUIDGET = function bpRoleBpUUIDGET (req, res, next) {
  BusinessPartner.bpRoleBpUUIDGET(req.swagger.params, res, next);
};

module.exports.bpRoleBpUUIDPUT = function bpRoleBpUUIDPUT (req, res, next) {
  BusinessPartner.bpRoleBpUUIDPUT(req.swagger.params, res, next);
};
