'use strict'

// Import or define keyTokenModel here
const keyTokenModel = require('../models/keyToken.model');

class KeyTokenService {
    async createKeyToken({userID, publicKey}) {
        try {
            const publicKeyString = publicKey.toString();
            const tokens  = await keyTokenModel.create({
                user: userID,
                publicKey: publicKeyString,
            });
            return tokens ? publicKeyString : null;
        } catch (error) {
            return error
        }
    } 
}

// Export an instance of KeyTokenService, not the class itself
module.exports = KeyTokenService;