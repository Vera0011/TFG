/* CONNECTION TO DATABASE */

const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

module.exports = MongoClient.connect(process.env.INTERNAL_SERVER_URI, (err, database) => {
    if (err) throw err;
    return database;
});