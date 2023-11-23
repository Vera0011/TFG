/* CREATION OF BEARER TOKEN */

const jwt = require("jwt-simple");
const moment = require("moment");
require("dotenv").config();

const create_bearer_token = (user_id, password) => {
  return jwt.encode(
    {
      sub: user_id,
      password: password,
      iat: moment().unix(),
      exp: moment().add(24, "hours").unix(),
    },
    process.env.TOKEN_PRIVATE
  );
};

const decode_bearer_token = (bearer_token) => {
  return jwt.decode(bearer_token, process.env.TOKEN_PRIVATE).catch((err) => console.log(err));
};

const check_active_bearer = (response, exp) => {
  if (exp <= moment().unix())
    return response.status(401).send({ code: 401, message: "Token expired" });
  else response.status(200).send({ code: 200, message: "User authenticated" });
};

module.exports = {
  create_bearer_token,
  decode_bearer_token,
  check_active_bearer,
};
