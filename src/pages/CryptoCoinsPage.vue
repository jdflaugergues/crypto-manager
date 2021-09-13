<template>
  <div>
    <div>
      CryptoCoinsPage
    </div>
    <div v-for="coin in coins" :coin="coin"></div>
  </div>
</template>

<script>
  import { COINS_GET } from '../store/action-types'
  // import Coin from '../components/Coin'
  // import Test from '../components/Test'

  export default {
    name: 'CryptoCoinsPage',
    components: {},
    data: () => ({
      min: 0,
      max: 0
    }),
    mounted() {
      this.$store.dispatch(`coin/${COINS_GET}`).then(() => {

      })
    },
    computed: {
      coins() {
        return this.$store.state.coin.coins
      },
    },
    methods() {

    }
  }
</script>
