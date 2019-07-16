import React, { useState, useEffect } from 'react';
import { getRequest } from '@services/api';
import '../../../../../mock/homeApi';
import styles from './index.less';

interface InitProp {
  history: any[];
  loadingCall: any;
}
interface Data {
  array?: string;
  object?: string;
  prototype?: string;
  closure?: string;
  es6?: string;
  scss?: string;
  less?: string;
  cssLoader?: string;
  styleLoader?: string;
  module?: string;
  plugins?: string;
  resolve?: string;
  optimization?: string;
  [propName: string]: any;
}
function ToDoList(props: InitProp) {
  const [tabKey, setTabKey] = useState<string>('0');

  const [animKey, setAnimKey] = useState<string>('0');

  const [data, setData] = useState<Data>({});

  /**
   * 获取数据
   */
  async function fetchData() {
    props.loadingCall({ isLoading: true });
    const newData = await getRequest('/api/get_toDoList', null);
    setData({ ...data, ...newData['data'] });
    props.loadingCall({ isLoading: false });
  }
  useEffect(() => {
    fetchData();
    return () => {
      setAnimKey('0');
      setTabKey('0');
    };
  }, []);

  /**
   * tabs 选择
   * @param key
   */
  function onTabChange(key) {
    setAnimKey(key);
    setTimeout(() => {
      setTabKey(key);
    }, 300);
  }
  return (
    <div className={styles.todoListWrap}>
      <p>
        待办事项
        <span className={tabKey === '0' ? styles.spanCur : null} onClick={() => onTabChange('0')}>
          前端相关
        </span>
        <span className={tabKey === '1' ? styles.spanCur : null} onClick={() => onTabChange('1')}>
          全栈相关
        </span>
      </p>
      <div
        className={animKey === '0' ? styles.disBlock : styles.disNone}
        style={{ display: tabKey === '0' ? 'block' : 'none' }}
      >
        <ul className={styles.cardList}>
          <li>
            <h3>javascript</h3>
            <div>
              <p className={styles.ellipsis}>
                <span>
                  数组
                  <span>{data.array}</span>
                </span>
                <span>
                  对象
                  <span>{data.object}</span>
                </span>
              </p>
              <p className={styles.ellipsis}>
                <span>
                  原型链
                  <span>{data.prototype}</span>
                </span>
                <span>
                  闭包
                  <span>{data.closure}</span>
                </span>
              </p>
              <p className={styles.ellipsis}>
                <span>
                  ESMAScript2015
                  <span>{data.es6}</span>
                </span>
              </p>
            </div>
          </li>

          <li>
            <h3>CSS</h3>
            <div>
              <p className={styles.ellipsis}>
                <span>Sass</span>
                <span>Less</span>
              </p>
              <p className={styles.ellipsis}>
                <span>CSS Modules</span>
                <span>PostCSS</span>
              </p>
            </div>
          </li>

          <li>
            <h3>Webpack</h3>
            <div>
              <p className={styles.ellipsis}>
                <span>
                  module
                  <span>{data.module}</span>
                </span>
                <span>
                  plugins
                  <span>{data.plugins}</span>
                </span>
              </p>
              <p className={styles.ellipsis}>
                <span>
                  resolve
                  <span>{data.resolve}</span>
                </span>
              </p>
              <p className={styles.ellipsis}>
                <span>
                  optimization
                  <span>{data.optimization}</span>
                </span>
              </p>
            </div>
          </li>
        </ul>
      </div>

      <div
        className={animKey === '1' ? styles.disBlock : styles.disNone}
        style={{ display: tabKey === '1' ? 'block' : 'none' }}
      >
        <ul className={styles.cardList}>
          <li>
            <h3>Node.js</h3>
            <div>
              <p className={styles.ellipsis}>
                <span>单线程</span>
                <span>事件驱动，非阻塞的IO</span>
              </p>
              <p className={styles.ellipsis}>
                <span>express</span>
                <span>koa</span>
              </p>
              <p className={styles.ellipsis}>
                <span>回调地狱</span>
              </p>
            </div>
          </li>

          <li>
            <h3>mongodb</h3>
            <div>
              <p className={styles.ellipsis}>
                <span>非关系数据库</span>
              </p>
            </div>
          </li>

          <li>
            <h3>Java</h3>
            <div>
              <p className={styles.ellipsis}>
                <span>.class</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ToDoList;
