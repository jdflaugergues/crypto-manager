import api from './api'

export default {
  getCoins() {
    return api({
      method: 'get',
      url: 'api/coins'
    })
  }
}
