'use strict'
const path = require('path')

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/operateapi/': {
        changeOrigin: true,
        // target: 'https://wx.kbansoft.com', //后台反向代理到的地址
        target: 'https://jiankang.hbksnet.com', //后台反向代理到的地址
        // target: 'http://192.168.1.102:8711', //后台反向代理到的地址
        pathRewrite: {
          '^/operateapi': '/operateapitest'
        }
      },
      '/operateapitest': {
        changeOrigin: true,
        // target: 'https://wx.kbansoft.com', //后台反向代理到的地址
        target: 'https://jiankang.hbksnet.com', //后台反向代理到的地址
        // target: 'http://192.168.1.102:8711', //后台反向代理到的地址
      }
    },
    // Various Dev Server settings
    host:'localhost',
    port: 8080, 
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, 
    useEslint: true,
    showEslintErrorsInOverlay: true,

    /**
     * Source Maps
     */
    devtool: 'cheap-module-eval-source-map',
    cacheBusting: true,
    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),
    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */
    productionSourceMap: false,
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
