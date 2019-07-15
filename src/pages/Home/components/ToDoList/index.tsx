import React, { useState, useEffect } from 'react';
import styles from './index.less';

interface InitProp {
  history: any[];
}
interface FetchData {
  front: {
    basicDataTypes?: string;
    complexDataTypes?: string;
    prototype?: string;
    closure?: string;
    es6?: string;
    scss?: string;
    less?: string;
    cssLoader?: string;
    styleLoader?: string;
    entry?: string;
    output?: string;
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
      basicDataTypes: 'string, boolean, number, null, undefined',
      complexDataTypes: 'object',
      prototype: '_proto_',
      closure: 'closure',
      es6: 'es6',
      scss: 'scss',
      less: 'less',
      cssLoader: 'css-loader',
      styleLoader: 'style-loader',
      entry: '入口文件',
      output: '打包生成文件',
      module: '模块规则（配置 loader、解析器等选项）',
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
              <p>
                <span className={styles.ellipsis}>
                  基本数据类型
                  <span>{fetchData.front.basicDataTypes}</span>
                </span>
                <span>
                  复杂数据类型
                  <span>{fetchData.front.complexDataTypes}</span>
                </span>
              </p>
              <p>
                <span>
                  原型链
                  <span>{fetchData.front.prototype}</span>
                </span>
                <span>
                  闭包
                  <span>{fetchData.front.closure}</span>
                </span>
              </p>
              <p>
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
              <p>
                预编译 css 语言
                <span>
                  Sass
                  <span>{fetchData.front.scss}</span>
                </span>
                <span>
                  Less
                  <span>{fetchData.front.less}</span>
                </span>
              </p>
              <p>
                CSS Modules
                <span>
                  css-loader
                  <span>{fetchData.front.cssLoader}</span>
                </span>
                <span>
                  style-loader
                  <span>{fetchData.front.styleLoader}</span>
                </span>
              </p>
            </div>
          </li>

          <li>
            <h3>Webpack</h3>
            <div>
              <p>
                <span>
                  entry
                  <span>{fetchData.front.entry}</span>
                </span>
                <span>
                  output
                  <span>{fetchData.front.output}</span>
                </span>
              </p>
              <p>
                <span>
                  module
                  <span>{fetchData.front.module}</span>
                </span>
                <span>
                  plugins
                  <span>{fetchData.front.plugins}</span>
                </span>
              </p>
              <p>
                <span>
                  resolve
                  <span>{fetchData.front.resolve}</span>
                </span>
                <span>
                  optimization
                  <span>{fetchData.front.optimization}</span>
                </span>
              </p>
            </div>
          </li>
        </ul>
      </div>

      {/*<div*/}
      {/*className={animKey === '0' ? styles.disNone : styles.disBlock}*/}
      {/*style={{ display: tabKey === '1' ? 'block' : 'none' }}*/}
      {/*>*/}
      {/*<ul className={styles.homeHeaderUl}>*/}
      {/*<li>*/}
      {/*<h3>租赁合同待审批</h3>*/}
      {/*<div>*/}
      {/*<p>*/}
      {/*<span>*/}
      {/*新增*/}
      {/*<span>{fetchData.mapRent.xj}</span>*/}
      {/*</span>*/}
      {/*<span>*/}
      {/*退租*/}
      {/*<span>{fetchData.mapRent.tz}</span>*/}
      {/*</span>*/}
      {/*</p>*/}
      {/*<p>*/}
      {/*<span>*/}
      {/*作废*/}
      {/*<span>{fetchData.mapRent.zf}</span>*/}
      {/*</span>*/}
      {/*<span>*/}
      {/*续租*/}
      {/*<span>{fetchData.mapRent.xq}</span>*/}
      {/*</span>*/}
      {/*</p>*/}
      {/*<p>*/}
      {/*<span>*/}
      {/*变更*/}
      {/*<span>{fetchData.mapRent.bg}</span>*/}
      {/*</span>*/}
      {/*</p>*/}
      {/*</div>*/}
      {/*</li>*/}

      {/*<li>*/}
      {/*<h3>租金账单待审批</h3>*/}
      {/*<div>*/}
      {/*<p>*/}
      {/*租金*/}
      {/*<span>*/}
      {/*新增*/}
      {/*<span>{fetchData.mapRentFee.xj}</span>*/}
      {/*</span>*/}
      {/*<span>*/}
      {/*作废*/}
      {/*<span>{fetchData.mapRentFee.zf}</span>*/}
      {/*</span>*/}
      {/*</p>*/}
      {/*</div>*/}
      {/*</li>*/}

      {/*<li>*/}
      {/*<h3>未来五日到期预警</h3>*/}
      {/*<div>*/}
      {/*<p>*/}
      {/*<span>*/}
      {/*租赁合同到期预警*/}
      {/*<span>{fetchData.mapFive.rentFiveExpire}</span>*/}
      {/*</span>*/}
      {/*<span>*/}
      {/*到期未处理*/}
      {/*<span>{fetchData.mapFive.rentExpireUntreated}</span>*/}
      {/*</span>*/}
      {/*</p>*/}
      {/*<p>*/}
      {/*<span>*/}
      {/*应收租金账单*/}
      {/*<span>{fetchData.mapFive.feeFiveExpire}</span>*/}
      {/*</span>*/}
      {/*<span>*/}
      {/*逾期未结清*/}
      {/*<span>{fetchData.mapFive.feeExpireUntreated}</span>*/}
      {/*</span>*/}
      {/*</p>*/}
      {/*</div>*/}
      {/*</li>*/}
      {/*</ul>*/}
      {/*</div>*/}
    </div>
  );
}

export default ToDoList;
