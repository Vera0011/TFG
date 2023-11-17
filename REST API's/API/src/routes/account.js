const express = require("express");
const router = express.Router();
const {
  create_bearer_token,
} = require("../internal/database/server/auth_bearer");
const { Users } = require("../internal/database/server/User");

/* USER REGISTER */
router.post("/register", async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(401).send({
      code: 401,
      message:
        "In order to make this petition, you need to add to the body: Email and password. Remember to specify the 'Content-Type' of the petition",
    });

  let userObject = new Users(
    req.body.email,
    req.body.password
  );
  let isRegistered = await userObject.isRegistered();

  if (!isRegistered)
    return res
      .status(401)
      .send({ code: 401, message: "Invalid user or password" });
  else {
    res.status(200).send({
      code: 200,
      message: "User authenticated",
      token: create_bearer_token(req.body.email, req.body.password),
    });
  }
});

module.exports = router;
