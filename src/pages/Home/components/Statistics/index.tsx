import React, { useState, useEffect } from 'react';
import styles from './index.less';

interface ApiData {
  js: {
    total?: number;
    obj?: string;
    list: any[];
  };
  array: {
    es5Num?: number;
    es6Num?: number;
    es6Func?: string;
    list: any[];
  };
  async: {
    list: any[];
  };
  [propName: string]: any;
}
function Statistics() {
  const [apiData, setApiData] = useState<ApiData>({
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
        { id: 4, name: 'some', description: '有一项满足条件返回true' },
        { id: 5, name: 'every', description: '所有项都满足条件返回true' },
        { id: 6, name: 'reduce', description: '归并' },
      ],
    },
    async: {
      es5Num: 9,
      es6Num: 10,
      es6Func: 'from, of, copyWithin, fill, find, findIndex, includes, entries, keys, values',
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
  });

  const { js, array, async } = apiData;
  return (
    <section className={styles.statisticsWrap}>
      <ul>
        <li>
          <h3>js数据类型</h3>
          <div>
            <h4>
              基本数据类型：<span>{js.total}</span>
            </h4>
            {js.list.map(item => {
              return (
                <p key={item.id}>
                  {item.name}
                  <span>{item.example}</span>
                </p>
              );
            })}
          </div>
          <div>
            <h4>复杂数据类型</h4>
            <p>
              object：<span>{js.obj}</span>
            </p>
          </div>
        </li>

        <li>
          <h3>js 数组方法</h3>
          <div>
            <h4>
              ES5新增：<span>{array.es5Num}</span>
            </h4>
            {array.list.map(item => {
              return (
                <p key={item.id}>
                  {item.name}
                  <span>{item.description}</span>
                </p>
              );
            })}
          </div>
          <div>
            <h4>
              ES6新增<span> {array.es6Num} </span>个方法
            </h4>
            <p>
              <span>{array.es6Func}</span>
            </p>
          </div>
        </li>

        <li>
          <h3>js异步编程</h3>
          {async.list.map(item => (
            <div>
              <p>{item.name}</p>
              <p>{item.description}</p>
            </div>
          ))}
        </li>
      </ul>
    </section>
  );
}

export default Statistics;
