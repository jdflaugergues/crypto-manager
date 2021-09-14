import api from './api'

export default {
  getCoins() {
    return api({
      method: 'get',
      url: '/api/coins'
    })
  },
  updateCoin(coin) {
    return api({
      method: 'patch',
      url: '/api/coins/' + coin.id,
      data: coin
    })
  }
}
