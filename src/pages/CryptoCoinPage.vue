<template>
  <div class="m-2" v-if="coin">

    <div class="form-group row mb-2">
      <label class="col-2 col-form-label">Taux courant</label>
      <div class="col-5">
       {{coin.rate}}
      </div>
    </div>

    <div class="form-group row mb-2">
      <label class="col-2 col-form-label">Min</label>
      <div class="col-5">
        <input type="text" class="form-control" v-model="min" placeholder="Min">
      </div>
      <div class="col-5">
        <button type="button" class="btn btn-primary mb-2" @click="updateCoin">Mettre à jour</button>
      </div>
    </div>

    <div class="form-group row mb-2">
      <label class="col-2 col-form-label">Max</label>
      <div class="col-5">
        <input type="text" class="form-control" v-model="max" placeholder="Max">
      </div>
      <div class="col-5">
        <button type="button" class="btn btn-primary mb-2" @click="updateCoin">Mettre à jour</button>
      </div>
    </div>

    <div class="form-group row mb-2">
      <label class="col-2 col-form-label">Alerte Achat</label>
      <div class="col-10">
        <button type="button" class="btn mb-2" :class="classeButton(coin.alertPurchaseEnabled)" @click="toggleAlertPurchaseEnabled">{{ !coin.alertPurchaseEnabled ? 'Activer' : 'Désactiver'}}</button>
      </div>
    </div>
    <div class="form-group row mb-2">
      <label class="col-2 col-form-label">Alerte Vente</label>
      <div class="col-10">
        <button type="button" class="btn mb-2" :class="classeButton(coin.alertSaleEnabled)" @click="toggleAlertSaleEnabled">{{ !coin.alertSaleEnabled ? 'Activer' : 'Désactiver'}}</button>
      </div>
    </div>

    <div class="form-row align-items-center row">
      <div class="col-4">
        <input id="purchaseSpent" type="text" class="form-control" v-model="purchaseSpent" placeholder="Dépensé en euro">
      </div>
      <div class="col-4">
        <input id="purchasePrice" type="text" class="form-control" v-model="purchasePrice" :placeholder="'Prix d\'1 ' + coin.symbol + ' en €'">
      </div>
      <div class="col-4">
        <button type="submit" class="btn btn-primary mb-2" @click="addTransaction(transactionTypeEnum.PURCHASE, purchaseSpent, purchasePrice)">Acheter</button>
      </div>
    </div>

    <div class="form-row align-items-center row">
      <div class="col-4">
        <input id="saleSpent" type="text" class="form-control" v-model="saleSpent" placeholder="Acheté en euro">
      </div>
      <div class="col-4">
        <input id="salePrice" type="text" class="form-control" v-model="salePrice" :placeholder="'Prix d\'1 ' + coin.symbol + ' en €'">
      </div>
      <div class="col-4">
        <button type="submit" class="btn btn-primary mb-2" @click="addTransaction(transactionTypeEnum.SALE, saleSpent, salePrice)">Vendre</button>
      </div>
    </div>

    <div class="mt-3"><b>Transactions</b></div>
    <div class="card m-2" v-for="transaction in coin.transactions" :key="transaction._id">
      <div class="card-body d-flex justify-content-between row">
        <div class="d-flex justify-content-between">
          <div>{{getTitleTransaction(transaction)}}</div>
          <div>{{getPurchasedLabel(transaction)}}</div>
        </div>
        <div class="d-flex">{{getSpentLabel(transaction)}}</div>
        <div class="d-flex">{{new Date(transaction.date).toLocaleString()}}</div>
      </div>
    </div>

  </div>
</template>

<script>
  import { COINS_GET, COINS_UPDATE } from '../store/action-types'
  import TransactionTypeEnum from '../enums/TransactionType'

  export default {
    name: 'CryptoCoinPage',
    components: {},
    data: () => ({
      transactionTypeEnum: TransactionTypeEnum,
      min: 0,
      max: 0,
      purchaseSpent: null,
      purchasePrice: null,
      saleSpent: null,
      salePrice: null,
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
      getTitleTransaction(transaction) {
        const action = transaction.type === TransactionTypeEnum.PURCHASE ? 'Achat' : 'Vente'

        return `${action} de ${this.coin.symbol} avec ${transaction.currency}`
      },
      getPurchasedLabel(transaction) {
        const signe = transaction.type === TransactionTypeEnum.PURCHASE ? '+' : '-'
        const purchased = (transaction.spent - (transaction.spent * transaction.exchangeCosts / 100)) / transaction.price
        return `${signe} ${purchased.toFixed(6)} ${this.coin.symbol}`
      },
      getSpentLabel(transaction) {
        const signe = transaction.type === TransactionTypeEnum.PURCHASE ? '-' : '+'
        const currency = transaction.currency === 'EUR' ? '€' : transaction.currency
        return `${signe} ${transaction.spent} ${currency}`
      },
      classeButton(value) {
        return value ? 'btn-success' : 'btn-danger'
      },
      addTransaction(type, spent, price) {
        const coin = {
          id: this.coin._id,
          transaction: {
            type,
            spent,
            price
          },
          alertSaleEnabled: type === TransactionTypeEnum.PURCHASE,
          alertPurchaseEnabled: type === TransactionTypeEnum.SALE
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
      },
      toggleAlertSaleEnabled() {
        const coin = {
          id: this.coin._id,
          alertSaleEnabled: !this.coin.alertSaleEnabled
        }
        console.log('this.coin.alertSaleEnabled', this.coin.alertSaleEnabled)
        console.log('coin to update', coin)
        this.$store.dispatch(`coin/${COINS_UPDATE}`, {coin}).then(() => {})
      },
      toggleAlertPurchaseEnabled() {
        const coin = {
          id: this.coin._id,
          alertPurchaseEnabled: !this.coin.alertPurchaseEnabled
        }
        console.log('this.coin.alertPurchaseEnabled', this.coin.alertPurchaseEnabled)
        console.log('coin to update', coin)
        this.$store.dispatch(`coin/${COINS_UPDATE}`, {coin}).then(() => {})
      }
    }
  }
</script>

<style lang="scss" scoped></style>
