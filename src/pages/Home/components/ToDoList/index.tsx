import React, { useState, useEffect } from 'react';
import styles from './index.less';

interface InitProp {
  history: any[];
}
interface FetchData {
  front: {
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
  };
}
function ToDoList(props: InitProp) {
  const [tabKey, setTabKey] = useState<string>('0');

  const [animKey, setAnimKey] = useState<string>('0');

  const [fetchData, setFetchData] = useState<FetchData>({
    front: {
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
  });
  // useEffect(() => {
  //   if (!localStorage.getItem('accessToken')) {
  //     props.history.push('/login');
  //   }
  //   return () => {
  //     localStorage.removeItem('accessToken');
  //   };
  // }, []);
  /**
   * tabs 选择
   * @param key
   */
  async function onTabChange(key) {
    setAnimKey(key);
    await setTimeout(() => {
      setTabKey(key);
      // this.fetchApi();
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
                  <span>{fetchData.front.array}</span>
                </span>
                <span>
                  对象
                  <span>{fetchData.front.object}</span>
                </span>
              </p>
              <p className={styles.ellipsis}>
                <span>
                  原型链
                  <span>{fetchData.front.prototype}</span>
                </span>
                <span>
                  闭包
                  <span>{fetchData.front.closure}</span>
                </span>
              </p>
              <p className={styles.ellipsis}>
                <span>
                  ESMAScript2015
                  <span>{fetchData.front.es6}</span>
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
                  <span>{fetchData.front.module}</span>
                </span>
                <span>
                  plugins
                  <span>{fetchData.front.plugins}</span>
                </span>
              </p>
              <p className={styles.ellipsis}>
                <span>
                  resolve
                  <span>{fetchData.front.resolve}</span>
                </span>
              </p>
              <p className={styles.ellipsis}>
                <span>
                  optimization
                  <span>{fetchData.front.optimization}</span>
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
