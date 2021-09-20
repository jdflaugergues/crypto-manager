const bunyan = require('bunyan')
const config = require('config')

const { Coin } = require('../models')

const log = bunyan.createLogger(config.log)

const CryptocurrencyDao = {
  async getCoins () {
    try {
      return await Coin.find()
    } catch (e) {
      log.error(`Error during find coins`, e)
      return e
    }
  },

  async getCoinById (coinId) {
    try {
      return await Coin.findOne({_id: coinId})
    } catch (e) {
      log.error(`Error during find coin with id ${coinId}`, e)
      return e
    }
  },

  async getCoinBySymbol (symbol) {
    try {
      return await Coin.findOne({symbol})
    } catch (e) {
      log.error(`Error during find coin with symbol ${symbol}`, e)
      return e
    }
  },



  async getCoin (symbol) {
    try {
      const coin = await Coin.findOne({symbol})

      return coin
    } catch (e) {
      log.error(`Error during find coin ${symbol}`, e)
      return e
    }
  },

  async createCoin(coin) {
    try {
      return await Coin.create(coin)
    } catch (e) {
      log.error(`Error during create coin ${coin}`, e)
      return e
    }
  },

  async updateCoin(symbol, coin) {
    try {
      const filter = { symbol }
      const update = coin

      return await Coin.findOneAndUpdate(filter, update, { new: true })
    } catch (e) {
      log.error(`Error during update coin ${coin}`, e)
      return e
    }
  },

  async updateCoins(symbols, update) {
    try {
      return await Coin.updateMany({symbol: {$in: symbols}}, update)
    } catch (e) {
      log.error(`Error during update coins ${symbols.join(', ')}`, e)
      return e
    }
  }
}

module.exports = CryptocurrencyDao
