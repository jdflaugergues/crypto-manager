import coinService from '../../services/coin.service'
import { COINS_GET } from '../action-types'
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
    coinService.getCoins().then(({data}) => {
      context.commit(SET_COINS, { coins: data })
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
