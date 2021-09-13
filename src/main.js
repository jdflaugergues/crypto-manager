import { createApp } from 'vue'

import CryptoApp from './CryptoApp'
import store from './store'
import router from './router'

createApp(CryptoApp)
  .use(store)
  .use(router)
  .mount('#app')
