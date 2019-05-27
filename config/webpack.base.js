const { resolve } = require('path');
const os = require('os');
const webpack = require('webpack');
const tsImportPluginFactory = require('ts-import-plugin');

module.exports = {
  entry: {
    app: ['./src/index.tsx'], // 入口文件
    vendors: ['react', 'react-dom', 'react-router-dom', 'antd'], // 所引入的公共库
  },
  output: {
    publicPath: '/',
    // 对应于entry里面生成出来的文件名，
    // hash 标识，每次修改输出不同文件名，用于更新浏览器缓存文件，区分版本, 8 代表打包出来为 8位 字符串
    filename: '[name].[hash:8].js',
    path: resolve(__dirname, '../dist'), // 输出目录
  },
  module: {
    rules: [
      {
        // oneOf 规则数组，当规则匹配时，只使用第一个匹配规则
        oneOf: [
          /**
           * 加入 html-loader 识别html文件
           */
          {
            test: /\.(html)$/,
            loader: 'html-loader',
          },
          /**
           * 加入 ts-loader 解析 TypeScript 文件
           */
          {
            test: /\.(ts|tsx|js|jsx)?$/,
            use: [
              {
                loader: 'ts-loader',
                options: {
                  getCustomTransformers: () => ({
                    transpileOnly: true,
                    before: [
                      tsImportPluginFactory({
                        libraryDirectory: 'es',
                        libraryName: 'antd',
                        style: true,
                      }),
                    ],
                  }),
                },
              },
            ],
            include: resolve('src'),
          },
            /**
             * 加入 less-loader 解析 less 文件
             * modules 为 true less引入方式为 import styles from './styles', 为 false，则为 import './styles'
             * 当 modules 为 true 时, 将启用 css modules, 即为类名前添加额外标识-localIdentName
             * [local] 为class名称, [name] 为文件名称
             */
          {
            test: /\.(less|css)$/,
            use: [
              { loader: 'style-loader' },
              {
                loader: 'css-loader',
                options: {
                  modules: false,
                  localIdentName: '[local]--[hash:base64:5]',
                },
              },
              {
                loader: 'less-loader',
                options: { javascriptEnabled: true },
              },
            ],
          },
          /**
           * 将静态资源 图片、视频、字体文件等，在进行一些处理后（主要是文件名和路径），移动到打包后的目录中
           */
          {
            exclude: /\.(js|jsx|json|css|less|tx|tsx)$/,
            loader: 'file-loader',
            options: {
              outputPath: 'asset/',
              name: '[name].[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    // 在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在。
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': resolve(__dirname, '../src'),
      '@components': resolve(__dirname, '../src/components'),
      '@config': resolve(__dirname, '../src/config'),
      '@utils': resolve(__dirname, '../src/utils'),
    },
  },
};
