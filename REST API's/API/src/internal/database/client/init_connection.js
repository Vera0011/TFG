/* CONNECTION TO DATABASE */

const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

/* CONNECT TO A USER DATABASE- PARAMS:
  - DATABASE IP: localhost / 34.98.107...
  - DATABASE PORT: 3000 / 27017 ....
  - DATABASE: admin / server_test ... (database name)
*/
const connect_to_database_mongodb = (database_ip, database_port, database) => {
  MongoClient.connect("=mongodb://" + database_ip + ":" + database_port + database, (err, database) => {
    if (err) throw err;
    return database;
  });
};

const connect_to_database_mysql = (database_ip, database_port, database) => {

};

module.exports = { connect_to_database_mongodb, connect_to_database_mysql };
