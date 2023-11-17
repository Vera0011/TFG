// /* VALIDATE USER INFO */

const { get_from_server_data } = require("./user_queries");

class Users {
  email;
  password;

  Users(email = "", password = "") {
    this.email = email;
    this.password = password;
  }

  isRegistered = async () => {
    return (await get_from_server_data({ email: this.email, password: this.password }, "Users")).length == 1;
  }
}

module.exports = { Users }