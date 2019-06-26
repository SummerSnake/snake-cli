/**
 * postcss 插件 autoprefixer 为 css 属性添加浏览器前缀，-webkit -moz 等
 */

module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8'],
    },
  },
};
