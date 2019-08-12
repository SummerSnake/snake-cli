import React, { useState, useEffect } from 'react';
import { getRequest } from '@services/api';
import { verArr } from '@utils/util';
import '../../../../../mock/statisticsApi';
import styles from './index.less';

interface InitProp {
  loadingCall: any;
}
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
function Statistics(props: InitProp) {
  const [apiData, setApiData] = useState<ApiData>({
    js: {
      list: [],
    },
    array: {
      list: [],
    },
    async: {
      list: [],
    },
  });

  /**
   * 获取数据
   */
  async function fetchData() {
    props.loadingCall({ isLoading: true });
    const newData = await getRequest('/api/get_statistics', null);
    setApiData({ ...apiData, ...newData['data'] });
    props.loadingCall({ isLoading: false });
  }

  useEffect(() => {
    fetchData();
  }, []);

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
            {js &&
              verArr(js.list) &&
              js.list.map(item => {
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
            {array &&
              verArr(array.list) &&
              array.list.map(item => {
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
          {async &&
            verArr(async.list) &&
            async.list.map(item => (
              <div key={item.id}>
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
