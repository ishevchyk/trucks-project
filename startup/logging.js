const fs = require('fs');
const morgan = require('morgan');

module.exports = function (app) {
  const logStream = fs.createWriteStream(('./logs.log'), { flags: 'a' });
  app.use(morgan('combined', { stream: logStream }));
};
