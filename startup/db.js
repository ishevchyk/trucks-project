const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

module.exports = function () {
  mongoose.connect(`mongodb+srv://${dotenv.parsed.DB_NAME}:${dotenv.parsed.DB_PASSWORD}@nodehw3.24rumwq.mongodb.net/freight`)
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err));
};
