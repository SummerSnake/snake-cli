const { resolve } = require('path');
const os = require('os');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development', // 开发模式
    entry: {
        app: ['./src/index.tsx'], // 入口文件
        vendors: ['react'] // 所引入的公共库
    },
    output: {
        // hash 标识，每次修改输出不同文件名，用于更新浏览器缓存文件，区分版本, 8 代表打包出来为 8位 字符串
        filename: '[name].[hash:8].js',
        path: resolve(__dirname, '../build'), // 输出目录
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                include: resolve(__dirname, '/src/js'),
                loader: 'eslint-loader'
            },
            {
                oneOf: [ // oneOf 规则数组，当规则匹配时，只使用第一个匹配规则
                    /**
                     * 加入 html-loader 识别html文件
                     */
                    {
                        test: /\.(html)$/,
                        loader: 'html-loader'
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
                                    workers: os.cpus().length
                                }
                            },
                            {
                                loader: 'babel-loader',
                                options: {
                                    presets: ["@babel/preset-react", ["@babel/preset-env", { "modules": false }]],
                                    plugins: ["@babel/plugin-syntax-dynamic-import"],
                                    cacheDirectory: true
                                }

                            }
                        ],
                        include: resolve(__dirname, '/src'),
                        exclude: /node_modules/,
                    },
                    /**
                     * 加入 ts-loader 解析 TypeScript 文件
                     */
                    {
                        test: /\.(ts|tsx)?$/,
                        use: 'ts-loader',
                        include: resolve(__dirname, '/src'),
                        exclude: /node_modules/,
                    },
                    /**
                     * 加入 sass-loader 解析 scss 文件
                     * modules 为 true scss引入方式为 import styles from './styles', 为 false，则为 import './styles'
                     * [local] 为class名称, [name] 为文件名称
                     */
                    {
                        test: /\.scss$/,
                        use: [
                            { loader: 'style-loader' },
                            {
                                loader: 'css-loader', options: {
                                // modules: true,
                                // localIdentName: '[name]_[local]--[hash:base64:6]'
                            }
                            },
                            { loader: 'sass-loader' }
                        ]
                    },
                    /**
                     * 加入 url-loader 将小于 8kb 的图片转化为 base64, 优化性能
                     * [ext] 表示是原文件的扩展名
                     */
                    {
                        test: /\.(jpg|jpeg|bmp|svg|png|webp|gif)$/,
                        loader: 'url-loader',
                        options: {
                            limit: 8 * 1024,
                            name: '[name].[hash:8].[ext]'

                        }
                    },
                    /**
                     * 将静态资源 图片、视频、字体文件等，在进行一些处理后（主要是文件名和路径），移动到打包后的目录中
                     */
                    {
                        exclude: /\.(js|json|scss|css|jsx|tx|tsx)$/,
                        loader: 'file-loader',
                        options: {
                            outputPath: 'asset/',
                            name: '[name].[hash].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // 指定生成的文件所依赖哪一个html文件模板，模板类型可以是html、jade、ejs等
            template: './src/index.html'
        }),
        // 模块热更新
        new webpack.HotModuleReplacementPlugin(),
        // 当开启 HotModuleReplacementPlugin 的时候使用该插件直接返回更新文件名，而不是文件的id
        new webpack.NamedModulesPlugin()
    ],
    resolve: { // 在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在。
        extensions: [".js", ".json", ".jsx", ".ts", ".tsx"]
    },
    devServer: {
        contentBase: resolve(__dirname, "../build"),
        open: true,
        port: 3000,
        hot: true
    },
};
