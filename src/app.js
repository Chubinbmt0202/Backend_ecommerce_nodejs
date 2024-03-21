// Import Express.js
const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const compresions = require('compression');

// Khởi tạo ứng dụng Express
const app = express();

// init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compresions())

// init db
require('./dbs/init.mongoDB');

// init routes
app.use(require('./routes/index'));

// init error handler

module.exports = app;