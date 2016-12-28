var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || 'development';
var config    = require('./config')[env];
var fs        = require('fs');
var path      = require('path');
var sequelize;

sequelize = new Sequelize(config.url, {
    dialect: config.dialect
});

var db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

var basename  = path.basename(module.filename);

//Load all the models
fs
    .readdirSync(__dirname+ '/models/')
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function(file) {
        var model = sequelize['import'](path.join(__dirname + '/models/', file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize.sync({
    force:false // true: refreshes the tables
})

module.exports = db;
