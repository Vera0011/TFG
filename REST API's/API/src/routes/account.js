const express = require("express");
const router = express.Router();
const {
  create_bearer_token,
} = require("../internal/database/server/auth_bearer");
const { Users } = require("../internal/database/server/User");
const {
  get_from_server_data,
} = require("../internal/database/server/user_queries");

/* USER REGISTER */
router.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.api_key)
    return res.status(401).send({
      code: 401,
      message:
        "In order to make this petition, you need to add to the body: Email, password and Api Key. Remember to specify the 'Content-Type' of the petition",
    });

  let userObject = new Users(
    req.body.email,
    req.body.password,
    req.body.api_key
  );
  let isRegistered = await userObject.isRegistered();
  let containsApiKey = await userObject.containsApiKey(
    await get_from_server_data({
      email: userObject.email,
      password: userObject.password,
    }).user_id
  );

  if (!containsApiKey || !isRegistered)
    return res
      .status(401)
      .send({ code: 401, message: "Invalid user, password or api key" });
  else {
    res.status(200).send({
      code: 200,
      message: "User authenticated",
      token: create_bearer_token(req.body.email, req.body.api_key),
    });
  }
});

module.exports = router;
