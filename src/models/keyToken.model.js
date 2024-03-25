// Lưu lại idUser, publicKey, privateKey vào bảng keyToken

'use strict'

const {model, Schema} = require('mongoose')

const DOCUMENT_NAME = 'ApiKey'
const COLLECTION_NAME = 'ApiKeys'

var keyTokenSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref: 'Shop',
        required:true,
    },
    privateKey:{
        type:String,
        required:true,
    },
    publicKey:{
        type:String,
        required:true,
    },
    refreshTokensUsed:{
        type:Array,
        default: [],
    },
    refreshToken:{
        type:String,
        required:true,
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, keyTokenSchema);