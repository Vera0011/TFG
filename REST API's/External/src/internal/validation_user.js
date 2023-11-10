const database_connection = require("./internal_database");

const validate_user = async (email, password, api_key) => {
  let data = (await database_connection).db("server_test");

  let userData = await data
    .collection("Users")
    .find({ email: email, password: password })
    .toArray();
  let token_api = await data
    .collection("Api_keys")
    .find({ user_id: userData[0].user_id })
    .toArray();

  if (
    userData.length == 1 &&
    token_api.length == 1 &&
    token_api[0].api_key == api_key
  )
    return {
      email: userData[0].email,
      password: userData[0].password,
      api_key: token_api[0].api_key,
    };
  else return 0;
};

module.exports = { validate_user };
