const jwt = require("jwt-simple");
const moment = require("moment");
require("dotenv").config();

const create_bearer_token = (user_id, api_key) => {
    console.log(process.env.TOKEN_PRIVATE)
    
    return jwt.encode(
    {
      sub: user_id,
      api_key: api_key,
      iat: moment().unix(),
      exp: moment().add(24, "hours").unix(),
    },
    process.env.TOKEN_PRIVATE
  );
};

const decode_bearer_token = (bearer_token) => {
  return jwt.decode(bearer_token, process.env.TOKEN_PRIVATE);
};

module.exports = { create_bearer_token, decode_bearer_token };
