<template>
  <div>
    <div>Total Gain : {{totalGain}} €</div>
    <div class="d-flex justify-content-between mx-2" >
      <div class="">
        <input type="text" class="form-control" placeholder="filtre" v-model="filtre">
      </div>
      <button type="button" class="btn btn-primary" @click="trierParDepense">Tri par dépensé</button>
      <button type="button" class="btn btn-primary" @click="trierParNom">Tri par nom</button>
    </div>
    <coin v-for="coin in sortedCoins" :coin="coin" :key="coin.symbol"></coin>
  </div>
</template>

<script>
  import _ from 'lodash'

  import { COINS_GET } from '../store/action-types'
  import Coin from '../components/Coin'
  import TransactionTypeEnum from '../enums/TransactionType'

  export default {
    name: 'CryptoCoinsPage',
    components: {Coin},
    data: () => ({
      min: 0,
      max: 0,
      filtre: '',
      triParNom: false,
      triParDepense: true
    }),
    mounted() {
      this.$store.dispatch(`coin/${COINS_GET}`)
    },
    computed: {
      totalGain() {
        return this.coins.reduce((acc, coin) => {
          return acc + +this.$store.getters['coin/getTotalGain'](coin.symbol)
        }, 0).toFixed(2)
      },
      sortedCoins() {
        const sortedCoins = this.coins.filter((coin) => {
          if (!this.filtre) {
            return true
          }
          return coin.name.toLowerCase().includes(this.filtre.toLowerCase())
        })
        if (this.triParNom) {
          return _.sortBy(sortedCoins, 'name')
        }
        if (this.trierParDepense) {
          return _.orderBy(sortedCoins, [(coin) => {
            return +(coin.transactions.reduce((acc, transaction) => {
              if (transaction.type === TransactionTypeEnum.PURCHASE) {
                acc = acc + (transaction.spent)
              }
              if (transaction.type === TransactionTypeEnum.SALE) {
                acc = acc - (transaction.spent)
              }

              return acc
            }, 0)).toFixed(2)
          }], ['desc'])
        }
        return sortedCoins
      },
      coins() {
        return this.$store.state.coin.coins
      }
    },
    methods: {
      trierParNom() {
        this.triParNom = true
        this.triParDepense = false
      },
      trierParDepense() {
        this.triParNom = false
        this.triParDepense = true
      }
    }
  }
</script>

<style lang="scss" scoped></style>
