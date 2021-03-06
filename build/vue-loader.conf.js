'use strict'
const utils = require('./utils')
const config = require('../config')

const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  },
  postcss: [
    require('postcss-plugin-px2rem')({
      rootValue: 50, // 根据你的rem规格设置
      selectorBlackList: ['html'],
      mediaQuery: true,
      propBlackList: [] // 如果要保持font-size不转换
    })
  ]
}
