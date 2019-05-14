# 项目

snake-cli

# 说明

从零开始搭建 React 脚手架

# 注意事项

1. webpack4中除了正常安装 webpack 之外，需要再单独安一个 webpack-cli 。

2. 以下是webpack的正常配置模块 
       module.exports = {
         entry: '',               // 入口文件
         output: {},              // 出口文件
         module: {},              // 处理对应模块
         plugins: [],             // 对应的插件
         devServer: {},           // 开发服务器配置
         mode: 'development'      // 模式配置
       }
3. 启动 devServer 需要安装 webpack-dev-server

# 项目运行

```

git clone https://github.com/SummerSnake/snake-cli.git

cd snake-cli

# 安装项目依赖
yarn -i

# 项目启动
yarn start

# 项目构建
yarn build

```

# 业务介绍

目录结构

    ├── build                   // 编译结果目录
    ├── config                 // webpack配置目录
    │   ├── webpack.dev.js     // 开发时配置
    │   └── product.dev.js     // 打包时配置
    ├── src                    // 源码目录
    │   ├── components             // 组件
    │   ├── pages                  // 页面文件目录
    │   │   └── index
    │   │       ├── index.js           // 页面逻辑
    │   │       ├── index.scss         // 页面样式
    │   ├── utils              // 常用工具类
    │   ├── index.js             // 入口文件
    │   └── index.html
    └── package.json            // 项目依赖
