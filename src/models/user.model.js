'use strict'

const {model, Schema, Types} = require('mongoose')

const DOCUMENT_NAME = 'User'
const COLLECTION_NAME = 'users'

// Declare the Schema of the Mongo model
var UserSchema = new Schema({
    name:{
        type:String,
        trim: true,
        maxLength: 150,
    },
    email:{
        type:String,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum: ['active', 'inactive'],
        default: 'inactive',
        required:true,
    },
    verified:{
        type:Schema.Types.Boolean,
        default: false,
    },
    role:{
        type:Array,
        default: [],
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = model(DOCUMENT_NAME, UserSchema);