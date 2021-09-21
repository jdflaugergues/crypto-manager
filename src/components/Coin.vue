<template>
  <div class="card m-2 clickable" @click="onClick">
    <div class="card-body d-flex align-items-center justify-content-between row">
      <div class="col-6">
        <div class="d-flex">
          <img :src="'https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.0/svg/icon/' + coin.symbol.toLowerCase() + '.svg'" width="50" height="50" @error="imageLoadError"/>
          <div class="text-start">
            <div>{{coin.name}}</div>
            <div>{{totalCoin.toFixed(8)}} {{coin.symbol}}</div>
            <div>
            <span v-if="coin.alertSaleEnabled">🔔 Vente</span>
            <span v-if="coin.alertPurchaseEnabled">🔔 Achat</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3 text-start">
        <div>Max: {{coin.max}}</div>
        <div :class="{'text-danger': (coin.max - coin.stage) > coin.rate}">Taux: {{coin.rate}}</div>
        <div>Min: {{coin.min}}</div>
        <div>Stage: {{coin.stage}}</div>
      </div>
      <div class="col-3 text-end">
        <div>Dépensé: {{totalDepense}} €</div>
        <div>Valeur: {{totalValeur}} €</div>
        <div :class="{'text-success': totalGain > 0, 'text-danger': totalGain < 0}">Gain: {{totalGain}} €</div>
      </div>
    </div>
  </div>
</template>

<script>
import TransactionTypeEnum from '../enums/TransactionType'

export default {
  name: 'coin',
  props: {
    coin: Object
  },
  computed: {
    totalCoin() {
      return this.coin.transactions.reduce((acc, transaction) => {
        if (transaction.type === TransactionTypeEnum.PURCHASE) {
          acc = acc + (transaction.spent / transaction.price) - (transaction.spent / transaction.price * (transaction.exchangeCosts / 100))
        }
        if (transaction.type === TransactionTypeEnum.SALE) {
          acc = acc - (transaction.spent / transaction.price) - (transaction.spent / transaction.price * (transaction.exchangeCosts / 100))
        }

        return acc
      }, 0)
    },
    totalValeur() {
      return (this.totalCoin * this.coin.rate).toFixed(2)
    },
    totalGain() {
      return (this.totalValeur - this.totalDepense).toFixed(2)
    },
    totalDepense() {
      return (this.coin.transactions.reduce((acc, transaction) => {
        if (transaction.type === TransactionTypeEnum.PURCHASE) {
          acc = acc + (transaction.spent)
        }
        if (transaction.type === TransactionTypeEnum.SALE) {
          acc = acc - (transaction.spent)
        }

        return acc
      }, 0)).toFixed(2)
    },

  },
  methods: {
    imageLoadError(event) {
      event.target.src =
        "https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.0/svg/black/generic.svg";
    },
    onClick() {
      this.$router.push({
        name: 'coin',
        params: { coinid: this.coin._id }
      })
    }
  }
}
</script>
