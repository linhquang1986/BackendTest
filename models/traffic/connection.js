//db connection, database name is mongoosetest
var mongoose = require('mongoose');
var appConfig = require('../../config');
var connection = mongoose.createConnection(appConfig.mongo.URI.traffic);
module.exports = connection;