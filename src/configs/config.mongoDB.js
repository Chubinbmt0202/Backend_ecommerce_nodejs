'use strict'

const development = {
    app: {
        port: process.env.DEV_APP_PORT || 3000
    },
    db: {
        host: process.env.DEV_DB_HOST || 'localhost',
        port: process.env.DEV_DB_POST || 27017,
        name: process.env.DEV_DB_NAME || 'ShopProduct'
    }
}

const product = {
    app: {
        port: process.env.PRODUCT_APP_PORT || 3000
    },
    db: {
        host: process.env.PRODUCT_DB_HOST || 'localhost',
        port: process.env.PRODUCT_DB_POST || 27017,
        name: process.env.PRODUCT_DB_NAME || 'ShopProduct'
    }
}

const config = {product, development}
const env = process.env.NODE_ENV || 'development'
module.exports = config[env];