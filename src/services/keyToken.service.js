'use strict'

// Import or define keyTokenModel here
const keyTokenModel = require('../models/keyToken.model');

class KeyTokenService {
    async createKeyToken({userID, publicKey, privateKey}) {
        try {
            const tokens  = await keyTokenModel.create({
                user: userID,
                publicKey,
                privateKey,
            });
            return tokens ? tokens.publicKey : null;
        } catch (error) {
            return error
        }
    } 
}

// Export an instance of KeyTokenService, not the class itself
module.exports = new KeyTokenService();