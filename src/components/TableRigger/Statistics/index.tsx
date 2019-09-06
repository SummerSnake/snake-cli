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
  dataSource: any;
  isLoading: boolean;
}
class Statistics extends React.Component<InitProp, InitState> {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: {},
      isLoading: false,
    };
  }

  tableRigger = null;

  componentWillReceiveProps = nextProps => {
    if (deepCompare(nextProps.tableRigger, this.tableRigger)) {
      this.fetchData();
    }
    this.tableRigger = JSON.parse(JSON.stringify(nextProps.tableRigger));
  };

  /**
   * @desc 获取数据
   */
  fetchData = async () => {
    this.setState({ isLoading: true });
    const data = await getRequest(this.props.sourceUrl, null);
    if (data['status'] === 200) {
      this.setState({ dataSource: data['data'] });
    }
    this.setState({ isLoading: false });
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
    const { dataSource = {}, isLoading } = this.state;
    return (
      <Spin spinning={isLoading}>
        <div className={styles.statisticsWrap}>
          {verArr(topJson) &&
            topJson.map((item, i) => (
              <div key={i.toString()} onClick={this.handleClick.bind(this, item)}>
                <p>{item['displayTitle']}</p>
                <span
                  style={{
                    color:
                      item['queryField'] && item['queryTitle'] && item['queryValue']
                        ? '#40a9ff'
                        : '#999',
                    cursor:
                      item['queryField'] && item['queryTitle'] && item['queryValue']
                        ? 'pointer'
                        : 'default',
                  }}
                >
                  {dataSource[item.displayField] || 0}
                </span>
                <Divider type="vertical" className={styles.lineDom} />
              </div>
            ))}
        </div>
      </Spin>
    );
  }
}

export default connect(({ tableRigger }) => ({ ...tableRigger }))(Statistics);
