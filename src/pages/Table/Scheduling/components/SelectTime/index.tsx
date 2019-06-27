import React, { useState, useEffect } from 'react';
import { Tag } from 'antd';
import styles from './index.less';
import { amTime, pmTime } from '../../mock';

export default function SelectTime() {
  // 上午 时间段
  const [amTimeData, setAmTimeData] = useState([]);
  // 下午 时间段
  const [pmTimeData, setPmTimeData] = useState([]);
  // 选中 tag 数组
  const [tagArr, setTagArr] = useState([]);

  useEffect(() => {
    setAmTimeData([...amTimeData, ...amTime]);
    setPmTimeData([...pmTimeData, ...pmTime]);

    // componentWillUnMount 时触发
    return () => {
      setTagArr([]);
    };
  }, []);

  function handleTagSelect(id) {
    let tagArrClone = [...tagArr];
    if (tagArrClone.includes(id)) {
      tagArrClone.splice(tagArrClone.indexOf(id), 1);
    } else {
      tagArrClone.push(id);
    }
    setTagArr([...tagArrClone]);
  }

  return (
    <div className={styles.SelectTime}>
      <div>
        <h3>上午</h3>
        <div>
          {amTimeData.map(item => (
            <Tag
              color={tagArr.includes(item.id) ? '#1890ff' : ''}
              style={{ marginBottom: '10px', cursor: 'pointer' }}
              key={item.id}
              onClick={() => {
                handleTagSelect(item.id);
              }}
            >
              {item.tag}
            </Tag>
          ))}
        </div>
      </div>
      <div>
        <h3>下午</h3>
        <div>
          {pmTimeData.map(item => (
            <Tag
              color={tagArr.includes(item.id) ? '#1890ff' : ''}
              style={{ marginBottom: '10px', cursor: 'pointer' }}
              key={item.id}
              onClick={() => {
                handleTagSelect(item.id);
              }}
            >
              {item.tag}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
}
