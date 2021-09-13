const bunyan = require('bunyan')
const config = require('config')

const CronJobManager = require('./cron-job-manager')
const cryptoService = require('./crypto.service')
const emailService = require('./email.service')
const cryptoConfig = require('./crypto-config')
const CoinDao = require('../dao/coin-dao')

const log = bunyan.createLogger(config.log)

const handleCoin = (cryptocurrencySymbol, price) => {
  log.info(cryptocurrencySymbol, price)
  const coinConfig = cryptoConfig[cryptocurrencySymbol]

  return CoinDao.getCoin(cryptocurrencySymbol)
    .then((coin) => {
      if (!coin) {
        return CoinDao.createCoin({
          name: cryptocurrencySymbol,
          symbol: cryptocurrencySymbol,
          min: price,
          max: price,
          rate: price,
          sales: [],
          purchases: []
        })
      }
      return coin
    }).then((coin) => {
      const coinToUpdate = {rate: price}
      // log.info('coin', coin)

      if (coinConfig) {
        coinConfig.rate = price

        if (coin.max < price) {
          coinToUpdate.max = price
          coinConfig.max = price
        }
        if (coin.min > price) {
          coinToUpdate.min = price
          coinConfig.min = price
        }

        log.info('coinToUpdate', coinToUpdate)
        log.info('cryptocurrencySymbol', cryptocurrencySymbol)
        return CoinDao.updateCoin(cryptocurrencySymbol, coinToUpdate)
      }
    })
    .then((coinConfig) => {
      log.info(coinConfig.min, coinConfig.rate, coinConfig.max)
      const thresholdMax = coinConfig.max - (coinConfig.max - coinConfig.min) * config.crypto.threshold
      const thresholdMin = coinConfig.min + (coinConfig.max - coinConfig.min) * config.crypto.threshold

      if (price < thresholdMax) {
        return `${cryptocurrencySymbol} - VENTE - SEUIL MIN: ${thresholdMin} - SEUIL MAX: ${thresholdMax} - MAX : ${coinConfig.max} - MIN: ${coinConfig.min}`
      }
      if (price > thresholdMin) {
        return `${cryptocurrencySymbol} - ACHAT - SEUIL MIN: ${thresholdMin} - SEUIL MAX: ${thresholdMax} - MAX : ${coinConfig.max} - MIN: ${coinConfig.min}`
      }
    })
}

const job = () => {
  cryptoService.getCrypto()
    .then((data) => {

      const alertMessages = Object.keys(data)
        .map((cryptocurrencySymbol) => handleCoin(cryptocurrencySymbol, data[cryptocurrencySymbol].EUR))
      // .filter((i) => i)

      Promise.all(alertMessages).then((messages) => {
        log.info(messages.join('\n'))
        // emailService.sendMail(messages.join('\n'))
      })
    })
}

const jobManager = new CronJobManager(config.cronIntervalSeconds, job)

module.exports = jobManager
