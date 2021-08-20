const mongoose = require("mongoose");
const usersTable = new mongoose.Schema({
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: true,
      maxlength: 10,
      minlength: 10
    },
    password: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      required: true
    },

    userStatus: {
      type: String, 
      required: true
    },
  }, {
    timestamps: true,
    versionKey: false,
    autoIndex: true
  });
  module.exports = mongoose.model("User", usersTable);