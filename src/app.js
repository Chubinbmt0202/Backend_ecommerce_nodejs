const express = require('express');
const { default: helmet } = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const app = express();

// init middleware
app.use(morgan('dev'));
app.use(helmet()); // bảo mật
app.use(compression) // giảm dung lượng trả về

// init db

// init routes

app.get('/', (req, res, next) => {
    res.send('Hello World');
});

// handling errors

module.exports = app;