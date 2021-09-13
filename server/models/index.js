const mongoose = require('mongoose')

const coinSchema = require('./coin')

module.exports = {
  Coin: mongoose.model('Coin', coinSchema)
}
