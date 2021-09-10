const axios = require('axios')
const bunyan = require('bunyan')
const config = require('config')

const cryptoConfig = require('./crypto-config')

const log = bunyan.createLogger(config.log)

const cryptoCurrencySymbols = Object.keys(cryptoConfig)

const getCrypto = () => {
  return axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${cryptoCurrencySymbols.join(',')}&tsyms=EUR`)
    .then(({data}) => data)
    .catch((error) => log.error(error))
}

module.exports = {
  getCrypto
}
