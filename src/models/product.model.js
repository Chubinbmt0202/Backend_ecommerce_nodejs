'use strict'

const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = 'Product';
const COLLECTION_NAME = 'products';

const productSchema = new Schema({
    product_name: {
        type: String,
        required: true
    },
    product_thumbnail: {
        type: String,
        required: true
    },
    product_description: String,
    product_price: {
        type: Number,
        required: true
    },
    product_quantity: {
        type: Number,
        required: true
    },
    product_type : {
        type: String,
        enum: ['T-shirt', 'Pants', 'Shoes', 'Accessories', 'Others'],
        required: true
    },
    product_shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
    },
    product_attributes: {
        type: Schema.Types.Mixed,
        required: true
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

// define the product type = Clothing

const ClothSchema = new Schema({
    brand: {
        type: String,
        required: true
    },
    size: String,
    material: String,
}, {
    timestamps: true,
    collection: 'Clothes'
});

// define the product type = Shoes

const ShoesSchema = new Schema({
    brand: {
        type: String,
        required: true
    },
    size: String,
    material: String,
}, {
    timestamps: true,
    collection: 'Shoes'
});

module.exports = {
    product: model(DOCUMENT_NAME, productSchema),
    cloth: model('Clothes', ClothSchema),
    shoes: model('Shoes', ShoesSchema),
}