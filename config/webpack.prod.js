const { resolve } = require('path');
const os = require('os');
const webpack = require('webpack');
const tsImportPluginFactory = require('ts-import-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'production', // 生产模式
  entry: {
    app: ['./src/index.tsx'], // 入口文件
    vendors: ['react'], // 所引入的公共库
  },
  output: {
    // hash 标识，每次修改输出不同文件名，用于更新浏览器缓存文件，区分版本, 8 代表打包出来为 8位 字符串
    filename: '[name].[contenthash:8].js',
    path: resolve(__dirname, '../dist'), // 输出目录
  },
  module: {
    rules: [
      {
        oneOf: [
          // oneOf 规则数组，当规则匹配时，只使用第一个匹配规则
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
              // 将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[name]_[local]--[hash:base64:6]',
                },
              },
              // postcss把 CSS 解析成 JavaScript 可以操作的 抽象语法树结构（Abstract Syntax Tree，AST）
              // 然后调用插件来处理 AST 并得到结果
              { loader: 'postcss-loader' },
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
          /**
           * 将静态资源 图片、视频、字体文件等，在进行一些处理后（主要是文件名和路径），移动到打包后的目录中
           */
          {
            exclude: /\.(js|json|scss|css|jsx|tx|tsx)$/,
            loader: 'file-loader',
            options: {
              outputPath: '/asset',
              name: '[name].[contenthash:8].[ext]',
            },
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
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
    }),
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
    // 当开启 HotModuleReplacementPlugin 的时候使用该插件直接返回更新文件名，而不是文件的id
    new webpack.NamedModulesPlugin(),
  ],
  resolve: {
    // 在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': resolve(__dirname, '../src'),
      '@components': resolve(__dirname, '../src/components'),
      '@config': resolve(__dirname, '../src/config'),
      '@utils': resolve(__dirname, '../src/utils'),
    },
  },
  // code splitting 代码分割
  optimization: {
    //设置为 true, 一个 chunk 打包后就是一个文件，一个chunk对应`一些js css 图片`等
    runtimeChunk: true,
    splitChunks: {
      // 默认 entry 的 chunk 不会被拆分, 配置成 all, 就可以了拆分了，一个入口`JS`打包后就生成一个单独的文件
      chunks: 'all',
    },
  },
};
