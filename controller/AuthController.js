/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const config = require('../config/Database');

const login = async (req, res) => {
  const { username } = req.body;
  const { password } = req.body;

  await User.findOne({
    $and: [
      {
        username,
      },
    ],
  }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, async (error, result) => {
        if (error) {
          return res.status(401).json({
            status: '',
            error: `An error occured while registering!!!${error}`,
            Data: {},
          });
        }
        if (result) {
          const token = jwt.sign({ email: user.email, username: user.username, id: user._id }, config.secret,
            {
              expiresIn: '2h',
            });

          const send = {
            data: user,
            token,
          };
          return res.status(201).json({
            status: 'Success',
            message: 'User Added Successfully!!!',
            Data: send,
          });
        }
      });
    } else {
      return res.status(401).json({
        status: '',
        error: 'An error occured while registering!!!',
        Data: {},
      });
    }
  })
    .catch((error) => res.status(401).json({
      status: '',
      error: `An error occured while registering!!!${error}`,
      Data: {},
    }));
};
const AuthorizeRequest = (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (req.headers.authorization.split(' ')[0] !== 'Bearer') {
        return res.status(401).json({
          message: 'Authentication Bearer required!!!',
        })
          .send();
      }

      const decode = jwt.verify(token, config.secret);
      console.log('decode_id', decode.id);
      req.user = decode;
      next();
    } catch (error) {
      res.status(403).json({
        message: 'Invalid Authentication Token!!!',
      }).send();
    }
  } else {
    res.status(401).json({
      message: 'Authentication Failed!!!',
    }).send();
  }
};

module.exports = { login, AuthorizeRequest };
