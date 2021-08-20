const User = require("../model/User");
const mongoose = require("mongoose");

//To reister a User
const register = async (req, res, next) => {
  let user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    username: req.body.username,
    gender: req.body.gender,
    phone: req.body.phone,
    password: req.body.password,
    userStatus: "ONLINE",
    isActive: true,
  });

  await user
    .save()
    .then((user) => {
      return res.status(201).json({
        status: "Success",
        message: "User Added Successfully!!!",
        Data: user,
      });
    })
    .catch((error) => {
      return res.status(401).json({
        status: "",
        message: "",
        error: "An error occured while registering!!!" + error,
        Data: {},
      });
    });
};
//To Edit a User
const editUser = async (req, res, next) => {
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
        userStatus: "ONLINE",
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
          status: "Fail",
          message: "",
          error:
            `An error occure while updating group ${req.params.groupId} ` + err,
          Data: {},
        });
      } else {
        return res.status(201).send({
          status: "Success",
          message: "Successfully Updated group",
          Data: result,
        });
      }
    }
  );
};
//To get list of all User
const allUser = async (req, res, next) => {
  await User.find({
    $and: [
      {
        isActive: true,
      },
    ],
  })
    .then((result) => {
      return res
        .status(201)
        .json({
          status: "Success",
          message: "",
          Data: result,
        })
        .send();
    })
    .catch((error) => {
      return res.status(400).send({
        status: "Fail",
        message: "",
        error:
          "An error occured while getting the data for requested User !!!." +
          error,
        Data: {},
      });
    });
};
//To get detail of user
const detailUser = async (req, res, next) => {
  await User.findById(req.params.id, (err, result) => {
    if (err) {
      return res.status(404).send({
        status: "Fail",
        message: "",
        error: "No group found for the id." + err,
        Data: {},
      });
    } else {
      return res.status(201).send({
        status: "Success",
        message: "",
        Data: result,
      });
    }
  });
};
//To delete a user
const deleteUser = async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id)
    .then((result) => {
      return res.status(201).send({
        status: "Success",
        message: "User Status Deleted Successfully!!!",
        Data: "",
      });
    })
    .catch((error) => {
      return res.status(400).send({
        status: "Fail",
        message: "",
        error: "An error occured while deleting user status. " + error,
        Data: {},
      });
    });
};
module.exports = { register, editUser, allUser, detailUser, deleteUser };
