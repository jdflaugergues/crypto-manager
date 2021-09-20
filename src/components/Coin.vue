<template>
  <div class="card m-2 clickable" @click="onClick">
    <div class="card-body d-flex align-items-center justify-content-between">
      <div>{{coin.name}} ({{coin.symbol}})</div>
      <div>
        <div>Min: {{coin.min}}</div>
        <div>Taux: {{coin.rate}}</div>
        <div>Max: {{coin.max}}</div>
      </div>
      <div>
        <div>Achat: {{totalPurchases}} €</div>
        <div>Ventes: {{totalSales}} €</div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'coin',
  props: {
    coin: Object
  },
  computed: {
    totalPurchases() {
      return 0 // this.coin.purchases.reduce((acc, purchase) => acc + purchase.price, 0)
    },
    totalSales() {
      return 0 // this.coin.sales.reduce((acc, sale) => acc + sale.price, 0)
    },

  },
  methods: {
    onClick() {
      this.$router.push({
        name: 'coin',
        params: { coinid: this.coin._id }
      })
    }
  }
}
</script>
