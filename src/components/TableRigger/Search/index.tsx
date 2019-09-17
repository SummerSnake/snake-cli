import React from 'react';
import { connect } from 'react-redux';
import { Input, DatePicker, Select } from 'antd';
import moment from 'moment';
import { isObj, verVal, verArr } from '@utils/util';
import styles from './index.less';

interface InitProp {
  tableRigger?: {
    query?: any;
    queryShow?: any;
  };
  dispatch?: any;
  general?: any;
  advanced?: any[];
  operationBlock?: any;
}
interface InitState {
  _dataSource: any;
  _dataShow: any;
  _isVisible: boolean;
}
class Search extends React.Component<InitProp, InitState> {
  constructor(props) {
    super(props);
    const { tableRigger = {} } = props;
    this.state = {
      _dataSource: tableRigger.query,
      _dataShow: tableRigger.queryShow,
      _isVisible: false,
    };
  }

  componentWillReceiveProps = nextProps => {
    const { tableRigger = {} } = nextProps;
    this.setState({
      _dataSource: tableRigger.query,
      _dataShow: tableRigger.queryShow,
    });
  };

  /**
   * @desc 普通搜索 input 框 onChange 事件
   * @param { event } e
   */
  handleGeneralInputChange = e => {
    const { value } = e.target;
    const { general = {} } = this.props;

    this.setStateData(general, value, null);
  };

  /**
   * @desc 点击普通搜素
   */
  handleGeneralSearch = () => {
    const { tableRigger = {}, dispatch } = this.props;
    const { queryShow = {}, query = {} } = tableRigger;
    const { _dataSource = {}, _dataShow = {} } = this.state;

    Object.assign(query, _dataSource);
    Object.assign(queryShow, _dataShow);
    dispatch({
      type: 'tableRigger/fetch',
      payload: { query, queryShow },
    });
  };

  /**
   * @desc 高级搜索按钮点击事件
   */
  handleAdvancedSearchBtnClick = () => {
    const { _isVisible } = this.state;
    this.setState({ _isVisible: !_isVisible });
  };

  /**
   * @desc 高级搜索 input onChange 事件
   * @param { any } item
   * @param { event } e
   */
  handleAdvancedInputChange = (item, e) => {
    const { value } = e.target;
    this.setStateData(item, value, null);
  };

  /**
   * @desc 高级搜素 Select onChange 事件
   * @param { obj } item
   * @param { string } value
   * @param { object } object
   */
  handleSelectChange = (item, value, object) => {
    const { props = {} } = object;
    const { children } = props;
    this.setStateData(item, value, children);
  };

  /**
   * @desc 高级搜素 multiple Select onChange 事件
   * @param { obj } item
   * @param { string } value
   * @param { array } objectArr
   */
  handleMultiPleSelectChange = (item, value, objectArr) => {
    const arr = [];
    objectArr.forEach(object => {
      const { props = {} } = object;
      const { children } = props;
      arr.push(children);
    });

    this.setStateData(item, value, arr);
  };

  /**
   * @desc 高级搜素 DatePicker onChange 事件
   * @param { obj } item
   * @param { moment } date
   * @param { string } dateString
   */
  handleDatePickerChange = (item, date, dateString) => {
    this.setStateData(item, dateString, null);
  };

  /**
   * @desc 高级搜素 RangePicker onChange 事件
   * @param { obj } item
   * @param { array } date [moment, moment]
   * @param { array } dateString [string, string]
   */
  handleRangePickerChange = (item, date, dateString) => {
    this.setStateData(item, dateString, null);
  };

  /**
   * @desc setState 公共方法
   * @param { object } json 要赋值的 key 所在对象
   * @param { string } value 要赋的值
   * @param { any } maybeVal 要赋的值(非必然存在)
   */
  setStateData = (json, value, maybeVal) => {
    const val = value;
    let { _dataSource, _dataShow } = this.state;
    if (verVal(val)) {
      _dataSource[json['queryField']] = val;

      _dataShow[json['queryField']] = {
        queryTitle: json['queryTitle'],
        queryValue: verVal(maybeVal) ? maybeVal : val,
      };
    } else {
      Reflect.deleteProperty(_dataSource, _dataSource[json['queryField']]);
      Reflect.deleteProperty(_dataShow, _dataShow[json['queryField']]);
    }
    this.setState({
      _dataSource,
      _dataShow,
    });
  };

  render() {
    const { general, advanced, operationBlock } = this.props;
    const { _dataSource = {}, _isVisible } = this.state;

    return (
      <div className={styles.searchWrap}>
        {/*普通搜索*/}
        {isObj(general) && (
          <span className={styles.generalSearch}>
            <Input.Search
              style={{ width: 266, marginBottom: '10px' }}
              placeholder={`请输入${general['queryTitle']}`}
              value={_dataSource[general['queryField']]}
              onChange={this.handleGeneralInputChange}
              onSearch={this.handleGeneralSearch}
              enterButton
            />
          </span>
        )}
        {/*高级搜索*/}
        {verArr(advanced) && (
          <span
            className={styles.advancedSearchBtn}
            style={{ color: _isVisible ? '#f56c6c' : '#40a9ff' }}
            onClick={this.handleAdvancedSearchBtnClick}
          >
            高级搜索
          </span>
        )}
        {/*操作按钮*/}
        {operationBlock && <div className={styles.btnGroup}>{operationBlock.map(obj => obj)}</div>}
        {/*高级搜索内容区域*/}
        {verArr(advanced) && (
          <div
            className={styles.advancedSearchWrap}
            style={{ display: _isVisible ? 'block' : 'none' }}
          >
            {advanced.map((item, index) => {
              const { component } = item;
              switch (component) {
                case 'Input' || !component:
                  return (
                    <div key={index.toString()}>
                      <span>{item['queryTitle']}:</span>
                      <Input
                        className={styles.inputDom}
                        placeholder={`请输入${item['queryTitle']}`}
                        value={_dataSource[item['queryField']]}
                        onChange={this.handleAdvancedInputChange.bind(this, item)}
                      />
                    </div>
                  );
                  break;
                case 'Select':
                  return (
                    <div key={index.toString()}>
                      <span>{item['queryTitle']}:</span>
                      <Select
                        className={styles.inputDom}
                        placeholder={`请选择${item['queryTitle']}`}
                        value={
                          _dataSource[item['queryField']] ? _dataSource[item['queryField']] : ''
                        }
                        onChange={this.handleSelectChange.bind(this, item)}
                      >
                        {isObj(item) &&
                          verArr(item.componentData) &&
                          item.componentData.map((json, j) => (
                            <Select.Option key={j.toString()} value={json['value']}>
                              {json['title']}
                            </Select.Option>
                          ))}
                      </Select>
                    </div>
                  );
                  break;
                case 'Select-Multiple':
                  return (
                    <div key={index.toString()}>
                      <span>{item['queryTitle']}:</span>
                      <Select
                        className={styles.inputDom}
                        placeholder={`请选择${item['queryTitle']}`}
                        mode="multiple"
                        value={
                          _dataSource[item['queryField']] ? _dataSource[item['queryField']] : []
                        }
                        onChange={this.handleMultiPleSelectChange.bind(this, item)}
                      >
                        {isObj(item) &&
                          verArr(item.componentData) &&
                          item.componentData.map((json, j) => (
                            <Select.Option key={j.toString()} value={json['value']}>
                              {json['title']}
                            </Select.Option>
                          ))}
                      </Select>
                    </div>
                  );
                  break;
                case 'DatePicker':
                  return (
                    <div key={index.toString()}>
                      <span>{item['queryTitle']}:</span>
                      <DatePicker
                        className={styles.inputDom}
                        placeholder={`请选择${item['queryTitle']}`}
                        value={
                          _dataSource[item['queryField']]
                            ? moment(_dataSource[item['queryField']])
                            : null
                        }
                        onChange={this.handleDatePickerChange.bind(this, item)}
                      />
                    </div>
                  );
                  break;
                case 'RangePicker':
                  return (
                    <div key={index.toString()}>
                      <span>{item['queryTitle']}:</span>
                      <DatePicker.RangePicker
                        className={styles.inputDom}
                        value={
                          _dataSource[item['queryField']]
                            ? [
                                moment(_dataSource[item['queryField']][0]),
                                moment(_dataSource[item['queryField']][1]),
                              ]
                            : null
                        }
                        onChange={this.handleRangePickerChange.bind(this, item)}
                      />
                    </div>
                  );
                  break;
                default:
                  return null;
              }
            })}
          </div>
        )}
      </div>
    );
  }
}

export default connect(({ tableRigger }: any) => ({ tableRigger }))(Search);
