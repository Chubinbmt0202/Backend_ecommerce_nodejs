"use strict";

const JWT = require("jsonwebtoken");
const asyncHandler = require("./CheckAuth");
const { UnauthorizedError } = require("../core/error.response");
const { findByUserID } = require("../services/keyToken.service");

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "client_id",
  AUTHORIZATION: "authorization",
};

const createTokenPair = async (payload, publickey, privateKey) => {
  try {
    // access token
    const accessToken = await JWT.sign(payload, publickey, {
      expiresIn: "3d",
    });

    const refreshToken = await JWT.sign(payload, privateKey, {
      expiresIn: "7d",
    });

    JWT.verify(accessToken, publickey, (err, decoded) => {
      if (err) {
        console.log("error verify", err);
      } else {
        console.log("decoded", decoded);
      }
    });
    return { accessToken, refreshToken };
  } catch (error) {
    return error;
  }
};

const authenticator = async (req, res, next) => {
  // 1. Check UserID
  // 2. Get access token
  // 3. Verify access token
  // 4. Check user in db
  // 5. Check keyStore with userID
  try {
    const userID = req.headers[HEADER.CLIENT_ID];
    if (!userID)
      throw new UnauthorizedError("Không tìm thấy client_id trong header");

    // 2
    const keyStore = await findByUserID(userID);
    // console.log('keyStore', keyStore);
    if (!keyStore) throw new UnauthorizedError("Không tìm thấy keyStore");
    req.keyStore = keyStore.user.toString();
  } catch (error) {
    throw error;
  }

  // 3
};

module.exports = {
  createTokenPair,
  authenticator,
};
