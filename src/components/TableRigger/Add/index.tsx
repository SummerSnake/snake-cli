import React from 'react';
import { Modal, Icon } from 'antd';
import { connect } from 'react-redux';
import styles from './index.less';

interface InitProp {
  tableRigger?: {};
  dispatch?: any;
  title?: string;
  component?: any;
}
interface InitState {
  _isVisible: any;
}
class Add extends React.Component<InitProp, InitState> {
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
      const { dispatch } = this.props;
      dispatch({
        type: 'tableRigger/init',
      });
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
    const { component: Component, title } = this.props;
    const { _isVisible } = this.state;

    return (
      <div className={styles.addWrap}>
        <span className={styles.addBtn} key="1" onClick={() => this.handleBtnClick(true)}>
          <Icon className={styles.iconDom} type="plus-circle" key="Icon" />
          {title}
        </span>
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
          {Component && (
            <Component tableCallback={this.tableCallback} {...this.props} />
          )}
        </Modal>
      </div>
    );
  }
}

export default connect(({ tableRigger }: any) => ({ tableRigger }))(Add);
