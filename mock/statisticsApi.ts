import mockJs from 'mockjs';

const getStatisticsData = {
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
};

export default mockJs.mock('/api/get_statistics', 'get', getStatisticsData);
