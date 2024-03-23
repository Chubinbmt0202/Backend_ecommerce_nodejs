'use strict'

const express = require('express');
const apiKey = require('../auth/CheckAuth');
const router = express.Router();

//check api 
router.use(apiKey)
//check permission

router.use('/v1/api', require('./access'));

module.exports = router;