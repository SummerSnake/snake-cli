import React from 'react';
import { connect } from 'react-redux';
import { Tag, Icon } from 'antd';
import { verArr, verVal } from '@utils/util';

interface InitProp {
  tableRigger: {
    query?: any;
    queryShow?: any;
  };
  dispatch?: any;
}
class FilterTag extends React.Component<InitProp> {
  constructor(props) {
    super(props);
  }

  /**
   * @desc 生成筛选项标签
   */
  tagRigger = () => {
    const {
      tableRigger: { queryShow = {}, query = {} },
      dispatch,
    } = this.props;
    const arr = [];
    for (const key in (queryShow = {})) {
      const json = queryShow[key];
      if (verVal(json) && json['queryValue'].length > 0)
        arr.push(
          <Tag
            key={key}
            closable
            onClose={() => {
              delete queryShow[key];
              delete query[key];
              dispatch({
                type: 'tableRigger/fetch',
                payload: { queryShow, query },
              });
            }}
          >
            {`${json.queryTitle}: ' '`}
            {verArr(json['queryValue']) ? json['queryValue'].toString() : json['queryValue']}
          </Tag>
        );
    }
    return arr;
  };

  isShow = () => {
    const {
      tableRigger: { queryShow = {} },
    } = this.props;

    return Object.keys(queryShow).length > 0;
  };

  render() {
    return (
      <div style={{ background: '#fff' }}>
        <span style={{ fontSize: '14px', color: '#373737' }}>{this.isShow() && '检索项： '}</span>
        {this.tagRigger()}
        {this.isShow() && (
          <a
            onClick={() => {
              const { dispatch } = this.props;
              const queryShow = {};
              const query = {};
              dispatch({
                type: 'tableRigger/fetch',
                payload: { queryShow, query },
              });
            }}
          >
            <Icon
              type="delete"
              theme="filled"
              key="Icon"
              style={{ color: '#999', verticalAlign: 'middle' }}
            />
          </a>
        )}
      </div>
    );
  }
}

export default connect(({ tableRigger }) => ({ ...tableRigger }))(FilterTag);
