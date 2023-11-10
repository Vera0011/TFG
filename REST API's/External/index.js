const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));

app.use("/account/v1", require("./src/routes/account"));
app.use("/database/v1", require("./src/routes/database"));

// starting the server
app.listen(3001, () => {
  console.log('Starting server on port 3001');
});