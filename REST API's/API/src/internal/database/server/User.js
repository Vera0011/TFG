// /* VALIDATE USER INFO */

const { get_from_server_data } = require("./user_queries");

class Users {
  isRegistered = async (email, password) => {
    return (await get_from_server_data({ email: email, password: password }, "Users")).length == 1;
  }
}

module.exports = { Users }