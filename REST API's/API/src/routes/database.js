const express = require("express");
const router = express.Router();
const { create_database_mongodb, get_internal_data_mongodb } = require("../internal/database/server/user_queries")

/* FINISHED CREATION DB */
router.post("/create", async (req, res) => {
  if (
    !req.headers.authorization ||
    req.headers.authorization.split(" ")[1].includes("undefined")
  )
    return res
      .status(401)
      .send({ code: 401, message: "Token not provided or undefined" });

  if (!req.body.demo || !req.body.type || !req.body.user || !req.body.password)
    return res
      .status(401)
      .send({
        code: 401,
        message:
          "Specify the user and password of the administrator. Also the type of database and if you want demo data",
      });

  if (req.body.demo != "false" && req.body.demo != "true") res.status(401).send({ code: 401, message: "Incorrect demo option" });

  let { sub, exp } = decode_bearer_token(
    req.headers.authorization.split(" ")[1]
  );

  /* DATABASE SEARCHED USER */
  let searchedUser = await get_internal_data({ email: sub }, "Users");

  if (searchedUser.length != 1)
    return res.status(401).send({ code: 401, message: "Invalid user" });
  if (exp <= moment().unix())
    return res.status(401).send({ code: 401, message: "Token expired" });
  else {
    if (req.body.type == "mongodb") create_database_mongodb(req.body.user, req.body.password, req.body.demo);
    else res.status(401).send({ code: 401, message: "Database format not supported" });
  }
});

/* FINISHED */
router.post("/query", async (req, res) => {
  if (
    !req.headers.authorization ||
    req.headers.authorization.split(" ")[1].includes("undefined")
  )
    return res
      .status(401)
      .send({ code: 401, message: "Token not provided or undefined" });

  if (!req.body.collection || !req.body.params)
    return res
      .status(401)
      .send({
        code: 401,
        message:
          "Specify a Collection and the params",
      });

  let { sub, exp } = decode_bearer_token(
    req.headers.authorization.split(" ")[1]
  );

  /* DATABASE SEARCHED USER */
  let searchedUser = await get_internal_data({ email: sub }, "Users");

  if (searchedUser.length != 1)
    return res.status(401).send({ code: 401, message: "Invalid user" });
  if (exp <= moment().unix())
    return res.status(401).send({ code: 401, message: "Token expired" });
  else {
    if (req.body.type == "mongodb") res.status(200).send({ code: 200, message: [await get_internal_data_mongodb(req.body.collection, req.body.params, "test_1234")] });
    else res.status(401).send({ code: 401, message: "Database format not supported" });
  }
});

router.post("/drop", async (req, res) => { });

module.exports = router;
