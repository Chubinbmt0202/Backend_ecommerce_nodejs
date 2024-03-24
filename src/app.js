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
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// init db
require('./dbs/init.mongoDB');

// init routes
app.use(require('./routes/index'));

// init error handler
// middleware xử lý lỗi 404
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

// hàm xử lý lỗi 
app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Server Error' 
    })
})

module.exports = app;