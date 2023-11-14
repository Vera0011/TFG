const express = require("express");
const router = express.Router();
const { create_bearer_token } = require("../internal/database/server/auth_bearer");
const { Users } = require("../internal/database/server/User")

/* USER REGISTER */
router.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.api_key)
    return res.status(401).send({
      code: 401,
      message:
        "In order to make this petition, you need to add to the body: Email, password and Api Key. Remember to specify the 'Content-Type' of the petition",
    });

  let userObject = new Users(req.body.email, req.body.password, req.body.api_key);
  let containsApiKey = await userObject.containsApiKey();
  let isRegistered = await userObject.isRegistered();

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
