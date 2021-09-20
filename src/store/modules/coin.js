import coinService from '../../services/coin.service'
import { COINS_GET, COINS_UPDATE } from '../action-types'
import { SET_COINS, SET_COIN } from '../mutation-types'

export const initialState = {
  coins: []
}
export const getters = {}
export const mutations = {
  [SET_COINS](state, { coins }) {
    state.coins = coins
  },
  [SET_COIN](state, { coin }) {
    const indexCoin = state.coins.findIndex((coin) => coin._id === coin._id)
    state.coins[indexCoin] = coin
    state.coins = [...state.coins]
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
      context.commit(SET_COIN, { coin: data })
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
