import React, { useState, useEffect } from 'react';
import { Table, Button, Select, Modal } from 'antd';
const { Column, ColumnGroup } = Table;
const { Option } = Select;
import moment from 'moment';
import { weekFormat, calcWeek, columnsJson } from '@utils/date';
import SelectTime from './components/SelectTime/index';
import styles from './index.less';
import { mockData } from './mock';

export default function Scheduling() {
  // 表头
  const [columns, setColumns] = useState([]);
  // 表格数据
  const [dataSource, setDataSource] = useState([]);
  // 表格选择框
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // 当前日期
  const [nowDate, setNowDate] = useState(moment());
  // Modal 开关
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const arr = columnsJson(nowDate);
    setColumns([...columns, ...arr]);
    setDataSource([...dataSource, ...mockData]);

    // componentWillUnMount 时触发
    return () => {
      console.log('componentWillUnMount');
    };
  }, []);

  /**
   * 选择框事件
   * @param val 当前所选值
   */
  function handleSelect(val: string) {
    console.log(`selected ${val}`);
  }

  /**
   * 上一周按钮点击
   */
  function handleLastWeek() {
    const json = calcWeek(nowDate);
    const arr = columnsJson(json['lastWeek']);
    setColumns([...arr]);
    setNowDate(json['lastWeek']);
  }

  /**
   * 当前周按钮点击
   */
  function handleNowWeek() {
    const arr = columnsJson(moment());
    setColumns([...arr]);
    setNowDate(moment());
  }

  /**
   * 上一周按钮点击
   */
  function handleNextWeek() {
    const json = calcWeek(nowDate);
    const arr = columnsJson(json['nextWeek']);
    setColumns([...arr]);
    setNowDate(json['nextWeek']);
  }

  /**
   * 打开选择时段 Modal
   */
  function handleModalOpen() {
    setIsModalOpen(true);
  }

  /**
   * 打开选择时段 Modal
   */
  function handleSubmit() {
    setIsModalOpen(false);
  }

  /**
   * 表格行选择
   */
  const rowSelection = {
    onChange: (selectRowKeys, selectRows) => {
      const arr = selectRowKeys.filter(item => {
        return !selectedRowKeys.includes(item.id);
      });
      setSelectedRowKeys([...arr]);
    },
  };
  return (
    <div className={styles.schedulingWrap}>
      <div className={styles.topDom}>
        <div>
          <span>选择年份：</span>
          <Select defaultValue="1" style={{ width: 240 }} onChange={handleSelect}>
            <Option value="1">2019</Option>
            <Option value="2">2018</Option>
            <Option value="3">2017</Option>
          </Select>
        </div>

        <div>
          <span>当前日期：</span>
          <span>{moment().format('YYYY-MM-DD')}</span>
          <span>{weekFormat(moment().format('d'))}</span>
        </div>
      </div>

      <div className={styles.btnGroup}>
        <span onClick={handleLastWeek}>上一周</span>
        <span onClick={handleNowWeek}>当前周</span>
        <span onClick={handleNextWeek}>下一周</span>
        <Button
          style={{ visibility: selectedRowKeys.length > 0 ? 'visible' : 'hidden' }}
          type="primary"
          size="small"
          className={styles.editBtn}
          onClick={handleModalOpen}
        >
          编辑
        </Button>
      </div>

      <Table rowKey="id" dataSource={dataSource} rowSelection={rowSelection}>
        <Column title="工程师" dataIndex="engineer" key="engineer" />
        {columns.map(item => (
          <ColumnGroup title={item._date} key={item.id}>
            <Column
              title={item._day}
              dataIndex={`type${item.id}`}
              key={item.id}
              render={text => {
                return (
                  <a href="javascript:;" onClick={handleModalOpen}>
                    {text === 1 ? '已排班' : '---'}
                  </a>
                );
              }}
            />
          </ColumnGroup>
        ))}
      </Table>

      <Modal
        title="选择时段"
        width={500}
        visible={isModalOpen}
        onOk={() => {
          handleSubmit();
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        confirmLoading={!isModalOpen}
        destroyOnClose
      >
        <SelectTime />
      </Modal>
    </div>
  );
}
