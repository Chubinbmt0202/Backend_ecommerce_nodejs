'use strict'

const JWT = require('jsonwebtoken');
const createTokenPair = async (payload, publickey, privateKey) => {
    try {
        // access token
        const accessToken = await JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '1d',
        });

        const refreshToken = await JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '7d',
        });

        JWT.verify(accessToken, publickey, (err, decoded) => {
            if (err) {
                console.log('error verify', err);
            }else {
                console.log('decoded', decoded);
            }
        })
        return { accessToken, refreshToken}
    } catch (error) {
        return error
    }
}

module.exports = {
    createTokenPair   
}