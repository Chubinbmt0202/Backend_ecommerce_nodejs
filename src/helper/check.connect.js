'use strict'

const mongoose = require('mongoose')
const os = require('os')
const process = require('process')
const _SECONDS = 5000
// Mục đích của file này là để kiểm tra số lượng kết nối
const countConnect = () => {
    const numConnection  = mongoose.connections.length
    console.log('Number of connections: ', numConnection);
}

// Kiểm tra quá tải kết nối
// const checkOverload = () => {
//     setInterval(() => {
//         const numConnection  = mongoose.connections.length
//         const numCore = os.cpus().length
//         const memoryUse = process.memoryUsage().rss
//         console.log(`Memory use: ${memoryUse / 1024 / 1024} MB`);
//         console.log('Number of connections: ', numConnection);
//         const maximumConnection = numCore * 2

//         if (numConnection > maximumConnection) {
//             console.log('Overload connection');
//         }

//     }, _SECONDS);
// }

module.exports = {
    countConnect
    // checkOverload
}