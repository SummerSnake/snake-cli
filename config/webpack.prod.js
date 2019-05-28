const os = require('os');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = merge(baseConfig, {
  mode: 'production', // 生产模式
  module: {
    rules: [
      {
        oneOf: [
          /**
           * 加入 less-loader 解析 less 文件
           * modules 为 true less引入方式为 import styles from './styles', 为 false，则为 import './styles'
           * 当 modules 为 true 时, 将启用 css modules, 即为类名前添加额外标识-localIdentName
           * [local] 为class名称, [name] 为文件名称
           */
          // {
          //     test: /\.(css|less)?$/,
          //     use: [
          //         // 将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件
          //         MiniCssExtractPlugin.loader,
          //         {
          //             loader: 'css-loader',
          //             options: {
          //                 modules: true,
          //                 localIdentName: '[local]_[hash:base64:6]',
          //             },
          //         },
          //         // postcss把 CSS 解析成 JavaScript 可以操作的 抽象语法树结构（Abstract Syntax Tree，AST）
          //         // 然后调用插件来处理 AST 并得到结果
          //         { loader: 'postcss-loader' },
          //         { loader: 'less-loader' },
          //     ],
          //     exclude: /node_modules/,
          // },
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
              // 压缩图片
              {
                loader: 'img-loader',
                options: {
                  plugins: [
                    require('imagemin-gifsicle')({
                      interlaced: false,
                    }),
                    require('imagemin-mozjpeg')({
                      progressive: true,
                      arithmetic: false,
                    }),
                    require('imagemin-pngquant')({
                      floyd: 0.5,
                      speed: 2,
                    }),
                    require('imagemin-svgo')({
                      plugins: [{ removeTitle: true }, { convertPathData: false }],
                    }),
                  ],
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
    // new MiniCssExtractPlugin({
    //   filename: '[name].[contenthash:8].css',
    // }),
    // 每次打包输出文件清空上次打包文件的插件
    new CleanWebpackPlugin(),
    // 压缩单独的css文件
    new OptimizeCssAssetsWebpackPlugin({
      cssProcessPluginOptions: {
        preset: [
          'default',
          {
            // 对注释的处理
            discardComments: { removeAll: true },
          },
        ],
      },
    }),
    // 使用交互式可缩放树映射可视化Webpack输出文件的大小
    new BundleAnalyzerPlugin(),
  ],
  // code splitting 代码分割
  optimization: {
    //设置为 true, 一个 chunk 打包后就是一个文件，一个chunk对应`一些js css 图片`等
    runtimeChunk: true,
    splitChunks: {
      // 默认 entry 的 chunk 不会被拆分, 配置成 all, 就可以了拆分了，一个入口`JS`打包后就生成一个单独的文件
      chunks: 'all',
    },
  },
});
