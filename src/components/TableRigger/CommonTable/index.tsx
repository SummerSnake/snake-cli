import React from 'react';
import { connect } from 'react-redux';
import { Table, Button, notification } from 'antd';
import { getRequest } from '@services/api';
import { jsonString, verArr, verVal, deepCompare, isObj } from '@utils/util';
import styles from './index.less';
import '../../../../mock/tableRiggerApi';

interface InitProp {
  tableRigger?: {
    query?: any;
    queryShow?: any;
    orders?: any;
    pagination?: any;
  };
  dispatch?: any;
  listUrl?: string;
  columns?: any[];
  operationBlock?: any[];
}
interface InitState {
  _pagination: {
    showSizeChanger: boolean;
    showQuickJumper: boolean;
    pageSizeOptions: string[];
    defaultPageSize: number;
    current: number;
    pageSize: number;
    total: number;
  };
  _dataSource: any[];
  _columns: any[];
  _isLoading: boolean;
  _url: string;
  _idArr: any[];
  _objArr: any[];
}
class CommonTable extends React.Component<InitProp, InitState> {
  constructor(props) {
    super(props);
    const url = location.pathname;
    const { dispatch } = props;
    dispatch({
      type: 'tableRigger/init',
    });
    this.state = {
      _dataSource: [],
      _pagination: {
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['15', '30', '45'],
        defaultPageSize: 15,
        current: 1,
        pageSize: 15,
        total: 0,
      },
      _columns: props.columns,
      _isLoading: false,
      _url: url,
      _idArr: [],
      _objArr: [],
    };
  }

  componentDidMount = () => {
    this.columnsUpdate(this.props);
    this.fetchData(this.props);
  };

  _tableRigger = null;

  componentWillReceiveProps = nextProps => {
    this.columnsUpdate(nextProps);
    const { _pagination } = this.state;
    this.setState({
      _pagination: Object.assign(_pagination, nextProps['tableRigger']['pagination']),
    });
    if (this._tableRigger !== null && !deepCompare(nextProps['tableRigger'], this._tableRigger)) {
      this.fetchData(nextProps);
    }
    this._tableRigger = JSON.parse(JSON.stringify(nextProps['tableRigger']));
  };

  componentWillUnmount = async () => {
    // 将筛选项放入 localStorage
    const { tableRigger } = this.props;
    const { _url = '' } = this.state;
    if (isObj(tableRigger)) {
      await localStorage.setItem(_url, JSON.stringify(tableRigger));
    }
  };

  /**
   * @desc table onChange 事件
   * @param { object } pager 分页参数
   * @param { object } filters 筛选参数
   * @param { object } sorter 排序参数
   */
  handleTableChange = (pager = {}, filters = {}, sorter) => {
    const { tableRigger = {}, dispatch } = this.props;
    let { query = {}, queryShow = {}, pagination = {}, orders = {} } = tableRigger;
    const { _columns } = this.state;
    // 分页
    pagination = {
      ...pagination,
      current: pager['current'],
      pageSize: pager['pageSize'],
    };
    // 筛选
    for (const key in filters) {
      if (filters[key]) {
        _columns.forEach((json = {}) => {
          if (key === json['dataIndex'] || key === json['key']) {
            const arr = [];
            verArr(json['filters']) &&
              json['filters'].forEach((filtersJson = {}) => {
                filters[key].forEach(value => {
                  if (filtersJson['value'] === value) {
                    arr.push(filtersJson['text']);
                  }
                });
              });

            if (verVal(filters[key])) {
              query[key] = filters[key];
              queryShow[key] = {
                queryTitle: json['title'],
                queryValue: arr,
              };
            } else {
              Reflect.deleteProperty(queryShow, key);
              Reflect.deleteProperty(query, key);
            }
          }
        });
      }
    }
    // 排序
    if (Object.keys(sorter).length > 0) {
      let type = sorter['order'];
      type = type.substring(0, type['length'] - 3);
      Object.assign(orders, { name: sorter['field'], type });
    } else {
      Reflect.deleteProperty(orders, orders['name']);
      Reflect.deleteProperty(orders, orders['type']);
    }
    dispatch({
      type: 'tableRigger/fetch',
      payload: { query, queryShow, pagination, orders },
    });
  };

  /**
   * @desc 更新表头
   * @param { object } props
   */
  columnsUpdate = props => {
    const { _pagination = {} } = this.state;
    const { tableRigger = {} } = props;
    const { query = {} } = tableRigger;
    if (verArr(props['columns'])) {
      const arr = props['columns'];
      arr.forEach((json = {}) => {
        if (json['filters']) {
          // 判断筛选状态
          json['filteredValue'] = query[json.dataIndex] ? query[json.dataIndex] : null;
        }
        if (json['column']) {
          // 如果表格数据有 column
          if (!json['render']) {
            // 如果没有 render 方法, 则渲染 column, 否则antd默认渲染 dataIndex
            json['render'] = (text, record) => record[json['column']];
          }
        } else {
          // 如果表格数据没有 column, 则将 dataIndex 赋值给 column
          json['column'] = json['dataIndex'];
        }
        if (json['isIncrement']) {
          // 设置序号
          json.render = (text, record, index) => {
            let page = (_pagination['current'] - 1) * _pagination['pageSize'];
            if (isNaN(page)) {
              page = 0;
            }
            return <span>{page + index + 1}</span>;
          };
        }
      });
      this.setState({ _columns: arr });
    }
  };

  /**
   * @desc 获取数据
   * @param { object } props
   */
  fetchData = async props => {
    const { tableRigger } = props;
    const json = JSON.parse(JSON.stringify(props['tableRigger']));
    jsonString(json.query);
    this.setState({ _isLoading: true });
    const data = await getRequest(props['listUrl'], json);
    if (data['status'] === 200 && verVal(data['data'])) {
      const _pagination = {
        ...this.state._pagination,
        total: data['data']['total'],
        current: data['data']['pageNum'],
      };
      this.setState({
        _dataSource: data['data']['list'],
        _pagination,
      });
    } else {
      notification.error({ message: data['msg'], description: data['subMsg'] });
    }
    this.setState({ _isLoading: false });
    // 将筛选项放入 localStorage
    const { _url = '' } = this.state;
    if (isObj(tableRigger)) {
      await localStorage.setItem(_url, JSON.stringify(tableRigger));
    }
  };

  render() {
    const { operationBlock } = this.props;
    const { _columns, _dataSource, _pagination, _isLoading, _idArr, _objArr } = this.state;

    return (
      <div>
        {operationBlock && (
          <div className={styles.optWrap}>
            <span>
              已选择<b>{_idArr.length}</b>项
            </span>
            <div>
              {operationBlock.map((item, index) => (
                <Button
                  {...item}
                  className={styles.optBtn}
                  type="primary"
                  key={index.toString()}
                  onClick={() => {
                    item.onClick(_idArr, _objArr);
                  }}
                >
                  {item.title}
                </Button>
              ))}
            </div>
          </div>
        )}
        <Table
          scroll={{
            x: 1200,
            y: operationBlock ? 'calc(100vh - 290px)' : 'calc(100vh - 248px)',
          }}
          {...this.props}
          rowKey="id"
          columns={_columns}
          dataSource={_dataSource}
          pagination={_pagination}
          loading={_isLoading}
          onChange={this.handleTableChange}
          rowSelection={
            operationBlock
              ? {
                  // columnWidth: '2%',
                  onChange: (idArr, objArr) => {
                    this.setState({
                      _idArr: idArr,
                      _objArr: objArr,
                    });
                  },
                }
              : null
          }
        />
      </div>
    );
  }
}

export default connect(({ tableRigger }: any) => ({ tableRigger }))(CommonTable);
