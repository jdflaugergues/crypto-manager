<template>
  <div class="m-2">
    <div>{{coin}}</div>

    <div class="form-group row mb-2">
      <label class="col-sm-2 col-form-label">Min</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" v-model="min" placeholder="Min">
      </div>
    </div>

    <div class="form-group row mb-2">
      <label class="col-sm-2 col-form-label">Max</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" v-model="max" placeholder="Max">
      </div>
    </div>

    <div>
      <button type="button" class="btn btn-primary mb-2" @click="updateCoin">Mettre à jour</button>
    </div>

    <div class="form-row align-items-center row">
      <div class="col-4">
        <input id="purchasesPrice" type="text" class="form-control" v-model="purchasesPrice" placeholder="Prix en euro">
      </div>
      <div class="col-4">
        <input id="purchasesRate" type="text" class="form-control" v-model="purchasesRate" :placeholder="'Taux en ' + coin.symbol">
      </div>
      <div class="col-4">
        <button type="submit" class="btn btn-primary mb-2" @click="purchaseCoin">Acheter</button>
      </div>
    </div>

    <div class="form-row align-items-center row">
      <div class="col-4">
        <input id="salesPrice" type="text" class="form-control" v-model="salesPrice" placeholder="Prix en euro">
      </div>
      <div class="col-4">
        <input id="salesRate" type="text" class="form-control" v-model="salesRate" :placeholder="'Taux en ' + coin.symbol">
      </div>
      <div class="col-4">
        <button type="submit" class="btn btn-primary mb-2" @click="saleCoin">Vendre</button>
      </div>
    </div>

  </div>
</template>

<script>
  import { COINS_GET, COINS_UPDATE } from '../store/action-types'
  import Coin from '../components/Coin'

  export default {
    name: 'CryptoCoinPage',
    components: {Coin},
    data: () => ({
      min: 0,
      max: 0,
      purchasesPrice: null,
      purchasesRate: null,
      salesPrice: null,
      salesRate: null,
    }),
    mounted() {
      this.$store.dispatch(`coin/${COINS_GET}`).then((coins) => {
        const coin = coins.find((coin) => coin._id === this.$route.params.coinid)

        this.min = coin.min
        this.max = coin.max
      })
    },
    computed: {
      coin() {
        return this.$store.state.coin.coins.find((coin) => coin._id === this.$route.params.coinid)
      }
    },
    methods: {
      purchaseCoin() {
        const coin = {
          id: this.coin._id,
          purchase: {
            price: this.purchasesPrice,
            rate: this.purchasesRate
          }
        }

        this.$store.dispatch(`coin/${COINS_UPDATE}`, {coin}).then(() => {})
      },
      saleCoin() {
        const coin = {
          id: this.coin._id,
          sale: {
            price: this.salesPrice,
            rate: this.salesRate
          }
        }

        this.$store.dispatch(`coin/${COINS_UPDATE}`, {coin}).then(() => {})
      },
      updateCoin() {
        const coin = {
          id: this.coin._id,
          min: this.min,
          max: this.max
        }

        this.$store.dispatch(`coin/${COINS_UPDATE}`, {coin}).then(() => {})
      }
    }
  }
</script>

<style lang="scss" scoped></style>
