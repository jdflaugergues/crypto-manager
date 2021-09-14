const bunyan = require('bunyan')
const config = require('config')

const { Coin } = require('../models')

const log = bunyan.createLogger(config.log)

const CoinDao = {
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

      log.info('filter', filter)
      log.info('update', update)

      return await Coin.findOneAndUpdate(filter, update, { new: true })
    } catch (e) {
      log.error(`Error during update coin ${coin}`, e)
      return e
    }
  }
}

module.exports = CoinDao
