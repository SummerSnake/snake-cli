/**
 * postcss 插件 autoprefixer 为 css 属性添加浏览器前缀，-webkit -moz 等
 */

module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ['ie >= 8', 'ff >= 30', 'chrome >= 34', 'safari >= 8', 'opera >= 23'],
    },
  },
};
