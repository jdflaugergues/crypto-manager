const config = require('config')
const bunyan = require('bunyan')

const {connect, close} = require('../server/database')
const cryptoConfig = require('./crypto-config')
const CryptocurrencyDao = require('../server/dao/cryptocurrency-dao')

const log = bunyan.createLogger(config.log)

connect()
  .then(() => {
    log.info('MongoDB database connected')

    cryptoConfig.forEach((crypto) => {
      CryptocurrencyDao.getCoinBySymbol(crypto.symbol).then((cryptoDb) => {
        if (cryptoDb) {
          cryptoDb.name = crypto.name
          cryptoDb.min = crypto.min
          cryptoDb.max = crypto.max
          cryptoDb.stage = ((crypto.max - crypto.min) * 0.10).toFixed(4)
          // cryptoDb.rate = crypto.rate
          cryptoDb.alertPurchaseEnabled = crypto.alertPurchaseEnabled
          cryptoDb.alertSaleEnabled = crypto.alertSaleEnabled
          // cryptoDb.transactions = crypto.transactions
          cryptoDb.save().then((c) => {
            log.info(`Crypto currency ${crypto.name} (${crypto.symbol}) ${c.alertPurchaseEnabled} ${c.alertSaleEnabled} updated`)
          })
        } else {
          CryptocurrencyDao.createCoin(crypto).then(() => {
            log.info(`Crypto currency ${crypto.name} (${crypto.symbol}) created`)
          })
        }
      })
    })

  })
  .catch((err) => {
    log.error(`Cannot connect to mongo ${config.database.url} [${err}]`)
    close(() => process.exit(1)) // eslint-disable-line no-process-exit
  })
