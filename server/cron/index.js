const bunyan = require('bunyan')
const config = require('config')

const CronJobManager = require('./cron-job-manager')
const cryptoService = require('./crypto.service')
const emailService = require('./email.service')
const CryptocurrencyDao = require('../dao/cryptocurrency-dao')

const log = bunyan.createLogger(config.log)

const handleCryptocurrency = (cryptocurrencySymbol, price, cryptocurrencyFromDb) => {

  return CryptocurrencyDao.getCoin(cryptocurrencySymbol)
    .then((cryptocurrency) => {
      if (!cryptocurrency) {
        return CryptocurrencyDao.createCoin({
          name: cryptocurrencySymbol,
          symbol: cryptocurrencySymbol,
          min: price,
          max: price,
          rate: price,
          transactions: []
        })
      }
      return cryptocurrency
    }).then((cryptocurrency) => {
      const cryptocurrencyToUpdate = {rate: price}

      if (cryptocurrencyFromDb) {
        cryptocurrencyFromDb.rate = price

        if (cryptocurrency.max < price) {
          cryptocurrencyToUpdate.max = price
          cryptocurrencyFromDb.max = price
        }
        if (cryptocurrency.min > price) {
          cryptocurrencyToUpdate.min = price
          cryptocurrencyFromDb.min = price
        }

        return CryptocurrencyDao.updateCoin(cryptocurrencySymbol, cryptocurrencyToUpdate)
      }
    })
    .then((cryptocurrencyConfig) => {
      const thresholdMax = (cryptocurrencyConfig.max - (cryptocurrencyConfig.max - cryptocurrencyConfig.min) * config.cryptoService.threshold).toFixed(4)
      const thresholdMin = (cryptocurrencyConfig.min + (cryptocurrencyConfig.max - cryptocurrencyConfig.min) * config.cryptoService.threshold).toFixed(4)
      const action = (cryptocurrencyConfig.rate < thresholdMax) ? 'VENTE' : (cryptocurrencyConfig.rate > thresholdMin) ? 'ACHAT' : ''

      return {cryptocurrencySymbol, thresholdMin, thresholdMax, max: cryptocurrencyConfig.max, min: cryptocurrencyConfig.min, price: cryptocurrencyConfig.rate, action, emailDisabled: cryptocurrencyConfig.emailDisabled }
    })
}

const job = () => {
  let cryptocurrenciesFromDb
  let cryptocurrencySymbols = []

  CryptocurrencyDao.getCoins()
    .then((cryptocurrencies) => {
      cryptocurrenciesFromDb = cryptocurrencies
      cryptocurrencySymbols = cryptocurrencies.map((coin) => coin.symbol)
      log.info('Cryptomonnaie prisent en compte issues de la base', cryptocurrencySymbols)

      return cryptoService.getCryptocurrencies(cryptocurrencySymbols)
    })
    .then((cryptocurrencies) => {
      const getCryptocurrenciesInfos = Object.keys(cryptocurrencies)
        .map((cryptocurrencySymbol) => {
          const cryptocurrencyFromDb = cryptocurrenciesFromDb.find((coin) => coin.symbol === cryptocurrencySymbol)

          if(!cryptocurrencyFromDb) {
            return Promise.resolve()
          }

          return handleCryptocurrency(cryptocurrencySymbol, cryptocurrencies[cryptocurrencySymbol].EUR, cryptocurrencyFromDb)
        })
      const alertSaleToDisabled = []
      const alertPurchaseToDisabled = []

      Promise.all(getCryptocurrenciesInfos).then((cryptocurrenciesInfos) => {

        const alertMessages = cryptocurrenciesInfos.map((cryptocurrencyInfos) => {
          const {cryptocurrencySymbol, thresholdMin, thresholdMax, max, min, action, alertPurchaseEnabled, alertSaleEnabled} = cryptocurrencyInfos

          if (action === 'VENTE' && alertSaleEnabled) {
            alertSaleToDisabled.push(cryptocurrencySymbol)
            return `${cryptocurrencySymbol} - ${action} - SEUIL MIN: ${thresholdMin} - SEUIL MAX: ${thresholdMax} - MAX : ${max} - MIN: ${min}`
          }
          if (action === 'ACHAT' && alertPurchaseEnabled) {
            alertPurchaseToDisabled.push(cryptocurrencySymbol)
            return `${cryptocurrencySymbol} - ${action} - SEUIL MIN: ${thresholdMin} - SEUIL MAX: ${thresholdMax} - MAX : ${max} - MIN: ${min}`
          }
        })
          .filter((i) => i)

        log.info(alertMessages.join('\n'))
        log.info('alertMessages.length', alertMessages.length)
        log.info('alertSaleToDisabled', alertSaleToDisabled.join('\n'))
        log.info('alertPurchaseToDisabled', alertPurchaseToDisabled.join('\n'))
        CryptocurrencyDao.updateCoins(alertSaleToDisabled, {alertSaleEnabled: false})
        CryptocurrencyDao.updateCoins(alertPurchaseToDisabled, {alertPurchaseEnabled: false})

        if (alertMessages.length) {
          emailService.sendMail(alertMessages.join('\n'))
        }
      })
    })
}

const jobManager = new CronJobManager(config.cryptoService.cronIntervalSeconds, job)

module.exports = jobManager
