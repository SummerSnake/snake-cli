const { resolve } = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseConfig, {
  mode: 'development', // 开发模式
  module: {
    rules: [
      {
        oneOf: [
          /**
           * 加入 url-loader 将小于 8kb 的图片转化为 base64, 优化性能
           * [ext] 表示是原文件的扩展名
           */
          {
            test: /\.(jpg|jpeg|bmp|svg|png|webp|gif)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8 * 1024,
                  name: '[name].[hash:8].[ext]',
                  outputPath: '/images',
                },
              },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 指定生成的文件所依赖哪一个html文件模板，模板类型可以是html、jade、ejs等
      template: './src/index.html',
    }),
    // 模块热更新
    new webpack.HotModuleReplacementPlugin(),
    // 当开启 HotModuleReplacementPlugin 的时候使用该插件直接返回更新文件名，而不是文件的id
    new webpack.NamedModulesPlugin(),
  ],
  devServer: {
    contentBase: resolve(__dirname, '../dist'),
    open: true,
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
});
