/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
const express = require('express');

const app = express();
app.use('/api/user', require('./UserRoute'));
app.use('api/auth', require('./AuthRoute'));

module.exports = app;
