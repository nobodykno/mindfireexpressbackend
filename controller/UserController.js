/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/User');
const config = require('../config/Database');
// To reister a User
const register = async (req, res) => {
  bcrypt.hash(req.body.password, 10, async (error, hashedPas) => {
    if (error) {
      res.json({
        status: 'Fail',
        error,
        Data: {},
      }).send();
    }
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      username: req.body.username,
      gender: req.body.gender,
      phone: req.body.phone,
      password: hashedPas,
      userStatus: 'ONLINE',
      isActive: true,
    });
    await user
      .save()
      .then((users) => {
        // eslint-disable-next-line no-underscore-dangle
        const token = jwt.sign({ email: users.email, username: users.username, id: users._id },
          config.secret,
          {
            expiresIn: '2h',
          });
        const send = {
          data: users,
          token,
        };
        return res.status(201).json({
          status: 'Success',
          message: 'User Added Successfully!!!',
          Data: send,
        });
      })
      .catch(() => res.status(401).json({
        status: '',
        message: '',
        error: 'An error occured while registering!!!',
        Data: {},
      }));
  });
};
// To Edit a User
const editUser = async (req, res) => {
  await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        username: req.body.username,
        gender: req.body.gender,
        phone: req.body.phone,
        password: req.body.password,
        avatar: req.body.avatar,
        userStatus: 'ONLINE',
        isActive: true,
      },
    },
    {
      new: true,
      useFindAndModify: false,
    },
    (err, result) => {
      if (err) {
        return res.status(400).send({
          status: 'Fail',
          message: '',
          error:
            `An error occure while updating group ${req.params.groupId} ${err}`,
          Data: {},
        });
      }
      return res.status(201).send({
        status: 'Success',
        message: 'Successfully Updated group',
        Data: result,
      });
    },
  );
};
// To get list of all User
const allUser = async (req, res) => {
  await User.find({
    $and: [
      {
        isActive: true,
      },
    ],
  })
    .then((result) => res
      .status(201)
      .json({
        status: 'Success',
        message: '',
        Data: result,
      })
      .send())
    .catch((error) => res.status(400).send({
      status: 'Fail',
      message: '',
      error:
          `An error occured while getting the data for requested User !!!.${
            error}`,
      Data: {},
    }));
};
// To get detail of user
const detailUser = async (req, res) => {
  await User.findById(req.params.id, (err, result) => {
    if (err) {
      return res.status(404).send({
        status: 'Fail',
        message: '',
        error: `No group found for the id.${err}`,
        Data: {},
      });
    }
    return res.status(201).send({
      status: 'Success',
      message: '',
      Data: result,
    });
  });
};
// To delete a user
const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
    .then((result) => res.status(201).send({
      status: 'Success',
      message: 'User Status Deleted Successfully!!!',
      Data: result,
    }))
    .catch((error) => res.status(400).send({
      status: 'Fail',
      message: '',
      error: `An error occured while deleting user status. ${error}`,
      Data: {},
    }));
};
module.exports = {
  register, editUser, allUser, detailUser, deleteUser,
};
