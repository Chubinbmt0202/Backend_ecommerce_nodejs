'use strict'

const express = require('express');
const {apiKey, permission} = require('../auth/CheckAuth');
const router = express.Router();

router.use('/v1/api', require('./user'));

module.exports = router;