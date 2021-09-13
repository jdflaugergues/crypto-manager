const config = require('config')
const path = require('path')

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  outputDir: './www',
  publicPath: './',
  lintOnSave: false,
  productionSourceMap: true,
  devServer: {
    proxy: {
      '^/api': {
        target: `http://localhost:${config.port}`
      }
    }
  },
  configureWebpack: {
    mode: 'development',
    devtool: 'source-map',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    output: {
      filename: 'js/[name].bundle.js',
      chunkFilename: 'js/[name].chunk.js'
    },
    optimization: {
      runtimeChunk: 'single',
      namedChunks: true,
      moduleIds: 'hashed',
      splitChunks: {
        chunks: 'all'
      }
    }

    //   plugins: [
    //     new BundleAnalyzerPlugin({
    //       analyzerHost: 'localhost'
    //     })
  }
}
