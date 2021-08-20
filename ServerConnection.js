const express = require('express');
const mongoose = require('mongoose');
const app = express();
const config = require("./config/Database");

const mongo_URI = config.myDB;
mongoose.connect(mongo_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('connection establised');
    }).catch((error) => {
        console.error('error in connection establise');
    });