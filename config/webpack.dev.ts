export {};
const { resolve } = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.base.ts');

module.exports = merge(baseConfig, {
  mode: 'development', // 开发模式
  devtool: 'eval-cheap-module-source-map',
  target: 'web',
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, './dist'),
  },
  plugins: [
    // 模块热更新
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    // 当开启 HotModuleReplacementPlugin 的时候使用该插件直接返回更新文件名，而不是文件的id
    moduleIds: 'named',
    runtimeChunk: 'single',
  },
  devServer: {
    contentBase: resolve(__dirname, '../dist'),
    port: 8080,
    open: true,
    hot: true,
    progress: true,
    historyApiFallback: true,
  },
});
