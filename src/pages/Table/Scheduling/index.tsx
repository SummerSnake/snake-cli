import React, { useState, useEffect } from 'react';
import { Table, Button, Select } from 'antd';
const { Column, ColumnGroup } = Table;
const { Option } = Select;
import moment from 'moment';
import { weekFormat, calcWeek, columnsJson } from '@utils/date';
import { getRequest } from '@services/api';
import { verArr } from '@utils/util';
import SelectTime from './components/SelectTime/index';
import '../../../../mock/schedulingApi';
import styles from './index.less';

function Scheduling() {
  // 当前日期
  const [nowDate, setNowDate] = useState(moment());
  // 表头
  const [columns, setColumns] = useState(columnsJson(nowDate));
  // 表格数据
  const [dataSource, setDataSource] = useState([]);
  // 表格选择框
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // Modal 开关
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // 接口数据
  const [apiData, setApiData] = useState({});

  /**
   * @desc 获取数据
   */
  useEffect(() => {
    async function fetchData() {
      const data = await getRequest('/api/get_scheduling', null);
      setDataSource([...data['data']['tableData']]);
      setApiData({ ...data['data'] });
    }
    fetchData();
  }, []);

  /**
   * @desc 选择框事件
   * @param val 当前所选值
   */
  function handleSelect(val: string) {
    console.log(`selected ${val}`);
  }

  /**
   * @desc 上一周按钮点击
   */
  function handleLastWeek() {
    const json = calcWeek(nowDate);
    const arr = columnsJson(json['lastWeek']);
    setColumns([...arr]);
    setNowDate(json['lastWeek']);
  }

  /**
   * @desc 当前周按钮点击
   */
  function handleNowWeek() {
    const arr = columnsJson(moment());
    setColumns([...arr]);
    setNowDate(moment());
  }

  /**
   * @desc 上一周按钮点击
   */
  function handleNextWeek() {
    const json = calcWeek(nowDate);
    const arr = columnsJson(json['nextWeek']);
    setColumns([...arr]);
    setNowDate(json['nextWeek']);
  }

  /**
   * @desc 打开选择时段 Modal
   * @param { event } e
   */
  function handleModalOpen(e) {
    e.preventDefault();
    setIsModalOpen(true);
  }

  /**
   * @desc 打开选择时段 Modal 回调
   */
  function onModalCall() {
    setIsModalOpen(false);
  }

  /**
   * @desc 表格行选择
   */
  const rowSelection = {
    onChange: (selectRowKeys, selectRows) => {
      console.log(selectRows);

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
        {verArr(columns) &&
          columns.map(item => (
            <ColumnGroup title={item._date} key={item.id}>
              <Column
                title={item._day}
                dataIndex={`type${item.id}`}
                key={item.id}
                render={text => {
                  return (
                    <a href="#" onClick={handleModalOpen}>
                      {text === 1 ? '已排班' : '---'}
                    </a>
                  );
                }}
              />
            </ColumnGroup>
          ))}
      </Table>

      {Object.keys(apiData).length > 0 && (
        <SelectTime apiData={apiData} onModalCall={onModalCall} isModalOpen={isModalOpen} />
      )}
    </div>
  );
}

export default Scheduling;
