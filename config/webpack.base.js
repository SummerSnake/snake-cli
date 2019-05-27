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
           * 加入 babel-loader 还有 解析JSX ES6语法的 babel preset
           * @babel/preset-react解析 jsx语法
           * @babel/preset-env解析es6语法，modules: false 关掉babel将ES6模块化转化为commonjs
           * @babel/plugin-syntax-dynamic-import解析react-loadable的import按需加载，附带code spliting功能
           * cacheDirectory 开启babel编译缓存
           */
          {
            test: /\.(js|jsx)$/,
            use: [
              // 加入thread-loader，在babel首次编译后开启多线程
              {
                loader: 'thread-loader',
                options: {
                  // 产生的 worker 的数量，默认是 cpu 的核心数
                  workers: os.cpus().length,
                },
              },
              {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-react', ['@babel/preset-env', { modules: false }]],
                  plugins: ['@babel/plugin-syntax-dynamic-import'],
                  cacheDirectory: true,
                },
              },
            ],
            exclude: /node_modules/,
          },
          /**
           * 加入 ts-loader 解析 TypeScript 文件
           */
          {
            test: /\.(ts|tsx)?$/,
            use: [
              {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true, // 加快打包速度
                  happyPackMode: true, // 使用 thread-loader 需设为 true
                  experimentalWatchApi: true,
                  getCustomTransformers: () => ({
                    before: [
                      tsImportPluginFactory({
                        libraryName: 'antd',
                        libraryDirectory: 'lib',
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
           * 加入 sass-loader 解析 scss 文件
           * modules 为 true scss引入方式为 import styles from './styles', 为 false，则为 import './styles'
           * 当 modules 为 true 时, 将启用 css modules, 即为类名前添加额外标识-localIdentName
           * [local] 为class名称, [name] 为文件名称
           */
          {
            test: /\.(css|less|scss)?$/,
            use: [
              { loader: 'style-loader' },
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[name]_[local]--[hash:base64:6]',
                },
              },
              { loader: 'sass-loader' },
            ],
            exclude: /node_modules/,
          },
          /**
           * 单独处理 ant design css
           */
          {
            test: /\.css$/,
            use: [
              {
                loader: 'style-loader',
              },
              {
                loader: 'css-loader',
              },
              {
                loader: 'postcss-loader',
              },
            ],
            include: /node_modules/,
          },
          /**
           * 将静态资源 图片、视频、字体文件等，在进行一些处理后（主要是文件名和路径），移动到打包后的目录中
           */
          {
            exclude: /\.(js|json|scss|css|jsx|tx|tsx)$/,
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
