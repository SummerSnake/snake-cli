import mockJs from 'mockjs';

const getHomeData = {
  chartsData: {
    todayList: [0, 6, 14, 24, 14, 12, 8, 18, 12, 6, 2, 0],
    hourList: ['00', '02', '04', '06', '08', '10', '12', '14', '16', '18', '20', '22'],
    dateList: [
      '2019-07-25',
      '2019-07-26',
      '2019-07-27',
      '2019-07-28',
      '2019-07-29',
      '2019-07-30',
      '2019-07-31',
    ],
    numList: [14, 6, 8, 12, 14, 8, 6],
    sortList: [
      { id: 1, name: '金沙滩风景区', count: '10000' },
      { id: 2, name: '银沙滩风景区', count: '9999' },
      { id: 3, name: '唐岛湾公园', count: '8888' },
      { id: 4, name: '大珠山风景区', count: '7777' },
      { id: 5, name: '栈桥码头', count: '6666' },
      { id: 6, name: '八大关', count: '5555' },
      { id: 7, name: '崂山仙境', count: '4444' },
      { id: 8, name: '太清宫', count: '3333' },
      { id: 9, name: '中山公园', count: '2222' },
      { id: 10, name: '五四广场', count: '1111' },
    ],
  },
  statisticsData: {
    js: {
      total: 5,
      obj: 'function, array, object',
      list: [
        { id: 1, name: 'number', example: '1, 10, 100' },
        { id: 2, name: 'string', example: '字符, 字符串' },
        { id: 3, name: 'boolean', example: 'true, false' },
        { id: 4, name: 'undefined', example: 'undefined' },
        { id: 5, name: 'null', example: 'null' },
        { id: 6, name: 'symbol', example: 'symbol' },
      ],
    },
    array: {
      es5Num: 9,
      es6Num: 10,
      es6Func: 'from, of, copyWithin, fill, find, findIndex, includes, entries, keys, values',
      list: [
        { id: 1, name: 'forEach', description: '遍历' },
        { id: 2, name: 'map', description: '映射' },
        { id: 3, name: 'filter', description: '过滤' },
        { id: 4, name: 'some', description: '有一项满足条件返回 true' },
        { id: 5, name: 'every', description: '所有项都满足条件返回 true' },
        { id: 6, name: 'reduce', description: '归并' },
      ],
    },
    async: {
      list: [
        {
          id: 1,
          name: '回调函数',
          description: 'JavaScript 中的函数是一等公民，可以将其以参数形式传递。',
        },
        {
          id: 2,
          name: 'Promise',
          description: 'Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件的结果。',
        },
        {
          id: 3,
          name: 'Generator',
          description: '可以把 Generator 函数理解为一个状态机，封装了多个内部状态。',
        },
        {
          id: 4,
          name: 'async await',
          description:
            'async 可以看作多个异步操作，包装成的一个 Promise 对象，而 await 就是内部 then 命令的语法糖。',
        },
      ],
    },
  },
  todoListData: {
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
  },
  touristData: {
    provinceList: [
      { id: 1, province: '山东', touristType: 1 },
      { id: 2, province: '江苏', touristType: 2 },
      { id: 3, province: '河南', touristType: 3 },
    ],
    pieLegend: ['山东', '江苏', '河南', '河北', '浙江', '湖北', '湖南', '安徽'],
    pieData: [
      { value: 10000, name: '山东' },
      { value: 9999, name: '江苏' },
      { value: 8888, name: '河南' },
      { value: 7777, name: '河北' },
      { value: 6666, name: '浙江' },
      { value: 5555, name: '湖北' },
      { value: 4444, name: '湖南' },
      { value: 3333, name: '安徽' },
    ],
    rankings: [
      { id: 1, city: '菏泽', count: '10000', good: '99%', bad: '1%' },
      { id: 2, city: '济南', count: '9999', good: '98%', bad: '2%' },
      { id: 3, city: '南京', count: '8888', good: '97%', bad: '3%' },
      { id: 4, city: '苏州', count: '7777', good: '96%', bad: '4%' },
      { id: 5, city: '武汉', count: '6666', good: '95%', bad: '5%' },
      { id: 6, city: '北京', count: '5555', good: '94%', bad: '6%' },
    ],
  },
};

export default mockJs.mock('/api/get_homeData', 'get', getHomeData);
