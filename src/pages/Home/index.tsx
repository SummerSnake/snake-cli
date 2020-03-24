import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { getRequest } from '@services/api';
import ToDoList from './components/ToDoList';
import Statistics from './components/Statistics';
import Charts from './components/Charts';
import Tourist from './components/Tourist';
import Popularity from './components/Popularity';
import Feedback from './components/Feedback';
import Notice from './components/Notice';
import '../../../mock/homeApi';
import styles from './index.less';

interface InitProp {
  history?: any[];
  common?: any;
  loading?: any;
}
interface ApiData {
  chartsData: {
    todayList: number[];
    hourList: string[];
    dateList: string[];
    numList: number[];
    sortList: any[];
  };
  statisticsData: {
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
  };
  todoListData: {
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
  touristData: {
    provinceList: any[];
    pieLegend: string[];
    pieData: any[];
    rankings: any[];
  };
}
interface CallJson {
  isLoading?: boolean;
}
function Home(props: InitProp) {
  const [loading, setLoading] = useState<boolean>(false);
  // 默认数据
  const [apiData, setApiData] = useState<ApiData>({
    chartsData: {
      todayList: [],
      hourList: [],
      dateList: [],
      numList: [],
      sortList: [],
    },
    statisticsData: {
      js: {
        list: [],
      },
      array: {
        list: [],
      },
      async: {
        list: [],
      },
    },
    todoListData: {},
    touristData: {
      provinceList: [],
      pieLegend: [],
      pieData: [],
      rankings: [],
    },
  });

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      props.history.push('/login');
    }
  }, []);

  /**
   * @desc 挂载获取数据
   */
  const fetchData = async () => {
    setLoading(true);
    const newData = await getRequest('/api/get_homeData', null);
    setApiData({ ...newData['data'] });
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  /**
   * @desc loading 回调
   * @param { object } json loading状态对象
   */
  function loadingCall(json: CallJson): void {
    setLoading(json['isLoading']);
  }

  const { todoListData, statisticsData, chartsData, touristData } = apiData;

  return (
    <Spin spinning={loading}>
      <div className={styles.homeWrap}>
        <header>
          <ToDoList todoListData={todoListData} />
        </header>

        <main>
          <Statistics statisticsData={statisticsData} />

          <Charts chartsData={chartsData} />

          <Tourist touristData={touristData} />

          <Popularity />
        </main>

        <footer>
          <Feedback />

          <Notice loadingCall={loadingCall} />
        </footer>
      </div>
    </Spin>
  );
}

export default Home;
