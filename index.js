const express = require('express');

const app = express();
const cors = require('cors');

app.use(cors({ origin: true, credentials: true }));

require('./startup/logging')(app);
require('./startup/db')();
require('./startup/error')(app);
require('./startup/routes')(app);

const start = async () => {
  try {
    app.listen(8080);
    console.log('connected on port 8080');
  } catch (err) {
    console.error(`Error on server startup: ${err.message}`);
  }
};

start();
