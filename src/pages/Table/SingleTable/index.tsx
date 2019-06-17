import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import styles from './index.less';

export default function SingleTable() {
  /**
   * useState 是 react 自带的一个 hook 函数，它的作用就是用来声明状态变量;
   * userState 所传参数第 [0] 项是所声明状态的初始值，第 [1] 项是可以改变状态的方法函数;
   * react 规定我们必须把 hooks 写在函数的最外层，不能写在 if else等条件语句当中，来确保hooks的执行顺序一致;
   * hooks 可以反复多次使用，相互独立。
   */
  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState([]);

  /**
   * 我们写的有状态组件，通常会产生很多的副作用（side effect），比如发起 ajax 请求获取数据，手动修改 dom 等等;
   * 我们之前都把这些副作用的函数写在生命周期函数钩子里，比如 componentDidMount，componentDidUpdate 和 componentWillUnMount;
   * 而现在的 useEffect 就相当与这些声明周期函数钩子的集合体。它以一抵三。
   * useEffect 在每次组件更新后都会重新执行一遍,这样显然是不经济的，我们只需要给useEffect传第二个参数即可。
   * 用第二个参数来告诉react只有当这个参数的值发生改变时，才执行我们传的副作用函数（第一个参数）。
   */
  useEffect(() => {
    document.title = 'SingleTable';
  }, [columns]);
  return (
    <div className={styles.singleTableWrap}>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
}
