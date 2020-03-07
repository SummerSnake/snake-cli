import React from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import { verVal } from '@utils/util';
import styles from './index.less';

interface InitProp {
  tableRigger?: {
    query?: any;
    queryShow?: any;
    pagination?: any;
    orders?: any;
  };
  dispatch?: any;
  id?: any;
  title?: string;
  component?: any;
}
interface InitState {
  _isVisible: any;
}
class FormModal extends React.Component<InitProp, InitState> {
  constructor(props) {
    super(props);
    this.state = {
      _isVisible: false,
    };
  }

  /**
   * @desc table 回调函数
   * @param { boolean } isRefresh 是否刷新表格数据
   */
  tableCallback = isRefresh => {
    this.setState({ _isVisible: false });
    if (isRefresh) {
      const { dispatch, id } = this.props;
      if (verVal(id)) {
        const code = Math.round(Math.random() * 999999999);
        const { tableRigger = {} } = this.props;
        const { query, queryShow, pagination, orders } = tableRigger;
        dispatch({
          type: 'tableRigger/fetch',
          payload: { query, queryShow, pagination, orders, code },
        });
      } else {
        dispatch({
          type: 'tableRigger/init',
        });
      }
    }
  };

  /**
   * @desc 是否打开 Modal
   * @param { boolean } isVisible
   */
  handleBtnClick = isVisible => {
    this.setState({ _isVisible: isVisible });
  };

  render() {
    const { component: Component, title, id } = this.props;
    const { _isVisible } = this.state;

    return (
      <div className={styles.addWrap} style={{ marginLeft: !verVal(id) && '36px' }}>
        {verVal(id) ? (
          <a
            onClick={e => {
              e.preventDefault();
              this.handleBtnClick(true);
            }}
          >
            {title}
          </a>
        ) : (
          <span className={styles.addBtn} key="1" onClick={() => this.handleBtnClick(true)}>
            <PlusCircleOutlined className={styles.iconDom} key="Icon" />
            {title}
          </span>
        )}
        <Modal
          title={title}
          width={800}
          visible={_isVisible}
          footer={null}
          onCancel={() => this.handleBtnClick(false)}
          destroyOnClose
          {...this.props}
        >
          {/* 走 createClass */}
          {Component && <Component tableCallback={this.tableCallback} {...this.props} />}
        </Modal>
      </div>
    );
  }
}

export default connect(({ tableRigger }: any) => ({ tableRigger }))(FormModal);
