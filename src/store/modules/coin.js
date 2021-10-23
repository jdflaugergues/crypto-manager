import coinService from '../../services/coin.service'
import { COINS_GET, COINS_UPDATE } from '../action-types'
import { SET_COINS, SET_COIN } from '../mutation-types'
import TransactionTypeEnum from '../../enums/TransactionType'

export const initialState = {
  coins: []
}
export const getters = {
  getTotalGain: (state) => (coinSymbol) => {
    const coin = state.coins.find((coin) => coin.symbol === coinSymbol)
    const totalCoin = coin.transactions.reduce((acc, transaction) => {
    if (transaction.type === TransactionTypeEnum.PURCHASE) {
      acc = acc + (transaction.spent / transaction.price) - (transaction.spent / transaction.price * (transaction.exchangeCosts / 100))
    }
    if (transaction.type === TransactionTypeEnum.SALE) {
      acc = acc - (transaction.spent / transaction.price) - (transaction.spent / transaction.price * (transaction.exchangeCosts / 100))
    }

    return acc
    }, 0)
    const totalDepense = (coin.transactions.reduce((acc, transaction) => {
      if (transaction.type === TransactionTypeEnum.PURCHASE) {
        acc = acc + (transaction.spent)
      }
      if (transaction.type === TransactionTypeEnum.SALE) {
        acc = acc - (transaction.spent)
      }

      return acc
    }, 0)).toFixed(2)
    const totalValeur = (totalCoin * coin.rate).toFixed(2)
    const totalGain = (totalValeur - totalDepense).toFixed(2)

    return totalGain
  }
}
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
