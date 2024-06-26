"use strict";

const AccessService = require("../services/access.service");
const { Created, OK, SuccessResponse } = require("../core/success.response");
class AccessController {
  Register = async (req, res, next) => {
    new Created({
        message: "Đăng ký tài khoản thành công",
        metadata: await AccessService.Register(req.body)
    }).send(res);
  };

  Login = async (req, res, next) => {
    new SuccessResponse({
        message: "Đăng nhập thành công",
        metadata: await AccessService.Login(req.body)
    }).send(res);
  };

  Logout = async (req, res, next) => {
    const apiKey = req.objKey.key
    new OK({
        message: "Đăng xuất thành công",
        metadata: await AccessService.Logout(apiKey)
    }).send(res);
  };
}

module.exports = new AccessController();
