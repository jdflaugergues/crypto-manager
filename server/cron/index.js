const bunyan = require('bunyan')
const config = require('config')

const CronJobManager = require('./cron-job-manager')
const cryptoService = require('./crypto.service')
const emailService = require('./email.service')
const CryptocurrencyDao = require('../dao/cryptocurrency-dao')
const TransactionTypeEnum = require('../enums/TransactionType')

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
        // log.info(cryptocurrency.min, price, cryptocurrency.max)
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
      // const thresholdMax = (cryptocurrencyConfig.max - (cryptocurrencyConfig.max - cryptocurrencyConfig.min) * config.cryptoService.threshold).toFixed(4)
      // const thresholdMin = (cryptocurrencyConfig.min + (cryptocurrencyConfig.max - cryptocurrencyConfig.min) * config.cryptoService.threshold).toFixed(4)
      const thresholdMax = (cryptocurrencyConfig.max - cryptocurrencyConfig.stage).toFixed(4)
      const thresholdMin = (cryptocurrencyConfig.min + cryptocurrencyConfig.stage).toFixed(4)

      const action = (cryptocurrencyConfig.rate < thresholdMax) ? TransactionTypeEnum.SALE : (cryptocurrencyConfig.rate > thresholdMin) ? TransactionTypeEnum.PURCHASE : ''

      return {
        name: cryptocurrencyConfig.name,
        cryptocurrencySymbol,
        thresholdMin,
        thresholdMax,
        max: cryptocurrencyConfig.max,
        min: cryptocurrencyConfig.min,
        price: cryptocurrencyConfig.rate,
        action,
        alertPurchaseEnabled: cryptocurrencyConfig.alertPurchaseEnabled,
        alertSaleEnabled: cryptocurrencyConfig.alertSaleEnabled
      }
    })
}

const job = () => {
  let cryptocurrenciesFromDb
  let cryptocurrencySymbols = []

  CryptocurrencyDao.getCoins()
    .then((cryptocurrencies) => {
      cryptocurrenciesFromDb = cryptocurrencies
      cryptocurrencySymbols = cryptocurrencies.map((coin) => coin.symbol)
      // log.info('Cryptomonnaie prisent en compte issues de la base', cryptocurrencySymbols)

      // cryptocurrencySymbols = ['SUSHI']

      return cryptoService.getCryptocurrencies(cryptocurrencySymbols)
    })
    // Liste des cryptomonnaie avec leurs valeur courante : {SOL: {EUR: 12354}, ...}
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
          const {name, cryptocurrencySymbol, thresholdMin, thresholdMax, price, max, min, action, alertPurchaseEnabled, alertSaleEnabled} = cryptocurrencyInfos

          if (action === TransactionTypeEnum.SALE && alertSaleEnabled) {
            alertSaleToDisabled.push(cryptocurrencySymbol)
            return `${name} (${cryptocurrencySymbol}) - ${action} - Prix: ${price} - MAX : ${max} - SEUIL MAX: ${thresholdMax} - MIN: ${min} - SEUIL MIN: ${thresholdMin}`
          }
          if (action === TransactionTypeEnum.PURCHASE && alertPurchaseEnabled) {
            alertPurchaseToDisabled.push(cryptocurrencySymbol)
            return `${name} (${cryptocurrencySymbol}) - ${action} - Prix: ${price} - MAX : ${max} - SEUIL MAX: ${thresholdMax} - MIN: ${min} - SEUIL MIN: ${thresholdMin}`
          }
        })
          .filter((i) => i)

        log.info('Email Sent : ' + alertMessages.length + ' ' + alertMessages.join('\n'))
        if (config.emailService.active && alertMessages.length) {

          emailService.sendMail(alertMessages.join('\n'))
          CryptocurrencyDao.updateCoins(alertSaleToDisabled, {alertSaleEnabled: false})
          CryptocurrencyDao.updateCoins(alertPurchaseToDisabled, {alertPurchaseEnabled: false})
        }
      })
    })
}

const jobManager = new CronJobManager(config.cryptoService.cronIntervalSeconds, job)

module.exports = jobManager
