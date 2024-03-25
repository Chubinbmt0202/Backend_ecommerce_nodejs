"use strict";

const express = require("express");
const AccessController = require("../../controllers/access.controller");
const { asyncHandler } = require("../../auth/CheckAuth");
const router = express.Router();

router.post("/shop/register", asyncHandler(AccessController.Register));
router.post("/shop/login", asyncHandler(AccessController.Login));


module.exports = router;
