const express = require('express');
const auth = require('../routes/auth');
const users = require('../routes/users');
const trucks = require('../routes/trucks');
const loads = require('../routes/loads');

module.exports = function (app) {
  app.use(express.json());
  app.use('/api/auth', auth);
  app.use('/api/users/me', users);
  app.use('/api/trucks', trucks);
  app.use('/api/loads', loads);
};
