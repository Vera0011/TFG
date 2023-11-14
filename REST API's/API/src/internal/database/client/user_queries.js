const { database_connection } = require("./init_connection");

const get_internal_data_mongodb = async (
  object_params,
  database_host,
  database_port,
  collection_name
) => {


};

const get_internal_data_mysql = async (
  object_params,
  database_host,
  database_port,
  collection_name
) => {


};

module.exports = { get_internal_data_mongodb, get_internal_data_mysql };
