'use strict';
var _ = require('underscore');
var db = require('../db.js');

exports.bpAllPOST = function(args, res, next) {
  /**
   * parameters expected in the args:
  * body (BupaAll)
  **/
  var main = _.pick(args.body.value.bupaMain,'bpFirstName','bpLastName','bpKind','deleted','customData');
  var comms = [];
  var roles = [];
        // chain all your queries here. make sure you return them.
    return db.sequelize.transaction(function(t){
        return db.bupaMain.create(main,{transaction: t}).then(function (bupaMain) {
            _.each(args.body.value.bupaRole.roles,function(role){
                role.bpUUID = bupaMain.bpUUID;
                roles.push(_.pick(role,'bpUUID','bpRole','validFrom','validTo','customData'));
            })
            return db.bupaRole.bulkCreate(roles,{transaction: t}).then(function (bupaRole) {
                _.each(args.body.value.bupaComm.comms,function(com){
                    com.bpUUID = bupaMain.dataValues.bpUUID;
                    comms.push(_.pick(com,'bpUUID','commType','adrUUID','emailAddress','phoneNumber','url','customData'));
                })
                return db.bupaComm.bulkCreate(comms,{transaction: t});
            });
        });
    }).then(function (result) {
        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback
        res.end(JSON.stringify(result));
    }).catch(function (err) {
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
        res.end(JSON.stringify(err));
    });

}

exports.bpBpUUIDDELETE = function(args, res, next) {
  /**
   * parameters expected in the args:
  * bpUUID (String)
  **/
  var bpId = args.bpUUID.value;

    db.bupaMain.findOne({
        where:{
            bpUUID: bpId
        }
    }).then(function (bp) {
        if (bp) {
            bp.update(bp).then(function (bp) {
                res.end(JSON.stringify(bp));
            }, function (err) {
                res.end(JSON.stringify(err));
            });
        }
        else {
            res.status(404).end();
        }
    }, function () {
        res.status(500).end();
    })
}

exports.bpBpUUIDGET = function(args, res, next) {
  /**
   * parameters expected in the args:
  * bpUUID (String)
  **/
    var bpId = args.bpUUID.value;

//    var bp = {};
    db.bupaMain.findOne(
        {
            "include" : [
                {"model" : db.bupaRole, "where" : {"bpUUID" : bpId } },
                {"model" : db.bupaComm, "where" : {"bpUUID" : bpId } }
            ]
        }
    ).then(function (bp) {
        if (!!bp) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(bp));
        }
        else {
            res.status(404).end();
        }
    }, function (err) {
        res.end(JSON.stringify(err));
    });
}

exports.bpBpUUIDPUT = function(args, res, next) {
  /**
   * parameters expected in the args:
  * bpUUID (String)
  * body (BupaAll)
  **/
  var bpId = args.bpUUID.value;
  var main = _.pick(args.body.value.bupaMain,'bpFirstName','bpLastName','deleted','customData');
  var rolewhere = { bpUUID:bpId };
  var commwhere = { bpUUID:bpId };

    if(typeof args.body.value.bupaRole.roles[0] !== 'undefined'){
        var role = _.pick(args.body.value.bupaRole.roles[0],'bpRole','validFrom','validTo','customData');
        rolewhere.bpRole = role.bpRole;
    }
    if(typeof args.body.value.bupaComm.comms[0] !== 'undefined'){
        var comm = _.pick(args.body.value.bupaComm.comms[0],'commType','emailAddress','phoneNumber','url','customData');
        commwhere.commType = comm.commType;
    }

    db.bupaMain.findOne(
        {
            "include" : [
                {"model" : db.bupaRole, "where" : rolewhere },
                {"model" : db.bupaComm, "where" : commwhere }
            ]
        }
    ).then(function (bp) {
        if (!!bp) {
            return db.sequelize.transaction(function(t){
                return db.bupaMain.update(main,{where:{bpUUID: bpId}},{transaction: t}).then(function (bupaMain) {
                    return db.bupaRole.update(role,{where:{bpUUID: bpId, bpRole: role.bpRole}},{transaction: t}).then(function (bupaRole) {
                        return db.bupaComm.update(comm,{where:{bpUUID: bpId, commType: comm.commType}},{transaction: t});
                    });
                });
            }).then(function (result) {
                // Transaction has been committed
                // result is whatever the result of the promise chain returned to the transaction callback
                res.end(JSON.stringify(result));
            }).catch(function (err) {
                // Transaction has been rolled back
                // err is whatever rejected the promise chain returned to the transaction callback
                res.end(JSON.stringify(err));
            });
        }
        else {
            res.status(404).end();
        }
    }, function (err) {
        res.end(JSON.stringify(err));
    });
}

exports.bpCommBpUUIDDELETE = function(args, res, next) {
  /**
   * parameters expected in the args:
  * bpUUID (String)
  **/
  // no response value expected for this operation
  res.end();
}

exports.bpCommBpUUIDGET = function(args, res, next) {
  /**
   * parameters expected in the args:
  * bpUUID (String)
  **/
    var examples = {};
  examples['application/json'] = {
  "comms" : [ {
    "emailAddress" : "aeiou",
    "phoneNumber" : "aeiou",
    "bpUUID" : "aeiou",
    "adrUUID" : "aeiou",
    "customData" : "{}",
    "url" : "aeiou"
  } ]
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.bpCommBpUUIDPOST = function(args, res, next) {
  /**
   * parameters expected in the args:
  * bpUUID (String)
  * body (BupaComm)
  **/
  // no response value expected for this operation
  res.end();
}

exports.bpCommBpUUIDPUT = function(args, res, next) {
  /**
   * parameters expected in the args:
  * bpUUID (String)
  * body (BupaComm)
  **/
  // no response value expected for this operation
  res.end();
}

exports.bpPOST = function(args, res, next) {
  /**
   * parameters expected in the args:
  * body (BupaMain)
  **/
  // no response value expected for this operation
  var body = _.pick(args.body.value,'bpFirstName','bpLastName','bpKind','deleted','customData');

    db.bupaMain.create(body).then(function(bupaMain) {
        res.end(JSON.stringify(bupaMain));
        console.log(body);
    }, function (e) {
//        res.status(400).json(e);
    });

  res.end();
}

exports.bpRelBpUUIDDELETE = function(args, res, next) {
  /**
   * parameters expected in the args:
  * bpUUID (String)
  **/
  // no response value expected for this operation
  res.end();
}

exports.bpRelBpUUIDGET = function(args, res, next) {
  /**
   * parameters expected in the args:
  * bpUUID (String)
  **/
    var examples = {};
  examples['application/json'] = {
  "rels" : [ {
    "bpUUID" : "aeiou",
    "relType" : "aeiou",
    "customData" : "{}",
    "validFrom" : "2000-01-23T04:56:07.000+00:00",
    "relatedBpUUID" : "aeiou",
    "validTo" : "2000-01-23T04:56:07.000+00:00"
  } ]
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.bpRelBpUUIDPUT = function(args, res, next) {
  /**
   * parameters expected in the args:
  * bpUUID (String)
  * body (BupaRel)
  **/
  // no response value expected for this operation
  res.end();
}

exports.bpRoleBpUUIDDELETE = function(args, res, next) {
  /**
   * parameters expected in the args:
  * bpUUID (String)
  **/
  // no response value expected for this operation
  res.end();
}

exports.bpRoleBpUUIDGET = function(args, res, next) {
  /**
   * parameters expected in the args:
  * bpUUID (String)
  **/
    var examples = {};
  examples['application/json'] = {
  "roles" : [ {
    "bpUUID" : "aeiou",
    "bpRole" : "aeiou",
    "customData" : "{}",
    "validFrom" : "2000-01-23T04:56:07.000+00:00",
    "validTo" : "2000-01-23T04:56:07.000+00:00"
  } ]
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.bpRoleBpUUIDPUT = function(args, res, next) {
  /**
   * parameters expected in the args:
  * bpUUID (String)
  * body (BupaRole)
  **/
  // no response value expected for this operation
  res.end();
}

