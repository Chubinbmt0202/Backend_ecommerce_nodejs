"use strict";

const express = require("express");
const AccessController = require("../../controllers/access.controller");
const { asyncHandler, apiKey, permission } = require("../../auth/CheckAuth");
const { authenticator } = require("../../auth/AuthUtils");
const router = express.Router();


router.post("/shop/register", asyncHandler(AccessController.Register));
router.post("/shop/login", apiKey, permission('0000'), asyncHandler(AccessController.Login));
router.post("/shop/logout", apiKey, permission('0000'), asyncHandler(AccessController.Logout));



module.exports = router;
