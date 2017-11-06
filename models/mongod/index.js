let user = require('./user');
let connection = require('./connection');

let myDb = {
    connection: connection,
    user: user
}

module.exports = myDb;
