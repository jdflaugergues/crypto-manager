import CryptoCoinsPage from '../../pages/CryptoCoinsPage'
import CryptoCoinPage from '../../pages/CryptoCoinPage'

const routes = [
  {
    path: '/coins',
    name: 'coins',
    component: CryptoCoinsPage
  },
  {
    path: '/coins/:coinid',
    name: 'coin',
    component: CryptoCoinPage
  },

  {
    path: '/*',
    redirect: { name: 'coins' }
  }
]

export default routes

