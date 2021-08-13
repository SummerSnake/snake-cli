export {};
const { resolve } = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const baseConfig = require('./webpack.base.ts');

module.exports = merge(baseConfig, {
  mode: 'production', // 生产模式
  output: {
    // 对应于entry里面生成出来的文件名，
    // hash 标识，每次修改输出不同文件名，用于更新浏览器缓存文件，区分版本, 8 代表打包出来为 8位 字符串
    path: resolve(__dirname, '../dist'), // 输出目录
    filename: 'js/[name].[hash:6].js',
    chunkFilename: 'js/[name]_chunk.[chunkhash:8].js',
    assetModuleFilename: 'images/[name].[contenthash:8].[ext]',
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 指定生成的文件所依赖哪一个html文件模板，模板类型可以是html、jade、ejs等
      template: './src/index.html',
      favicon: '',
      // 清除 html 一些没用的代码
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    // 每次打包输出文件清空上次打包文件的插件
    new CleanWebpackPlugin(),
    // 使用交互式可缩放树映射可视化Webpack输出文件的大小
    new BundleAnalyzerPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },
});
