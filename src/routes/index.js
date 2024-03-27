'use strict'

const express = require('express');
const {apiKey, permission} = require('../auth/CheckAuth');
const router = express.Router();

//check api 
router.use(apiKey)
//check permission
router.use(permission('0000'))

router.use('/v1/api', require('./user'));

module.exports = router;