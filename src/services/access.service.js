'use strict'

const ShopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const keyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/AuthUtils');
const { getInforData } = require('../utils');

const RoleShop = {
    ADMIN: 'admin',
    SHOP: 'shop',
    WRITE: 'write',
    EDIT: 'edit',
}

class AccessService {
    Register = async ({name, email, password}) => {
        try {
            const holderShop = await ShopModel.findOne({email}).lean(); 
            // sử dụng lean() để chuyển đổi kết quả từ object mongoose sang object javascript

            if(holderShop) {
                return {
                    code: 'xxx',
                    message: 'Email đã tồn tại',
                    status: 'error'
                }
            }

            const passwordHash = await bcrypt.hash(password, 10);
            
            const newShop = await ShopModel.create({name, email, password: passwordHash, role: [RoleShop.SHOP]});
            
            if(newShop) {
                // create publicKey, privateKey
                // const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
                //     modulusLength: 4096,
                //     publicKeyEncoding: {
                //         type: 'pkcs1',
                //         format: 'pem', // định dạng mã hoá nhị phân
                //     },
                //     privateKeyEncoding: {
                //         type: 'pkcs1',
                //         format: 'pem',
                //     }
                // });
                // console.log('privateKey', privateKey);
                // console.log('publicKey', publicKey);

                const privateKey = crypto.randomBytes(64).toString('hex');
                const publicKey = crypto.randomBytes(64).toString('hex');
                console.log('privateKey', privateKey);
                console.log('publicKey', publicKey);

                const keyStore = await keyTokenService.createKeyToken({userID: newShop._id, publicKey, privateKey});
                if (!keyStore) {
                    return {
                        code: 'xxx',
                        message: 'Tạo keyToken thất bại',
                    }
                }

                // create token pair
                const tokens = await createTokenPair({userID: newShop._id, email}, publicKey, privateKey);
                console.log('create success', tokens);

                return {
                    code: 201,
                    metadata: {
                        shop: getInforData({fileds: ['_id', 'name', 'email'], object: newShop}),
                        tokens
                    }
                }
            }
            return {
                code: 200,
                metadata: null
            }
        } catch (error) {
            console.error(error);
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }
}

module.exports = new AccessService();