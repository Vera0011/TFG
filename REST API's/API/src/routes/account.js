const express = require("express");
const router = express.Router();
const {
  create_bearer_token,
} = require("../internal/database/server/auth_bearer");
const { Users } = require("../internal/database/server/User");

/* USER REGISTER */
router.post("/register", async (req, res) => {
  if (req.body.email == undefined || req.body.password == undefined)
    return res.status(401).send({
      code: 401,
      message:
        "In order to make this petition, you need to add to the body: Email and password. Remember to specify the 'Content-Type' of the petition",
    });

  let isRegistered = await new Users().isRegistered(req.body.email, req.body.password);

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

router.get("/status_login", (req, res) => {
  if (!req.headers.authorization || req.headers.authorization.split(" ")[1].includes("undefined"))
    return res.status(401).send({ code: 401, message: "Token not provided or undefined" });

  decode_bearer_token(req.headers.authorization.split(" ")[1]);
});

module.exports = router;
