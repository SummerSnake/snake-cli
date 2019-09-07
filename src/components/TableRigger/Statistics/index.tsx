import React from 'react';
import { Divider, Spin } from 'antd';
import { connect } from 'react-redux';
import { getRequest } from '@services/api';
import { deepCompare, verArr } from '@utils/util';
import styles from './index.less';

interface InitProp {
  tableRigger: {
    query?: any;
    queryShow?: any;
  };
  dispatch?: any;
  topJson?: any;
  sourceUrl?: string;
}
interface InitState {
  _dataSource: any;
  _isLoading: boolean;
}
class Statistics extends React.Component<InitProp, InitState> {
  constructor(props) {
    super(props);
    this.state = {
      _dataSource: {},
      _isLoading: false,
    };
  }
  _tableRigger = null;

  componentWillReceiveProps = nextProps => {
    if (deepCompare(nextProps.tableRigger, this._tableRigger)) {
      this.fetchData();
    }
    this._tableRigger = JSON.parse(JSON.stringify(nextProps.tableRigger));
  };

  /**
   * @desc 获取数据
   */
  fetchData = async () => {
    this.setState({ _isLoading: true });
    const data = await getRequest(this.props.sourceUrl, null);
    if (data['status'] === 200) {
      this.setState({ _dataSource: data['data'] });
    }
    this.setState({ _isLoading: false });
  };

  /**
   * @desc 点击事件
   */
  handleClick = async json => {
    const {
      tableRigger: { query = {}, queryShow = {} },
      dispatch,
    } = this.props;
    if (json.queryField && json.queryTitle && json.queryValue) {
      queryShow[json.queryField] = {
        queryTitle: json.queryTitle,
        queryValue: json.displayTitle,
      };
      query[json.queryField] = json.queryValue;
      dispatch({
        type: 'tableRigger/fetch',
        payload: { query, queryShow },
      });
    }
  };

  render() {
    const { topJson = {} } = this.props;
    const { _dataSource = {}, _isLoading } = this.state;
    return (
      <Spin spinning={_isLoading}>
        <div className={styles.statisticsWrap}>
          {verArr(topJson) &&
            topJson.map((item, i) => {
              const isQuery = item['queryField'] && item['queryTitle'] && item['queryValue'];

              return (
                <div key={i.toString()} onClick={this.handleClick.bind(this, item)}>
                  <p>{item['displayTitle']}</p>
                  <span
                    style={{
                      color: isQuery ? '#40a9ff' : '#999',
                      cursor: isQuery ? 'pointer' : 'default',
                    }}
                  >
                    {_dataSource[item.displayField] || 0}
                  </span>
                  <Divider type="vertical" className={styles.lineDom} />
                </div>
              );
            })}
        </div>
      </Spin>
    );
  }
}

export default connect(({ tableRigger }: any) => ({ ...tableRigger }))(Statistics);
