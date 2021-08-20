const express = require('express');
const app = express();

app.use("/api/user", require('./UserRoute'));

module.exports = app;