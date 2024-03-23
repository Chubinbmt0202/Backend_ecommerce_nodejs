'use strict'

const ShopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const keyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/AuthUtils');
const { getInforData } = require('../utils');
const { BadRequestError, ConflictError } = require('../core/error.response');


const RoleShop = {
    ADMIN: 'admin',
    SHOP: 'shop',
    WRITE: 'write',
    EDIT: 'edit',
}

class AccessService {
    Register = async ({name, email, password}) => {

            const holderShop = await ShopModel.findOne({email}).lean(); 
            // sử dụng lean() để chuyển đổi kết quả từ object mongoose sang object javascript

            if(holderShop) {
                throw new BadRequestError('Tài khoản đã tồn tại')
            }

            const passwordHash = await bcrypt.hash(password, 10);
            
            const newShop = await ShopModel.create({name, email, password: passwordHash, role: [RoleShop.SHOP]});
            
            if(newShop) {

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
    }
}

module.exports = new AccessService();