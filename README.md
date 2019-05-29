# 项目

snake-cli

# 说明

从零开始搭建 React 脚手架

# 注意事项

1. webpack4中除了正常安装 webpack 之外，需要再单独安一个 webpack-cli
2. 启动 devServer 需要安装 webpack-dev-server

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
    │   ├── webpack.base.ts     // 公用配置
    │   ├── webpack.dev.ts     // 开发时配置
    │   └── product.dev.js     // 打包时配置
    ├── src                    // 源码目录
    │   ├── components             // 组件
    │   ├── pages                  // 页面文件目录
    │   │   └── index
    │   │       ├── index.tsx           // 页面逻辑
    │   │       ├── index.less         // 页面样式
    │   ├── utils              // 常用工具类
    │   ├── index.tsx             // 入口文件
    │   └── index.html
    ├── .prettierrc.json            // prettier 配置
    ├── .global.d.ts            // Typescript 全局声明
    ├── postcss.config.js            // postcss 配置
    ├── tsconfig.json            // Typescript 配置
    └── tslint.json            // Typescript 代码风格检测
