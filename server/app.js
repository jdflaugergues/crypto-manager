const bunyan = require('bunyan')
const config = require('config')

const cryptoService = require('./crypto.service')
const emailService = require('./email.service')
const cryptoConfig = require('./crypto-config')

const log = bunyan.createLogger(config.log)

const handleCoin = (cryptocurrencySymbol, price) => {
  const coinConfig = cryptoConfig[cryptocurrencySymbol]
  if (coinConfig) {
    const thresholdMax = coinConfig.max - (coinConfig.max - coinConfig.min) * config.crypto.threshold
    const thresholdMin = coinConfig.min + (coinConfig.max - coinConfig.min) * config.crypto.threshold

    if (coinConfig.max < price) {
      coinConfig.max = price
    }
    if (coinConfig.min > price) {
      coinConfig.min = price
    }

    if (price < thresholdMax) {
      return `${cryptocurrencySymbol} - VENTE - SEUIL MIN: ${thresholdMin} - SEUIL MAX: ${thresholdMax} - MAX : ${coinConfig.max} - MIN: ${coinConfig.min}`
    }
    if (price > thresholdMin) {
      return `${cryptocurrencySymbol} - ACHAT - SEUIL MIN: ${thresholdMin} - SEUIL MAX: ${thresholdMax} - MAX : ${coinConfig.max} - MIN: ${coinConfig.min}`
    }
  }
}

const batch = () => {
  cryptoService.getCrypto()
    .then((data) => {

      const alertMessages = Object.keys(data).map((cryptocurrencySymbol) => handleCoin(cryptocurrencySymbol, data[cryptocurrencySymbol].EUR)).filter((i) => i)

      log.info(alertMessages.join('\n'))
      emailService.sendMail(alertMessages.join('\n'))
    })
}

batch()

setInterval(batch, config.batchIntervalSeconds * 1000)
