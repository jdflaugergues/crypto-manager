<template>
  <div class="container-fluid g-0">
    <header>
    </header>
    <main>
      <router-view />
    </main>
  </div>

</template>

<script>
import { COINS_GET } from './store/action-types'

export default {
  name: 'crypto-app',
  components: {},
  mounted() {
    this.$store.dispatch(`coin/${COINS_GET}`)
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss" src="./assets/scss/main.scss"></style>
