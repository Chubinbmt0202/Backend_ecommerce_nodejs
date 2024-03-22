// Lưu lại idUser, publicKey, privateKey vào bảng keyToken

'use strict'

const {model, Schema} = require('mongoose')

const DOCUMENT_NAME = 'tokenShop'
const COLLECTION_NAME = 'tokenShops'

var keyTokenSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref: 'Shop',
        required:true,
    },
    publicKey:{
        type:String,
        required:true,
    },
    refreshToken:{
        type:Array,
        default: [],
        required:true,
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, keyTokenSchema);