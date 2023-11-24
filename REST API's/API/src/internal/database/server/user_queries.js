const database_connection = require("./init_connection");

const get_from_server_data = async (object_params, collection_name) => {
  let database = (await database_connection).db("server_data");

  return await database
    .collection(collection_name)
    .find(object_params)
    .toArray()
    .catch((err) => console.log(err));
};

const get_internal_data_mongodb = async (object_params, collection_name, database) => {
  let database = (await database_connection).db(database);

  return await database
    .collection(collection_name)
    .find(object_params)
    .toArray()
    .catch((err) => console.log(err));
}

const create_database_mongodb = async (
  object_params,
  database_host,
  database_port,
  collection_name
) => {
}

module.exports = { get_from_server_data, create_database_mongodb, get_internal_data_mongodb };
