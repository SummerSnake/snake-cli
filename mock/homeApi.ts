import mockJs from 'mockjs';

const getTodoListData = {
  array: 'array',
  object: 'object',
  prototype: '_proto_',
  closure: 'closure',
  es6: 'es6',
  scss: 'scss',
  less: 'less',
  cssLoader: 'css-loader',
  styleLoader: 'style-loader',
  module: '配置 loader',
  plugins: '插件',
  resolve: '解析模块请求的选项',
  optimization: 'webpack 性能优化',
};

export default mockJs.mock('/api/get_toDoList', 'get', getTodoListData);
