var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');
var mongoose = require("mongoose")
var cors = require('cors')

// INIT
dotenv.config();

// Database
var mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Routers
var router = require('./routes/index.js');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//router
app.use(cors());
app.use('/', router);

module.exports = app;
