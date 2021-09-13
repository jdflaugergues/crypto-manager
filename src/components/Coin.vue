<template>
  <div>
    <div>{{coin.symbol}}</div>
    <input type="number" :value="coin.min"/><br>
    <div>{{coin.price}}</div>
    <input type="number" :value="coin.max"/><br>
  </div>
</template>

<script>
export default {
  name: 'coin',
  props: {
    coin: Object
  }
}
</script>
