import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { getRequest } from '@services/api';
import { verArr, openNotificationWithIcon } from '@utils/util';
import '../../../../../mock/noticeApi';
import styles from './index.less';

interface InitProp {
  loadingCall: any;
}
function Notice(props: InitProp) {
  // 公告列表是否滚动
  const [hasMore, setHasMore] = useState<boolean>(true);
  // api接口数据
  const [apiData, setApiData] = useState([]);
  // 公告列表总数
  const [listTotal, setListTotal] = useState<number>(0);
  // 公告列表
  const [list, setList] = useState([]);

  /**
   * @desc 无限滚动
   */
  const handleInfiniteOnLoad = () => {
    if (list.length >= listTotal) {
      setHasMore(false);
      openNotificationWithIcon('error', '下边没有了', '');
    } else {
      props.loadingCall({ isLoading: true });
      setList([...list, ...apiData.slice(6)]);
      props.loadingCall({ isLoading: false });
    }
  };

  /**
   * @desc 获取数据
   */
  const fetchSysNoticeList = async () => {
    props.loadingCall({ isLoading: true });
    const newData = await getRequest('/api/get_notice', null);

    setApiData([...apiData, ...newData['data']]);
    setListTotal(newData['data'].length);
    setList([...list, ...newData['data'].slice(0, 6)]);

    props.loadingCall({ isLoading: false });
  };

  useEffect(() => {
    fetchSysNoticeList();
  }, []);

  return (
    <article className={styles.noticeWrap}>
      <h3>最新公告</h3>
      <ul>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={handleInfiniteOnLoad}
          hasMore={hasMore}
          useWindow={false}
        >
          {verArr(list) &&
            list.map(item => (
              <li key={item.id}>
                <span>{item.title}</span>
                <span>发布于 {item.sendDate}</span>
              </li>
            ))}
        </InfiniteScroll>
      </ul>
    </article>
  );
}

export default Notice;
