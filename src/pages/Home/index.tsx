import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import ToDoList from './components/ToDoList';
import styles from './index.less';

interface InitProp {
  history?: any[];
}
interface CallJson {
  isLoading?: boolean;
}
function Home(props: InitProp) {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      props.history.push('/login');
    }
  }, []);

  /**
   * loading 回调
   */
  function loadingCall(json: CallJson): void {
    setLoading(json['isLoading']);
  }
  return (
    <Spin spinning={loading}>
      <div className={styles.homeWrap}>
        <header>
          <ToDoList loadingCall={loadingCall} />
        </header>
      </div>
    </Spin>
  );
}

export default Home;
