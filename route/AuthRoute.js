/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
const router = require('express').Router();
const auth = require('../controller/AuthController');

router.post('/', auth.login);

module.exports = router;
