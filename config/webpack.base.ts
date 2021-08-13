export {}; // 解决 'Cannot redeclare block-scoped variable'
const { resolve } = require('path');
const WebpackBar = require('webpackbar');

const tsImportPluginFactory = require('ts-import-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: ['./src/index.tsx'], // 入口文件
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  module: {
    rules: [
      {
        // oneOf 规则数组，当规则匹配时，只使用第一个匹配规则
        oneOf: [
          {
            test: /\.m?js/,
            resolve: {
              fullySpecified: false,
            },
          },
          // html-loader 识别html文件
          {
            test: /\.(html)$/,
            loader: 'html-loader',
          },
          // ts-loader 解析 TypeScript 文件
          {
            test: /\.tsx?$/,
            use: [
              {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true, // 加快打包速度
                  getCustomTransformers: () => ({
                    // antd 按需加载
                    before: [
                      tsImportPluginFactory({
                        libraryName: 'antd',
                        libraryDirectory: 'es',
                        style: 'css',
                      }),
                    ],
                  }),
                  compilerOptions: {
                    module: 'es2015',
                  },
                },
              },
            ],
            exclude: /node_modules/,
          },
          /**
           * 加入 less-loader 解析 less 文件;
           * 加入css-loader 解析 css 文件 modules 为 true less引入方式为 import styles from './styles', 为 false，则为 import './styles';
           * modules 选项启用 css modules, 即为类名前添加额外标识-localIdentName,[local] 为class名称, [name] 为文件名称;
           * 加入 style-loader 生成一个内容为最终解析完的css代码的style标签，放到head标签里。
           */
          {
            test: /\.(css|less)?$/,
            use: [
              // 将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件
              {
                loader:
                  process.env.NODE_ENV === 'production'
                    ? MiniCssExtractPlugin.loader
                    : 'style-loader',
              },
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:6]',
                  },
                },
              },
              { loader: 'postcss-loader' },
              { loader: 'less-loader' },
            ],
            include: /src/,
          },
          // 单独处理 ant design css
          {
            test: /\.css$/,
            use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
            include: /node_modules/,
          },
          // 处理静态资源 图片、视频、字体文件等
          {
            test: /\.(jpe?g|png|bmp|svg|gif|webp)$/,
            type: 'asset',
            include: /src/,
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
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].chunk.css',
    }),
    new WebpackBar({
      name: 'Packing...',
      color: '#6d9eeb',
    }),
  ],
  resolve: {
    // 在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在。
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': resolve(__dirname, '../src'),
      '@components': resolve(__dirname, '../src/components'),
      '@config': resolve(__dirname, '../src/config'),
      '@services': resolve(__dirname, '../src/services'),
      '@utils': resolve(__dirname, '../src/utils'),
    },
  },
};
