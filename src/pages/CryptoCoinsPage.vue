<template>
  <div>
    <button type="button" class="btn btn-primary m-2" @click="trierParDepense">Tri par dépensé</button>
    <button type="button" class="btn btn-primary m-2" @click="trierParNom">Tri par nom</button>
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
      sortedCoins: []
    }),
    mounted() {
      this.$store.dispatch(`coin/${COINS_GET}`).then((coins) => {
        this.sortedCoins = coins
      })
    },
    computed: {
      coins() {
        return this.$store.state.coin.coins
      }
    },
    methods: {
      trierParNom() {
        this.sortedCoins = _.sortBy(this.coins, 'name')
      },
      trierParDepense() {
        this.sortedCoins = _.orderBy(this.coins, [(coin) => {
          return (coin.transactions.reduce((acc, transaction) => {
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
    }
  }
</script>

<style lang="scss" scoped></style>
