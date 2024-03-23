"use strict";

const express = require("express");
const AccessController = require("../../controllers/access.controller");
const { asyncHandler } = require("../../auth/CheckAuth");
const router = express.Router();

router.post("/shop/register", asyncHandler(AccessController.Register));

module.exports = router;
