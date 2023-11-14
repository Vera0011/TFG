// /* VALIDATE USER INFO */

const { get_from_server_data } = require("./user_queries");

class Users {
  email;
  password;
  api_key;

  Users(email = "", password = "", api_key = "") {
    this.email = email;
    this.password = password;
    this.api_key = api_key;
  }

  isRegistered = async () => {
    return (await get_from_server_data({ email: email, password: password }, "Users")).length == 1;
  }

  containsApiKey = async () => {
    return (await get_from_server_data({ user_id: userData[0].user_id }, "Api_Keys")).length == 1;
  }
}

module.exports = { Users }