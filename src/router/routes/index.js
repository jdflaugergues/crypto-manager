import CryptoCoinsPage from '../../pages/CryptoCoinsPage'
// import CryptoTest from '../../pages/CryptoTest'

const routes = [
  {
    path: '/coins',
    name: 'coins',
    component: CryptoCoinsPage
  },
  {
    path: '/*',
    redirect: { name: 'coins' }
  }
]

export default routes
dispatchRequest.js:82 Uncaught Error: Module build failed: Error: ENOENT: no such file or directory, open 'node_modules/@vue/cli-service/node_modules/webpack-dev-server/client/index.js'
