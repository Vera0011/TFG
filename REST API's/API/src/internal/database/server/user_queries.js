const database_connection = require("./init_connection");

const get_from_server_data = async (object_params, collection_name) => {
  let database = (await database_connection).db("server_data");

  return await database
    .collection(collection_name)
    .find(object_params)
    .toArray()
    .catch((err) => console.log(err));
};

const create_database_mongodb = async () => {

}

module.exports = { get_from_server_data, create_database_mongodb };
