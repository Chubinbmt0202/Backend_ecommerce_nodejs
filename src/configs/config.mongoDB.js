"use strict"

// level 1
// const config = {
//     app: {
//         port: process.env.PORT || 3000
//     },
//     db: {
//         host: 'localhost',
//         port: 27017,
//         name: 'Shop'
//     }
// }

// level 2
const dev = {
    app: {
        port: process.env.DEV_APP_PORT || 9999
    },
    db: {
        host: process.env.DEV_DB_HOST || 'localhost',
        port: process.env.DEV_DB_PORT || 27017,
        name: process.env.DEV_DB_NAME || 'Shop'
    }
}

const product = {
    app: {
        port: process.env.PRODUCT_APP_PORT || 9999
    },
    db: {
        host: process.env.PRODUCT_DB_HOST || 'localhost',
        port: process.env.PRODUCT_DB_PORT || 27017,
        name: process.env.PRODUCT_DB_NAME || 'ShopProduct'
    }
}

const config = {dev, product}
const env = process.env.NODE_ENV || 'dev'
module.exports = config[env];