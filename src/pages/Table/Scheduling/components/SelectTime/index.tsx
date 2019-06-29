import React, { useState, useEffect } from 'react';
import { Modal, Tag, Checkbox } from 'antd';
import styles from './index.less';
import { amTime, pmTime } from '../../mock';

export default function SelectTime(props) {
  // 上午 时间段
  const [amTimeData, setAmTimeData] = useState([]);
  // 下午 时间段
  const [pmTimeData, setPmTimeData] = useState([]);
  // 选中 tag 数组
  const [tagArr, setTagArr] = useState([]);
  // 上午标签全选
  const [amChecked, setAmChecked] = useState<boolean>(false);
  // 下午标签全选
  const [pmChecked, setPmChecked] = useState<boolean>(false);

  useEffect(() => {
    setAmTimeData([...amTimeData, ...amTime]);
    setPmTimeData([...pmTimeData, ...pmTime]);

    // componentWillUnMount 时触发
    return () => {
      setTagArr([]);
    };
  }, []);

  /**
   * 选择标签
   */
  function handleTagSelect(id) {
    let tagArrClone = [...tagArr];
    if (tagArrClone.includes(id)) {
      tagArrClone.splice(tagArrClone.indexOf(id), 1);
    } else {
      tagArrClone.push(id);
    }
    setTagArr([...tagArrClone]);
  }
  /**
   * 上午标签全选 checkbox
   */
  async function handleAmChecked() {
    const invertVal = !amChecked;
    await setAmChecked(invertVal);
    let arr = [];
    let tagArrClone = [...tagArr];
    if (invertVal) {
      // 全选
      arr = amTimeData.filter(item => {
        return !tagArrClone.includes(item.id);
      });
      arr.forEach(item => {
        tagArrClone.push(item.id);
      });
      setTagArr([...tagArrClone]);
    } else {
      // 取消全选
      arr = tagArrClone.filter(tag => {
        return !amTimeData.map(item => item.id !== tag);
      });
      setTagArr([...arr]);
    }
  }
  /**
   * 提交
   */
  function handleSubmit() {
    props.onModalCall();
  }

  return (
    <div className={styles.SelectTime}>
      <Modal
        title="选择时段"
        width={500}
        visible={props.isModalOpen}
        onOk={() => {
          handleSubmit();
        }}
        onCancel={() => {
          props.onModalCall();
        }}
        confirmLoading={!props.isModalOpen}
        destroyOnClose
      >
        <div>
          <h3>
            上午
            <Checkbox
              checked={amChecked}
              style={{ marginLeft: '6px' }}
              onChange={() => {
                handleAmChecked();
              }}
            />
          </h3>
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
      </Modal>
    </div>
  );
}
