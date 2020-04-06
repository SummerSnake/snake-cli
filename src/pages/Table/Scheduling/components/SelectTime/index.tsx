import React, { useState, useEffect } from 'react';
import { Modal, Tag, Checkbox } from 'antd';
import { verArr } from '@utils/util';
import styles from './index.less';

interface InitProps {
  apiData: {
    amTime?: string[];
    pmTime?: string[];
  };
  isModalOpen: boolean;
  onModalCall: any;
}
function SelectTime(props: InitProps) {
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
    if (Array.isArray(props.apiData['amTime'])) {
      setAmTimeData([...amTimeData, ...props.apiData['amTime']]);
    }
    if (Array.isArray(props.apiData['pmTime'])) {
      setPmTimeData([...pmTimeData, ...props.apiData['pmTime']]);
    }

    // componentWillUnMount 时触发
    return () => {
      setTagArr([]);
    };
  }, []);

  /**
   * @desc 判断标签是否全部选中，添加全选 checkbox 状态
   * @param { array } timeData 时间标签
   * @param { array } tagArr 选中的标签数组
   * @param { string } type 上午、下午 标识符
   */
  function checkContain(timeData, tagArr, type: string) {
    let amFlag = true;
    let pmFlag = true;
    // 判断标签数组中是否包含 当前点击标签所属数组 的所有元素
    timeData.forEach((item) => {
      if (!tagArr.includes(item.id)) {
        type === 'am' ? (amFlag = false) : (pmFlag = false);
      }
    });
    amFlag && type === 'am' && setAmChecked(true);
    pmFlag && type === 'pm' && setPmChecked(true);
  }

  /**
   * @desc 选择标签
   * @param { number } id 当前选择的标签id
   */
  function handleTagSelect(id: number) {
    let tagArrClone = [...tagArr];
    const amTimeDataClone = [...amTimeData];
    const pmTimeDataClone = [...pmTimeData];

    if (tagArrClone.includes(id)) {
      // 如果当前是选中状态，则取消选中
      tagArrClone.splice(tagArrClone.indexOf(id), 1);
      // 取消全选 checkbox 状态
      amTimeDataClone.forEach((item) => {
        item.id === id && setAmChecked(false);
      });
      pmTimeDataClone.forEach((item) => {
        item.id === id && setPmChecked(false);
      });
    } else {
      // 如果当前是非选中状态，则添加选中状态
      tagArrClone.push(id);
      // 如果标签全部选中，添加全选 checkbox 状态
      checkContain(amTimeDataClone, tagArrClone, 'am');
      checkContain(pmTimeDataClone, tagArrClone, 'pm');
    }
    setTagArr([...tagArrClone]);
  }

  /**
   * @desc 标签操作方法
   * @param { boolean } timeChecked 标签全选状态
   * @param { array } timeData 当前选择的时间数据所属数组 上午、下午
   */
  function tagFilter(timeChecked: boolean, timeData) {
    let arr = [];
    let tagArrClone = [...tagArr];
    if (timeChecked) {
      // 全选
      arr = timeData.filter((item) => {
        return !tagArrClone.includes(item.id);
      });
      arr.forEach((item) => {
        tagArrClone.push(item.id);
      });
    } else {
      // 取消全选
      timeData.forEach((item) => {
        if (tagArrClone.includes(item.id)) {
          tagArrClone.splice(tagArrClone.indexOf(item.id), 1);
        }
      });
    }
    setTagArr([...tagArrClone]);
  }

  /**
   * @desc 上午标签全选 checkbox
   */
  function handleAmChecked() {
    const invertVal = !amChecked;
    setAmChecked(invertVal);
    tagFilter(invertVal, amTimeData);
  }

  /**
   * @desc 下午标签全选 checkbox
   */
  function handlePmChecked() {
    const invertVal = !pmChecked;
    setPmChecked(invertVal);
    tagFilter(invertVal, pmTimeData);
  }

  /**
   * @desc 提交
   */
  function handleSubmit() {
    setTagArr([]);
    setAmChecked(false);
    setPmChecked(false);
    props.onModalCall();
  }
  return (
    <div className={styles.SelectTime}>
      <Modal
        title="选择时段"
        width={500}
        visible={props.isModalOpen}
        okText="提交"
        onOk={() => {
          handleSubmit();
        }}
        cancelText="取消"
        onCancel={() => {
          handleSubmit();
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
            {verArr(amTimeData) &&
              amTimeData.map((item) => (
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
          <h3>
            下午
            <Checkbox
              checked={pmChecked}
              style={{ marginLeft: '6px' }}
              onChange={() => {
                handlePmChecked();
              }}
            />
          </h3>
          <div>
            {verArr(pmTimeData) &&
              pmTimeData.map((item) => (
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

export default SelectTime;
