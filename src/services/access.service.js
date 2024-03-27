"use strict";

const ShopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/AuthUtils");
const { getInforData } = require("../utils");
const {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
} = require("../core/error.response");
const { findByEmail } = require("./shop.service");
const userModel = require("../models/user.model");
const keyTokenModel = require("../models/keyToken.model");
const keyApiModel = require("../models/apiKey.model");

const RoleShop = {
  ADMIN: "admin",
  SHOP: "shop",
  WRITE: "write",
  EDIT: "edit",
};

class AccessService {
  Register = async ({ name, email, password }) => {
    const holderShop = await userModel.findOne({ email }).lean();
    // sử dụng lean() để chuyển đổi kết quả từ object mongoose sang object javascript

    if (holderShop) {
      throw new BadRequestError("Tài khoản đã tồn tại");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newShop = await ShopModel.create({
      name,
      email,
      password: passwordHash,
      role: [RoleShop.SHOP],
    });

    if (newShop) {
      const privateKey = crypto.randomBytes(64).toString("hex");
      const publicKey = crypto.randomBytes(64).toString("hex");

      const keyStore = await KeyTokenService.createKeyToken({
        userID: newShop._id,
        publicKey,
        privateKey,
      });
      if (!keyStore) {
        return {
          code: "xxx",
          message: "Tạo keyToken thất bại",
        };
      }

      // create token pair
      const tokens = await createTokenPair(
        { userID: newShop._id, email },
        publicKey,
        privateKey
      );

      return {
        code: 201,
        metadata: {
          shop: getInforData({
            fileds: ["_id", "name", "email"],
            object: newShop,
          }),
          tokens,
        },
      };
    }
    return {
      code: 200,
      metadata: null,
    };
  };

  // 1 check email
  // 2 check password
  // 3 create access token and refresh token
  // 4 genrate key token
  // 5 get data and login
  Login = async ({ email, password, refreshToken = null }) => {
    const foundShop = await findByEmail({ email });

    if (!foundShop) {
      throw new BadRequestError("Tài khoản không tồn tại");
    }
    // 2
    const match = await bcrypt.compare(password, foundShop.password);
    if (!match) {
      throw new UnauthorizedError("Xác thực không thành công");
    }

    // 3 take token
    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");

    const { _id: userID } = foundShop;
    const tokens = await createTokenPair(
      { userID, email },
      publicKey,
      privateKey,
      userID
    );

    await KeyTokenService.createKeyToken({
      refreshToken: tokens.refreshToken,
      privateKey,
      publicKey,
    });

    return {
      shop: getInforData({
        fileds: ["_id", "name", "email"],
        object: foundShop,
      }),
      tokens,
    };
  };

  Logout = async ( apiKey ) => {
    const apiKeyLogout = await keyApiModel.findOneAndDelete({ key: apiKey }).lean();
    
    if (apiKeyLogout) {
      return {
        code: 200,
        metadata: apiKeyLogout,
        message: "Thành công",
      };
    } else {
      return {
        code: 400,
        message: "Không tìm thấy key",
      };
    }
  };
}

module.exports = new AccessService();
