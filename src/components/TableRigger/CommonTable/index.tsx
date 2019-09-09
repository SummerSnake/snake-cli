import React from 'react';
import { connect } from 'react-redux';
import { Table, Button, notification } from 'antd';
import { postRequest } from '@services/api';
import { jsonString, verArr, verVal, setObjVal, deepCompare } from '@utils/util';
import styles from './index.less';

interface InitProp {
  tableRigger: {
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
    this.columnsUp(this.props);
  };

  _tableRigger = null;

  componentWillReceiveProps = nextProps => {
    this.columnsUp(nextProps);
    const { _pagination } = this.state;
    this.setState({
      _pagination: Object.assign(_pagination, nextProps['tableRigger']['pagination']),
    });
    if (deepCompare(nextProps['tableRigger'], this._tableRigger)) {
      this.fetchData(nextProps);
    }
    this._tableRigger = JSON.parse(JSON.stringify(nextProps['tableRigger']));
  };

  componentWillUnmount = async () => {
    await localStorage.setItem(this.state._url, JSON.stringify(this.props.tableRigger));
  };

  /**
   * @desc table onChange 事件
   * @param { object } pager 分页参数
   * @param { object } filters 筛选参数
   * @param { object } sorter 排序参数
   */
  handleTableChange = (pager = {}, filters, sorter = {}) => {
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
    for (const key in (filters = {})) {
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
              queryShow = setObjVal(queryShow, key, '');
              query = setObjVal(query, key, '');
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
      orders = setObjVal(orders, orders['name'], '');
      orders = setObjVal(orders, orders['type'], '');
    }

    dispatch({
      type: 'tableRigger/fetch',
      payload: { query, queryShow, pagination, orders },
    });
  };
  /**
   * @desc 表头初始化
   * @param { object } props
   */
  columnsUp = props => {
    const { _pagination = {} } = this.state;
    const { tableRigger = {} } = this.props;
    const { query = {}, orders = {} } = tableRigger;
    if (verArr(props['columns'])) {
      const arr = props['columns'];

      arr.forEach((json = {}) => {
        if (json['filters']) {
          json['filteredValue'] = query[json.dataIndex] ? query[json.dataIndex] : null;
        }
        if (json['column']) {
          if (!json['render']) {
            json['render'] = (text, record) => record[json['column']];
          }
        } else {
          json['column'] = json['dataIndex'];
        }
        if (json['isIncrement']) {
          json.render = (text, record, index) => {
            let page = (_pagination['current'] - 1) * _pagination['pageSize'];
            if (isNaN(page)) {
              page = 0;
            }
            return <span>{page + index + 1}</span>;
          };
        }
        if (json['sorter']) {
          json['sortOrder'] = json['dataIndex'] === orders['name'] && `${orders['type']}end`;
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
    const json = JSON.parse(JSON.stringify(props['tableRigger']));
    jsonString(json.query);

    this.setState({ _isLoading: true });
    const data = await postRequest(props['listUrl'], json);
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
            y: 'calc(100vh - 252px)',
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
                  columnWidth: '2%',
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

export default connect(({ tableRigger }: any) => ({ ...tableRigger }))(CommonTable);
