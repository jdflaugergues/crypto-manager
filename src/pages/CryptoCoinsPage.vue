<template>
  <div>
    <coin v-for="coin in coins" :coin="coin" :key="coin.symbol"></coin>
  </div>
</template>

<script>
  import { COINS_GET } from '../store/action-types'
  import Coin from '../components/Coin'

  export default {
    name: 'CryptoCoinsPage',
    components: {Coin},
    data: () => ({
      min: 0,
      max: 0
    }),
    mounted() {
      this.$store.dispatch(`coin/${COINS_GET}`).then(() => {})
    },
    computed: {
      coins() {
        return this.$store.state.coin.coins
      }
    },
    methods() {

    }
  }
</script>

<style lang="scss" scoped></style>
