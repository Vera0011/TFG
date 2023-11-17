const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const https = require("https");
const fs = require("fs");


const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'jade');

app.use("/account/v1", require("./src/routes/account"));
app.use("/database/v1", require("./src/routes/database"));

/* IF 404 PETITION IS SENT */
app.use((req, res) => {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) return res.status(404).send({ code: 404, error: 'Bad request - Not found' });

  // respond with json
  if (req.accepts('json')) return res.status(404).json({ code: 404, error: 'Bad request - Not found' });

  // default to plain-text. send()
  res.type('txt').status(404).send('Code 404 - Bad request - Not found');
});

let options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem")
}

/* Starting the server */
https.createServer(options, app).listen(process.env.SERVER_PORT, process.env.SERVER_IP, () => {
  console.log('Starting server on port ' + process.env.SERVER_PORT);
});