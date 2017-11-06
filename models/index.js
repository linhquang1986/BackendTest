let mongod = require('./mongod');
let trafficDb = require('./traffic');

let databases = {
  database_mongod: mongod,
  trafficDb: trafficDb
}

module.exports = databases;