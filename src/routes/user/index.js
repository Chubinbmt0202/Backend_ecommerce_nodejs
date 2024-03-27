"use strict";

const express = require("express");
const AccessController = require("../../controllers/access.controller");
const { asyncHandler } = require("../../auth/CheckAuth");
const { authenticator } = require("../../auth/AuthUtils");
const router = express.Router();

router.post("/shop/register", asyncHandler(AccessController.Register));
router.post("/shop/login", asyncHandler(AccessController.Login));
router.post("/shop/logout", asyncHandler(AccessController.Logout));



module.exports = router;
