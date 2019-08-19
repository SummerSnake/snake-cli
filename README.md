# 项目

snake-cli

# 说明

React + React-Router + Typescript + ant design + webpack4.0 脚手架
使用 React hook 进行开发

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
    ├── config                 // webpack 配置目录
    │   ├── webpack.base.ts     // 公用配置
    │   ├── webpack.dev.ts     // 开发时配置
    │   └── product.dev.js     // 打包时配置
    ├── mock                   // mock 数据
    ├── script                  // node.js 脚本 
    ├── src                    // 源码目录
    │   ├── BasicLayout             // 布局组件
    │   ├── components             // 公共组件
    │   ├── config                 // 项目配置，路由、sideMenu等等
    │   ├── pages                  // 页面文件目录
    │   │   └── index
    │   │       ├── index.tsx           // 页面逻辑
    │   │       ├── index.less         // 页面样式
    │   ├── router                  // 路由
    │   ├── services                // ajax 封装
    │   ├── utils                   // 常用工具类
    │   ├── index.tsx               // 入口文件
    │   └── index.html
    ├── .eslintrc.js            // eslint 配置文件
    ├── .prettierrc.json        // prettier 配置
    ├── .global.d.ts            // Typescript 全局声明
    ├── postcss.config.js       // postcss 配置
    └── tsconfig.json           // Typescript 配置
