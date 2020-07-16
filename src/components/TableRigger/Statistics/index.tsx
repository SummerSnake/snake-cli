import React from 'react';
import { Divider } from 'antd';
import { connect } from 'react-redux';
import { getRequest } from '@utils/request';
import { deepCompare, verArr } from '@utils/util';
import styles from './index.less';
import '../../../../mock/topListApi';

interface InitProp {
  tableRigger?: {
    query?: any;
    queryShow?: any;
  };
  dispatch?: any;
  topList?: any[];
  sourceUrl?: string;
}
interface InitState {
  _dataSource: any;
}
class Statistics extends React.Component<InitProp, InitState> {
  constructor(props) {
    super(props);
    this.state = {
      _dataSource: {},
    };
  }
  _tableRigger = null;

  componentDidMount = () => {
    this.fetchData();
  };

  componentWillReceiveProps = (nextProps) => {
    if (this._tableRigger !== null && !deepCompare(nextProps.tableRigger, this._tableRigger)) {
      this.fetchData();
    }
    this._tableRigger = JSON.parse(JSON.stringify(nextProps.tableRigger));
  };

  /**
   * @desc 获取数据
   */
  fetchData = async () => {
    const data = await getRequest(this.props.sourceUrl, null);
    if (data['status'] === 200) {
      this.setState({ _dataSource: data['data']['data'] });
    }
  };

  /**
   * @desc 点击事件
   */
  handleClick = async (json) => {
    const { tableRigger = {}, dispatch } = this.props;
    let { queryShow = {}, query = {} } = tableRigger;

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
    const { topList = [] } = this.props;
    const { _dataSource = {} } = this.state;

    return (
      <div className={styles.statisticsWrap}>
        {verArr(topList) &&
          topList.map((item, i) => {
            const isQuery = item['queryField'] && item['queryTitle'] && item['queryValue'];

            return (
              <div key={i.toString()} onClick={() => this.handleClick(item)}>
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
    );
  }
}

export default connect(({ tableRigger }: any) => ({ tableRigger }))(Statistics);
