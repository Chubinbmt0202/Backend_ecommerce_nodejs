'use strict'

const mongoose = require('mongoose')

const connectString = 'mongodb://localhost:27017/Shop'

mongoose.connect(connectString).then(() => {
  console.log('Connected to MongoDB successfully!')
}).catch((err) => {
  console.error('Error connecting to MongoDB', err)
})

module.exports = mongoose