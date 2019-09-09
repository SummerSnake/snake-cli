import React from 'react';
import { connect } from 'react-redux';
import { Tag, Icon } from 'antd';
import { verArr, verVal, setObjVal } from '@utils/util';

interface InitProp {
  tableRigger: {
    query?: any;
    queryShow?: any;
  };
  dispatch?: any;
}
class FilterTags extends React.Component<InitProp> {
  /**
   * @desc 生成筛选项标签
   */
  tagRigger = () => {
    const { tableRigger = {}, dispatch } = this.props;
    let { queryShow, query = {} } = tableRigger;
    const arr = [];

    for (const key in (queryShow = {})) {
      const json = queryShow[key];
      if (verVal(json) && json['queryValue'].length > 0)
        arr.push(
          <Tag
            key={key}
            closable
            onClose={() => {
              queryShow = setObjVal(queryShow, key, '');
              query = setObjVal(query, key, '');
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
    const { tableRigger = {} } = this.props;
    const { queryShow = {} } = tableRigger;

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

export default connect(({ tableRigger }: any) => ({ ...tableRigger }))(FilterTags);
