'use strict';

exports.addressAdrUUIDDELETE = function(args, res, next) {
  /**
   * parameters expected in the args:
  * adrUUID (String)
  **/
  // no response value expected for this operation
  res.end();
}

exports.addressAdrUUIDGET = function(args, res, next) {
  /**
   * parameters expected in the args:
  * adrUUID (String)
  **/
    var examples = {};
  examples['application/json'] = [ {
  "addresses" : [ {
    "country" : "aeiou",
    "province" : "aeiou",
    "adrUUID" : "aeiou",
    "city" : "aeiou",
    "postalCode" : "aeiou",
    "street1" : "aeiou",
    "street2" : "aeiou",
    "point" : "aeiou"
  } ]
} ];
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.addressAdrUUIDPUT = function(args, res, next) {
  /**
   * parameters expected in the args:
  * adrUUID (String)
  * body (Address)
  **/
  // no response value expected for this operation
  res.end();
}

exports.addressPOST = function(args, res, next) {
  /**
   * parameters expected in the args:
  * body (List)
  **/
  // no response value expected for this operation
  res.end();
}

