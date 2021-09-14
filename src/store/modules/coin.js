import coinService from '../../services/coin.service'
import { COINS_GET, COINS_UPDATE } from '../action-types'
import { SET_COINS } from '../mutation-types'

export const initialState = {
  coins: []
}
export const getters = {}
export const mutations = {
  [SET_COINS](state, { coins }) {
    state.coins = coins
  }
}
export const actions = {
  [COINS_GET](context) {
    return coinService.getCoins().then(({data}) => {
      context.commit(SET_COINS, { coins: data })
      return data
    })
  },
  [COINS_UPDATE](context, {coin}) {
    return coinService.updateCoin(coin).then(({data}) => {
      // context.commit(SET_COINS, { coins: data })
      return data
    })
  }
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production'
}
