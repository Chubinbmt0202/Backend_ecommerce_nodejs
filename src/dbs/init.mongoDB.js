'use strict'
// Mục đích của file này là để chỉ khởi tạo 1 kết nối, sigleton pattern
const mongoose = require('mongoose')
const {db: {host, port, name}} = require('../configs/config.mongoDB')
const connectString = `mongodb://${host}:${port}/${name}`
console.log("connectString: ", connectString);
class Database {

    constructor() {
        this.connect()
    }

    connect() {
        // Môi trường development thì sẽ hiển thị log
        if (1 === 1) {
            mongoose.set('debug', true)
            mongoose.set('debug', {color: true})
        }

        mongoose.connect(connectString).then(() => {
            console.log('Connected to MongoDB successfully PRO!')
        }).catch((err) => {
            console.error('Error connecting to MongoDB', err)
        })
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }

        return Database.instance
    }
}

const instanceMongoDB = Database.getInstance()
module.exports = instanceMongoDB