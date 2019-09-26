const { resolve } = require('path');
const tsImportPluginFactory = require('ts-import-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: ['./src/index.tsx'], // 入口文件
    vendors: ['react', 'react-dom', 'react-router-dom', 'echarts'], // 所引入的公共库
  },
  output: {
    // 对应于entry里面生成出来的文件名，
    // hash 标识，每次修改输出不同文件名，用于更新浏览器缓存文件，区分版本, 8 代表打包出来为 8位 字符串
    filename: 'js/[name].[hash:6].js',
    chunkFilename: 'js/[name]_chunk.[chunkhash:8].js',
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
           * 当 modules 为 true 时, 将启用 css modules, 即为类名前添加额外标识-localIdentName,[local] 为class名称, [name] 为文件名称;
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
                  modules: true,
                  localIdentName: '[local]_[hash:base64:6]',
                },
              },
              { loader: 'postcss-loader' },
              { loader: 'less-loader' },
            ],
            include: /src/,
          },
          /**
           * 单独处理 ant design css
           */
          {
            test: /\.css$/,
            use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
            include: /node_modules/,
          },
          /**
           * 加入 url-loader 将小于 8kb 的图片转化为 base64, 优化性能
           * [ext] 表示是原文件的扩展名
           */
          {
            test: /\.(jpe?g|png|bmp|svg|gif|webp)$/,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              name: '[name].[hash:8].[ext]',
            },
            include: /src/,
          },
          /**
           * 将静态资源 图片、视频、字体文件等，在进行一些处理后（主要是文件名和路径），移动到打包后的目录中
           */
          {
            loader: 'file-loader',
            options: {
              outputPath: 'asset/',
              name: '[name].[hash].[ext]',
            },
            exclude: /\.(css|less|json|jsx?|tsx?)$/,
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
