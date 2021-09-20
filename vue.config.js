module.exports = {
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = "Crypto Manager"
      return args
    })
  },
  transpileDependencies: ['vuetify'],
  outputDir: './www',
  publicPath: '/'
}
