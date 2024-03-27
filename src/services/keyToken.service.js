'use strict'

// Import or define keyTokenModel here
const keyTokenModel = require('../models/keyToken.model');

class KeyTokenService {
    static async createKeyToken({userID, publicKey, privateKey, refreshToken}) {
        try {
            // cách 1
            // const tokens  = await keyTokenModel.create({
            //     user: userID,
            //     publicKey,
            //     privateKey,
            // });
            // return tokens ? tokens.publicKey : null;
            ///////////////
            // cách 2
            const filter = { user: userID };
            const update = { publicKey, privateKey, refreshTokenUser: [], refreshToken };
            const options = { upsert: true, new: true };

            const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options);

            return tokens ? tokens.publicKey : null;
        } catch (error) {
            return error
        }
    } 

    static async findByUserID(userID) {
        return await keyTokenModel.findOne({ user: userID }).lean();
    }

    static removeKeyByID = async (id) => {
        return await keyTokenModel.deleteOne(id)
    }
}
module.exports = KeyTokenService