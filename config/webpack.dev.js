const { resolve } = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');
const merge = require('webpack-merge');

module.exports = merge(baseConfig, {
  mode: 'development', // 开发模式
  plugins: [
    // 模块热更新
    new webpack.HotModuleReplacementPlugin(),
    // 当开启 HotModuleReplacementPlugin 的时候使用该插件直接返回更新文件名，而不是文件的id
    new webpack.NamedModulesPlugin(),
  ],
  devServer: {
    contentBase: resolve(__dirname, '../dist'),
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
});
