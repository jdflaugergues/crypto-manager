const axios = require('axios')
const bunyan = require('bunyan')
const config = require('config')
const qs = require('qs')

const log = bunyan.createLogger(config.log)

const getCryptocurrencies = (cryptoCurrencySymbols) => {
  const params = {
    fsyms: cryptoCurrencySymbols.join(','),
    tsyms: 'EUR',
    api_key: config.cryptoService.cryptoCompareApiKey
  }

  return axios.get(`https://min-api.cryptocompare.com/data/pricemulti?${qs.stringify(params)}`)
    .then(({data}) => data)
    .catch((error) => {
      log.error(error)
      throw error
    })
}

module.exports = {
  getCryptocurrencies
}
