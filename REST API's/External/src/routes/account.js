const express = require("express");
const router = express.Router();
const {
  create_bearer_token,
  decode_bearer_token,
} = require("../internal/auth");
const { validate_user } = require("../internal/validation_user");

/* USER REGISTER */
router.post("/register", async(req, res) => {
let data = await validate_user(req.body.email, req.body.password, req.body.api_key);

  if (data != 0)
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

/* USER LOGIN */
router.get("/login", (req, res) => {
  if (!req.headers.authorization)
    return res.status(401).send({ code: 401, message: "Token not provided" });

  let { sub, exp } = decode_bearer_token(
    req.headers.authorization.split(" ")[1]
  );

  /* DATABASE SEARCHED USER */
  let searchedUser = "";
  /* */

  if (sub != searchedUser)
    return res.status(401).send({ code: 401, message: "Invalid user" });
  if (exp <= moment().unix())
    return res.status(401).send({ code: 401, message: "Token expired" });
  else res.status(200).send({ code: 200, message: "User authenticated" });
});

module.exports = router;
