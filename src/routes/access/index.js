"use strict";

const express = require("express");
const AccessController = require("../../controllers/access.controller");
const router = express.Router();

router.post("/shop/register", AccessController.Register);

module.exports = router;
